import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Save } from 'lucide-react';
import { BusinessProfile, PageRoute, SERVICE_PACKAGES } from '../data/businessData';

interface VerificationCenterViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
  onNavigate: (route: PageRoute) => void;
}

export const VerificationCenterView: React.FC<VerificationCenterViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [formState, setFormState] = useState<BusinessProfile>(profile);
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formState);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cleanDomain = formState.domain.replace(/\/+$/, '');
  const metaTagSnippet = `<meta name="google-site-verification" content="${formState.verificationToken}" />`;

  const sitemapSnippet = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${cleanDomain}/</loc><priority>1.0</priority></url>
  <url><loc>${cleanDomain}/services</loc><priority>0.9</priority></url>
  <url><loc>${cleanDomain}/contact</loc><priority>0.8</priority></url>
  <url><loc>${cleanDomain}/privacy-policy</loc><priority>0.7</priority></url>
  <url><loc>${cleanDomain}/terms</loc><priority>0.7</priority></url>
  <url><loc>${cleanDomain}/refund-policy</loc><priority>0.7</priority></url>
  <url><loc>${cleanDomain}/delivery-policy</loc><priority>0.7</priority></url>
  <url><loc>${cleanDomain}/billing-policy</loc><priority>0.7</priority></url>
</urlset>`;

  const jsonLdSnippet = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: formState.nameAr,
      url: cleanDomain,
      telephone: formState.phone,
      email: formState.email,
      hasMap: formState.mapsShortUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: formState.streetAddress,
        addressLocality: 'الشارقة',
        addressRegion: 'إمارة الشارقة',
        addressCountry: 'AE',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'باقات خدمات العمالة المنزلية',
        itemListElement: SERVICE_PACKAGES.map((pkg) => ({
          '@type': 'Offer',
          sku: pkg.sku,
          price: String(pkg.priceAed),
          priceCurrency: 'AED',
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: pkg.title,
          },
        })),
      },
    },
    null,
    2
  );

  return (
    <section className="bg-[#F8FAFC] py-12 lg:py-16 min-h-[75vh]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#047857] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الموقع الرئيسي</span>
          </button>
        </div>

        <div className="space-y-2 max-w-3xl">
          <p className="text-xs font-medium text-[#047857]">مركز الامتثال والتوثيق الرقمي</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-display">
            إعدادات التوثيق لـ Google Search Console و Google Merchant Center
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            حدّث بيانات الاتصال الفعلية والنطاق الخاص بك ورمز التحقق من Search Console لتتطابق تلقائياً عبر جميع صفحات الموقع والفوتر والبيانات المنظمة (JSON-LD).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form to customize NAP and Search Console Verification Token */}
          <form
            onSubmit={handleSave}
            className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4"
          >
            <h2 className="text-lg font-bold text-slate-950 font-display border-b border-slate-200 pb-3">
              1. تحديث بيانات النشاط ورمز التحقق
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                اسم النشاط التجاري (كما في ملف Google Business)
              </label>
              <input
                type="text"
                value={formState.nameAr}
                onChange={(e) => setFormState({ ...formState, nameAr: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  رقم الهاتف الرسمي
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  البريد الإلكتروني الرسمي على نفس النطاق
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                النطاق الأساسي للموقع (Canonical URL)
              </label>
              <input
                type="url"
                dir="ltr"
                value={formState.domain}
                onChange={(e) => setFormState({ ...formState, domain: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                رمز التحقق من Google Search Console (Meta Content)
              </label>
              <input
                type="text"
                dir="ltr"
                value={formState.verificationToken}
                onChange={(e) =>
                  setFormState({ ...formState, verificationToken: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                رقم التسجيل الضريبي (TRN) / المرجع التجاري
              </label>
              <input
                type="text"
                dir="ltr"
                value={formState.trnNumber}
                onChange={(e) => setFormState({ ...formState, trnNumber: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left font-mono"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#047857] hover:bg-[#065F46] rounded-lg cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>تطبيق البيانات على الموقع</span>
              </button>
              {savedNotice && (
                <span className="text-xs font-semibold text-[#047857]">
                  تم تحديث البيانات الحية بنجاح
                </span>
              )}
            </div>
          </form>

          {/* Checklist & Generated Code Snippets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-950 font-display border-b border-slate-200 pb-3">
                2. قائمة التحقق من سياسات جوجل
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                  <span>
                    تطابق العنوان الفعلي (55 Street، ضاحية مويلح، الشارقة) مع رابط خرائط جوجل الموثق.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                  <span>
                    توفر صفحات السياسات الخمس (الخصوصية، الشروط، الاسترجاع والاستبدال، تنفيذ الخدمة، الدفع والضرائب) بروابط مباشرة في التذييل.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                  <span>
                    عرض الأسعار بالعملة المحلية (AED) مع إفصاح صريح عن ضريبة 5% ومدة التنفيذ قبل الإرسال.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#047857] mt-1 shrink-0" />
                  <span>
                    تضمين ملفات <span className="font-mono text-xs">robots.txt</span> و{' '}
                    <span className="font-mono text-xs">sitemap.xml</span> وبيانات{' '}
                    <span className="font-mono text-xs">LocalBusiness JSON-LD</span>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Copyable Snippets */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">وسم التحقق (Search Console Meta)</h3>
                <button
                  type="button"
                  onClick={() => handleCopy('meta', metaTagSnippet)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#047857] hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKey === 'meta' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <pre
                dir="ltr"
                className="p-3 bg-slate-950 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto"
              >
                {metaTagSnippet}
              </pre>

              <div className="flex items-center justify-between pt-2">
                <h3 className="text-sm font-bold text-slate-900">ملف خريطة الموقع (sitemap.xml)</h3>
                <button
                  type="button"
                  onClick={() => handleCopy('sitemap', sitemapSnippet)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#047857] hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKey === 'sitemap' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <pre
                dir="ltr"
                className="p-3 bg-slate-950 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto max-h-40"
              >
                {sitemapSnippet}
              </pre>

              <div className="flex items-center justify-between pt-2">
                <h3 className="text-sm font-bold text-slate-900">البيانات المنظمة (JSON-LD)</h3>
                <button
                  type="button"
                  onClick={() => handleCopy('jsonld', jsonLdSnippet)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#047857] hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKey === 'jsonld' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <pre
                dir="ltr"
                className="p-3 bg-slate-950 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto max-h-48"
              >
                {jsonLdSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
