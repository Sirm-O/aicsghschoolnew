import React from 'react';
import useCMSContent from '../../lib/useCMSContent';
import { Heart, Users, Award, Smile, Home, Music, Zap } from 'lucide-react';

const StudentLifePage = () => {
  const { content, loading, error } = useCMSContent('/content/pages/student-life.json');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading student life content:', error);
  }

  const studentLifeData = content || {
    title: "Student Life",
    description: "A vibrant and enriching experience beyond academics.",
    holistic: {
      title: "Holistic Development",
      description: "At Sengani Girls School, we believe in nurturing the whole person. Our programs are designed to develop students intellectually, physically, emotionally, and socially."
    },
    sports: {
      title: "Sports & Physical Education",
      description: "We offer a variety of sports and physical activities to promote fitness, teamwork, and discipline.",
      activities: ["Basketball", "Volleyball", "Athletics", "Yoga", "Badminton", "Kho-Kho"]
    },
    clubs: [
      {
        name: "Science Club",
        icon: "Zap",
        description: "Exploring scientific concepts through experiments and projects"
      },
      {
        name: "Literary Club",
        icon: "BookOpen",
        description: "Enhancing language skills through creative writing and debates"
      },
      {
        name: "Arts & Crafts Club",
        icon: "Palette",
        description: "Expressing creativity through various art forms and crafts"
      },
      {
        name: "Music Club",
        icon: "Music",
        description: "Learning and performing classical and contemporary music"
      },
      {
        name: "Social Service Club",
        icon: "Heart",
        description: "Engaging in community service and social awareness activities"
      }
    ],
    boarding: {
      title: "Boarding Life",
      description: "Our boarding facilities provide a safe, supportive, and structured environment for students to live and learn together."
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="h-8 w-8 text-yellow-300" />;
      case 'BookOpen': return <Award className="h-8 w-8 text-yellow-300" />;
      case 'Palette': return <Smile className="h-8 w-8 text-yellow-300" />;
      case 'Music': return <Music className="h-8 w-8 text-yellow-300" />;
      case 'Heart': return <Heart className="h-8 w-8 text-yellow-300" />;
      default: return <Users className="h-8 w-8 text-yellow-300" />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{studentLifeData.title}</h1>
        <p className="text-xl text-gray-200 max-w-2xl">{studentLifeData.description}</p>
      </section>

      {/* Holistic Development */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">{studentLifeData.holistic.title}</h2>
          <p className="text-lg text-gray-200">{studentLifeData.holistic.description}</p>
        </div>
      </section>

      {/* Sports Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">{studentLifeData.sports.title}</h2>
              <p className="text-lg text-gray-200 mb-6">{studentLifeData.sports.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {studentLifeData.sports.activities.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></div>
                    <span className="text-white">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Award size={120} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Clubs & Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentLifeData.clubs.map((club, index) => (
              <div key={index} className="card">
                <div className="mb-4">
                  {getIcon(club.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{club.name}</h3>
                <p className="text-gray-300">{club.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boarding Life */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Home size={120} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">{studentLifeData.boarding.title}</h2>
              <p className="text-lg text-gray-200">{studentLifeData.boarding.description}</p>
              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="card">
                  <h3 className="text-xl font-semibold mb-2 text-white">Comfortable Accommodations</h3>
                  <p className="text-gray-300">Well-furnished dormitories with modern amenities</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold mb-2 text-white">Nutritious Meals</h3>
                  <p className="text-gray-300">Balanced and healthy meals prepared under hygienic conditions</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold mb-2 text-white">Supervised Study Hours</h3>
                  <p className="text-gray-300">Dedicated time for academic work with teacher support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLifePage;

