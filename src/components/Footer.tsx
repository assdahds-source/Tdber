import React from 'react';
import { ExternalLink, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { BusinessProfile, PageRoute } from '../data/businessData';

interface FooterProps {
  profile: BusinessProfile;
  onNavigate: (route: PageRoute, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute, sectionId?: string) => {
    e.preventDefault();
    onNavigate(route, sectionId);
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Identity & NAP */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white font-display">{profile.nameAr}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              مركز خدمات عمالة مساعدة معتمد في ضاحية مويلح، إمارة الشارقة. نلتزم بالشفافية الكاملة في التسعير بالدرهم الإماراتي وتطبيق العقود الموحدة وضمانات الاستبدال.
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <p>{profile.licenseReference}</p>
              <p className="font-mono tabular-nums">TRN: {profile.trnNumber}</p>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">أقسام الموقع</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, '/')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  الصفحة الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleNav(e, '/services')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  الباقات والخدمات المعتمدة
                </a>
              </li>
              <li>
                <a
                  href="/#workflow"
                  onClick={(e) => handleNav(e, '/', 'workflow')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  آلية التعاقد والتنفيذ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, '/contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  حجز موعد واستشارة
                </a>
              </li>
              <li>
                <a
                  href="/google-verification"
                  onClick={(e) => handleNav(e, '/google-verification')}
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>دليل التوثيق (Search Console & Merchant)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Mandatory Merchant Center Policies */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">السياسات واللوائح القانونية</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleNav(e, '/privacy-policy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  سياسة الخصوصية وحماية البيانات
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNav(e, '/terms')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  الشروط والأحكام العامة
                </a>
              </li>
              <li>
                <a
                  href="/refund-policy"
                  onClick={(e) => handleNav(e, '/refund-policy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  سياسة الاسترجاع والاستبدال والإلغاء
                </a>
              </li>
              <li>
                <a
                  href="/delivery-policy"
                  onClick={(e) => handleNav(e, '/delivery-policy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  سياسة تنفيذ وتوصيل الخدمة
                </a>
              </li>
              <li>
                <a
                  href="/billing-policy"
                  onClick={(e) => handleNav(e, '/billing-policy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  سياسة الدفع والفوترة بالدرهم
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified NAP Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">بيانات المقر والتواصل</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{profile.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  dir="ltr"
                  className="hover:text-white transition-colors font-mono tabular-nums"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-white transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  {profile.workingHours} — {profile.workingHoursDays}
                </span>
              </li>
              <li className="pt-1">
                <a
                  href={profile.mapsShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  <span>عرض الموقع الموثق على خرائط جوجل</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile.nameAr}. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-2">
            <span>الأسعار بالدرهم الإماراتي (AED)</span>
            <span aria-hidden="true">·</span>
            <span>ضريبة القيمة المضافة 5% موضحة في الفاتورة</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
