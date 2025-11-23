import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CommunityPost, CommunityReply } from '../types';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
`;

const Section = styled.div`
  margin-top: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const Danger = styled(Button)`
  background: ${({ theme }) => theme.colors.error};
`;

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean>(false);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [replies, setReplies] = useState<Record<string, CommunityReply[]>>({});
  const [banner, setBanner] = useState<string>('');
  const [liveBanner, setLiveBanner] = useState<string>('');
  const [bannerType, setBannerType] = useState<string>('info');
  const [bannerMode, setBannerMode] = useState<'sticky' | 'popup'>('sticky');
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const auth = localStorage.getItem('admin_auth') === 'true';
      setAuthed(auth);
      if (!auth) {
        navigate('/admin/login', { replace: true });
        return;
      }
      const rawPosts = localStorage.getItem('community_posts');
      if (rawPosts) setPosts(JSON.parse(rawPosts));
      const rawReplies = localStorage.getItem('community_replies');
      if (rawReplies) setReplies(JSON.parse(rawReplies));
      const rawBanner = localStorage.getItem('admin_banner') || '';
      setLiveBanner(rawBanner);
      setBannerType(localStorage.getItem('admin_banner_type') || 'info');
      const storedMode = (localStorage.getItem('admin_banner_mode') as any) || 'sticky';
      setBannerMode(storedMode === 'popup' ? 'popup' : 'sticky');
    } catch {}
  }, []);

  const savePosts = (arr: CommunityPost[]) => {
    setPosts(arr);
    localStorage.setItem('community_posts', JSON.stringify(arr));
  };

  const saveReplies = (map: Record<string, CommunityReply[]>) => {
    setReplies(map);
    localStorage.setItem('community_replies', JSON.stringify(map));
  };

  const approvePost = (id: string) => {
    const updated = posts.map(p => (p.id === id ? ({ ...p, approved: true } as any) : p));
    savePosts(updated);
  };

  const rejectPost = (id: string) => {
    const updated = posts.map(p => (p.id === id ? ({ ...p, approved: false } as any) : p));
    savePosts(updated);
  };

  const approveReply = (postId: string, replyId: string) => {
    const updated = { ...replies };
    updated[postId] = (updated[postId] || []).map(r => (r.id === replyId ? ({ ...r, approved: true } as any) : r));
    saveReplies(updated);
  };

  const removeReply = (postId: string, replyId: string) => {
    const updated = { ...replies };
    updated[postId] = (updated[postId] || []).filter(r => r.id !== replyId);
    saveReplies(updated);
  };

  const pushBanner = () => {
    localStorage.setItem('admin_banner', banner.trim());
    localStorage.setItem('admin_banner_type', bannerType);
    localStorage.setItem('admin_banner_mode', bannerMode);
    localStorage.setItem('admin_banner_version', Date.now().toString());
    setLiveBanner(banner.trim());
    setBanner('');
  };

  const clearBanner = () => {
    localStorage.removeItem('admin_banner');
    setLiveBanner('');
  };

  const pending = posts.filter((p: any) => p.approved === false);
  const approved = posts.filter((p: any) => p.approved !== false);
  const filteredPending = pending.filter(p => p.content.toLowerCase().includes(search.toLowerCase()));
  const filteredApproved = approved.filter(p => p.content.toLowerCase().includes(search.toLowerCase()));

  const toggleSelect = (id: string) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const bulkApprove = () => {
    const ids = Object.keys(selected).filter(k => selected[k]);
    if (ids.length === 0) return;
    const updated = posts.map(p => (ids.includes(p.id) ? ({ ...p, approved: true } as any) : p));
    savePosts(updated);
    setSelected({});
  };

  const bulkReject = () => {
    const ids = Object.keys(selected).filter(k => selected[k]);
    if (ids.length === 0) return;
    const updated = posts.map(p => (ids.includes(p.id) ? ({ ...p, approved: false } as any) : p));
    savePosts(updated);
    setSelected({});
  };

  const setNewPin = () => {
    const newPin = prompt('Enter new admin PIN (digits only)') || '';
    if (!newPin) return;
    localStorage.setItem('admin_pin', newPin);
    alert('PIN updated');
  };

  return (
    <Container>
      <Title>Admin Panel</Title>
      <Row>
        <input style={{ flex: 1 }} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts" />
        <Button onClick={bulkApprove}>Approve Selected</Button>
        <Danger onClick={bulkReject}>Reject Selected</Danger>
        <Button onClick={setNewPin}>Set PIN</Button>
      </Row>

      <Section>
        <h3>Banner/Updates</h3>
        <Row>
          <input style={{ flex: 1 }} value={banner} onChange={e => setBanner(e.target.value)} placeholder="Enter banner/update text" />
          <select value={bannerType} onChange={e => setBannerType(e.target.value)} style={{ padding: 6, borderRadius: 8 }}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <select value={bannerMode} onChange={e => setBannerMode(e.target.value as any)} style={{ padding: 6, borderRadius: 8 }}>
            <option value="sticky">Sticky</option>
            <option value="popup">Popup</option>
          </select>
          <Button onClick={pushBanner}>Publish</Button>
          <Danger onClick={clearBanner}>Clear</Danger>
        </Row>
        {liveBanner && <div style={{ padding: 8, border: '1px solid #ccc', borderRadius: 8 }}>Live: {liveBanner}</div>}
      </Section>

      <Section>
        <h3>Pending Posts</h3>
        {filteredPending.length === 0 ? <div>No pending posts</div> : filteredPending.map(p => (
          <Row key={p.id}>
            <input type="checkbox" checked={!!selected[p.id]} onChange={() => toggleSelect(p.id)} />
            <div style={{ flex: 1 }}>{p.content}</div>
            <Button onClick={() => approvePost(p.id)}>Approve</Button>
            <Danger onClick={() => rejectPost(p.id)}>Reject</Danger>
          </Row>
        ))}
      </Section>

      <Section>
        <h3>Approved Posts</h3>
        {filteredApproved.length === 0 ? <div>No approved posts</div> : filteredApproved.map(p => (
          <div key={p.id} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600 }}>{p.content}</div>
            {(replies[p.id] || []).map(r => (
              <Row key={r.id}>
                <div style={{ flex: 1 }}>{r.content}</div>
                {(r as any).approved ? (
                  <span style={{ color: '#0a0' }}>Approved</span>
                ) : (
                  <Button onClick={() => approveReply(p.id, r.id)}>Approve</Button>
                )}
                <Danger onClick={() => removeReply(p.id, r.id)}>Remove</Danger>
              </Row>
            ))}
          </div>
        ))}
      </Section>
    </Container>
  );
};

export default AdminPanel;