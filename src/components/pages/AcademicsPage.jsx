import React from 'react';
import useCMSContent from '../../lib/useCMSContent';
import { BookOpen, Calculator, Microscope, Globe, Palette, Music } from 'lucide-react';

const AcademicsPage = () => {
  const { content, loading, error } = useCMSContent('/content/pages/academics.json');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading academics content:', error);
  }

  const academicsData = content || {
    title: "Academics",
    description: "Comprehensive education programs designed to nurture academic excellence and critical thinking.",
    curriculum: {
      title: "Our Curriculum",
      description: "Our curriculum is designed to provide a well-rounded education that prepares students for higher education and future careers."
    },
    subjects: [
      {
        name: "Mathematics",
        icon: "Calculator",
        description: "Advanced mathematical concepts and problem-solving skills"
      },
      {
        name: "Science",
        icon: "Microscope",
        description: "Physics, Chemistry, and Biology with hands-on laboratory experience"
      },
      {
        name: "Languages",
        icon: "Globe",
        description: "Tamil, English, and Hindi language proficiency"
      },
      {
        name: "Arts",
        icon: "Palette",
        description: "Visual arts, crafts, and creative expression"
      },
      {
        name: "Music",
        icon: "Music",
        description: "Classical and contemporary music education"
      },
      {
        name: "Literature",
        icon: "BookOpen",
        description: "Literary analysis and creative writing skills"
      }
    ],
    achievements: [
      "State-level Science Fair Winners",
      "District Mathematics Olympiad Champions",
      "Regional Debate Competition Winners",
      "100% Pass Rate in Board Examinations"
    ]
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="h-8 w-8 text-yellow-300" />;
      case 'Microscope': return <Microscope className="h-8 w-8 text-yellow-300" />;
      case 'Globe': return <Globe className="h-8 w-8 text-yellow-300" />;
      case 'Palette': return <Palette className="h-8 w-8 text-yellow-300" />;
      case 'Music': return <Music className="h-8 w-8 text-yellow-300" />;
      case 'BookOpen': return <BookOpen className="h-8 w-8 text-yellow-300" />;
      default: return <BookOpen className="h-8 w-8 text-yellow-300" />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{academicsData.title}</h1>
        <p className="text-xl text-gray-200 max-w-2xl">{academicsData.description}</p>
      </section>

      {/* Curriculum Overview */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">{academicsData.curriculum.title}</h2>
          <p className="text-lg text-gray-200">{academicsData.curriculum.description}</p>
        </div>
      </section>

      {/* Subjects */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Subject Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicsData.subjects.map((subject, index) => (
              <div key={index} className="card">
                <div className="mb-4">
                  {getIcon(subject.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{subject.name}</h3>
                <p className="text-gray-300">{subject.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Achievements */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Academic Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicsData.achievements.map((achievement, index) => (
              <div key={index} className="card flex items-center">
                <div className="w-3 h-3 bg-yellow-300 rounded-full mr-4"></div>
                <p className="text-white font-medium">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Academic Calendar</h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-300">First Term</h3>
                <p className="text-gray-300">June - September</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-300">Second Term</h3>
                <p className="text-gray-300">October - December</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-300">Third Term</h3>
                <p className="text-gray-300">January - March</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;

