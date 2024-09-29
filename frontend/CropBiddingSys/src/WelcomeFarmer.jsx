// src/components/WelcomePage.jsx
import React, { useState, useEffect } from 'react' // Added useEffect
import { Menu, X, ArrowRight, Star, DollarSign, Bell, Shield } from 'lucide-react'

const WelcomeFarmer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    fetchBlogs();
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Blogs data:', data); // Print the response in console
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder-logo.png" alt="CropBiddingSys Logo" className="h-10 w-10 mr-2" />
            <h1 className="text-2xl font-bold text-green-700">CropBiddingSys</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-green-700">Home</a>
            <a href="#" className="text-gray-600 hover:text-green-700">About Us</a>
            <a href="/Blog" className="text-gray-600 hover:text-green-700">Blog</a>
            <a href="/Login" className="text-gray-600 hover:text-green-700">Login</a>
            <a href="/Signup" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Sign Up</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white p-4">
            <a href="#" className="block py-2 text-gray-600 hover:text-green-700">Home</a>
            <Link to="/blog" className="block py-2 text-gray-600 hover:text-green-700">Blog</Link>

            <a href="#" className="block py-2 text-gray-600 hover:text-green-700">About Us</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-green-700">How It Works</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-green-700">Login</a>
            <a href="#" className="block py-2 bg-green-600 text-white px-4 rounded hover:bg-green-700 inline-block mt-2">Sign Up</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">Welcome to CropBiddingSys</h2>
            <p className="text-xl mb-6">Your Platform for Efficient Crop Auctions</p>
            <div className="space-x-4">
              <button className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100">Get Started</button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700">Learn More</button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="/placeholder-hero.jpg" alt="Crop Bidding Illustration" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<DollarSign size={40} />} title="Live Bidding" description="Real-time auctions for crops" />
            <FeatureCard icon={<ArrowRight size={40} />} title="Crop Listings" description="Easy-to-use platform for sellers" />
            <FeatureCard icon={<Bell size={40} />} title="Real-Time Notifications" description="Stay updated on your bids" />
            <FeatureCard icon={<Shield size={40} />} title="Secure Transactions" description="Safe and reliable payments" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="CropBiddingSys has revolutionized how I sell my crops. It's efficient and user-friendly!"
              name="John Farmer"
              role="Wheat Grower"
            />
            <TestimonialCard 
              quote="As a buyer, I love the real-time bidding feature. It's transparent and helps me get the best deals."
              name="Sarah Mills"
              role="Grain Processor"
            />
            <TestimonialCard 
              quote="The platform's security features give me peace of mind for all my transactions."
              name="Mike Thompson"
              role="Organic Farm Owner"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>Email: info@cropbiddingsys.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-300">Facebook</a>
                <a href="#" className="hover:text-green-300">Twitter</a>
                <a href="#" className="hover:text-green-300">LinkedIn</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <a href="#" className="block hover:text-green-300">Privacy Policy</a>
              <a href="#" className="block hover:text-green-300">Terms of Service</a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 CropBiddingSys. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-100 p-6 rounded-lg text-center">
    <div className="text-green-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const TestimonialCard = ({ quote, name, role }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="text-green-600 mb-4"><Star size={24} /></div>
    <p className="italic mb-4">"{quote}"</p>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-gray-600">{role}</p>
    </div>
  </div>
)

export default WelcomeFarmer