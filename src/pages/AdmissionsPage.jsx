import React from 'react';
import { FileText, Calendar, CheckCircle, Phone, Users, DollarSign, Clock, MapPin } from 'lucide-react';
import useCMSContent from '../lib/useCMSContent';

const AdmissionsPage = () => {
  const { content: pageContent, loading: pageLoading } = useCMSContent('/content/pages/admissions.json');

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading admissions information...</p>
        </div>
      </div>
    );
  }

  const getIconForStep = (iconName) => {
    const iconMap = {
      'FileText': FileText,
      'Calendar': Calendar,
      'Users': Users,
      'CheckCircle': CheckCircle,
      'Phone': Phone
    };
    return iconMap[iconName] || FileText;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Default content if CMS data isn't available
  const defaultProcess = [
    {
      step: 1,
      title: "Application Form",
      description: "Download and fill the admission application form completely. Ensure all required fields are filled accurately.",
      icon: "FileText"
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Submit the completed application form along with all required documents to the school office.",
      icon: "Calendar"
    },
    {
      step: 3,
      title: "Interview Process",
      description: "Attend the admission interview with the student and parents. This helps us understand the student's needs better.",
      icon: "Users"
    },
    {
      step: 4,
      title: "Admission Confirmation",
      description: "Receive admission confirmation and complete the fee payment process to secure the seat.",
      icon: "CheckCircle"
    }
  ];

  const defaultRequirements = [
    "Birth Certificate (Original and Photocopy)",
    "Previous School Transfer Certificate",
    "Academic Records/Report Cards",
    "Passport Size Photographs (4 copies)",
    "Address Proof (Ration Card/Aadhar Card)",
    "Caste Certificate (if applicable)",
    "Medical Certificate",
    "Parent/Guardian ID Proof"
  ];

  const defaultDates = [
    {
      event: "Admission Form Release",
      date: "2025-01-15T09:00:00",
      description: "Application forms will be available for download and at the school office"
    },
    {
      event: "Last Date for Submission",
      date: "2025-02-28T17:00:00",
      description: "Final deadline for submitting completed application forms"
    },
    {
      event: "Interview Period",
      date: "2025-03-01T09:00:00",
      description: "Admission interviews will be conducted during this period"
    },
    {
      event: "Admission Results",
      date: "2025-03-15T10:00:00",
      description: "Admission results will be announced and communicated to applicants"
    }
  ];

  const process = pageContent?.process || defaultProcess;
  const requirements = pageContent?.requirements || defaultRequirements;
  const importantDates = pageContent?.dates || defaultDates;

  return (
    <div className="section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            {pageContent?.title || "Admissions"}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {pageContent?.description || "Join our community of learners. Learn about our admission process and requirements."}
          </p>
        </div>

        {/* Admission Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Admission Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const IconComponent = getIconForStep(step.icon);
              return (
                <div key={index} className="card text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="w-8 h-8 bg-yellow-400 text-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Required Documents</h2>
          <div className="card max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Important Note</h4>
                  <p className="text-gray-300 text-sm">
                    Please ensure all documents are original with photocopies. Documents in languages other than English or Tamil should be translated and attested.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Important Dates</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {importantDates.map((dateItem, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Calendar className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {dateItem.event}
                    </h3>
                    <div className="flex items-center text-yellow-400 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">{formatDate(dateItem.date)}</span>
                    </div>
                    {dateItem.description && (
                      <p className="text-gray-300 text-sm">
                        {dateItem.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Information */}
        {pageContent?.fees?.show_fees && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Fee Information</h2>
            <div className="card max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-gray-300 mb-6">
                {pageContent.fees.note}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Download Fee Structure
                </button>
                <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors">
                  Contact for Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Admission Enquiries</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Contact Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 text-yellow-400 mr-3" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FileText className="w-5 h-5 text-yellow-400 mr-3" />
                  <span>admissions@senganigirlsschool.edu</span>
                </div>
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-5 h-5 text-yellow-400 mr-3 mt-1" />
                  <span>Sengani Village, Dharmapuri District, Tamil Nadu 636807</span>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <strong>Note:</strong> During admission season, extended hours may be available. Please call ahead to confirm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Apply?
            </h2>
            <p className="text-gray-300 mb-6">
              Take the first step towards your child's bright future at Sengani Girls School.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Download Application Form
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors">
                Schedule School Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;

