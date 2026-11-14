/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { BookingModal } from './components/BookingModal';
import { FaqAndContactSection } from './components/FaqAndContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PolicyPageView } from './components/PolicyPageView';
import { ProcessAndMapSection } from './components/ProcessAndMapSection';
import { ServicesSection } from './components/ServicesSection';
import { VerificationCenterView } from './components/VerificationCenterView';
import {
  BusinessProfile,
  DEFAULT_BUSINESS_PROFILE,
  PageRoute,
  POLICY_DOCUMENTS,
  ServicePackage,
} from './data/businessData';

const VALID_ROUTES: PageRoute[] = [
  '/',
  '/services',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/refund-policy',
  '/delivery-policy',
  '/billing-policy',
  '/google-verification',
];

function resolvePathToRoute(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return (VALID_ROUTES.includes(clean as PageRoute) ? clean : '/') as PageRoute;
}

export default function App() {
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const saved = localStorage.getItem('tadbeer_muwaileh_profile_v1');
      return saved ? { ...DEFAULT_BUSINESS_PROFILE, ...JSON.parse(saved) } : DEFAULT_BUSINESS_PROFILE;
    } catch {
      return DEFAULT_BUSINESS_PROFILE;
    }
  });

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    resolvePathToRoute(window.location.pathname)
  );
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState<ServicePackage | null>(null);

  useEffect(() => {
    const onPopState = () => {
      setCurrentRoute(resolvePathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Keep page <title>, canonical link, and Search Console verification meta tag synced
  useEffect(() => {
    const policyMatch = POLICY_DOCUMENTS.find((p) => p.route === currentRoute);
    if (policyMatch) {
      document.title = `${policyMatch.title} | ${profile.nameAr}`;
    } else if (currentRoute === '/services') {
      document.title = `الباقات والخدمات المعتمدة | ${profile.nameAr}`;
    } else if (currentRoute === '/contact') {
      document.title = `تواصل معنا وحجز موعد | ${profile.nameAr}`;
    } else if (currentRoute === '/google-verification') {
      document.title = `إعدادات التوثيق Search Console & Merchant | ${profile.nameAr}`;
    } else {
      document.title = `${profile.nameAr} | خدمات العمالة المنزلية المعتمدة`;
    }

    const metaVerification = document.querySelector('meta[name="google-site-verification"]');
    if (metaVerification) {
      metaVerification.setAttribute('content', profile.verificationToken);
    }

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      const base = (profile.domain || window.location.origin).replace(/\/+$/, '');
      canonicalEl.setAttribute('href', currentRoute === '/' ? `${base}/` : `${base}${currentRoute}`);
    }
  }, [currentRoute, profile]);

  const handleNavigate = (route: PageRoute, sectionId?: string) => {
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
      setCurrentRoute(route);
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateProfile = (updated: BusinessProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem('tadbeer_muwaileh_profile_v1', JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }
  };

  const openBookingWithPackage = (pkg: ServicePackage | null = null) => {
    setBookingPackage(pkg);
    setBookingOpen(true);
  };

  const isPolicyRoute = POLICY_DOCUMENTS.some((doc) => doc.route === currentRoute);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Header
        profile={profile}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenBooking={() => openBookingWithPackage(null)}
      />

      <main className="flex-1">
        {currentRoute === '/' && (
          <>
            <HeroSection
              profile={profile}
              onNavigate={handleNavigate}
              onOpenBooking={() => openBookingWithPackage(null)}
            />
            <ServicesSection onSelectPackageForBooking={(pkg) => openBookingWithPackage(pkg)} />
            <ProcessAndMapSection profile={profile} />
            <FaqAndContactSection profile={profile} onNavigate={handleNavigate} />
          </>
        )}

        {currentRoute === '/services' && (
          <ServicesSection
            standalone
            onSelectPackageForBooking={(pkg) => openBookingWithPackage(pkg)}
          />
        )}

        {currentRoute === '/contact' && (
          <>
            <FaqAndContactSection
              profile={profile}
              onNavigate={handleNavigate}
              standaloneContact
            />
            <ProcessAndMapSection profile={profile} />
          </>
        )}

        {isPolicyRoute && (
          <PolicyPageView
            profile={profile}
            currentRoute={
              currentRoute as Exclude<
                PageRoute,
                '/' | '/services' | '/contact' | '/google-verification'
              >
            }
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === '/google-verification' && (
          <VerificationCenterView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer profile={profile} onNavigate={handleNavigate} />

      <BookingModal
        profile={profile}
        initialPackage={bookingPackage}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

