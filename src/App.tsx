import React, { useState, useEffect } from 'react';
import { Moon, Sun, Search, Star, Shield, Zap, Users, Globe, Server, CheckCircle, ArrowRight, MessageCircle, Crown, Gem, Play, Gamepad2, Cpu, HardDrive, MapPin, Clock, Plus, Minus, Menu, X, User, Mail, Phone, CreditCard, Calendar, Package } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [currentDomain, setCurrentDomain] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [activePlan, setActivePlan] = useState('budget');
  const [selectedAddons, setSelectedAddons] = useState<{[key: string]: {units: number, backups: number}}>({});
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const domains = ['.com', '.fun', '.io', '.xyz', '.tech', '.online', '.net', '.store', '.org', '.website', '.blog', '.info', '.live', '.in'];
  
  const featuredDomains = [
    { name: '.fun', price: '₹899', originalPrice: '₹1299', badge: '🔥 Trending', color: 'from-orange-400 to-red-500', discount: '31% OFF' },
    { name: '.xyz', price: '₹649', originalPrice: '₹999', badge: '💎 Limited Offer', color: 'from-purple-400 to-pink-500', discount: '35% OFF' },
    { name: '.io', price: '₹3999', originalPrice: '₹4999', badge: '⚡ Popular', color: 'from-blue-400 to-cyan-500', discount: '20% OFF' },
    { name: '.tech', price: '₹2499', originalPrice: '₹3299', badge: '🚀 New', color: 'from-green-400 to-blue-500', discount: '24% OFF' },
  ];

  const minecraftPlans = {
    budget: {
      name: 'Budget Plans',
      description: 'Perfect for beginners and small communities',
      color: 'from-amber-400 to-orange-500',
      plans: [
        { name: 'Dirt', emoji: '🟫', ram: '2GB', cpu: '100%', storage: '5GB SSD', location: 'India', price: '₹49', specs: ['2GB RAM', '100% CPU', '5GB SSD Storage', 'India Location', '24/7 Support'] },
        { name: 'Wood', emoji: '🟤', ram: '4GB', cpu: '150%', storage: '10GB SSD', location: 'Mumbai', price: '₹99', specs: ['4GB RAM', '150% CPU', '10GB SSD Storage', 'Mumbai Location', '24/7 Support'] },
        { name: 'Stone', emoji: '⚪', ram: '6GB', cpu: '200%', storage: '15GB SSD', location: 'Mumbai', price: '₹159', specs: ['6GB RAM', '200% CPU', '15GB SSD Storage', 'Mumbai Location', '24/7 Support'] },
        { name: 'Iron', emoji: '🔘', ram: '8GB', cpu: '250%', storage: '20GB SSD', location: 'Mumbai', price: '₹229', specs: ['8GB RAM', '250% CPU', '20GB SSD Storage', 'Mumbai Location', '24/7 Support'] },
        { name: 'Gold', emoji: '🟡', ram: '10GB', cpu: '300%', storage: '25GB SSD', location: 'Mumbai', price: '₹349', specs: ['10GB RAM', '300% CPU', '25GB SSD Storage', 'Mumbai Location', '24/7 Support'] },
        { name: 'Diamond', emoji: '💎', ram: '12GB', cpu: '350%', storage: '30GB SSD', location: 'Mumbai', price: '₹399', specs: ['12GB RAM', '350% CPU', '30GB SSD Storage', 'Mumbai Location', '24/7 Support'] },
        { name: 'Netherite', emoji: '⚫', ram: '16GB', cpu: '400%', storage: '40GB SSD', location: 'Mumbai', price: '₹549', specs: ['16GB RAM', '400% CPU', '40GB SSD Storage', 'Mumbai Location', '24/7 Support'] }
      ],
      addons: { unit: '₹30', backup: '₹25' }
    },
    powered: {
      name: 'Powered Plans',
      description: 'Enhanced performance for growing servers',
      color: 'from-emerald-400 to-green-500',
      plans: [
        { name: 'Dirt', emoji: '🟫', ram: '2GB', cpu: '100%', storage: '5GB SSD', location: 'India', price: '₹90', specs: ['2GB RAM', '100% CPU', '5GB SSD Storage', 'India Location', 'Priority Support'] },
        { name: 'Wood', emoji: '🟤', ram: '4GB', cpu: '150%', storage: '10GB SSD', location: 'Mumbai', price: '₹160', specs: ['4GB RAM', '150% CPU', '10GB SSD Storage', 'Mumbai Location', 'Priority Support'] },
        { name: 'Stone', emoji: '⚪', ram: '6GB', cpu: '200%', storage: '15GB SSD', location: 'Mumbai', price: '₹240', specs: ['6GB RAM', '200% CPU', '15GB SSD Storage', 'Mumbai Location', 'Priority Support'] },
        { name: 'Iron', emoji: '🔘', ram: '8GB', cpu: '250%', storage: '20GB SSD', location: 'Mumbai', price: '₹320', specs: ['8GB RAM', '250% CPU', '20GB SSD Storage', 'Mumbai Location', 'Priority Support'] },
        { name: 'Gold', emoji: '🟡', ram: '10GB', cpu: '300%', storage: '25GB SSD', location: 'Mumbai', price: '₹400', specs: ['10GB RAM', '300% CPU', '25GB SSD Storage', 'Mumbai Location', 'Priority Support'] },
        { name: 'Diamond', emoji: '💎', ram: '12GB', cpu: '350%', storage: '30GB SSD', location: 'Mumbai', price: '₹480', specs: ['12GB RAM', '350% CPU', '30GB SSD Storage', 'Mumbai Location', 'Priority Support'] },
        { name: 'Netherite', emoji: '⚫', ram: '16GB', cpu: '400%', storage: '40GB SSD', location: 'Mumbai', price: '₹640', specs: ['16GB RAM', '400% CPU', '40GB SSD Storage', 'Mumbai Location', 'Priority Support'] }
      ],
      addons: { unit: '₹50', backup: '₹25' }
    },
    premium: {
      name: 'Premium Plans',
      description: 'Ultimate performance with premium support',
      color: 'from-purple-400 to-pink-500',
      plans: [
        { name: 'Dirt', emoji: '🟫', ram: '2GB', cpu: '100%', storage: '5GB SSD', location: 'India', price: '₹149', specs: ['2GB RAM', '100% CPU', '5GB SSD Storage', 'India Location', 'Premium Support', 'Premium Nodes'] },
        { name: 'Wood', emoji: '🟤', ram: '4GB', cpu: '150%', storage: '10GB SSD', location: 'Mumbai', price: '₹249', specs: ['4GB RAM', '150% CPU', '10GB SSD Storage', 'Mumbai Location', 'Premium Support', 'Premium Nodes'] },
        { name: 'Stone', emoji: '⚪', ram: '6GB', cpu: '200%', storage: '15GB SSD', location: 'Mumbai', price: '₹449', specs: ['6GB RAM', '200% CPU', '15GB SSD Storage', 'Mumbai Location', 'Premium Support', 'Premium Nodes'] },
        { name: 'Iron', emoji: '🔘', ram: '8GB', cpu: '250%', storage: '20GB SSD', location: 'Mumbai', price: '₹649', specs: ['8GB RAM', '250% CPU', '20GB SSD Storage', 'Mumbai Location', 'Premium Support', 'Premium Nodes'] },
        { name: 'Gold', emoji: '🟡', ram: '10GB', cpu: '300%', storage: '25GB SSD', location: 'Mumbai', price: '₹799', specs: ['10GB RAM', '300% CPU', '25GB SSD Storage', 'Mumbai Location', 'Premium Support', 'Premium Nodes'] },
        { name: 'Diamond', emoji: '💎', ram: '12GB', cpu: '350%', storage: '30GB SSD', location: 'Mumbai', price: '₹899', specs: ['12GB RAM', '350% CPU', '30GB SSD Storage', 'Mumbai Location', 'Premium Support', 'Premium Nodes'] },
        { name: 'Netherite', emoji: '⚫', ram: '16GB', cpu: '400%', storage: '40GB SSD', location: 'Mumbai', price: '₹999', specs: ['16GB RAM', '400% CPU', '40GB SSD Storage', 'Mumbai Location', 'Premium Support', 'Premium Nodes'] }
      ],
      addons: { unit: '₹129', backup: '₹25' }
    }
  };

  const reviews = [
    { name: 'Arjun K.', rating: 5, text: 'Amazing service! My Minecraft server runs perfectly with zero lag. Best hosting in India!' },
    { name: 'Priya S.', rating: 5, text: 'Excellent domain registration process. Got my .fun domain instantly!' },
    { name: 'Rohit M.', rating: 5, text: 'Premium support is outstanding. They helped me migrate my server seamlessly.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDomain((prev) => (prev + 1) % domains.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateAddons = (planName: string, type: 'units' | 'backups', increment: boolean) => {
    setSelectedAddons(prev => {
      const current = prev[planName] || { units: 0, backups: 0 };
      const newValue = increment ? current[type] + 1 : Math.max(0, current[type] - 1);
      return {
        ...prev,
        [planName]: {
          ...current,
          [type]: newValue
        }
      };
    });
  };

  const handleOrder = (type: 'domain' | 'hosting', data: any) => {
    setOrderData({ type, ...data });
    setShowOrderForm(true);
  };

  const calculateTotal = () => {
    if (!orderData) return 0;
    
    let total = parseInt(orderData.price?.replace('₹', '') || '0');
    
    if (orderData.type === 'hosting' && orderData.planName) {
      const addons = selectedAddons[orderData.planName];
      if (addons) {
        const planType = orderData.planType || 'budget';
        const unitPrice = parseInt(minecraftPlans[planType as keyof typeof minecraftPlans].addons.unit.replace('₹', ''));
        const backupPrice = parseInt(minecraftPlans[planType as keyof typeof minecraftPlans].addons.backup.replace('₹', ''));
        
        total += (addons.units * unitPrice) + (addons.backups * backupPrice);
      }
    }
    
    return total;
  };

  if (showOrderForm) {
    return (
      <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 text-gray-900'}`}>
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/20'} blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/20'} blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Order Form */}
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
          <div className={`w-full max-w-4xl p-6 sm:p-8 lg:p-12 rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl`}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Complete Your Order
              </h1>
              <button
                onClick={() => setShowOrderForm(false)}
                className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-gray-200/50'} transition-all duration-300`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/30'} backdrop-blur-lg`}>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Package className="w-6 h-6 mr-3 text-purple-400" />
                  Order Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Service Type:</span>
                    <span className="capitalize">{orderData?.type}</span>
                  </div>
                  
                  {orderData?.type === 'domain' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Domain:</span>
                        <span>{orderData.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Duration:</span>
                        <span>1 Year</span>
                      </div>
                    </>
                  )}
                  
                  {orderData?.type === 'hosting' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Plan:</span>
                        <span>{orderData.planName} ({orderData.planType})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Specifications:</span>
                        <span>{orderData.ram} RAM, {orderData.storage}</span>
                      </div>
                      {selectedAddons[orderData.planName] && (
                        <>
                          {selectedAddons[orderData.planName].units > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Extra Units:</span>
                              <span>{selectedAddons[orderData.planName].units} units</span>
                            </div>
                          )}
                          {selectedAddons[orderData.planName].backups > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Backup Slots:</span>
                              <span>{selectedAddons[orderData.planName].backups} slots</span>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                  
                  <div className="border-t border-gray-500/30 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-purple-400">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-purple-400" />
                  Customer Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                    Payment Method
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="p-4 rounded-xl border-2 border-purple-500 bg-purple-500/20 text-purple-400 font-semibold hover:bg-purple-500/30 transition-all">
                      💳 Razorpay
                    </button>
                    <button className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'} hover:bg-gray-500/20 transition-all`}>
                      📱 UPI
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className={`flex-1 py-4 px-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-200/50 hover:bg-gray-300/50'} transition-all duration-300 font-semibold`}
                  >
                    Back to Plans
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                    Complete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 text-gray-900'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/20'} blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/20'} blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-white/70'} border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Gamepad2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CraftDomains</span>
                <div className="text-xs opacity-60 hidden sm:block">Premium Hosting & Domains</div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`hover:text-purple-400 transition-all duration-300 ${activeSection === 'home' ? 'text-purple-400 font-semibold' : ''}`}
              >
                Domains
              </button>
              <button 
                onClick={() => scrollToSection('hosting')}
                className={`hover:text-purple-400 transition-all duration-300 ${activeSection === 'hosting' ? 'text-purple-400 font-semibold' : ''}`}
              >
                Minecraft Hosting
              </button>
              <button 
                onClick={() => scrollToSection('comparison')}
                className={`hover:text-purple-400 transition-all duration-300 ${activeSection === 'comparison' ? 'text-purple-400 font-semibold' : ''}`}
              >
                Compare Plans
              </button>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 sm:p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-white/50 hover:bg-gray-100/50'} backdrop-blur-lg transition-all duration-300 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 sm:p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-white/50 hover:bg-gray-100/50'} backdrop-blur-lg transition-all duration-300 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              <button className="hidden sm:block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Get Started
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`lg:hidden mt-4 p-4 rounded-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <div className="space-y-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`block w-full text-left py-2 hover:text-purple-400 transition-all duration-300 ${activeSection === 'home' ? 'text-purple-400 font-semibold' : ''}`}
                >
                  Domains
                </button>
                <button 
                  onClick={() => scrollToSection('hosting')}
                  className={`block w-full text-left py-2 hover:text-purple-400 transition-all duration-300 ${activeSection === 'hosting' ? 'text-purple-400 font-semibold' : ''}`}
                >
                  Minecraft Hosting
                </button>
                <button 
                  onClick={() => scrollToSection('comparison')}
                  className={`block w-full text-left py-2 hover:text-purple-400 transition-all duration-300 ${activeSection === 'comparison' ? 'text-purple-400 font-semibold' : ''}`}
                >
                  Compare Plans
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 mb-4 sm:mb-6">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span className="text-xs sm:text-sm font-semibold">99.9% Uptime</span>
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm font-semibold">Instant Activation</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Your Domain,
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
                Your Empire
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-80 max-w-3xl mx-auto">
              Premium domains and blazing-fast Minecraft hosting designed for Indian gamers
            </p>
            
            {/* Animated Domain Extensions */}
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 text-2xl sm:text-3xl lg:text-4xl font-bold">
                <span>Secure your</span>
                <span 
                  key={currentDomain}
                  className="text-purple-400 animate-bounce bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  {domains[currentDomain]}
                </span>
                <span>domain!</span>
              </div>
            </div>

            {/* Domain Search */}
            <div className={`max-w-4xl mx-auto mb-12 sm:mb-16 p-4 sm:p-8 rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl`}>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                  <input
                    type="text"
                    placeholder="Search for your perfect domain..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-5 rounded-2xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base sm:text-lg`}
                  />
                </div>
                <button className="w-full lg:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-semibold">Search Domains</span>
                </button>
              </div>
            </div>

            {/* Featured Domains */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16">
              {featuredDomains.map((domain, index) => (
                <div 
                  key={index}
                  className={`group p-4 sm:p-8 rounded-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} hover:scale-105 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl`}
                >
                  <div className="text-center">
                    <div className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 bg-gradient-to-r ${domain.color} text-white shadow-lg`}>
                      {domain.badge}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{domain.name}</h3>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-2xl sm:text-4xl font-bold text-purple-400">{domain.price}</span>
                      <div className="text-xs sm:text-sm opacity-60 line-through">{domain.originalPrice}</div>
                      <div className="text-xs sm:text-sm font-semibold text-green-400">{domain.discount}</div>
                    </div>
                    <button 
                      onClick={() => handleOrder('domain', { name: domain.name, price: domain.price })}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group-hover:scale-105 shadow-lg font-semibold text-sm sm:text-base"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* All Domain Extensions */}
            <div className={`p-6 sm:p-10 rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl`}>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Available Domain Extensions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
                {domains.map((domain, index) => (
                  <div 
                    key={index}
                    className={`p-3 sm:p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-gray-200/50'} text-center transition-all duration-300 cursor-pointer hover:scale-110 backdrop-blur-lg border ${theme === 'dark' ? 'border-gray-600/50' : 'border-gray-300/50'}`}
                  >
                    <span className="font-bold text-sm sm:text-xl">{domain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minecraft Hosting Section */}
      <section id="hosting" className="py-12 sm:py-20 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Minecraft Server Hosting
            </h2>
            <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto mb-8 sm:mb-12">
              Choose from Budget, Powered, or Premium plans. All servers hosted in India with lightning-fast performance.
            </p>

            {/* Plan Selector */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className={`p-1 sm:p-2 rounded-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                {Object.keys(minecraftPlans).map((planKey) => (
                  <button
                    key={planKey}
                    onClick={() => setActivePlan(planKey)}
                    className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base ${
                      activePlan === planKey
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'hover:bg-gray-500/20'
                    }`}
                  >
                    {minecraftPlans[planKey as keyof typeof minecraftPlans].name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Plan Display */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">{minecraftPlans[activePlan as keyof typeof minecraftPlans].name}</h3>
              <p className="text-base sm:text-lg opacity-80">{minecraftPlans[activePlan as keyof typeof minecraftPlans].description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {minecraftPlans[activePlan as keyof typeof minecraftPlans].plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`group p-4 sm:p-6 rounded-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl`}
                >
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{plan.emoji}</div>
                    <h4 className="text-lg sm:text-2xl font-bold mb-2">{plan.name} Plan</h4>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-2xl sm:text-3xl font-bold text-purple-400">{plan.price}</span>
                      <span className="text-sm sm:text-lg opacity-60">/month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {plan.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add-ons */}
                  <div className={`p-3 sm:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/30'} mb-4 sm:mb-6`}>
                    <h5 className="font-semibold mb-2 sm:mb-3 text-xs sm:text-sm">Add-ons</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm">Extra Units</span>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => updateAddons(plan.name, 'units', false)}
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                          >
                            <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{selectedAddons[plan.name]?.units || 0}</span>
                          <button 
                            onClick={() => updateAddons(plan.name, 'units', true)}
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/30 transition-colors"
                          >
                            <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm">Backup Slots</span>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => updateAddons(plan.name, 'backups', false)}
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                          >
                            <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{selectedAddons[plan.name]?.backups || 0}</span>
                          <button 
                            onClick={() => updateAddons(plan.name, 'backups', true)}
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/30 transition-colors"
                          >
                            <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleOrder('hosting', { 
                      planName: plan.name, 
                      planType: activePlan, 
                      price: plan.price, 
                      ram: plan.ram, 
                      storage: plan.storage 
                    })}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group-hover:scale-105 shadow-lg font-semibold text-sm sm:text-base"
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>

            {/* Add-on Pricing */}
            <div className={`mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} text-center`}>
              <h4 className="text-lg sm:text-xl font-bold mb-4">Add-on Pricing for {minecraftPlans[activePlan as keyof typeof minecraftPlans].name}</h4>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-purple-400">{minecraftPlans[activePlan as keyof typeof minecraftPlans].addons.unit}</span>
                  <div className="text-xs sm:text-sm opacity-60">per extra unit</div>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-purple-400">{minecraftPlans[activePlan as keyof typeof minecraftPlans].addons.backup}</span>
                  <div className="text-xs sm:text-sm opacity-60">per backup slot</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Compare All Plans
            </h2>
            <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto">
              Detailed comparison to help you choose the perfect plan for your needs.
            </p>
          </div>

          <div className={`overflow-x-auto rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl`}>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className={`${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/30'}`}>
                  <th className="p-4 sm:p-6 text-left font-bold text-sm sm:text-base">Plan Comparison</th>
                  <th className="p-4 sm:p-6 text-center font-bold text-sm sm:text-base">Budget Plans</th>
                  <th className="p-4 sm:p-6 text-center font-bold text-sm sm:text-base">Powered Plans</th>
                  <th className="p-4 sm:p-6 text-center font-bold text-sm sm:text-base">Premium Plans</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} border-t`}>
                  <td className="p-4 sm:p-6 font-semibold text-sm sm:text-base">Price Range</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">₹49 - ₹549</td>
                  <td className="p-4 sm:p-6 text-center font-semibold text-green-400 text-sm sm:text-base">₹90 - ₹640</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">₹149 - ₹999</td>
                </tr>
                <tr className={`${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} border-t`}>
                  <td className="p-4 sm:p-6 font-semibold text-sm sm:text-base">Support Level</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">24/7 Standard</td>
                  <td className="p-4 sm:p-6 text-center font-semibold text-green-400 text-sm sm:text-base">24/7 Priority</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">24/7 Premium</td>
                </tr>
                <tr className={`${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} border-t`}>
                  <td className="p-4 sm:p-6 font-semibold text-sm sm:text-base">Server Quality</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">Standard Nodes</td>
                  <td className="p-4 sm:p-6 text-center font-semibold text-green-400 text-sm sm:text-base">Enhanced Nodes</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">Premium Nodes</td>
                </tr>
                <tr className={`${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} border-t`}>
                  <td className="p-4 sm:p-6 font-semibold text-sm sm:text-base">Extra Unit Cost</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">₹30/unit</td>
                  <td className="p-4 sm:p-6 text-center font-semibold text-green-400 text-sm sm:text-base">₹50/unit</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">₹129/unit</td>
                </tr>
                <tr className={`${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} border-t`}>
                  <td className="p-4 sm:p-6 font-semibold text-sm sm:text-base">Backup Slots</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">₹25/slot</td>
                  <td className="p-4 sm:p-6 text-center font-semibold text-green-400 text-sm sm:text-base">₹25/slot</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">₹25/slot</td>
                </tr>
                <tr className={`${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} border-t`}>
                  <td className="p-4 sm:p-6 font-semibold text-sm sm:text-base">Best For</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">Beginners</td>
                  <td className="p-4 sm:p-6 text-center font-semibold text-green-400 text-sm sm:text-base">Growing Servers</td>
                  <td className="p-4 sm:p-6 text-center text-sm sm:text-base">Large Communities</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg font-semibold">
              Join Discord for Orders
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">What Our Customers Say</h2>
            <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust us with their hosting and domain needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <div 
                key={index}
                className={`p-6 sm:p-8 rounded-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl`}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">"{review.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-base sm:text-lg">{review.name}</p>
                    <p className="text-xs sm:text-sm opacity-60">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className={`max-w-5xl mx-auto p-8 sm:p-16 rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-purple-100/30 to-pink-100/30'} border ${theme === 'dark' ? 'border-purple-500/50' : 'border-purple-200/50'} shadow-2xl`}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">Start Your Digital Journey</h2>
            <p className="text-lg sm:text-xl opacity-80 mb-8 sm:mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust CraftDomains for their hosting and domain needs. Premium quality, Indian pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg text-base sm:text-lg font-semibold">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Get Your Domain</span>
              </button>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg text-base sm:text-lg font-semibold">
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Start Hosting</span>
              </button>
              <button className={`px-6 sm:px-10 py-4 sm:py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg text-base sm:text-lg font-semibold ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50' : 'bg-white/50 hover:bg-gray-100/50 border border-gray-300/50'} backdrop-blur-lg`}>
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Join Discord</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 sm:py-16 px-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'} backdrop-blur-xl`}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Gamepad2 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CraftDomains</span>
              <div className="text-xs sm:text-sm opacity-60">Premium Hosting & Domains</div>
            </div>
          </div>
          <p className="opacity-60 mb-4 sm:mb-6 text-sm sm:text-base">© 2024 CraftDomains. All rights reserved. Made with ❤️ for Indian gamers.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity hover:text-purple-400">Privacy Policy</a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity hover:text-purple-400">Terms of Service</a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity hover:text-purple-400">Refund Policy</a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity hover:text-purple-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;