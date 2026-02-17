import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Clock, 
  Shield, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  User,
  Stethoscope,
  Activity,
  Award,
  ChevronRight
} from 'lucide-react';

const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: Heart,
      title: "General Dentistry",
      description: "Comprehensive dental check-ups, cleanings, and preventive care for optimal oral health.",
      features: ["Regular Check-ups", "Professional Cleaning", "Oral Cancer Screening"]
    },
    {
      icon: Stethoscope,
      title: "Specialized Treatments",
      description: "Advanced dental procedures including root canals, crowns, and restorative treatments.",
      features: ["Root Canal Therapy", "Dental Crowns", "Fillings & Restorations"]
    },
    {
      icon: Activity,
      title: "Orthodontics",
      description: "Straighten your smile with our modern orthodontic solutions for all ages.",
      features: ["Braces", "Clear Aligners", "Retainers"]
    },
    {
      icon: Award,
      title: "Cosmetic Dentistry",
      description: "Enhance your smile with our cosmetic dental procedures and aesthetic treatments.",
      features: ["Teeth Whitening", "Veneers", "Smile Makeovers"]
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Easy Online Booking",
      description: "Schedule appointments 24/7 with our intuitive online booking system.",
      forPatients: true,
      forAdmin: false
    },
    {
      icon: Clock,
      title: "Real-time Scheduling",
      description: "Manage appointments efficiently with automated reminders and calendar sync.",
      forPatients: false,
      forAdmin: true
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records with treatment history and follow-up tracking.",
      forPatients: false,
      forAdmin: true
    },
    {
      icon: Shield,
      title: "Secure Health Records",
      description: "Your dental health information is protected with industry-leading security.",
      forPatients: true,
      forAdmin: true
    },
    {
      icon: Phone,
      title: "Direct Communication",
      description: "Stay connected with your dental care team through secure messaging.",
      forPatients: true,
      forAdmin: true
    },
    {
      icon: Star,
      title: "Treatment Tracking",
      description: "Monitor your treatment progress and upcoming procedures at a glance.",
      forPatients: true,
      forAdmin: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">Pasco Dental Clinic</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-indigo-600 transition-colors">Services</a>
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
              <div className="flex items-center space-x-4">
                <Link
                  to="/login?user=patient"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Patient Login
                </Link>
                <Link
                  to="/login?user=admin"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Admin Portal
                </Link>
              </div>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Services</a>
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Contact</a>
              <Link
                to="/login?user=patient"
                className="block px-3 py-2 text-indigo-600 font-medium"
              >
                Patient Login
              </Link>
              <Link
                to="/login?user=admin"
                className="block px-3 py-2 bg-indigo-600 text-white rounded-lg mx-3 text-center"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Smile is Our
                <span className="text-indigo-600"> Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience modern dental care with our comprehensive management system. 
                Book appointments, track treatments, and manage your dental health seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login?user=patient"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <User className="mr-2" size={20} />
                  Patient Portal
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/login?user=admin"
                  className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
                >
                  <Stethoscope className="mr-2" size={20} />
                  Admin Access
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-8">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-gray-700">Expert Dentists</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-gray-700">Modern Technology</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-gray-700">Patient-Centered Care</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <Users className="text-indigo-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Happy Patients</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <Calendar className="text-green-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-gray-900">10+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <Award className="text-blue-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Online Booking</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <Heart className="text-purple-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Dental Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive dental care solutions using the latest technology and techniques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 rounded-lg p-3 inline-block mb-4">
                  <service.icon className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <ChevronRight className="text-indigo-600 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed for both patients and healthcare providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 rounded-lg p-2 mr-4">
                      <feature.icon className="text-indigo-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                      <div className="flex gap-2">
                        {feature.forPatients && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Patient
                          </span>
                        )}
                        {feature.forAdmin && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Ready to start your journey to better dental health? Contact us today!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-indigo-600 mr-4" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">(555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-indigo-600 mr-4" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">info@pascodental.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-indigo-600 mr-4" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-600">123 Medical Center Drive<br />Pasco, FL 33525</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="text-indigo-600 mr-4" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Hours</div>
                    <div className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Link
                  to="/login?user=patient"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="mr-2" size={20} />
                  Book Appointment Online
                </Link>
                <Link
                  to="/register"
                  className="w-full bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
                >
                  <User className="mr-2" size={20} />
                  New Patient Registration
                </Link>
                <a
                  href="tel:+15551234567"
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Phone className="mr-2" size={20} />
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-indigo-400" />
                <span className="text-xl font-bold">Pasco Dental Clinic</span>
              </div>
              <p className="text-gray-400">
                Providing exceptional dental care with modern technology and compassionate service.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Patient Portal</h4>
              <ul className="space-y-2">
                <li><Link to="/login?user=patient" className="text-gray-400 hover:text-white transition-colors">Patient Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">New Registration</Link></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Book Appointment</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Admin Access</h4>
              <ul className="space-y-2">
                <li><Link to="/login?user=admin" className="text-gray-400 hover:text-white transition-colors">Admin Login</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/users" className="text-gray-400 hover:text-white transition-colors">Patient Management</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Pasco Dental Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
