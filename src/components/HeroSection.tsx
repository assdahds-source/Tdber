import React from 'react';
import { ArrowUpLeft, MapPin } from 'lucide-react';
import { BusinessProfile, GENERATED_IMAGES, PageRoute } from '../data/businessData';

interface HeroSectionProps {
  profile: BusinessProfile;
  onNavigate: (route: PageRoute, sectionId?: string) => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Asymmetric 2-column hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
                <span>ضاحية مويلح، شارع 55</span>
                <span aria-hidden="true">·</span>
                <span>إمارة الشارقة</span>
                <span aria-hidden="true">·</span>
                <span>الامارات العربية المتحدة</span>
              </div>

              <h1
                className="font-display font-bold text-slate-950 leading-[1.2] tracking-tight"
                style={{ fontSize: 'clamp(2.1rem, 3.6vw, 3.25rem)', textWrap: 'balance' }}
              >
                خدمات العمالة المنزلية المعتمدة في ضاحية مويلح بضمان قانوني وتسعير شفاف
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                نقدم في مقرنا بشارع 55 في ضاحية مويلح باقات الاستقدام المباشر، التشغيل الشهري المرن، وتخليص معاملات الإقامة بعقود موحدة ورسوم واضحة بالدرهم الإماراتي وسياسات استبدال واسترداد موثقة.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#047857] hover:bg-[#065F46] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
                >
                  حجز باقة أو طلب استشارة
                </button>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services');
                  }}
                  className="px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  مقارنة الباقات والأسعار
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                <a
                  href={profile.mapsShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#047857] transition-colors font-medium"
                >
                  <MapPin className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>فتح موقع المركز على خرائط جوجل</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 shrink-0" />
                </a>
                <span className="text-slate-300 hidden sm:inline" aria-hidden="true">|</span>
                <span className="text-slate-500">{profile.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Visual Carrier Column */}
          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={GENERATED_IMAGES.heroLobby}
                alt="قاعة استقبال المتعاملين في مركز تدبير ضاحية مويلح الشارقة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-6 text-white">
                <p className="text-xs text-slate-200 mb-1">المقر الرئيسي المعتمد — الشارقة</p>
                <p className="text-sm sm:text-base font-semibold leading-snug">
                  {profile.fullAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Trust & Compliance Strip */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-500">01. المقر الفعلي</p>
            <p className="text-sm font-semibold text-slate-900">55 Street، ضاحية مويلح</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              استقبال مباشر للمراجعين ومقابلات حضورية داخل فرع الشارقة.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-500">02. الشفافية المالية</p>
            <p className="text-sm font-semibold text-slate-900 tabular-nums">أسعار معلنة بالدرهم (AED)</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              تفصيل كامل للرسوم وضريبة القيمة المضافة 5% قبل تأكيد الطلب.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-500">03. الضمان والاستبدال</p>
            <p className="text-sm font-semibold text-slate-900">عقد موحد واسترداد نسبي</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              ضمان استبدال واسترجاع موثق وفق اللائحة التنظيمية المعتمدة.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-500">04. التوثيق الرقمي</p>
            <p className="text-sm font-semibold text-slate-900">متوافق مع سياسات جوجل</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              بيانات منظمة وروابط سياسات واضحة لـ Search Console و Merchant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
