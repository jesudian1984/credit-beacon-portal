
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Users, Target, Award, Phone, Mail, MapPin } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <Link to="/" className="flex items-center text-white hover:text-brandblue-100">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-6">About Fingrandz Business Solutions</h1>
            <p className="text-xl max-w-3xl">
              A dynamic financial consulting firm specializing in telemarketing-driven financial advisory services for salaried individuals since June 2019.
            </p>
          </div>
        </div>
        
        {/* Company Summary */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Summary</h2>
              <p className="text-lg text-gray-700 mb-6">
                FINGRANDZ Business Solutions is a dynamic financial consulting firm that specializes in telemarketing-driven financial advisory services for salaried individuals. Founded in June 2019, we help clients identify suitable investment, insurance, and loan opportunities—including personal loans, business loans, home loans, and property loans—tailored to their financial goals.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our unique strategies, grounded in deep market knowledge and real-world experience, allow us to craft impactful financial solutions. We combine innovation, empathetic engagement, and cutting-edge marketing techniques to deliver consistent, measurable results for our clients.
              </p>
              <p className="text-lg text-gray-700">
                At FINGRANDZ, our approach blends creative thinking, sales technology, analytics, and human-centered marketing practices. This fusion allows us to generate high-quality leads, drive value, and elevate the financial awareness of every individual we connect with.
              </p>
            </div>

            {/* Partner with Us */}
            <div className="mb-16 bg-brandblue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-brandblue-900 mb-6">Partner with Us to...</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Unlock productive outcomes and fresh approaches to your business challenges</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Combine modern telemarketing strategies with traditional financial advisory for higher ROI</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Drive growth with human-centric consultation and market-driven insights</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Reimagine sales and customer engagement through the 3C's: Connect. Convince. Convert.</span>
                </li>
              </ul>
            </div>

            {/* Core Capabilities */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Capabilities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Telemarketing-Focused Financial Consultation</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Lead Generation & Conversion for Investment and Insurance Products</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Sales Training, Performance Management & Quality Delivery</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer-Centric Script Development & Objection Handling</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg md:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">End-to-End Recruitment & Training for Telesales Operations</h3>
                </div>
              </div>
            </div>

            {/* What Sets Us Apart */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Sets Us Apart</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Empowered Consultants</h3>
                  <p className="text-gray-700">Our consultants are entrepreneurial, bold, and result-oriented.</p>
                </div>
                <div className="text-center">
                  <Target className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Human Approach</h3>
                  <p className="text-gray-700">We solve business challenges with empathy, not just data.</p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Knowledge</h3>
                  <p className="text-gray-700">Our leadership team brings decades of experience in banking, insurance, and tele-sales.</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Rigorous Training</h3>
                  <p className="text-gray-700">From communication to real-life marketing modules, our team is groomed to deliver excellence.</p>
                </div>
                <div className="text-center md:col-span-2 lg:col-span-2">
                  <Award className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Obsessed with Quality</h3>
                  <p className="text-gray-700">We follow the belief: "QUALITY IS CUSTOMER"—no compromises, at any stage.</p>
                </div>
              </div>
            </div>

            {/* Founder Profile */}
            <div className="mb-16 bg-brandblue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-brandblue-900 mb-6">Founder Profile: Joseph Jesudian</h2>
              <p className="text-lg text-gray-700 mb-6">
                A B.Com graduate from Madras University (2004), Joseph brings over 15 years of hands-on experience in financial services. His journey includes pivotal roles at SBI Cards, GE Capital, Kotak Life Insurance, and HDFC Bank.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Began as a sales associate, quickly rising to Territory Sales Manager at GE Capital</li>
                <li>• Successfully built and scaled tele-sales operations at Kotak Life with over 150 workstations</li>
                <li>• Led personal loan sales at HDFC Bank, achieving up to ₹13 Cr/month in disbursements</li>
                <li>• Headed Chennai inbound sales team as Champion Manager, directly reporting to the Regional Head</li>
                <li>• Founded TALNET Business Solutions Pvt. Ltd. in 2018 to offer recruitment and manpower solutions</li>
              </ul>
              <p className="text-lg text-gray-700 mt-6">
                Joseph's entrepreneurial mindset, strong network, and operational expertise laid the foundation for FINGRANDZ's high-performance teleconsulting model.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-white border border-gray-200 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-brandblue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-700">Saidapet, Chennai</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-brandblue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-700">9176244465</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-brandblue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">fin.grandz19@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/talk-to-expert">
                  <Button className="bg-brandblue-600 hover:bg-brandblue-700">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
