import React, { useState } from 'react';
import { Calendar, User, Tag, ChevronRight, Clock, Eye } from 'lucide-react';
import useCMSContent from '../lib/useCMSContent';

const NewsPage = () => {
  const { content: pageContent, loading: pageLoading } = useCMSContent('/content/pages/news.json');
  const { content: newsData, loading: newsLoading } = useCMSContent('/content/news/');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading news...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock news data if CMS data isn't available
  const mockNews = [
    {
      title: "Annual Day Celebration 2024",
      date: "2024-12-10T10:00:00",
      author: "Sengani Girls School",
      summary: "Our annual day celebration was a grand success with outstanding performances by students.",
      body: "The annual day celebration showcased the talents of our students through various cultural programs, academic achievements, and sports accomplishments. Parents and guests were delighted by the performances.",
      category: "Events",
      featured: true,
      image: "/images/uploads/annual-day.jpg"
    },
    {
      title: "Science Fair Winners Announced",
      date: "2024-12-08T14:00:00",
      author: "Science Department",
      summary: "Congratulations to all participants and winners of our inter-house science fair.",
      body: "The science fair demonstrated innovative projects by students across all grades. The winning projects will represent our school at the district level competition.",
      category: "Academic Updates",
      featured: false
    },
    {
      title: "New Library Books Added",
      date: "2024-12-05T09:00:00",
      author: "Library Department",
      summary: "Over 200 new books have been added to our school library collection.",
      body: "The library has been enriched with new fiction, non-fiction, and reference books to support student learning and reading habits.",
      category: "School News",
      featured: false
    }
  ];

  const news = newsData || mockNews;
  const categories = ['All', 'School News', 'Academic Updates', 'Events', 'Achievements', 'Announcements'];
  
  const filteredNews = selectedCategory === 'All' 
    ? news 
    : news.filter(article => article.category === selectedCategory);

  const featuredNews = news.filter(article => article.featured);

  return (
    <div className="section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            {pageContent?.title || "Latest News"}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {pageContent?.description || "Stay updated with the latest news and announcements from Sengani Girls School."}
          </p>
        </div>

        {/* Featured News */}
        {pageContent?.featured?.enabled && featuredNews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {pageContent.featured.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredNews.slice(0, 2).map((article, index) => (
                <div key={index} className="card group hover:scale-105 transition-all duration-300">
                  {article.image && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(article.date)}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <button className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-purple-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article, index) => (
            <div key={index} className="card group hover:scale-105 transition-all duration-300">
              {article.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  article.category === 'School News' ? 'bg-blue-500/20 text-blue-300' :
                  article.category === 'Academic Updates' ? 'bg-green-500/20 text-green-300' :
                  article.category === 'Events' ? 'bg-purple-500/20 text-purple-300' :
                  article.category === 'Achievements' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  <Tag className="w-3 h-3 mr-1 inline" />
                  {article.category}
                </span>
                {article.featured && (
                  <span className="text-yellow-400 text-xs">★ Featured</span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                {article.title}
              </h3>

              <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(article.date)}
                </div>
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {article.author}
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {article.summary}
              </p>

              <button className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors text-sm">
                <Eye className="w-4 h-4 mr-1" />
                Read Full Article
              </button>
            </div>
          ))}
        </div>

        {/* No News Message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="card max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">No News Found</h3>
              <p className="text-gray-300 mb-6">
                No news articles found in the "{selectedCategory}" category.
              </p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="btn-primary"
              >
                View All News
              </button>
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

