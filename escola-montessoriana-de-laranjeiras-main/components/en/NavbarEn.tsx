import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { trackWhatsAppClick } from '../../utils/tracking';

const WHATSAPP_VISIT_EN =
  'https://wa.me/5521993311000?text=Hello!%20I%20would%20like%20to%20schedule%20a%20visit%20to%20Escola%20Montessoriana.';

export const NavbarEn: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [navHeight, setNavHeight] = useState(80);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, [isScrolled]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'The Method', to: '/en/montessori-method' },
    { name: 'Welcoming', to: '/en/welcoming' },
    { name: "Your Child's Brain", to: '/en/your-childs-brain' },
    { name: 'English', to: '/en/english-immersion' },
    { name: 'Nature', to: '/en/nature-cosmic-education' },
    { name: 'Classes', to: '/en/classes' },
    { name: 'Contact', to: '/en#contact' },
    { name: 'PT', to: '/' },
  ];

  const mobileMenuContent = mobileMenuOpen && (
    <div
      id="mobile-menu"
      ref={menuPanelRef}
      tabIndex={-1}
      role="navigation"
      aria-label="Navigation menu"
      className="xl:hidden fixed left-0 right-0 w-full max-h-[70vh] overflow-y-auto bg-montessori-green/98 backdrop-blur-sm border-t border-white/10 shadow-xl z-50 nav-mobile-menu"
      style={{ top: navHeight }}
    >
      <nav className="flex flex-col py-2 pb-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))]">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            onClick={() => setMobileMenuOpen(false)}
            className="text-white text-base font-medium py-4 px-5 min-h-[48px] flex items-center touch-manipulation active:bg-white/10 transition-colors border-b border-white/5 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]"
          >
            {link.name === 'PT' ? 'Português (PT)' : link.name}
          </Link>
        ))}
        <a
          href={WHATSAPP_VISIT_EN}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { trackWhatsAppClick(); setMobileMenuOpen(false); }}
          className="bg-montessori-gold text-montessori-dark text-center font-semibold py-4 px-5 min-h-[48px] flex items-center justify-center mx-4 mt-4 mb-2 rounded-sm touch-manipulation active:bg-[#c5a805] transition-colors [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
        >
          Book a Visit
        </a>
      </nav>
    </div>
  );

  return (
    <>
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 overflow-x-hidden ${
        isScrolled ? 'bg-montessori-green/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-black/30 backdrop-blur-[2px] py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center min-w-0 gap-4">
        <Link to="/en" className="flex items-center space-x-2 flex-shrink-0">
           {!logoError ? (
             <img
               src="/images/logo-escola.png"
               alt="Escola Montessoriana de Laranjeiras"
               className="w-10 h-10 md:w-12 md:h-12 object-contain flex-shrink-0"
               onError={() => setLogoError(true)}
             />
           ) : (
             <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-yellow-400 flex items-center justify-center rounded-full">
               <span className="font-serif font-bold text-lg md:text-xl text-yellow-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">M</span>
             </div>
           )}
           <span className="font-logo font-bold text-lg md:text-xl tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.7)]">
             Montessoriana
           </span>
        </Link>

        <div className="hidden xl:flex items-center gap-x-3 2xl:gap-x-5 flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-white hover:text-montessori-gold text-sm font-medium tracking-wide whitespace-nowrap transition-colors [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.7)]"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={WHATSAPP_VISIT_EN}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="bg-montessori-gold text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-[#c5a805] transition-colors inline-block whitespace-nowrap [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] shadow-md"
          >
            Book a Visit
          </a>
        </div>

        <div className="xl:hidden flex-shrink-0">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative text-white p-3 -m-3 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation rounded-sm transition-colors hover:bg-white/10 active:bg-white/20 focus:outline focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.9))]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
          >
            <span className="relative w-6 h-6 flex items-center justify-center">
              <Menu size={24} className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} aria-hidden={mobileMenuOpen} />
              <X size={24} className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} aria-hidden={!mobileMenuOpen} />
            </span>
          </button>
        </div>
      </div>
    </nav>
    {typeof document !== 'undefined' && createPortal(mobileMenuContent, document.body)}
    </>
  );
};
