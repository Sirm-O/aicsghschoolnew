import React, { useState } from 'react';
import { FileText, Download, Calendar, Search, Filter, DollarSign, BookOpen, Shield, Bell, GraduationCap, Eye } from 'lucide-react';
import useCMSContent from '../../lib/useCMSContent';

const DownloadsPage = () => {
  const { content: pageContent, loading: pageLoading } = useCMSContent('/content/pages/downloads.json');
  const { content: downloadsData, loading: downloadsLoading } = useCMSContent('/content/downloads/');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading downloads...</p>
        </div>
      </div>
    );
  }

  const getIconForCategory = (category) => {
    const iconMap = {
      'Fee Structure': DollarSign,
      'Newsletters': Bell,
      'Academic Calendar': Calendar,
      'Forms': FileText,
      'Policies': Shield,
      'Circulars': Bell,
      'Exam Schedules': GraduationCap,
      'Other': Download
    };
    return iconMap[category] || FileText;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (size) => {
    if (!size) return 'Unknown size';
    return size;
  };

  // Mock downloads data if CMS data isn't available
  const mockDownloads = [
    {
      title: "Fee Structure 2024-25",
      date: "2024-12-01T10:00:00",
      file: "/downloads/fee-structure-2024-25.pdf",
      description: "Complete fee structure for the academic year 2024-25 including all charges and payment schedules.",
      category: "Fee Structure",
      academic_year: "2024-25",
      file_size: "2.5 MB"
    },
    {
      title: "School Newsletter - December 2024",
      date: "2024-12-01T09:00:00",
      file: "/downloads/newsletter-dec-2024.pdf",
      description: "Monthly newsletter featuring school events, achievements, and upcoming activities.",
      category: "Newsletters",
      academic_year: "2024-25",
      file_size: "1.8 MB"
    },
    {
      title: "Academic Calendar 2024-25",
      date: "2024-11-15T10:00:00",
      file: "/downloads/academic-calendar-2024-25.pdf",
      description: "Complete academic calendar with important dates, holidays, and examination schedules.",
      category: "Academic Calendar",
      academic_year: "2024-25",
      file_size: "1.2 MB"
    },
    {
      title: "Admission Form 2025-26",
      date: "2024-11-10T10:00:00",
      file: "/downloads/admission-form-2025-26.pdf",
      description: "Application form for new admissions for the academic year 2025-26.",
      category: "Forms",
      academic_year: "2025-26",
      file_size: "800 KB"
    },
    {
      title: "School Transport Policy",
      date: "2024-10-20T10:00:00",
      file: "/downloads/transport-policy.pdf",
      description: "Guidelines and policies for school transportation services.",
      category: "Policies",
      academic_year: "2024-25",
      file_size: "1.1 MB"
    },
    {
      title: "Term 1 Examination Schedule",
      date: "2024-10-15T10:00:00",
      file: "/downloads/term1-exam-schedule.pdf",
      description: "Detailed examination schedule for Term 1 examinations.",
      category: "Exam Schedules",
      academic_year: "2024-25",
      file_size: "600 KB"
    }
  ];

  const downloads = downloadsData || mockDownloads;
  const categories = ['All', 'Fee Structure', 'Newsletters', 'Academic Calendar', 'Forms', 'Policies', 'Circulars', 'Exam Schedules', 'Other'];
  
  const filteredDownloads = downloads.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const defaultCategories = [
    {
      name: "Fee Structure",
      description: "Annual fee structure, payment schedules, and financial information",
      icon: "DollarSign"
    },
    {
      name: "Newsletters",
      description: "Monthly newsletters with school updates and achievements",
      icon: "Bell"
    },
    {
      name: "Academic Calendar",
      description: "Important academic dates, holidays, and examination schedules",
      icon: "Calendar"
    },
    {
      name: "Forms",
      description: "Application forms, permission slips, and other required documents",
      icon: "FileText"
    },
    {
      name: "Policies",
      description: "School policies, guidelines, and procedural documents",
      icon: "Shield"
    },
    {
      name: "Exam Schedules",
      description: "Examination timetables and assessment information",
      icon: "GraduationCap"
    }
  ];

  const categoryData = pageContent?.categories || defaultCategories;

  return (
    <div className="section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            {pageContent?.title || "Downloads"}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {pageContent?.description || "Access important documents, forms, and resources for students and parents."}
          </p>
        </div>

        {/* Instructions */}
        {pageContent?.instructions?.show && (
          <div className="mb-8">
            <div className="card max-w-4xl mx-auto">
              <div className="flex items-start">
                <Download className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Download Instructions</h3>
                  <p className="text-gray-300">
                    {pageContent.instructions.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-purple-900">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Document Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.map((category, index) => {
              const IconComponent = getIconForCategory(category.name);
              const categoryCount = downloads.filter(item => item.category === category.name).length;
              
              return (
                <div 
                  key={index} 
                  className="card group hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-400">{categoryCount} documents</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Downloads List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === 'All' ? 'All Documents' : selectedCategory}
            </h2>
            <span className="text-gray-400">
              {filteredDownloads.length} document{filteredDownloads.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-4">
            {filteredDownloads.map((item, index) => {
              const IconComponent = getIconForCategory(item.category);
              
              return (
                <div key={index} className="card group hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(item.date)}
                          </div>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                            {item.category}
                          </span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">
                            {item.academic_year}
                          </span>
                          <span className="text-gray-400">
                            {formatFileSize(item.file_size)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button className="btn-primary flex items-center text-sm px-4 py-2">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                      <button className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors text-sm flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* No Downloads Message */}
        {filteredDownloads.length === 0 && (
          <div className="text-center py-16">
            <div className="card max-w-md mx-auto">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">No Documents Found</h3>
              <p className="text-gray-300 mb-6">
                {searchTerm 
                  ? `No documents found matching "${searchTerm}" in ${selectedCategory === 'All' ? 'any category' : selectedCategory}.`
                  : `No documents found in the "${selectedCategory}" category.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="btn-primary"
                  >
                    Clear Search
                  </button>
                )}
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors"
                >
                  View All Documents
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need Help?
            </h2>
            <p className="text-gray-300 mb-6">
              If you're having trouble downloading any document or need a specific form that's not listed here, please contact our office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Office
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors">
                Request Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;

