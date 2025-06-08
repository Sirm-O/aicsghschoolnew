import React, { useState } from 'react';
import useCMSContent from '../../lib/useCMSContent';
import { Phone, Mail, MapPin, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';

const ContactPage = () => {
  const { content, loading, error } = useCMSContent('/content/pages/contact.json');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading contact content:', error);
  }

  const contactData = content || {
    title: "Contact Us",
    description: "Get in touch with us for admissions, inquiries, or any other information.",
    contact_info: {
      phone: "+91 98765 43210",
      email: "info@senganigirlsschool.edu",
      address: "Sengani Village, Dharmapuri District, Tamil Nadu 636807"
    },
    office_hours: {
      weekdays: "Monday - Friday: 9:00 AM - 5:00 PM",
      saturday: "Saturday: 9:00 AM - 1:00 PM",
      sunday: "Sunday: Closed"
    },
    directions: "The school is located in Sengani Village, easily accessible by road from Dharmapuri town. Regular bus services are available.",
    faqs: [
      {
        question: "What is the admission process?",
        answer: "Admissions are open from January to March each year. Please contact our office for application forms and detailed information."
      },
      {
        question: "Do you provide boarding facilities?",
        answer: "Yes, we have excellent boarding facilities for students with comfortable accommodations and nutritious meals."
      },
      {
        question: "What are the school timings?",
        answer: "School hours are from 8:00 AM to 3:30 PM on weekdays. Boarding students have supervised study hours in the evening."
      },
      {
        question: "What subjects are offered?",
        answer: "We offer a comprehensive curriculum including Mathematics, Science, Languages, Arts, and various extracurricular activities."
      }
    ]
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{contactData.title}</h1>
        <p className="text-xl text-gray-200 max-w-2xl">{contactData.description}</p>
      </section>

      {/* Contact Information */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <Phone className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Phone</h3>
              <p className="text-gray-300">{contactData.contact_info.phone}</p>
            </div>
            <div className="card text-center">
              <Mail className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
              <p className="text-gray-300">{contactData.contact_info.email}</p>
            </div>
            <div className="card text-center">
              <MapPin className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Address</h3>
              <p className="text-gray-300">{contactData.contact_info.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Office Hours */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Send className="mr-2" size={16} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Hours and Directions */}
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-yellow-300 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Office Hours</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">{contactData.office_hours.weekdays}</p>
                  <p className="text-gray-300">{contactData.office_hours.saturday}</p>
                  <p className="text-gray-300">{contactData.office_hours.sunday}</p>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-yellow-300 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Directions</h3>
                </div>
                <p className="text-gray-300">{contactData.directions}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-black bg-opacity-30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {contactData.faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-yellow-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-300" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

