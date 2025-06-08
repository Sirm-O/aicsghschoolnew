import React, { useState, useEffect } from 'react';
import useCMSContent from '../../lib/useCMSContent';

const GalleryPage = () => {
  const { content: photosContent, loading: photosLoading, error: photosError } = useCMSContent('/content/gallery/photos');
  const { content: videosContent, loading: videosLoading, error: videosError } = useCMSContent('/content/gallery/videos');
  
  const [activeTab, setActiveTab] = useState('photos');
  const [activeCategory, setActiveCategory] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  
  // Process gallery items when content is loaded
  useEffect(() => {
    if (!photosLoading && !videosLoading) {
      const photos = photosContent || [];
      const videos = videosContent || [];
      
      // Combine and sort by date
      const allItems = [...photos, ...videos].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      
      setGalleryItems(allItems);
    }
  }, [photosContent, videosContent, photosLoading, videosLoading]);
  
  // Filter items based on active tab and category
  const filteredItems = galleryItems.filter(item => {
    const isPhoto = 'image' in item;
    const matchesTab = activeTab === 'all' || (activeTab === 'photos' && isPhoto) || (activeTab === 'videos' && !isPhoto);
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesTab && matchesCategory;
  });
  
  // Extract unique categories
  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];
  
  if (photosLoading || videosLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }
  
  if (photosError || videosError) {
    console.error('Error loading gallery content:', photosError || videosError);
    return (
      <div className="section text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Gallery</h1>
        <p className="text-xl text-gray-200">Unable to load gallery content. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div className="section">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Gallery</h1>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm bg-black bg-opacity-30 backdrop-blur-md p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-md ${activeTab === 'photos' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-md ${activeTab === 'videos' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Videos
            </button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-black bg-opacity-30 text-gray-300 hover:bg-opacity-50'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-300 py-12">
            <p>No items found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const isPhoto = 'image' in item;
              
              return (
                <div key={index} className="gallery-item">
                  {isPhoto ? (
                    <div className="relative overflow-hidden rounded-lg aspect-video">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-gray-300 text-sm">{item.category}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <a 
                            href={item.video_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center"
                          >
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                          </a>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-gray-300 text-sm">{item.category}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;

