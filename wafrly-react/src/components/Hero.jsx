import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const categories = [
    { name: "Electronics", color: "black" },
    { name: "Women's Fashion", color: "red" },
    { name: "Men's Fashion", color: "green" },
    { name: "Beauty & Health", color: "black" },
    { name: "Grocery", color: "green" },
    { name: "Gadgets", color: "red" },
    { name: "Trending", color: "black" },
    { name: "Accessories", color: "red" }
];

const Hero = () => {
    const navigate = useNavigate();
    const ctaRef = useRef(null);
    const heroSectionRef = useRef(null);
    const shapesRef = useRef([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updatePositions = () => {
            if (!heroSectionRef.current || !ctaRef.current || shapesRef.current.length === 0) return;

            const heroRect = heroSectionRef.current.getBoundingClientRect();
            const ctaRect = ctaRef.current.getBoundingClientRect();

            // Position relative to the hero section container
            const ctaCenter = {
                x: ctaRect.left - heroRect.left + ctaRect.width / 2,
                y: ctaRect.top - heroRect.top + ctaRect.height / 2
            };

            shapesRef.current.forEach((shape, i) => {
                if (!shape) return;
                const angle = (i / categories.length) * Math.PI * 2;
                const initialDist = 350 + ((i * 40) % 150);
                const startX = heroRect.width / 2 + Math.cos(angle) * initialDist;
                const startY = heroRect.height / 2 + Math.sin(angle) * initialDist;

                const targetX = ctaCenter.x;
                const targetY = ctaCenter.y;

                shape.style.left = '0';
                shape.style.top = '0';

                if (isHovered) {
                    shape.style.transition = 'all 1.0s cubic-bezier(0.25, 1, 0.5, 1)';
                    shape.style.transform = `translate(${targetX}px, ${targetY - 10}px) translate(-50%, -50%) rotate(0deg) scale(0.6)`;
                    shape.style.opacity = '0.4';
                    shape.style.filter = 'blur(4px)';
                } else {
                    const rotation = i * 20 - 45;
                    shape.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
                    shape.style.transform = `translate(${startX}px, ${startY}px) translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
                    shape.style.opacity = '1';
                    shape.style.filter = 'blur(0px)';
                }
            });
        };

        updatePositions();
        window.addEventListener('resize', updatePositions);
        return () => window.removeEventListener('resize', updatePositions);
    }, [isHovered]);

    return (
        <section className="hero-section" ref={heroSectionRef}>
            <div className="morphic-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="floating-shapes-container">
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        ref={el => shapesRef.current[i] = el}
                        className={`floating-rect shape-${i} color-${cat.color}`}
                        data-index={i}
                    >
                        <span className="shape-label">{cat.name}</span>
                    </div>
                ))}
            </div>

            <div className="hero-content">
                <h1 className="hero-title">Finance for the<br /><span className="highlight">Design-Obsessed</span></h1>
                <p className="hero-subtitle">Experience the next generation of wealth management with premium visuals and effortless tracking.</p>
                <button
                    id="hero-cta"
                    ref={ctaRef}
                    className="get-started-btn"
                    onClick={() => navigate('/signup')}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;
