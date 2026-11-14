import React, { useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { BusinessProfile, FAQ_ITEMS, PageRoute, SERVICE_PACKAGES } from '../data/businessData';

interface FaqAndContactSectionProps {
  profile: BusinessProfile;
  onNavigate: (route: PageRoute) => void;
  standaloneContact?: boolean;
}

export const FaqAndContactSection: React.FC<FaqAndContactSectionProps> = ({
  profile,
  onNavigate,
  standaloneContact = false,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  // Contact form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICE_PACKAGES[0].title);
  const [notes, setNotes] = useState('');
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { [key: string]: string } = {};

    if (fullName.trim().length < 3) {
      nextErrors.fullName = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل).';
    }

    const normalizedPhone = phone.replace(/[\s-]/g, '');
    if (!/^(\+971|00971|0)?5[024568]\d{7}$|^(\+971|0)?[234679]\d{7}$/.test(normalizedPhone)) {
      nextErrors.phone = 'يرجى إدخال رقم هاتف إماراتي صحيح (مثال: 0501234567).';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'يرجى إدخال بريد إلكتروني صحيح.';
    }

    if (!acceptedPolicies) {
      nextErrors.acceptedPolicies = 'يرجى الموافقة على سياسة الخصوصية والشروط والأحكام للمتابعة.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const refCode = `TDB-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(refCode);
  };

  return (
    <section
      id="contact"
      className={`bg-white ${standaloneContact ? 'py-12 lg:py-16' : 'py-16 lg:py-20'}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* FAQ Column */}
          {!standaloneContact && (
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#047857]">الأسئلة المتكررة</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 font-display tracking-tight">
                  إجابات واضحة حول العقود والضمان والرسوم
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  تغطي هذه الإجابات أبرز استفسارات الأسر المتعاملة مع مركزنا في ضاحية مويلح، ويمكنكم الاطلاع على البنود التفصيلية في صفحات السياسات القانونية.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 bg-[#F8FAFC]">
                {FAQ_ITEMS.map((item) => {
                  const isOpen = openFaqId === item.id;
                  return (
                    <div key={item.id} className="bg-white first:rounded-t-xl last:rounded-b-xl">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                        className="w-full px-5 py-4 text-right flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#047857]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  توثيق النشاط التجاري على Google Search Console & Merchant Center
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  يضم الموقع ملفات <span className="font-mono">sitemap.xml</span> و{' '}
                  <span className="font-mono">robots.txt</span> وبيانات{' '}
                  <span className="font-mono">Schema.org</span> مطابقة تماماً لعنوان خرائط جوجل، بالإضافة إلى صفحات السياسات الخمس المطلوبة.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('/google-verification')}
                  className="text-xs font-semibold text-[#047857] hover:underline pt-1 cursor-pointer"
                >
                  فتح دليل وإعدادات التوثيق للمالك ←
                </button>
              </div>
            </div>
          )}

          {/* Contact & Consultation Form Column */}
          <div className={standaloneContact ? 'lg:col-span-8 lg:col-start-3' : 'lg:col-span-6'}>
            <div className="border border-slate-200 rounded-xl p-6 sm:p-8 bg-[#F8FAFC]">
              <div className="space-y-2 mb-6">
                <p className="text-xs font-medium text-[#047857]">خدمة المتعاملين المباشرة</p>
                <h2 className="text-2xl font-bold text-slate-950 font-display">
                  تقديم طلب استشارة أو استفسار تعاقدي
                </h2>
                <p className="text-sm text-slate-600">
                  يتم الرد على جميع الطلبات خلال ساعات العمل الرسمية في فرع {profile.district}.
                </p>
              </div>

              {submittedRef ? (
                <div className="bg-white border border-emerald-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 text-[#047857]">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <h3 className="text-lg font-bold font-display text-slate-950">
                      تم استلام طلبكم بنجاح
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    شكراً لتواصلكم مع {profile.nameAr}. تم تسجيل طلبكم المرجعي وسيتواصل معكم مستشار خدمة المتعاملين لتحديد موعد المقابلة أو استكمال المستندات.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">رقم المرجع</span>
                      <span className="font-mono font-semibold text-slate-900 tabular-nums">
                        {submittedRef}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">الباقة المختارة</span>
                      <span className="font-medium text-slate-900">{selectedService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">رقم التواصل</span>
                      <span dir="ltr" className="font-mono text-slate-900 tabular-nums">
                        {phone}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                      setAcceptedPolicies(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    إرسال طلب جديد
                  </button>
                </div>
              ) : (
                <form onSubmit={validateAndSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 mb-1.5">
                      الاسم الكامل
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: أحمد محمد المنصوري"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857]"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-700 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-700 mb-1.5">
                        رقم الهاتف المتحرك (الإمارات)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 000 0000"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left font-mono"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-700 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 mb-1.5">
                        البريد الإلكتروني
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        dir="ltr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-700 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-medium text-slate-700 mb-1.5">
                      الباقة أو الخدمة المطلوبة
                    </label>
                    <select
                      id="contact-service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857]"
                    >
                      {SERVICE_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.title}>
                          {pkg.title} ({pkg.priceAed.toLocaleString('en-US')} د.إ)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-notes" className="block text-xs font-medium text-slate-700 mb-1.5">
                      ملاحظات إضافية (اختياري)
                    </label>
                    <textarea
                      id="contact-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="اذكر التفضيلات المطلوبة مثل المهارات أو الموعد المناسب لزيارة المركز..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857]"
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedPolicies}
                        onChange={(e) => setAcceptedPolicies(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#047857] focus:ring-[#047857]"
                      />
                      <span>
                        أقر بالاطلاع والموافقة على{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate('/privacy-policy')}
                          className="text-[#047857] underline font-medium cursor-pointer"
                        >
                          سياسة الخصوصية
                        </button>{' '}
                        و{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate('/terms')}
                          className="text-[#047857] underline font-medium cursor-pointer"
                        >
                          الشروط والأحكام
                        </button>{' '}
                        الخاصة بمركز تدبير — ضاحية مويلح.
                      </span>
                    </label>
                    {errors.acceptedPolicies && (
                      <p className="text-xs text-red-700 mt-1">{errors.acceptedPolicies}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-5 py-3 text-sm font-semibold text-white bg-[#047857] hover:bg-[#065F46] rounded-lg transition-colors cursor-pointer"
                  >
                    إرسال طلب الاستشارة
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
