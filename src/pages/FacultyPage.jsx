import React, { useState } from 'react';
import { User, Mail, GraduationCap, BookOpen, Award, Phone, MapPin } from 'lucide-react';
import useCMSContent from '../lib/useCMSContent';

const FacultyPage = () => {
  const { content: pageContent, loading: pageLoading } = useCMSContent('/content/pages/faculty.json');
  const { content: facultyData, loading: facultyLoading } = useCMSContent('/content/faculty/');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading faculty information...</p>
        </div>
      </div>
    );
  }

  // Mock faculty data if CMS data isn't available
  const mockFaculty = [
    {
      name: "Dr. Priya Sharma",
      position: "Principal",
      department: "Administration",
      photo: "/images/faculty/principal.jpg",
      qualifications: "Ph.D. in Education, M.Ed., B.Ed.",
      experience: "25 years",
      email: "principal@senganigirlsschool.edu",
      bio: "Dr. Priya Sharma brings over 25 years of educational leadership experience to Sengani Girls School."
    },
    {
      name: "Mrs. Lakshmi Devi",
      position: "Vice Principal",
      department: "Administration",
      qualifications: "M.Ed., B.Ed., M.A. English",
      experience: "20 years",
      email: "vp@senganigirlsschool.edu",
      subjects: ["English", "Literature"]
    },
    {
      name: "Mr. Rajesh Kumar",
      position: "Head of Mathematics Department",
      department: "Mathematics",
      qualifications: "M.Sc. Mathematics, B.Ed.",
      experience: "15 years",
      subjects: ["Mathematics", "Statistics"]
    },
    {
      name: "Dr. Meera Nair",
      position: "Science Teacher",
      department: "Science",
      qualifications: "Ph.D. Chemistry, M.Sc., B.Ed.",
      experience: "12 years",
      subjects: ["Chemistry", "Physics"]
    },
    {
      name: "Mrs. Kavitha Raman",
      position: "Tamil Teacher",
      department: "Tamil",
      qualifications: "M.A. Tamil, B.Ed.",
      experience: "18 years",
      subjects: ["Tamil Literature", "Tamil Grammar"]
    },
    {
      name: "Ms. Anitha Joseph",
      position: "Physical Education Teacher",
      department: "Physical Education",
      qualifications: "M.P.Ed., B.P.Ed.",
      experience: "10 years",
      subjects: ["Physical Education", "Sports Training"]
    }
  ];

  const faculty = facultyData || mockFaculty;
  const departments = ['All', 'Administration', 'Mathematics', 'Science', 'English', 'Tamil', 'Hindi', 'Social Studies', 'Arts', 'Physical Education', 'Library', 'Support Staff'];
  
  const filteredFaculty = selectedDepartment === 'All' 
    ? faculty 
    : faculty.filter(member => member.department === selectedDepartment);

  // Default principal data
  const defaultPrincipal = {
    name: "Dr. Priya Sharma",
    photo: "/images/faculty/principal.jpg",
    message: "Welcome to Sengani Girls School. Our dedicated faculty and staff are committed to providing quality education and nurturing the potential of every student. We believe in creating an environment where young women can grow academically, socially, and personally.",
    qualifications: "Ph.D. in Education, M.Ed., B.Ed."
  };

  const principalData = pageContent?.principal || defaultPrincipal;

  // Default departments
  const defaultDepartments = [
    {
      name: "Mathematics",
      description: "Developing analytical thinking and problem-solving skills through comprehensive mathematical education.",
      hod: "Mr. Rajesh Kumar"
    },
    {
      name: "Science",
      description: "Fostering scientific inquiry and research through hands-on experiments and theoretical knowledge.",
      hod: "Dr. Meera Nair"
    },
    {
      name: "Languages",
      description: "Enhancing communication skills through Tamil, English, and Hindi language instruction.",
      hod: "Mrs. Lakshmi Devi"
    },
    {
      name: "Social Studies",
      description: "Building awareness of society, history, and global citizenship through comprehensive social education.",
      hod: "Mrs. Sunitha Reddy"
    }
  ];

  const departmentData = pageContent?.departments || defaultDepartments;

  return (
    <div className="section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            {pageContent?.title || "Faculty & Staff"}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {pageContent?.description || "Meet our dedicated team of educators and staff members."}
          </p>
        </div>

        {/* Principal's Message */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Principal's Message</h2>
          <div className="card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                {principalData.photo ? (
                  <img 
                    src={principalData.photo} 
                    alt={principalData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
                  />
                ) : (
                  <div className="w-32 h-32 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-yellow-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">{principalData.name}</h3>
                <p className="text-yellow-400 mb-2">Principal</p>
                <p className="text-gray-400 text-sm mb-4">{principalData.qualifications}</p>
                <blockquote className="text-gray-300 italic text-lg leading-relaxed">
                  "{principalData.message}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Department Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Departments</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {departmentData.map((dept, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {dept.name}
                    </h3>
                    {dept.hod && (
                      <p className="text-gray-400 text-sm">Head: {dept.hod}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDepartment === department
                    ? 'bg-yellow-400 text-purple-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {department}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map((member, index) => (
            <div key={index} className="card group hover:scale-105 transition-all duration-300">
              <div className="text-center mb-4">
                {member.photo ? (
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-yellow-400/50"
                  />
                ) : (
                  <div className="w-24 h-24 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-yellow-400" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-yellow-400 text-sm mb-2">{member.position}</p>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                  {member.department}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <GraduationCap className="w-4 h-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Qualifications</p>
                    <p className="text-gray-300 text-sm">{member.qualifications}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="w-4 h-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Experience</p>
                    <p className="text-gray-300 text-sm">{member.experience}</p>
                  </div>
                </div>

                {member.subjects && member.subjects.length > 0 && (
                  <div className="flex items-start">
                    <BookOpen className="w-4 h-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Subjects</p>
                      <p className="text-gray-300 text-sm">{member.subjects.join(', ')}</p>
                    </div>
                  </div>
                )}

                {member.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                )}

                {member.bio && (
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-gray-300 text-sm italic">
                      {member.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Faculty Message */}
        {filteredFaculty.length === 0 && (
          <div className="text-center py-16">
            <div className="card max-w-md mx-auto">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">No Faculty Found</h3>
              <p className="text-gray-300 mb-6">
                No faculty members found in the "{selectedDepartment}" department.
              </p>
              <button 
                onClick={() => setSelectedDepartment('All')}
                className="btn-primary"
              >
                View All Faculty
              </button>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Join Our Team
            </h2>
            <p className="text-gray-300 mb-6">
              We're always looking for passionate educators to join our faculty. If you're interested in making a difference in students' lives, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <Mail className="w-4 h-4 mr-2" />
                Career Opportunities
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors">
                <Phone className="w-4 h-4 mr-2 inline" />
                Contact HR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;

