import React from 'react';
import { motion } from 'framer-motion';

interface ThreeDWeatherIconProps {
  iconCode: string;
  className?: string;
  animate?: boolean;
}

export const ThreeDWeatherIcon: React.FC<ThreeDWeatherIconProps> = ({ iconCode, className = "w-10 h-10", animate = true }) => {
  const isNight = iconCode.endsWith('n');
  const code = iconCode.slice(0, 2);

  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatVariants = animate ? {
    animate: {
      y: [0, -3, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  } : {};

  const renderIcon = () => {
    // Shared definitions for the "smoothy" look
    const defs = (
      <defs>
        {/* Soft Sun Glow */}
        <radialGradient id="sunSmooth" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffdb4e" />
          <stop offset="70%" stopColor="#f9a825" />
          <stop offset="100%" stopColor="#ef6c00" />
        </radialGradient>
        
        {/* Glassy Cloud Gradient */}
        <linearGradient id="cloudSmooth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>

        {/* Night Moon Gradient */}
        <linearGradient id="moonSmooth" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Soft Shadow Filter */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    );

    switch (code) {
      case '01': // Clear
        return (
          <g>
            {defs}
            {isNight ? (
              <g filter="url(#softGlow)">
                <circle cx="12" cy="12" r="8" fill="url(#moonSmooth)" />
                <circle cx="15" cy="9" r="8" fill="currentColor" className="text-slate-900" />
                <motion.circle 
                  cx="6" cy="6" r="0.5" fill="white" 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }} 
                />
                <motion.circle 
                  cx="18" cy="18" r="0.5" fill="white" 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }} 
                />
              </g>
            ) : (
              <g filter="url(#softGlow)">
                <motion.circle 
                  cx="12" cy="12" r="8" 
                  fill="url(#sunSmooth)"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <circle cx="12" cy="12" r="8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
              </g>
            )}
          </g>
        );

      case '02': // Few clouds
      case '03': // Scattered
      case '04': // Broken
        return (
          <g>
            {defs}
            {code === '02' && (
              isNight ? (
                <g filter="url(#softGlow)">
                  <circle cx="16" cy="8" r="5" fill="url(#moonSmooth)" />
                  <circle cx="18" cy="6" r="5" fill="currentColor" className="text-slate-900" />
                </g>
              ) : (
                <circle cx="16" cy="8" r="5" fill="url(#sunSmooth)" filter="url(#softGlow)" />
              )
            )}
            <path 
              d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.2 0-.4 0-.6.1C15.8 7.6 13.1 6 10 6 6.1 6 3 9.1 3 13c0 .1 0 .2 0 .3C1.2 14.1 0 15.9 0 18c0 2.2 1.8 4 4 4h13.5z" 
              fill="url(#cloudSmooth)"
              filter="url(#softGlow)"
            />
            <path 
              d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.2 0-.4 0-.6.1C15.8 7.6 13.1 6 10 6 6.1 6 3 9.1 3 13c0 .1 0 .2 0 .3C1.2 14.1 0 15.9 0 18c0 2.2 1.8 4 4 4h13.5z" 
              fill="none" stroke="white" strokeWidth="0.5" opacity="0.4"
            />
          </g>
        );

      case '09': // Rain
      case '10': // Rain
        return (
          <g>
            {defs}
            <path 
              d="M17.5 15c2.5 0 4.5-2 4.5-4.5S20 6 17.5 6c-.2 0-.4 0-.6.1C15.8 3.6 13.1 2 10 2 6.1 2 3 5.1 3 9c0 .1 0 .2 0 .3C1.2 10.1 0 11.9 0 14c0 2.2 1.8 4 4 4h13.5z" 
              fill="#cbd5e1"
              filter="url(#softGlow)"
            />
            {[1, 2, 3].map((i) => (
              <motion.rect
                key={i}
                x={6 + i * 4}
                y="18"
                width="1.5"
                height="4"
                rx="0.75"
                fill="#60a5fa"
                animate={animate ? {
                  y: [0, 4, 0],
                  opacity: [0.3, 1, 0.3]
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear"
                }}
              />
            ))}
          </g>
        );

      case '11': // Storm
        return (
          <g>
            {defs}
            <path 
              d="M17.5 15c2.5 0 4.5-2 4.5-4.5S20 6 17.5 6c-.2 0-.4 0-.6.1C15.8 3.6 13.1 2 10 2 6.1 2 3 5.1 3 9c0 .1 0 .2 0 .3C1.2 10.1 0 11.9 0 14c0 2.2 1.8 4 4 4h13.5z" 
              fill="#64748b"
              filter="url(#softGlow)"
            />
            <motion.path
              d="M10 16l-1 3h2l-1 3"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              animate={animate ? { opacity: [0, 1, 0, 1, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>
        );

      case '13': // Snow
        return (
          <g>
            {defs}
            <path 
              d="M17.5 15c2.5 0 4.5-2 4.5-4.5S20 6 17.5 6c-.2 0-.4 0-.6.1C15.8 3.6 13.1 2 10 2 6.1 2 3 5.1 3 9c0 .1 0 .2 0 .3C1.2 10.1 0 11.9 0 14c0 2.2 1.8 4 4 4h13.5z" 
              fill="url(#cloudSmooth)"
              filter="url(#softGlow)"
            />
            {[1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={6 + i * 4}
                cy="20"
                r="1.2"
                fill="white"
                animate={animate ? {
                  y: [0, 4],
                  opacity: [0, 1, 0],
                } : {}}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "linear"
                }}
              />
            ))}
          </g>
        );

      default:
        return (
          <g>
            {defs}
            <circle cx="12" cy="12" r="8" fill="url(#cloudSmooth)" filter="url(#softGlow)" />
          </g>
        );
    }
  };

  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.g variants={floatVariants} animate="animate">
        {renderIcon()}
      </motion.g>
    </motion.svg>
  );
};
