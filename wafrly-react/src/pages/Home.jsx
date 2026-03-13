import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Pricing from './Pricing';
import Features from '../components/Features';
import Wealth from '../components/Wealth';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <div id="hero-root"><Hero /></div>
            <div id="pricing-root"><Pricing /></div>
            <div id="features-root"><Features /></div>
            <div id="wealth-root"><Wealth /></div>
            <Footer />
        </>
    );
};

export default Home;
