import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wind, Droplets, Cloud, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useWeatherAPI, WeatherData } from '../hooks/useWeatherAPI';
import { ThreeDWeatherIcon } from './ThreeDWeatherIcon';

const POPULAR_DESTINATIONS = [
  'Kigali',
  'Musanze',
  'Gisenyi',
  'Kibuye',
  'Nyamata',
  'Butare',
  'Rwamagana'
];

export const WeatherWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { weather, loading, error, refetch } = useWeatherAPI(POPULAR_DESTINATIONS[currentIndex]);

  useEffect(() => {
    if (!isSearching) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % POPULAR_DESTINATIONS.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      refetch(searchQuery);
    }
  };

  const nextDestination = () => {
    setIsSearching(false);
    setCurrentIndex((prev) => (prev + 1) % POPULAR_DESTINATIONS.length);
  };

  const prevDestination = () => {
    setIsSearching(false);
    setCurrentIndex((prev) => (prev - 1 + POPULAR_DESTINATIONS.length) % POPULAR_DESTINATIONS.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-3xl p-6 w-full max-w-sm border-white/20 shadow-2xl backdrop-blur-xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Cloud className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <form onSubmit={handleSearch} className="flex-1 mr-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </form>
          <div className="flex gap-1">
            <button onClick={prevDestination} className="p-2 rounded-full hover:bg-white/10 text-white/70 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextDestination} className="p-2 rounded-full hover:bg-white/10 text-white/70 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 flex flex-col items-center"
            >
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </motion.div>
          ) : weather ? (
            <motion.div
              key={weather.city}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white/70 mb-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{weather.city}</span>
                  </div>
                  <h3 className="text-5xl font-black text-white tracking-tighter">
                    {weather.temperature}°<span className="text-2xl text-white/50">C</span>
                  </h3>
                  <p className="text-primary font-bold uppercase text-[10px] tracking-widest mt-1">
                    {weather.description}
                  </p>
                </div>
                <ThreeDWeatherIcon iconCode={weather.icon} className="w-16 h-16" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <Droplets className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Humidity</span>
                  </div>
                  <p className="text-white font-black">{weather.humidity}%</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <Wind className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Wind</span>
                  </div>
                  <p className="text-white font-black">{weather.windSpeed} <span className="text-[10px] text-white/40">km/h</span></p>
                </div>
              </div>

              {weather.forecast && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 text-center">5-Day Forecast</p>
                  <div className="flex justify-between items-center px-1">
                    {weather.forecast.map((day, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <span className="text-[8px] font-black text-white/50 uppercase tracking-tighter">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <ThreeDWeatherIcon iconCode={day.icon} className="w-6 h-6" />
                        <span className="text-[10px] font-black text-white">{day.temp}°</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-10 text-white/50 text-xs italic">
              Weather data unavailable
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
