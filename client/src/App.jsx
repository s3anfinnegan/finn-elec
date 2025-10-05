import React, { useState } from 'react';
import { Phone, Mail, MapPin, Star, Zap, Battery, Car, Home, Award, CheckCircle, Users, Calendar, ArrowRight, Menu, X } from 'lucide-react';

// Logo Component (SVG)
const VoltSafeLogo = ({ className = "h-8 w-auto" }) => (
  <svg className={className} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="25" fill="#10B981" stroke="#059669" strokeWidth="2"/>
    <path d="M38 18 L32 30 L36 30 L28 42 L34 30 L30 30 L38 18 Z" fill="white" stroke="white" strokeWidth="1"/>
    <text x="70" y="25" fill="#1F2937" fontSize="18" fontWeight="bold" fontFamily="sans-serif">VOLT SAFE</text>
    <text x="70" y="42" fill="#059669" fontSize="12" fontWeight="500" fontFamily="sans-serif">ELECTRICAL</text>
  </svg>
);

// Quote Form Component
const QuoteForm = ({ isModal = false, onClose = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });

  const services = [
    'EV Charger Installation',
    'Vehicle-to-Home (V2H) Setup',
    'Home Battery System',
    'Solar Panel Installation',
    'Electrical Rewiring',
    'Smart Home Setup',
    'Other'
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();

    try {
      // Testing locally? http://localhost:5000/send-quote
      const response = await fetch("https://voltsafe-api.onrender.com/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Thank you! We’ll contact you within 24 hours with your free quote.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          location: "",
          message: "",
        });
        if (onClose) onClose();
      } else {
        alert("⚠️ Something went wrong. Please try again later.");
      }
    } catch (error) {
      alert("⚠️ Unable to send your message. Please check your internet connection.");
      console.error(error);
    }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formClass = isModal 
    ? "bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4" 
    : "bg-white p-8 rounded-xl shadow-lg";

  return (
    <div className={formClass}>
      {isModal && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Get Your Free Quote</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Your Location, e.g. Tuam"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Select Service Needed</option>
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select> */}

        <textarea
          name="message"
          placeholder="Tell us about the work you need done"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          Get Free Quote <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Main Landing Page Component
const App = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: <Car className="w-8 h-8 text-emerald-600" />,
      title: "EV Charger Installation",
      description: "Installation of EV charging solutions with SEAI grant eligibility"
    },
    {
      icon: <Battery className="w-8 h-8 text-emerald-600" />,
      title: "Home Battery Systems",
      description: "Store renewable energy and reduce electricity bills"
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
      title: "Vehicle-to-Home (V2H)",
      description: "Use your EV to power your home daily, reduce electricity bills and stay connected during outages"
    },
    {
      icon: <Home className="w-8 h-8 text-emerald-600" />,
      title: "Smart Home Solutions",
      description: "Modern electrical systems for energy-efficient homes"
    }
  ];

  const testimonials = [
    {
      name: "Sarah O'Brien",
      location: "Galway",
      rating: 5,
      text: "Excellent service! EV charger installed professionally and qualified for SEAI grant."
    },
    {
      name: "Michael Murphy",
      location: "Cork",
      rating: 5,
      text: "Top-quality work on our home battery system. Very knowledgeable team."
    },
    {
      name: "Emma Walsh",
      location: "Dublin",
      rating: 5,
      text: "Professional, reliable, and eco-conscious. Highly recommend!"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <VoltSafeLogo />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-emerald-600 font-medium">Services</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium">Contact</a>
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-1" />
                <span>+353 87 288 8202</span>
              </div>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Free Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#services" className="text-gray-700 hover:text-emerald-600 font-medium">Services</a>
                <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium">About</a>
                <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium">Contact</a>
                <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
                  <Phone size={16} className="mr-1" />
                  <span>087 288 8202</span>
                </div>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors w-full"
                >
                  Free Quote
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Safe Electric Registered Contractor</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Providing Expert <span className="text-emerald-600">Electrical Solutions</span> for Over 30 Years
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Professional EV charger installation, home battery systems, and smart electrical solutions. 
                Serving all of Ireland with SEAI grant expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  Get Free Quote <ArrowRight size={20} />
                </button>
                <a
                  href="tel:0872888202"
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>SEAI Approved</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>Free Quotes</span>
                </div>
              </div>
            </div>

            <div className="lg:pl-12">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Electrical Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialising in modern, eco-friendly electrical solutions with expert SEAI grant guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEAI Grant Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-emerald-200" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              SEAI Grant Eligible Services
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Save up to €300 on EV charger installations with SEAI grants. 
              We handle the paperwork and ensure you get maximum savings.
            </p>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Up to €300</div>
                <div>EV Charger Grant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Up to €3,200</div>
                <div>Home Battery Grant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Up to €2,400</div>
                <div>Solar Panel Grant</div>
              </div>
            </div> */}
            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Check Your Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Volt Safe?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Local Expertise, Nationwide Service</h3>
                    <p className="text-gray-600">Based in North Galway, Volt Safe serves all of Ireland with reliable, quality electrical solutions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Safe Electric Approved</h3>
                    <p className="text-gray-600">Volt Safe is a Registered Electrical Contractor with Safe Electric, qaulifying customers for SEAI grants.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Over 30 Years Experience</h3>
                    <p className="text-gray-600">Volt Safe has been contracted across Ireland and Europe, accumulating to over three decades of experience.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What We Offer</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>• EV Charger Installation</div><br></br>
                <div>• Home Battery Setup</div><br></br>
                <div>• Vehicle-to-Home Setup</div><br></br>
                <div>• Smart Home Upgrades</div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Don't see what you're looking for? Contact us - we have the expertise for bespoke jobs!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Quote Today
            </h2>
            <p className="text-xl text-gray-600">
              Ready to upgrade your electrical systems? Contact us for expert advice and competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Call Us</div>
                  <div className="text-gray-600">087 288 8202</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email Us</div>
                  <div className="text-gray-600">info@voltsafe.ie</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Based in</div>
                  <div className="text-gray-600">Galway, Ireland</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Response Time</div>
                  <div className="text-gray-600">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <VoltSafeLogo className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400 mb-4">
                Professional electrical services across Ireland. SEAI approved contractor specialising in modern, eco-friendly solutions.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span>Safe Electric & SEAI Registered</span>
                <span>•</span>
                <span>Fully Insured</span>
                <span>•</span>
                <span>Decades of Experience</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>EV Charger Installation</li>
                <li>Home Battery Systems</li>
                <li>Vehicle-to-Home Setup</li>
                <li>Smart Home Solutions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>087 288 8202</li>
                <li>info@voltsafe.ie</li>
                <li>Galway, Ireland</li>
                <li>Nationwide Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Volt Safe. All rights reserved. </p>
            <p>
            Website 🛠️ by{" "}
            <a
              href="https://www.linkedin.com/in/sean-finnegan-/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-emerald-600"
            >
              Route 52 Engineering
            </a>
          </p>
          </div>
        </div>
      </footer>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <QuoteForm isModal={true} onClose={() => setShowQuoteModal(false)} />
        </div>
      )}
    </div>
  );
};

export default App;