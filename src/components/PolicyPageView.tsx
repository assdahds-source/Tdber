import React from 'react';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import { BusinessProfile, PageRoute, POLICY_DOCUMENTS } from '../data/businessData';

interface PolicyPageViewProps {
  profile: BusinessProfile;
  currentRoute: Exclude<PageRoute, '/' | '/services' | '/contact' | '/google-verification'>;
  onNavigate: (route: PageRoute) => void;
}

export const PolicyPageView: React.FC<PolicyPageViewProps> = ({
  profile,
  currentRoute,
  onNavigate,
}) => {
  const activePolicy =
    POLICY_DOCUMENTS.find((doc) => doc.route === currentRoute) || POLICY_DOCUMENTS[0];

  return (
    <section className="bg-[#F8FAFC] py-12 lg:py-16 min-h-[70vh]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#047857] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Policy Sidebar */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-display px-2">
              الوثائق والسياسات القانونية
            </h2>
            <nav aria-label="قائمة السياسات القانونية" className="space-y-1">
              {POLICY_DOCUMENTS.map((doc) => {
                const isActive = doc.route === activePolicy.route;
                return (
                  <a
                    key={doc.route}
                    href={doc.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(doc.route);
                    }}
                    className={`block px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-[#047857]/10 text-[#047857] font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {doc.shortTitle}
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200 space-y-2.5 text-xs text-slate-600 px-2">
              <p className="font-semibold text-slate-900">{profile.nameAr}</p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#047857] mt-0.5 shrink-0" />
                <span>{profile.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#047857] shrink-0" />
                <span dir="ltr" className="font-mono tabular-nums">
                  {profile.phone}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#047857] shrink-0" />
                <span>{profile.email}</span>
              </p>
            </div>
          </aside>

          {/* Policy Document Body */}
          <article className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-10 space-y-8">
            <header className="space-y-3 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>وثيقة رسمية</span>
                <span aria-hidden="true">·</span>
                <span>آخر تحديث: {activePolicy.lastUpdated}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-display leading-snug">
                {activePolicy.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activePolicy.summary}
              </p>
            </header>

            <div className="space-y-7">
              {activePolicy.sections.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-950 font-display">
                    {section.heading}
                  </h2>
                  <div className="space-y-2.5">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <footer className="pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
              <span>{profile.nameAr} — {profile.fullAddress}</span>
              <span>للاستفسار القانوني: {profile.email}</span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
};
