import React, { useState } from 'react'
import { Menu, X, ArrowRight, Star, ShoppingCart, TrendingUp, BarChart2, Heart } from 'lucide-react'

const WelcomeBuyer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder-logo.png" alt="CropBiddingSys Logo" className="h-10 w-10 mr-2" />
            <h1 className="text-2xl font-bold text-blue-700">CropBiddingSys</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-700">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-700">About Us</a>
            <a href="#" className="text-gray-600 hover:text-blue-700">Seller Benefits</a>
            <a href="/Login" className="text-gray-600 hover:text-blue-700">Login</a>
            <a href="/Signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white p-4">
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-700">Home</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-700">About Us</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-700">Seller Benefits</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-700">Login</a>
            <a href="#" className="block py-2 bg-blue-600 text-white px-4 rounded hover:bg-blue-700 inline-block mt-2">Sign Up</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">Sell Your Crops with Ease</h2>
            <p className="text-xl mb-6">Join our platform and reach thousands of potential buyers</p>
            <div className="space-x-4">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-100">Start Selling</button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700">Learn More</button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="/placeholder-seller-hero.jpg" alt="Crop Selling Illustration" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Seller Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<ShoppingCart size={40} />} title="Easy Listings" description="List your crops in minutes" />
            <FeatureCard icon={<TrendingUp size={40} />} title="Market Insights" description="Get real-time market trends" />
            <FeatureCard icon={<BarChart2 size={40} />} title="Analytics Dashboard" description="Track your sales performance" />
            <FeatureCard icon={<Heart size={40} />} title="Buyer Relationships" description="Build long-term connections" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="CropBiddingSys has expanded my market reach. I'm selling more than ever!"
              name="Emma Johnson"
              role="Organic Vegetable Seller"
            />
            <TestimonialCard 
              quote="The analytics tools helped me optimize my pricing strategy. Game-changer!"
              name="David Chen"
              role="Grain Wholesaler"
            />
            <TestimonialCard 
              quote="I've built a loyal customer base thanks to the platform's networking features."
              name="Sophia Rodriguez"
              role="Fruit Orchard Owner"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>Email: sellers@cropbiddingsys.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-300">Facebook</a>
                <a href="#" className="hover:text-blue-300">Twitter</a>
                <a href="#" className="hover:text-blue-300">LinkedIn</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <a href="#" className="block hover:text-blue-300">Seller Guide</a>
              <a href="#" className="block hover:text-blue-300">FAQs</a>
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
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const TestimonialCard = ({ quote, name, role }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="text-blue-600 mb-4"><Star size={24} /></div>
    <p className="italic mb-4">"{quote}"</p>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-gray-600">{role}</p>
    </div>
  </div>
)

export default WelcomeBuyer