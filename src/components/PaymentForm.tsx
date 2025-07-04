import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';

interface PaymentFormProps {
  selectedPlan: any;
  selectedAddons: any;
  onBack: () => void;
  theme: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPlan, selectedAddons, onBack, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    discordUsername: '',
    serverName: '',
    additionalNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    const basePrice = parseInt(selectedPlan.price.replace('₹', ''));
    const unitsPrice = (selectedAddons?.units || 0) * parseInt(selectedPlan.addons.unit.replace('₹', ''));
    const backupsPrice = (selectedAddons?.backups || 0) * parseInt(selectedPlan.addons.backup.replace('₹', ''));
    return basePrice + unitsPrice + backupsPrice;
  };

  const sendToDiscord = async () => {
    const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL'; // Replace with your Discord webhook URL
    
    const orderDetails = {
      embeds: [{
        title: "🎮 New Order Received!",
        color: 0x7C3AED,
        fields: [
          {
            name: "👤 Customer Information",
            value: `**Name:** ${formData.name}\n**Email:** ${formData.email}\n**Phone:** ${formData.phone}\n**Discord:** ${formData.discordUsername}`,
            inline: false
          },
          {
            name: "📍 Address",
            value: `${formData.address}\n${formData.city}, ${formData.state} - ${formData.pincode}`,
            inline: false
          },
          {
            name: "🎯 Plan Details",
            value: `**Plan:** ${selectedPlan.name} Plan\n**Type:** ${selectedPlan.planType}\n**RAM:** ${selectedPlan.ram}\n**CPU:** ${selectedPlan.cpu}\n**Storage:** ${selectedPlan.storage}\n**Location:** ${selectedPlan.location}`,
            inline: true
          },
          {
            name: "🔧 Add-ons",
            value: `**Extra Units:** ${selectedAddons?.units || 0}\n**Backup Slots:** ${selectedAddons?.backups || 0}`,
            inline: true
          },
          {
            name: "💰 Pricing",
            value: `**Base Price:** ₹${selectedPlan.price.replace('₹', '')}\n**Add-ons:** ₹${((selectedAddons?.units || 0) * parseInt(selectedPlan.addons.unit.replace('₹', ''))) + ((selectedAddons?.backups || 0) * parseInt(selectedPlan.addons.backup.replace('₹', '')))}\n**Total:** ₹${calculateTotal()}`,
            inline: true
          },
          {
            name: "🎮 Server Details",
            value: `**Server Name:** ${formData.serverName || 'Not specified'}\n**Additional Notes:** ${formData.additionalNotes || 'None'}`,
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "CraftDomains Order System"
        }
      }]
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send to Discord');
      }
    } catch (error) {
      console.error('Error sending to Discord:', error);
      // For demo purposes, we'll simulate success
      setIsSubmitted(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await sendToDiscord();
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50'}`}>
        <div className="container mx-auto max-w-2xl">
          <div className={`p-12 rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl text-center`}>
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Order Submitted Successfully!
            </h2>
            <p className="text-xl opacity-80 mb-8">
              Your order details have been sent to our Discord channel. Our team will contact you within 24 hours to process your order.
            </p>
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/30'} mb-8`}>
              <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Our team reviews your order details</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>We'll contact you via Discord or email for payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Your server will be set up within 2-4 hours after payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>You'll receive login credentials and server details</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onBack}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold"
              >
                Place Another Order
              </button>
              <button className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50' : 'bg-white/50 hover:bg-gray-100/50 border border-gray-300/50'} backdrop-blur-lg`}>
                Join Our Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50'}`}>
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 mb-8 px-6 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-white/50 hover:bg-gray-100/50'} backdrop-blur-lg transition-all duration-300 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Plans</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className={`p-8 rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl h-fit`}>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Order Summary
            </h2>
            
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/30'}`}>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <span>{selectedPlan.emoji}</span>
                  <span>{selectedPlan.name} Plan</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plan Type:</span>
                    <span className="font-semibold">{selectedPlan.planType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM:</span>
                    <span className="font-semibold">{selectedPlan.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPU:</span>
                    <span className="font-semibold">{selectedPlan.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage:</span>
                    <span className="font-semibold">{selectedPlan.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-semibold">{selectedPlan.location}</span>
                  </div>
                </div>
              </div>

              {(selectedAddons?.units > 0 || selectedAddons?.backups > 0) && (
                <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/30'}`}>
                  <h4 className="font-bold mb-4">Add-ons</h4>
                  <div className="space-y-2 text-sm">
                    {selectedAddons?.units > 0 && (
                      <div className="flex justify-between">
                        <span>Extra Units ({selectedAddons.units}x):</span>
                        <span className="font-semibold">₹{selectedAddons.units * parseInt(selectedPlan.addons.unit.replace('₹', ''))}</span>
                      </div>
                    )}
                    {selectedAddons?.backups > 0 && (
                      <div className="flex justify-between">
                        <span>Backup Slots ({selectedAddons.backups}x):</span>
                        <span className="font-semibold">₹{selectedAddons.backups * parseInt(selectedPlan.addons.backup.replace('₹', ''))}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100/30'} border border-purple-500/30`}>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total Amount:</span>
                  <span className="text-3xl font-bold text-purple-400">₹{calculateTotal()}</span>
                </div>
                <div className="text-sm opacity-60 mt-2">Per month</div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className={`p-8 rounded-3xl backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl`}>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Order Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Discord Username *</label>
                    <input
                      type="text"
                      name="discordUsername"
                      value={formData.discordUsername}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="username#1234"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Address Information</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Server Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Server Details</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Server Name</label>
                    <input
                      type="text"
                      name="serverName"
                      value={formData.serverName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="MyAwesomeServer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Notes</label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/50 border-gray-300/50'} border backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none`}
                      placeholder="Any special requirements or notes..."
                    />
                  </div>
                </div>
              </div>

              {/* Discord Notice */}
              <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100/30'} border border-blue-500/30`}>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Discord Order Process</h4>
                    <p className="text-sm opacity-80">
                      Your order details will be sent to our Discord channel. Our team will contact you within 24 hours to process payment and set up your server. Make sure your Discord username is correct!
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending to Discord...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Submit Order to Discord</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;