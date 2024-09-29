import React, { useState } from 'react'
import { Menu, X, ArrowRight, Star, Settings, Users, Database, ShieldCheck } from 'lucide-react'

const WelcomeAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder-logo.png" alt="CropBiddingSys Logo" className="h-10 w-10 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">CropBiddingSys Admin</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="/ProfilePage" className="text-gray-600 hover:text-gray-800">Profile</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">User Management</a>
            <a href="/AddBlog" className="text-gray-600 hover:text-gray-800">BlogAdd</a>
            <a href="/Login" className="text-gray-600 hover:text-gray-800">Login</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white p-4">
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-800">Dashboard</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-800">User Management</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-800">Reports</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-800">Login</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">Welcome, Admin</h2>
            <p className="text-xl mb-6">Manage and oversee the CropBiddingSys platform</p>
            <div className="space-x-4">
              <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">Access Dashboard</button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800">View Reports</button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="/placeholder-admin-dashboard.jpg" alt="Admin Dashboard Illustration" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Admin Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Settings size={40} />} title="System Configuration" description="Customize platform settings" />
            <FeatureCard icon={<Users size={40} />} title="User Management" description="Manage user accounts and roles" />
            <FeatureCard icon={<Database size={40} />} title="Data Analytics" description="Access comprehensive reports" />
            <FeatureCard icon={<ShieldCheck size={40} />} title="Security Controls" description="Enforce platform security measures" />
          </div>
        </div>
      </section>

      {/* Admin Insights Section */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Admin Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InsightCard 
              title="Active Users"
              value="5,234"
              change="+12%"
              description="Increase in active users this month"
            />
            <InsightCard 
              title="Total Transactions"
              value="$1.2M"
              change="+8%"
              description="Growth in transaction volume"
            />
            <InsightCard 
              title="New Listings"
              value="328"
              change="+15%"
              description="New crop listings this week"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Admin Support</h3>
              <p>Email: admin-support@cropbiddingsys.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <a href="#" className="block hover:text-gray-300">User Manual</a>
              <a href="#" className="block hover:text-gray-300">System Status</a>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Security</h3>
              <a href="#" className="block hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="block hover:text-gray-300">Terms of Service</a>
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
  <div className="bg-gray-200 p-6 rounded-lg text-center">
    <div className="text-gray-800 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const InsightCard = ({ title, value, change, description }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div className="flex items-baseline">
      <span className="text-3xl font-bold mr-2">{value}</span>
      <span className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
    </div>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
)

export default WelcomeAdmin