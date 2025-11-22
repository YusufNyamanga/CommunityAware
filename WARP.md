# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**CommunityAware** (originally "Umoja-Aware") is a specialized AI-powered legal assistant designed for the Bahrain community. It provides multilingual legal guidance covering labour law, company formation, visa services, LMRA procedures, and Sijilat registration.

## Development Commands

### Frontend (React)
```bash
# Development server
npm start

# Development server with network access (for mobile testing)
npm run start:network

# Production build
npm build

# Run tests
npm test
```

### Backend (Express/TypeScript)
```bash
# Development with hot reload
cd backend && npm run dev

# Build TypeScript
cd backend && npm run build

# Production start
cd backend && npm start

# Run tests
cd backend && npm test
```

## Architecture Overview

### Dual Frontend Architecture
The project has evolved to support both standalone frontend and full-stack configurations:

1. **Standalone Frontend**: Direct AI service integration (DeepSeek API)
2. **Full-Stack**: Backend proxy for AI services with authentication

### Key Services Architecture

**AI Services Migration**: The project recently migrated from Qwen AI to DeepSeek AI for enhanced multilingual support. Both services remain available:
- `deepseekService.ts` - Primary AI service with superior cultural awareness
- `qwenService.ts` - Legacy service (still functional)

**Service Layer Pattern**:
- `deepseekService.ts` - Multilingual AI responses with cultural context
- `knowledgeBaseService.ts` - Legal document context injection
- `bahrainGlossaryService.ts` - Legal terminology management
- Backend `aiService.ts` - Proxy for AI services with rate limiting

### Component Architecture

**Context-Driven Design**: The app uses React contexts for global state:
- `LanguageContext` - 20+ supported languages with RTL support
- `ThemeProvider` - Dark/light mode with custom theming

**Tab-Based Navigation**: Single-page app with three main sections:
- Chat interface with streaming AI responses
- Knowledge base with legal articles/FAQs
- Community forum for user discussions

**Responsive Layout**: Desktop sidebar with mobile overlay patterns for knowledge base access.

## Language & Internationalization

### Multilingual Support
The application supports 20+ languages with native cultural context:
- Arabic (Gulf dialect awareness)
- Chinese (Simplified & Traditional)  
- Spanish, French, Portuguese, Russian
- Hindi, Tamil, Telugu, Malayalam
- And many more with proper script support

**Critical**: All AI responses must be entirely in the selected language - no English mixing allowed. DeepSeek service provides superior cultural awareness compared to the legacy Qwen service.

### Translation Architecture
- `locales/translations.ts` - UI translations
- `locales/index.ts` - Language definitions
- AI services handle dynamic content translation with cultural context

## Environment Configuration

### Required Environment Variables

**.env file structure**:
```bash
# Primary AI Service (DeepSeek - Better multilingual support)
REACT_APP_DEEPSEEK_API_KEY=sk-your-deepseek-key-here
REACT_APP_DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions

# Legacy AI Service (Optional - Qwen fallback)
REACT_APP_QWEN_API_KEY=your_qwen_key_here

# Backend Configuration (if using full-stack mode)
ZAI_API_KEY=your_zai_key_here
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret_here
```

## Development Practices

### Code Quality Requirements
- All updates must support high-quality presentations, dashboards, and PDF exports per user rules
- Preview functionality must work with multiple code snippets combining HTML, CSS, JS
- Support React and mixed frontend languages in previews

### AI Service Integration
When modifying AI services:
1. **Streaming Support**: All AI responses use streaming for real-time user experience
2. **Response Cleaning**: Remove markdown formatting from AI responses for clean display
3. **Category Classification**: Automatically categorize legal queries
4. **Context Enhancement**: Inject relevant legal context for labour law queries

### Database Integration
The backend supports PostgreSQL with user authentication, rate limiting, and secure token validation.

## Testing Strategy

### Frontend Testing
```bash
npm test -- --watch          # Watch mode for development
npm test -- --coverage       # Coverage report
npm test -- ChatMessage      # Test specific component
```

### Backend Testing
```bash
cd backend && npm test                    # Run all tests  
cd backend && npm test -- --watch        # Watch mode
cd backend && npm test aiService          # Test specific service
```

## Legal Knowledge Base

### Content Structure
- `src/data/knowledgeBase.ts` - Structured legal articles
- `backend/data/` - JSON files with FAQs, laws, glossary, updates
- Dynamic context injection for labour law queries

### Adding Legal Content
When adding new legal information:
1. Update appropriate JSON files in `backend/data/`
2. Ensure multilingual support for all content
3. Add keyword matching in `knowledgeBaseService.ts` for auto-injection

## Deployment Notes

### Build Process
```bash
npm run build                 # Creates optimized build in /build
cd backend && npm run build   # Compiles TypeScript to /dist
```

### Production Considerations
- API keys must be secured (use backend proxy in production)
- HTTPS required for production deployment
- Rate limiting configured in backend
- Database migrations needed for full-stack deployment

## Migration History

### DeepSeek Migration (Recent)
The project migrated from Qwen to DeepSeek AI for:
- Superior multilingual translations
- Enhanced cultural awareness
- Better grammar and sentence structure
- Native-level language responses

**Migration files**: `DEEPSEEK_MIGRATION.md` contains detailed migration instructions and benefits.

## Security Considerations

- JWT-based authentication for backend API
- Rate limiting per user (configurable)
- Input validation on all user queries
- Secure environment variable handling
- CORS properly configured for production

## Browser Support

Optimized for modern browsers with specific support for:
- RTL languages (Arabic, Hebrew)
- Font rendering for complex scripts (Tamil, Telugu, Malayalam)
- Mobile responsive design
- PWA capabilities via manifest.json

---

*This project serves the Bahrain legal community with culturally-aware, multilingual AI assistance while maintaining high code quality and security standards.*