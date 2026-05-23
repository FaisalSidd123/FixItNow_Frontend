import './App.css';
import { useState } from 'react';

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

function App() {

  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar setPage={setPage} />

      {page === "home" && (
        <>
          <Hero />
          <Services />
          <Stats />
          <About />
          <Testimonials />
          <CTABanner />
          <Footer />
        </>
      )}

      {page === "signin" && <SignIn />}

      {page === "signup" && <SignUp />}
    </>
  );
}

export default App;
