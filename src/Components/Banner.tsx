import React, { useEffect, useRef } from "react";
import { Button } from "@nextui-org/button";
import { gsap } from "gsap";

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const scrollToUrl = () => {
    const urlSection = document.getElementById("url");
    if (urlSection) {
      urlSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Initial timeline setup
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // Animating the main container background with a fade-in effect
    tl.fromTo(bannerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })

      // Animating title text
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )

      // Animating subtitle text
      .fromTo(
        subtitleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.7"
      )

      // Animating buttons with a stagger effect
      .fromTo(
        Array.from(buttonsRef.current?.children ?? []),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
        "-=0.5"
      );
  }, []);

  useEffect(() => {
    // Create animated background particles
    const createParticle = () => {
      const particles = document.getElementById("particles");
      if (!particles) return;

      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(59, 130, 246, ${Math.random() * 0.5})`;
      particle.style.borderRadius = "50%";

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
        },
      });
    };

    // Initialize particles
    for (let i = 0; i < 20; i++) {
      createParticle();
    }

    // Animate analytics cards
    const cards = document.querySelectorAll(".analytics-card");
    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <div
      ref={bannerRef}
      className="flex h-[95vh] lg:h-[90vh] justify-center flex-col items-start lg:py-36 px-12 sm:px-20 lg:px-52 gradient-bg"
    >
      <div id="particles"></div>
      <h1 ref={titleRef} className="text-white text-5xl sm:text-6xl lg:text-7xl jost-boldest text-center">
        Transform Your Long URLs Into{" "}
        <span className="text-blue-500">Short Links</span>
      </h1>
      <h1
        ref={subtitleRef}
        className="text-white text-2xl sm:text-3xl lg:text-5xl my-14 jost-boldest text-center flex h-auto flex-wrap"
      >
        Shorten links individually or in bulk, track their performance, and make
        sharing easier than ever before.
      </h1>

      <div
        ref={buttonsRef}
        className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Button
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-lg text-white rounded-lg transform transition-all duration-200 hover:scale-105 font-medium"
          style={{ fontFamily: "Jost, sans-serif" }}
          onClick={scrollToUrl}
        >
          Get Started - It's Free
        </Button>
        <Button
          className="px-8 py-3 bg-transparent border text-lg border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg transform transition-all duration-200 hover:scale-105 font-medium"
          style={{ fontFamily: "Jost, sans-serif" }}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
