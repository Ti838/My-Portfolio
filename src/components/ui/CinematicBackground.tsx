"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for the background container
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.4, 0.2]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let w: number, h: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${Math.random() * 50 + 100}, ${Math.random() * 100 + 150}, 255, ${Math.random() * 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > w) this.x = 0;
        if (this.x < 0) this.x = w;
        if (this.y > h) this.y = 0;
        if (this.y < 0) this.y = h;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((w * h) / 15000), 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw subtle connections
      ctx.strokeStyle = "rgba(100, 150, 255, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      style={{ y, opacity }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]"
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,#0f172a,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,#1e1b4b,transparent_50%)]" />
      
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </motion.div>
  );
}
