import React, { useState } from 'react';
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { BusinessProfile, GENERATED_IMAGES, WORKFLOW_STEPS } from '../data/businessData';

interface ProcessAndMapSectionProps {
  profile: BusinessProfile;
}

export const ProcessAndMapSection: React.FC<ProcessAndMapSectionProps> = ({ profile }) => {
  const [mapLoadError, setMapLoadError] = useState(false);

  const embedMapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    profile.mapsEmbedQuery
  )}&hl=ar&z=15&output=embed`;

  return (
    <>
      {/* 4-Step Workflow Section */}
      <section id="workflow" className="bg-white py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-medium text-[#047857]">آلية العمل والتنفيذ</p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-950 font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              إجراءات واضحة من الاستشارة الأولى حتى استلام الخدمة
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              تُنفذ جميع الخطوات تحت إشراف طاقم إداري وقانوني في مقرنا بضاحية مويلح مع إتاحة المتابعة الهاتفية والحضورية للمتعاملين.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-semibold text-[#047857] text-sm">
                      {step.stepNumber}.
                    </span>
                    <span>{step.timeframe}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 font-display leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Physical Location & Google Maps Section */}
      <section id="location" className="bg-[#F8FAFC] py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* NAP Consistency Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-medium text-[#047857]">الموقع الجغرافي المعتمد</p>
                <h2 className="text-2xl font-bold text-slate-950 font-display leading-snug">
                  زيارة مقر المركز في ضاحية مويلح، الشارقة
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  يتطابق العنوان المسجل أدناه مع بيانات خرائط جوجل (Google Business Profile) وملف التعريف التجاري لضمان أعلى موثوقية عند التوثيق في Google Search Console و Google Merchant Center.
                </p>

                <div className="space-y-4 pt-2 border-t border-slate-200 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">العنوان الفعلي</span>
                      <span className="font-medium text-slate-900">{profile.fullAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">هاتف الاستقبال</span>
                      <a
                        href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                        dir="ltr"
                        className="font-mono font-medium text-slate-900 hover:text-[#047857] tabular-nums"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">البريد الرسمي</span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="font-medium text-slate-900 hover:text-[#047857]"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">ساعات العمل الرسمية</span>
                      <span className="font-medium text-slate-900 block">{profile.workingHours}</span>
                      <span className="text-xs text-slate-600">{profile.workingHoursDays}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={profile.mapsShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F172A] hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <span>الحصول على الاتجاهات عبر خرائط جوجل</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>

            {/* Interactive Google Map Embed + Exterior Fallback */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-[400px]">
              <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
                <span className="text-xs font-medium text-slate-700 truncate">
                  خريطة الموقع: {profile.streetAddress} — {profile.emirate}
                </span>
                <a
                  href={profile.mapsShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#047857] hover:underline whitespace-nowrap shrink-0"
                >
                  فتح الخريطة بحجم كامل
                </a>
              </div>

              {!mapLoadError ? (
                <div className="relative flex-1 min-h-[360px] bg-slate-100">
                  <iframe
                    title="موقع مركز تدبير — 55 Street — ضاحية مويلح — الشارقة"
                    src={embedMapSrc}
                    className="w-full h-full min-h-[360px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onError={() => setMapLoadError(true)}
                  />
                </div>
              ) : (
                <div className="relative flex-1 min-h-[360px] bg-slate-100">
                  <img
                    src={GENERATED_IMAGES.muwailehExterior}
                    alt="الواجهة الخارجية لمقر مركز تدبير في ضاحية مويلح الشارقة"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
                    <MapPin className="w-8 h-8 text-emerald-400" />
                    <p className="text-base font-semibold">{profile.fullAddress}</p>
                    <a
                      href={profile.mapsShortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-sm font-semibold bg-[#047857] hover:bg-[#065F46] rounded-lg transition-colors"
                    >
                      افتح الموقع في خرائط جوجل
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
