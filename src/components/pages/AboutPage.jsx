import React from 'react';
import useCMSContent from '../../lib/useCMSContent';
import { GraduationCap, Users, Award, BookOpen } from 'lucide-react';

const AboutPage = () => {
  const { content, loading, error } = useCMSContent('/content/pages/about.json');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading about content:', error);
  }

  const aboutData = content || {
    title: "About Sengani Girls School",
    description: "Empowering young women through quality education and holistic development since 1985.",
    history: {
      title: "Our History",
      content: "Sengani Girls School was established in 1985 with a vision to provide quality education to girls in rural Tamil Nadu. Over the years, we have grown from a small institution to a recognized center of excellence."
    },
    mission: {
      title: "Our Mission",
      content: "To provide a nurturing environment where young women can develop their academic abilities, character, and leadership skills to become confident, compassionate, and capable individuals."
    },
    vision: {
      title: "Our Vision",
      content: "To be a leading educational institution that empowers young women to excel academically, contribute meaningfully to society, and lead with integrity and purpose."
    },
    values: [
      {
        title: "Excellence",
        description: "We strive for the highest standards in all aspects of education and personal development."
      },
      {
        title: "Integrity",
        description: "We uphold honesty, transparency, and ethical behavior in all our interactions."
      },
      {
        title: "Empowerment",
        description: "We believe in empowering our students to reach their full potential and make a positive impact."
      },
      {
        title: "Community",
        description: "We foster a supportive and inclusive community where everyone feels valued and respected."
      }
    ]
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{aboutData.title}</h1>
        <p className="text-xl text-gray-200 max-w-2xl">{aboutData.description}</p>
      </section>

      {/* History Section */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">{aboutData.history.title}</h2>
              <p className="text-lg text-gray-200">{aboutData.history.content}</p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <GraduationCap size={120} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div className="mb-4">
                <BookOpen className="h-12 w-12 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{aboutData.mission.title}</h3>
              <p className="text-gray-200">{aboutData.mission.content}</p>
            </div>
            <div className="card">
              <div className="mb-4">
                <Award className="h-12 w-12 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{aboutData.vision.title}</h3>
              <p className="text-gray-200">{aboutData.vision.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value, index) => (
              <div key={index} className="card text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="card">
              <div className="text-4xl font-bold text-yellow-300 mb-2">40+</div>
              <div className="text-white">Years of Excellence</div>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-white">Students</div>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-yellow-300 mb-2">50+</div>
              <div className="text-white">Faculty Members</div>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-yellow-300 mb-2">95%</div>
              <div className="text-white">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

