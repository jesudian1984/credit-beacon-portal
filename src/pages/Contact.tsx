
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneCall, MessageSquare, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleCallExpert = (e) => {
    e.preventDefault();
    const phoneNumber = "8610111595";
    
    // Use the tel: protocol to initiate a phone call
    const telLink = `tel:${phoneNumber}`;
    
    // Create and click an anchor element to trigger the call
    const a = document.createElement('a');
    a.href = telLink;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show a toast notification
    toast({
      title: "Calling Loan Expert",
      description: `Connecting you with our loan expert at ${phoneNumber}`,
      duration: 5000, // Show toast for 5 seconds
    });
  };

  const handleWhatsAppChat = (e) => {
    e.preventDefault();
    const phoneNumber = "8610111595";
    const message = encodeURIComponent("Hi, I'm interested in learning more about EasyLends loans. Can you help me?");
    
    // Create WhatsApp URL with phone number and pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Show a toast notification
    toast({
      title: "WhatsApp Chat",
      description: "Opening WhatsApp chat with our loan expert",
      duration: 5000, // Show toast for 5 seconds
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you shortly!",
      duration: 5000,
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have questions about our loan products? Get in touch with our team of experts.
            </p>
          </div>
        </div>
        
        {/* Contact Content */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-brandblue-600 hover:bg-brandblue-700">
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="h-6 w-6 text-brandblue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Office Address</h3>
                      <p className="mt-1 text-gray-600">
                        123 Financial District, <br />
                        Anna Salai, Chennai 600002, <br />
                        Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-6 w-6 text-brandblue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="mailto:info@easylends.com" className="text-brandblue-600 hover:text-brandblue-700">
                          info@easylends.com
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600">
                        <a href="mailto:support@easylends.com" className="text-brandblue-600 hover:text-brandblue-700">
                          support@easylends.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <PhoneCall className="h-6 w-6 text-brandblue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="tel:+918610111595" className="text-brandblue-600 hover:text-brandblue-700">
                          +91 86101 11595
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600">
                        <a href="tel:+918610111596" className="text-brandblue-600 hover:text-brandblue-700">
                          +91 86101 11596
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-6 w-6 text-brandblue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Office Hours</h3>
                      <p className="mt-1 text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM <br />
                        Saturday: 10:00 AM - 2:00 PM <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Connect</h3>
                    <div className="flex gap-4">
                      <Button 
                        className="bg-brandblue-600 hover:bg-brandblue-700 flex items-center gap-2"
                        onClick={handleCallExpert}
                      >
                        <PhoneCall size={16} />
                        Call Now
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                        onClick={handleWhatsAppChat}
                      >
                        <MessageSquare size={16} />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
