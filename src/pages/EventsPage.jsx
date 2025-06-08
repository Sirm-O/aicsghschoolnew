import React from 'react';
import { Calendar, MapPin, Clock, Users, Phone } from 'lucide-react';
import useCMSContent from '../lib/useCMSContent';

const EventsPage = () => {
  const { content: pageContent, loading: pageLoading } = useCMSContent('/content/pages/events.json');
  const { content: eventsData, loading: eventsLoading } = useCMSContent('/content/events/');

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading events...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mock events data if CMS data isn't available
  const mockEvents = [
    {
      title: "Annual Sports Day",
      date: "2024-12-15T09:00:00",
      location: "School Playground",
      description: "Join us for our annual sports day featuring various competitions and activities for all students.",
      type: "Sports",
      registration: true,
      contact: "Sports Department"
    },
    {
      title: "Science Exhibition",
      date: "2024-12-20T10:00:00",
      location: "Science Laboratory",
      description: "Students will showcase their innovative science projects and experiments.",
      type: "Academic",
      registration: false
    },
    {
      title: "Cultural Program",
      date: "2024-12-25T18:00:00",
      location: "School Auditorium",
      description: "An evening of music, dance, and cultural performances by our talented students.",
      type: "Cultural",
      registration: false
    }
  ];

  const events = eventsData || mockEvents;

  return (
    <div className="section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            {pageContent?.title || "School Events"}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {pageContent?.description || "Discover upcoming events and activities at Sengani Girls School."}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="card group hover:scale-105 transition-all duration-300">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.type === 'Academic' ? 'bg-blue-500/20 text-blue-300' :
                    event.type === 'Cultural' ? 'bg-purple-500/20 text-purple-300' :
                    event.type === 'Sports' ? 'bg-green-500/20 text-green-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {event.type}
                  </span>
                  {event.registration && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs">
                      Registration Required
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {event.title}
                </h3>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm">{formatTime(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm">{event.location}</span>
                </div>
                {event.contact && (
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                    <span className="text-sm">{event.contact}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>

              {event.registration && (
                <button className="btn-primary w-full">
                  Register Now
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Calendar Section */}
        {pageContent?.calendar?.enabled && (
          <div className="mt-16">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Event Calendar
              </h2>
              <div className="text-center text-gray-300">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <p>Interactive calendar view coming soon!</p>
                <p className="text-sm mt-2">For now, view all events in the list above.</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Want to Organize an Event?
            </h2>
            <p className="text-gray-300 mb-6">
              Contact our events team to discuss organizing school events, parent meetings, or special programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <Phone className="w-4 h-4 mr-2" />
                Contact Events Team
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors">
                View Event Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

