import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export default function LinkAnalyticsBanner()  {
  useEffect(() => {
    // Create animated background particles
    const createParticle = () => {
      const particles = document.getElementById('particles');
      if (!particles) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(59, 130, 246, ${Math.random() * 0.5})`;
      particle.style.borderRadius = '50%';
      
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      
      particles.appendChild(particle);
      
      gsap.to(particle, {
        y: -window.innerHeight,
        x: startX + (Math.random() - 0.5) * 200,
        duration: Math.random() * 5 + 5,
        opacity: 0,
        ease: "none",
        onComplete: () => {
          particle.remove();
          createParticle();
        }
      });
    };

    // Initialize particles
    for (let i = 0; i < 20; i++) {
      createParticle();
    }

    // Animate analytics cards
    const cards = document.querySelectorAll('.analytics-card');
    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <div className="gradient-bg min-h-screen relative">
      {/* Animated background particles */}
      <div id="particles"></div>

      <div className="flex min-h-[70vh] justify-center flex-row items-start py-10 px-4 md:px-20 lg:px-52 relative z-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8 h-full justify-start items-start animate__animated animate__fadeInLeft">
          <h1 className="text-white text-4xl md:text-7xl font-bold">
            Smart Link
            <span className="text-blue-500 stat-number">Analytics</span>
          </h1>
          <div className="relative">
            <h2 className="text-white text-2xl md:text-4xl my-10 font-bold">
              Transform Data into Insights
            </h2>
            <div className="floating absolute -right-10 -top-5">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            Unlock powerful insights with real-time analytics. Track, analyze, and optimize your links with advanced metrics and visualizations.
          </p>

          <div className="flex my-10 flex-col sm:flex-row gap-4">
            <button className="glow-button px-8 py-3 bg-blue-500 hover:bg-blue-600 text-lg text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
                Get Started
              </span>
            </button>
            <button className="px-8 py-3 bg-transparent text-lg border border-gray-700 hover:border-blue-500 text-gray-300 rounded-lg font-medium transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Learn More
              </span>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex w-1/2 h-full p-10 justify-center items-center animate__animated animate__fadeInRight">
          <div className="w-full space-y-6">
            {/* Real-time Analytics Card */}
            <div className="analytics-card bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-lg">Real-time Analytics</h3>
                  <p className="text-gray-400">Monitor performance instantly</p>
                  <div className="mt-2">
                    <span className="text-blue-400 text-2xl font-bold stat-number">99.9%</span>
                    <span className="text-gray-400 text-sm ml-2">Accuracy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic Insights Card */}
            <div className="analytics-card bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-lg">Global Reach</h3>
                  <p className="text-gray-400">Track worldwide engagement</p>
                  <div className="mt-2">
                    <span className="text-blue-400 text-2xl font-bold stat-number">190+</span>
                    <span className="text-gray-400 text-sm ml-2">Countries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Reports Card */}
            <div className="analytics-card bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-lg">Smart Reports</h3>
                  <p className="text-gray-400">AI-powered insights</p>
                  <div className="mt-2">
                    <span className="text-blue-400 text-2xl font-bold stat-number">24/7</span>
                    <span className="text-gray-400 text-sm ml-2">Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
