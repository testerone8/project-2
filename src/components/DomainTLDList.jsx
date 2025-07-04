import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, Tag, Star, Flame } from 'lucide-react';

const DomainTLDList = ({ theme = 'dark' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const supportedTLDs = [
    { name: ".com", price: "₹999/year", featured: true },
    { name: ".net", price: "₹899/year" },
    { name: ".org", price: "₹799/year" },
    { name: ".xyz", price: "₹199/year", discount: true },
    { name: ".tech", price: "₹349/year" },
    { name: ".online", price: "₹249/year", trending: true },
    { name: ".in", price: "₹699/year" },
    { name: ".fun", price: "₹149/year", discount: true },
    { name: ".store", price: "₹499/year" },
    { name: ".website", price: "₹299/year", discount: true },
    { name: ".blog", price: "₹399/year" },
    { name: ".info", price: "₹599/year" },
    { name: ".io", price: "₹1999/year", premium: true },
    { name: ".live", price: "₹399/year" },
    { name: ".dev", price: "₹1299/year", trending: true },
    { name: ".app", price: "₹1599/year", premium: true },
    { name: ".cloud", price: "₹799/year" },
    { name: ".game", price: "₹2499/year", premium: true },
    { name: ".pro", price: "₹1199/year" },
    { name: ".me", price: "₹899/year", trending: true }
  ];

  const themeClasses = {
    dark: {
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      cardBg: 'bg-white/5 backdrop-blur-md',
      border: 'border-white/10',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      searchBg: 'bg-white/10',
      searchBorder: 'border-white/20'
    },
    light: {
      bg: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
      cardBg: 'bg-white/80 backdrop-blur-md',
      border: 'border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-600',
      searchBg: 'bg-white/90',
      searchBorder: 'border-gray-300'
    }
  };

  const currentTheme = themeClasses[theme];

  const filteredTLDs = useMemo(() => {
    return supportedTLDs.filter(tld =>
      tld.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getTagInfo = (tld) => {
    if (tld.featured) {
      return {
        icon: <Star className="w-3 h-3" />,
        text: "Premium",
        bgClass: "bg-gradient-to-r from-yellow-500 to-orange-500",
        pulseClass: "animate-pulse"
      };
    }
    if (tld.trending) {
      return {
        icon: <TrendingUp className="w-3 h-3" />,
        text: "Trending",
        bgClass: "bg-gradient-to-r from-green-500 to-emerald-500",
        pulseClass: "animate-pulse"
      };
    }
    if (tld.discount) {
      return {
        icon: <Tag className="w-3 h-3" />,
        text: "Discount",
        bgClass: "bg-gradient-to-r from-red-500 to-pink-500",
        pulseClass: "animate-pulse"
      };
    }
    if (tld.premium) {
      return {
        icon: <Flame className="w-3 h-3" />,
        text: "Premium",
        bgClass: "bg-gradient-to-r from-purple-500 to-indigo-500",
        pulseClass: "animate-pulse"
      };
    }
    return null;
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6`}>
            Domain Extensions
          </h2>
          <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
            Choose from our wide selection of domain extensions with competitive pricing and instant activation
          </p>
        </div>

        {/* Search Bar */}
        <div className={`max-w-2xl mx-auto mb-12 ${currentTheme.cardBg} ${currentTheme.border} border rounded-2xl p-6 shadow-xl`}>
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${currentTheme.textMuted} w-5 h-5`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search domain extensions..."
              className={`w-full pl-12 pr-4 py-4 ${currentTheme.searchBg} ${currentTheme.searchBorder} border rounded-xl ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
            />
          </div>
          {searchTerm && (
            <div className={`mt-4 text-sm ${currentTheme.textMuted}`}>
              Found {filteredTLDs.length} extension{filteredTLDs.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* TLD Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredTLDs.map((tld, index) => {
            const tagInfo = getTagInfo(tld);
            
            return (
              <div
                key={index}
                className={`group relative ${currentTheme.cardBg} ${currentTheme.border} border rounded-xl p-6 text-center hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Tag */}
                {tagInfo && (
                  <div className={`absolute -top-2 -right-2 ${tagInfo.bgClass} text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${tagInfo.pulseClass} shadow-lg`}>
                    {tagInfo.icon}
                    <span className="font-semibold">{tagInfo.text}</span>
                  </div>
                )}

                {/* TLD Name */}
                <div className={`relative text-2xl font-bold ${currentTheme.text} mb-3 group-hover:text-purple-400 transition-colors duration-300`}>
                  {tld.name}
                </div>

                {/* Price */}
                <div className={`relative text-lg font-semibold ${currentTheme.textSecondary} mb-4`}>
                  {tld.price}
                </div>

                {/* Features */}
                <div className={`relative text-xs ${currentTheme.textMuted} space-y-1`}>
                  <div>✓ Free DNS Management</div>
                  <div>✓ Privacy Protection</div>
                  <div>✓ 24/7 Support</div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/30 transition-all duration-500"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg shadow-purple-500/20"></div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredTLDs.length === 0 && searchTerm && (
          <div className={`text-center py-12 ${currentTheme.cardBg} ${currentTheme.border} border rounded-2xl`}>
            <div className={`text-6xl mb-4`}>🔍</div>
            <h3 className={`text-xl font-semibold ${currentTheme.text} mb-2`}>No extensions found</h3>
            <p className={`${currentTheme.textMuted}`}>
              Try searching for a different extension or clear your search to see all available options.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Show All Extensions
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`mt-16 text-center ${currentTheme.cardBg} ${currentTheme.border} border rounded-2xl p-8`}>
          <h3 className={`text-2xl font-bold ${currentTheme.text} mb-4`}>
            Can't find the perfect extension?
          </h3>
          <p className={`${currentTheme.textSecondary} mb-6`}>
            Contact our domain experts for personalized recommendations and bulk pricing options.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
            Contact Domain Expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default DomainTLDList;