#!/bin/bash

# Create database if it doesn't exist
psql -U postgres <<EOF
CREATE DATABASE community_aware;
\c community_aware;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create chat sessions table
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    is_archived BOOLEAN DEFAULT FALSE,
    CONSTRAINT valid_category CHECK (category IN (
        'labour-law',
        'visa-services',
        'company-formation',
        'grace-period',
        'lmra',
        'sijilat',
        'general-legal',
        'other'
    ))
);

-- Create chat messages table
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender VARCHAR(10) NOT NULL CHECK (sender IN ('user', 'ai')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(50) NOT NULL,
    language VARCHAR(2) NOT NULL CHECK (language IN ('en', 'ar')),
    metadata JSONB,
    CONSTRAINT valid_category CHECK (category IN (
        'labour-law',
        'visa-services',
        'company-formation',
        'grace-period',
        'lmra',
        'sijilat',
        'general-legal',
        'other'
    ))
);

-- Create indexes for better performance
CREATE INDEX idx_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_sessions_updated_at ON chat_sessions(updated_at);
CREATE INDEX idx_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_messages_timestamp ON chat_messages(timestamp);

-- Full-text search index for message content
CREATE INDEX idx_messages_content_search ON chat_messages
USING gin(to_tsvector('english', content));

-- Function to update session updated_at timestamp
CREATE OR REPLACE FUNCTION update_session_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chat_sessions
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.session_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update session timestamp when message is added
CREATE TRIGGER update_session_timestamp
    AFTER INSERT ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_session_timestamp();

-- Row Level Security (RLS) policies
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies to ensure users can only access their own data
CREATE POLICY session_access_policy ON chat_sessions
    FOR ALL
    TO authenticated_users
    USING (user_id = current_user);

CREATE POLICY message_access_policy ON chat_messages
    FOR ALL
    TO authenticated_users
    USING (session_id IN (
        SELECT id FROM chat_sessions WHERE user_id = current_user
    ));

-- Create retention policy (cleanup old sessions after 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM chat_messages
    WHERE session_id IN (
        SELECT id
        FROM chat_sessions
        WHERE updated_at < NOW() - INTERVAL '30 days'
    );

    DELETE FROM chat_sessions
    WHERE updated_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup job (runs daily at 3 AM)
SELECT cron.schedule('cleanup_old_sessions_job',
    '0 3 * * *',
    'SELECT cleanup_old_sessions();'
);
EOF
