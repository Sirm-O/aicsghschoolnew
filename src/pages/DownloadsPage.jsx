import React, { useState } from 'react';
import { Download, Search, Filter, FileText, DollarSign, Calendar, BookOpen, Shield, Bell, GraduationCap, Eye, ExternalLink } from 'lucide-react';
import useCMSContent from '../lib/useCMSContent';

const DownloadsPage = () => {
  const { content: pageContent, loading: pageLoading } = useCMSContent('/content/pages/downloads.json');
  const { content: downloadsData, loading: downloadsLoading } = useCMSContent('/content/downloads/');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

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
    return iconMap[category] || Download;
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
      date: "2024-12-05T14:00:00",
      file: "/downloads/newsletter-dec-2024.pdf",
      description: "Monthly newsletter featuring school events, achievements, and upcoming activities.",
      category: "Newsletters",
      academic_year: "2024-25",
      file_size: "1.8 MB"
    },
    {
      title: "Academic Calendar 2024-25",
      date: "2024-11-15T09:00:00",
      file: "/downloads/academic-calendar-2024-25.pdf",
      description: "Complete academic calendar with important dates, holidays, and examination schedules.",
      category: "Academic Calendar",
      academic_year: "2024-25",
      file_size: "1.2 MB"
    },
    {
      title: "Admission Application Form",
      date: "2024-11-20T11:00:00",
      file: "/downloads/admission-form.pdf",
      description: "Application form for new admissions. Please fill completely and submit with required documents.",
      category: "Forms",
      academic_year: "2024-25",
      file_size: "800 KB"
    },
    {
      title: "School Uniform Policy",
      date: "2024-10-10T08:00:00",
      file: "/downloads/uniform-policy.pdf",
      description: "Guidelines for school uniform including specifications, vendors, and compliance requirements.",
      category: "Policies",
      academic_year: "2024-25",
      file_size: "1.1 MB"
    },
    {
      title: "Mid-term Examination Schedule",
      date: "2024-12-08T16:00:00",
      file: "/downloads/midterm-exam-schedule.pdf",
      description: "Detailed schedule for mid-term examinations including dates, timings, and examination centers.",
      category: "Exam Schedules",
      academic_year: "2024-25",
      file_size: "950 KB"
    }
  ];

  const downloads = downloadsData || mockDownloads;
  const categories = ['All', 'Fee Structure', 'Newsletters', 'Academic Calendar', 'Forms', 'Policies', 'Circulars', 'Exam Schedules', 'Other'];
  const academicYears = ['All', '2024-25', '2023-24', '2022-23'];

  // Filter downloads based on search term, category, and academic year
  const filteredDownloads = downloads.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || item.academic_year === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  // Default categories for display
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

        {/* Categories Overview */}
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
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-gray-400 text-sm">{categoryCount} documents</span>
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

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-purple-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Academic Year Filter */}
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400 appearance-none"
                >
                  {academicYears.map(year => (
                    <option key={year} value={year} className="bg-purple-900">
                      {year === 'All' ? 'All Years' : year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Downloads List */}
        <div className="space-y-4">
          {filteredDownloads.map((item, index) => {
            const IconComponent = getIconForCategory(item.category);
            
            return (
              <div key={index} className="card group hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-start flex-1">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {item.title}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.category === 'Fee Structure' ? 'bg-green-500/20 text-green-300' :
                          item.category === 'Newsletters' ? 'bg-blue-500/20 text-blue-300' :
                          item.category === 'Academic Calendar' ? 'bg-purple-500/20 text-purple-300' :
                          item.category === 'Forms' ? 'bg-yellow-500/20 text-yellow-300' :
                          item.category === 'Policies' ? 'bg-red-500/20 text-red-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(item.date)}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {formatFileSize(item.file_size)}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          {item.academic_year}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </button>
                    <a
                      href={item.file}
                      download
                      className="flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredDownloads.length === 0 && (
          <div className="text-center py-16">
            <div className="card max-w-md mx-auto">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">No Documents Found</h3>
              <p className="text-gray-300 mb-6">
                No documents match your current search criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedYear('All');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
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
              If you can't find the document you're looking for or need assistance with downloads, please contact our office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <ExternalLink className="w-4 h-4 mr-2" />
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

