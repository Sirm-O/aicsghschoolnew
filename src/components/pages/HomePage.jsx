import React from 'react';
import useCMSContent from '../../lib/useCMSContent';
import { ArrowRight, Star, BookOpen, Users, Award } from 'lucide-react';

const HomePage = () => {
  const { content, loading, error } = useCMSContent('/content/pages/home.json');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading home content:', error);
    // Fallback content if CMS content fails to load
    return (
      <div className="hero-section">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Welcome to Sengani Girls School</h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">Empowering young women through quality education and holistic development</p>
        <a href="/about" className="btn-primary">Learn More</a>
      </div>
    );
  }

  const homeData = content || {
    hero: {
      title: "Welcome to Sengani Girls School",
      subtitle: "Empowering young women through quality education and holistic development",
      cta: "Learn More"
    },
    introduction: {
      title: "Nurturing Excellence",
      description: "Sengani Girls School is dedicated to providing a supportive and enriching environment where young women can develop their academic abilities, character, and leadership skills."
    },
    features: [
      {
        icon: "Star",
        title: "Excellence in Education",
        description: "Our rigorous academic program prepares students for success in higher education and beyond."
      },
      {
        icon: "BookOpen",
        title: "Holistic Development",
        description: "We focus on developing the whole person - intellectually, physically, emotionally, and socially."
      },
      {
        icon: "Users",
        title: "Supportive Community",
        description: "Our close-knit community provides a safe and nurturing environment for students to thrive."
      }
    ],
    testimonials: [
      {
        quote: "Sengani Girls School provided me with the foundation and confidence to pursue my dreams.",
        author: "Priya M., Class of 2020",
        role: "Medical Student"
      },
      {
        quote: "The teachers at Sengani truly care about each student's success and well-being.",
        author: "Lakshmi K., Class of 2018",
        role: "Software Engineer"
      }
    ]
  };

  // Map icon strings to Lucide icon components
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Star': return <Star className="h-8 w-8 text-yellow-300" />;
      case 'BookOpen': return <BookOpen className="h-8 w-8 text-yellow-300" />;
      case 'Users': return <Users className="h-8 w-8 text-yellow-300" />;
      case 'Award': return <Award className="h-8 w-8 text-yellow-300" />;
      default: return <Star className="h-8 w-8 text-yellow-300" />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{homeData.hero.title}</h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">{homeData.hero.subtitle}</p>
        <a href="/about" className="btn-primary">
          {homeData.hero.cta} <ArrowRight className="inline ml-1" size={16} />
        </a>
      </section>

      {/* Introduction Section */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">{homeData.introduction.title}</h2>
          <p className="text-lg text-gray-200">{homeData.introduction.description}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeData.features.map((feature, index) => (
              <div key={index} className="card">
                <div className="mb-4">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeData.testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <p className="text-lg italic mb-4 text-gray-200">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Join Our Community?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Discover how Sengani Girls School can provide your daughter with an exceptional educational experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/contact" className="btn-primary">Contact Us</a>
            <a href="/about" className="btn-primary bg-opacity-50 backdrop-blur-sm">Learn More</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

