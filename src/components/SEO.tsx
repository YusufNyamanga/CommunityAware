import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website'
}) => {
  const effectiveTitle = 'Umoja-Aware — AI Community Awareness Assistant for Bahrain';
  return (
    <Helmet>
      <title>{effectiveTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={effectiveTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={effectiveTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Helmet>
  );
};