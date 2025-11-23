import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, Clock, MapPin, Loader } from 'lucide-react';

const NewsContainer = styled.div`
  width: 100%;
  margin: 0;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CountryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const CountryButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primary};
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.primaryLight};
    color: white;
  }
`;

const NewsCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.primaryLight};
  }
`;

const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const NewsTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NewsDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0 0 12px 0;
`;

const ReadMoreLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  align-items: stretch;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: ${props => props.theme.colors.error};
  background: ${props => props.theme.colors.error}10;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const CachedDataNotice = styled.div`
  background: ${props => props.theme.colors.warning}20;
  color: ${props => props.theme.colors.warning};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RefreshButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  country: string;
  source: string;
}

const COUNTRIES = [
  'Kenya',
  'Tanzania', 
  'Uganda',
  'Nigeria',
  'Ethiopia',
  'Cameroon',
  'Ghana',
  'South Africa',
  'Egypt',
  'Morocco',
  'Bahrain'
];

const NEWS_SOURCES = [
  {
    name: 'Africanews',
    rssUrl: 'https://www.africanews.com/feed/rss',
    baseUrl: 'https://www.africanews.com'
  },
  {
    name: 'Africa.com',
    rssUrl: 'https://africa.com/feed',
    baseUrl: 'https://africa.com'
  },
  {
    name: 'Bahrain News Agency',
    rssUrl: 'https://www.bna.bh/en/rss.xml',
    baseUrl: 'https://www.bna.bh'
  }
  ,
  {
    name: 'Gulf Daily News (GDN)',
    rssUrl: 'https://news.google.com/rss/search?q=site:gdnonline.com+Bahrain&hl=en&gl=BH&ceid=BH:en',
    baseUrl: 'https://www.gdnonline.com'
  }
  ,
  {
    name: 'Khaleej Times (Bahrain)',
    rssUrl: 'https://news.google.com/rss/search?q=site:khaleejtimes.com+Bahrain&hl=en&gl=BH&ceid=BH:en',
    baseUrl: 'https://www.khaleejtimes.com/tag/bahrain'
  }
  ,
  {
    name: 'Gulf Insider (Bahrain)',
    rssUrl: 'https://www.gulf-insider.com/category/bahrain/feed/',
    baseUrl: 'https://www.gulf-insider.com/category/bahrain/'
  }
];

export const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('Bahrain');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isUsingCachedData, setIsUsingCachedData] = useState(false);
  const { currentLanguage } = useLanguage();
  const fetchControllerRef = useRef<AbortController | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [coldDone, setColdDone] = useState(false);

  const RECENT_MS = 24 * 60 * 60 * 1000;
  const isRecent = (dateString: string): boolean => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return false;
    return (Date.now() - d.getTime()) <= RECENT_MS;
  };

  const fetchWithTimeout = async (input: RequestInfo, init: RequestInit & { timeout?: number } = {}) => {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), init.timeout ?? 6000);
    try {
      const res = await fetch(input, { ...init, signal: init.signal || controller.signal });
      clearTimeout(t);
      return res;
    } catch (e) {
      clearTimeout(t);
      throw e;
    }
  };

  const parseRSSFeed = async (rssUrl: string, sourceName: string, signal?: AbortSignal): Promise<NewsItem[]> => {
    const normalize = (items: any[]): NewsItem[] => {
      return items.map((item: any) => {
        const text = (item.title || '') + ' ' + (item.description || item.content || '');
        const lowerSource = sourceName.toLowerCase();
        const countryMatch = COUNTRIES.find(country => text.toLowerCase().includes(country.toLowerCase()));
        const isBahrainSource = lowerSource.includes('bahrain')
          || lowerSource.includes('lmra')
          || lowerSource.includes('npra')
          || lowerSource.includes('ministry of interior')
          || lowerSource.includes('moi')
          || lowerSource.includes('ministry of labour')
          || lowerSource.includes('labour ministry');
        const country = countryMatch || (isBahrainSource ? 'Bahrain' : 'General');
        const mapped: NewsItem = {
          title: item.title || 'No title',
          description: item.description || item.content || 'No description',
          link: item.link || item.url || '#',
          pubDate: item.pubDate || item.date_published || item.pubDateText || new Date().toISOString(),
          country,
          source: sourceName
        };
        return mapped;
      })
      .filter((n: NewsItem) => (n.country !== 'General' || selectedCountry === 'All'))
      .filter((n: NewsItem) => isRecent(n.pubDate));
    };

    try {
      const p1 = (async () => {
        const r = await fetchWithTimeout(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, { timeout: 6000, signal });
        const d = await r.json();
        if (d?.status === 'ok' && Array.isArray(d.items)) return normalize(d.items);
        return [];
      })();
      const p2 = (async () => {
        const r = await fetchWithTimeout(`https://feed2json.org/convert?url=${encodeURIComponent(rssUrl)}`, { timeout: 6000, signal });
        const d = await r.json();
        if (Array.isArray(d?.items)) return normalize(d.items.map((x: any) => ({ title: x?.title, description: x?.content_html || x?.summary || '', link: x?.url, pubDate: x?.date_published })));
        return [];
      })();
      const first = await Promise.race([p1, p2]);
      if (first && first.length) return first;
    } catch {}
    try {
      const r3 = await fetchWithTimeout(`https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`, { timeout: 6000, signal });
      const xml = await r3.text();
      const parser = new window.DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const items = Array.from(doc.querySelectorAll('item'))
        .slice(0, 30)
        .map(it => ({
          title: it.querySelector('title')?.textContent || '',
          description: it.querySelector('description')?.textContent || '',
          link: it.querySelector('link')?.textContent || '',
          pubDate: it.querySelector('pubDate')?.textContent || ''
        }));
      if (items.length) return normalize(items);
    } catch {}
    return [];
  };

  // Load cached news from localStorage
  const loadCachedNews = (countryKey: string): { news: NewsItem[], lastUpdate: Date | null } => {
    try {
      const cached = localStorage.getItem(`news-cache:${countryKey}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          news: parsed.news || [],
          lastUpdate: parsed.lastUpdate ? new Date(parsed.lastUpdate) : null
        };
      }
    } catch (error) {
      console.error('Error loading cached news:', error);
    }
    return { news: [], lastUpdate: null };
  };

  // Save news to localStorage
  const saveNewsToCache = (countryKey: string, news: NewsItem[], lastUpdate: Date) => {
    try {
      const cacheData = {
        news,
        lastUpdate: lastUpdate.toISOString()
      };
      localStorage.setItem(`news-cache:${countryKey}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving news to cache:', error);
    }
  };

  const fetchNews = async () => {
    setRefreshing(true);
    setLoading(true);
    setError(null);
    setIsUsingCachedData(false);
    
    const prev = fetchControllerRef.current;
    if (prev) { try { prev.abort(); } catch {} }
    const controller = new AbortController();
    fetchControllerRef.current = controller;
    
    try {
      const allNews: NewsItem[] = [];
      try {
        const w: any = typeof window !== 'undefined' ? window.location : { protocol: 'http:', hostname: 'localhost', port: '5000' };
        const defaultDev = `${w.protocol}//${w.hostname}:5000`;
        const defaultProd = `${w.protocol}//${w.hostname}`;
        const devPorts = new Set(['3000','3001','3002','3003']);
        const baseURL = (process.env.REACT_APP_BACKEND_URL || (devPorts.has(w.port) ? defaultDev : defaultProd));
        const targetCountry = selectedCountry === 'All' ? 'Bahrain' : selectedCountry;
        const r0 = await fetch(`${baseURL}/api/news/${encodeURIComponent(targetCountry.toLowerCase())}?lang=${encodeURIComponent(currentLanguage || 'en')}`, { signal: controller.signal });
        const d0 = await r0.json();
        if (d0 && d0.items && Array.isArray(d0.items)) {
          const mapped0: NewsItem[] = d0.items.map((it: any) => ({
            title: it.title || 'No title',
            description: it.description || 'No description',
            link: it.link || '#',
            pubDate: it.pubDate || new Date().toISOString(),
            country: targetCountry,
            source: it.source || `${targetCountry} Aggregator`
          }));
          allNews.push(...mapped0);
        }
      } catch {}
      
      const results = await Promise.allSettled(NEWS_SOURCES.map(source => parseRSSFeed(source.rssUrl, source.name, controller.signal)));
      results.forEach(r => {
        if (r.status === 'fulfilled' && Array.isArray(r.value)) allNews.push(...r.value);
      });
      // Filter to recent (<= 24h)
      const recentNews = allNews.filter(n => isRecent(n.pubDate));
      const seen = new Set<string>();
      const deduped = recentNews.filter(n => {
        const key = (n.link || '') + '|' + (n.title || '');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      // Sort by publication date (newest first)
      const sortedNews = deduped
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 20); // Limit to 20 articles
      
      setNews(sortedNews);
      const currentTime = new Date();
      setLastUpdate(currentTime);
      saveNewsToCache((selectedCountry === 'All' ? 'Bahrain' : selectedCountry).toLowerCase(), sortedNews, currentTime);
    } catch (error) {
      console.error('Error fetching news:', error);
      
      // Try to load cached recent data
      const cached = loadCachedNews((selectedCountry === 'All' ? 'Bahrain' : selectedCountry).toLowerCase());
      const cachedRecent = cached.news.filter(n => isRecent(n.pubDate));
      if (cachedRecent.length > 0 && cached.lastUpdate && (Date.now() - cached.lastUpdate.getTime()) <= RECENT_MS) {
        setNews(cachedRecent);
        setLastUpdate(cached.lastUpdate);
        setError('Failed to fetch latest news. Showing cached recent data from ' + cached.lastUpdate.toLocaleString());
        setIsUsingCachedData(true);
      } else {
        setError(null);
        setNews([]);
        setLastUpdate(null);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setColdDone(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const countryKey = (selectedCountry === 'All' ? 'Bahrain' : selectedCountry).toLowerCase();
    const cached = loadCachedNews(countryKey);
    if (cached.news.length > 0 && cached.lastUpdate) {
      setNews(cached.news);
      setLastUpdate(cached.lastUpdate);
      setIsUsingCachedData(true);
    }
    fetchNews();
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => {
      clearInterval(interval);
      const c = fetchControllerRef.current;
      if (c) { try { c.abort(); } catch {} }
    };
  }, [selectedCountry]);

  const filteredNews = selectedCountry === 'All' 
    ? news 
    : news.filter(item => item.country === selectedCountry);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  if (loading || initialLoad) {
    return (
      <NewsContainer>
        <Title>📰 News</Title>
        <LoadingMessage><Loader size={20} style={{ marginRight: 8 }} /> Loading news...</LoadingMessage>
      </NewsContainer>
    );
  }

  return (
    <NewsContainer>
      <Title>📰 News</Title>
      <RefreshButton onClick={fetchNews}>
        🔄 Refresh News
      </RefreshButton>
      {!loading && refreshing && (
        <LoadingMessage><Loader size={16} style={{ marginRight: 8 }} /> Fetching latest…</LoadingMessage>
      )}
      {lastUpdate && (
        <NewsMeta style={{ marginBottom: '16px' }}>
          <MetaItem>
            <Clock size={12} />
            Last updated: {formatDate(lastUpdate.toISOString())}
          </MetaItem>
        </NewsMeta>
      )}
      
      

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {isUsingCachedData && !loading && (
        <CachedDataNotice>
          ⚠️ Showing cached data from {lastUpdate?.toLocaleString()}
        </CachedDataNotice>
      )}

      {filteredNews.length === 0 ? (
        (initialLoad || loading || refreshing || !coldDone || !lastUpdate) ? (
          <LoadingMessage><Loader size={20} style={{ marginRight: 8 }} /> Loading news…</LoadingMessage>
        ) : (
          <EmptyMessage>
            No recent news (last 24h) for {selectedCountry === 'All' ? 'selected region' : selectedCountry}
          </EmptyMessage>
        )
      ) : (
        <NewsGrid>
          {filteredNews.map((item, index) => (
            <NewsCard key={index}>
              <NewsHeader>
                <NewsTitle>{item.title}</NewsTitle>
              </NewsHeader>
              
              <NewsMeta>
                <MetaItem>
                  <MapPin size={12} />
                  {item.country}
                </MetaItem>
                <MetaItem>
                  <Clock size={12} />
                  {formatDate(item.pubDate)}
                </MetaItem>
                <MetaItem>
                  Source: {item.source}
                </MetaItem>
              </NewsMeta>
              
              <NewsDescription>
                {(() => {
                  const raw = item.description || '';
                  const cleaned = raw.replace(/<[^>]*>/g, '');
                  const text = cleaned.replace(/\s+/g, ' ').trim();
                  return text.length > 150 ? (text.substring(0, 150) + '...') : text;
                })()}
              </NewsDescription>
              
              <ReadMoreLink href={item.link} target="_blank" rel="noopener noreferrer">
                Read more <ExternalLink size={12} />
              </ReadMoreLink>
            </NewsCard>
          ))}
        </NewsGrid>
      )}
    </NewsContainer>
  );
};
