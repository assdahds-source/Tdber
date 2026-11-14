import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BusinessProfile, PageRoute } from '../data/businessData';

interface HeaderProps {
  profile: BusinessProfile;
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, sectionId?: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentRoute,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: PageRoute,
    sectionId?: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(route, sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display hover:text-[#047857] transition-colors"
        >
          {profile.shortBrand}
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors hover:text-slate-950 ${
              currentRoute === '/' ? 'text-[#047857] font-semibold' : ''
            }`}
          >
            الرئيسية
          </a>
          <a
            href="/services"
            onClick={(e) => handleLinkClick(e, '/services')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors hover:text-slate-950 ${
              currentRoute === '/services' ? 'text-[#047857] font-semibold' : ''
            }`}
          >
            الخدمات والباقات
          </a>
          <a
            href="/#location"
            onClick={(e) => handleLinkClick(e, '/', 'location')}
            className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-slate-950"
          >
            الموقع والخريطة
          </a>
          <a
            href="/refund-policy"
            onClick={(e) => handleLinkClick(e, '/refund-policy')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors hover:text-slate-950 ${
              ['/privacy-policy', '/terms', '/refund-policy', '/delivery-policy', '/billing-policy'].includes(
                currentRoute
              )
                ? 'text-[#047857] font-semibold'
                : ''
            }`}
          >
            السياسات القانونية
          </a>
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors hover:text-slate-950 ${
              currentRoute === '/contact' ? 'text-[#047857] font-semibold' : ''
            }`}
          >
            تواصل معنا
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#047857] hover:bg-[#065F46] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
          >
            طلب خدمة الآن
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            الرئيسية
          </a>
          <a
            href="/services"
            onClick={(e) => handleLinkClick(e, '/services')}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            الخدمات والباقات
          </a>
          <a
            href="/#location"
            onClick={(e) => handleLinkClick(e, '/', 'location')}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            الموقع والخريطة
          </a>
          <a
            href="/refund-policy"
            onClick={(e) => handleLinkClick(e, '/refund-policy')}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            السياسات القانونية والاسترجاع
          </a>
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            تواصل معنا
          </a>
        </div>
      )}
    </header>
  );
};
