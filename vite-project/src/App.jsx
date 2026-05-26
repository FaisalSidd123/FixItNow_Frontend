import './App.css';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <About />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </>
  );
}

export default App;