import React, { useState, useEffect } from 'react';

const useCMSContent = (contentPath) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(contentPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch content from ${contentPath}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching CMS content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentPath]);

  return { content, loading, error };
};

export default useCMSContent;

