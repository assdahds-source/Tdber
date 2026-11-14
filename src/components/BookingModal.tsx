import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { BusinessProfile, PageRoute, SERVICE_PACKAGES, ServicePackage } from '../data/businessData';

interface BookingModalProps {
  profile: BusinessProfile;
  initialPackage: ServicePackage | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  profile,
  initialPackage,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialPackage?.id || SERVICE_PACKAGES[0].id
  );
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [emirate, setEmirate] = useState('الشارقة');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'branch' | 'bank'>('branch');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderReference, setOrderReference] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialPackage) {
      setSelectedId(initialPackage.id);
    }
    setOrderReference(null);
    setErrorMsg('');
  }, [initialPackage, isOpen]);

  if (!isOpen) return null;

  const currentPkg =
    SERVICE_PACKAGES.find((p) => p.id === selectedId) || SERVICE_PACKAGES[0];
  const vatAmount = Math.round(currentPkg.priceAed * currentPkg.vatRate);
  const totalAmount = currentPkg.priceAed + vatAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim().length < 3) {
      setErrorMsg('يرجى إدخال الاسم الكامل بشكل صحيح.');
      return;
    }
    const cleanPhone = clientPhone.replace(/[\s-]/g, '');
    if (!/^(\+971|00971|0)?5[024568]\d{7}$|^(\+971|0)?[234679]\d{7}$/.test(cleanPhone)) {
      setErrorMsg('يرجى إدخال رقم هاتف إماراتي صحيح.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      setErrorMsg('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('يجب الموافقة على الشروط والأحكام وسياسة الاسترجاع قبل تأكيد الطلب.');
      return;
    }
    setErrorMsg('');

    try {
      const body = new URLSearchParams({
        'form-name': 'service-booking',
        packageTitle: currentPkg.title,
        packageSku: currentPkg.sku,
        totalAmountAed: String(totalAmount),
        clientName,
        clientPhone,
        clientEmail,
        emirate,
        paymentMethod,
      });
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    } catch {
      // Graceful fallback when previewed outside Netlify Forms runtime
    }

    setOrderReference(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium text-[#047857] mb-1">
              نموذج الحجز والفوترة الشفافة
            </p>
            <h2 id="booking-modal-title" className="text-xl font-bold text-slate-950 font-display">
              تأكيد طلب الباقة — {profile.shortBrand}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق نافذة الحجز"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderReference ? (
          <div className="space-y-5">
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#047857] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-950">
                  تم تسجيل طلب الحجز بنجاح
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  تم إنشاء مرجع الحجز الخاص بكم. سيتم التواصل معكم من مكتب {profile.streetAddress} لتثبيت المقابلة وإصدار العقد الموحد.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 text-sm">
              <div className="p-3.5 flex justify-between">
                <span className="text-slate-500">رقم المرجع</span>
                <span className="font-mono font-bold text-slate-950 tabular-nums">{orderReference}</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="text-slate-500">الباقة</span>
                <span className="font-medium text-slate-900">{currentPkg.title}</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="text-slate-500">الإجمالي شامل الضريبة (5%)</span>
                <span className="font-bold text-[#047857] tabular-nums">
                  {totalAmount.toLocaleString('en-US')} درهم إماراتي
                </span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="text-slate-500">العنوان</span>
                <span className="text-slate-900">{emirate}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0F172A] hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="booking-pkg" className="block text-xs font-medium text-slate-700 mb-1.5">
                اختر الباقة
              </label>
              <select
                id="booking-pkg"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857]"
              >
                {SERVICE_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} — {pkg.priceAed.toLocaleString('en-US')} د.إ
                  </option>
                ))}
              </select>
            </div>

            {/* Transparent Fee Breakdown Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>قيمة الباقة الأساسية ({currentPkg.sku})</span>
                <span className="font-mono tabular-nums">
                  {currentPkg.priceAed.toLocaleString('en-US')} AED
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ضريبة القيمة المضافة (5% VAT)</span>
                <span className="font-mono tabular-nums">{vatAmount.toLocaleString('en-US')} AED</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-950">
                <span>الإجمالي النهائي المستحق بالدرهم</span>
                <span className="font-mono text-[#047857] tabular-nums">
                  {totalAmount.toLocaleString('en-US')} AED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-name" className="block text-xs font-medium text-slate-700 mb-1.5">
                  الاسم الكامل للكفيل
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="الاسم كما في الهوية الإماراتية"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857]"
                />
              </div>

              <div>
                <label htmlFor="booking-phone" className="block text-xs font-medium text-slate-700 mb-1.5">
                  رقم الهاتف المتحرك
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  dir="ltr"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="0501234567"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left font-mono"
                />
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-xs font-medium text-slate-700 mb-1.5">
                  البريد الإلكتروني لإرسال الفاتورة
                </label>
                <input
                  id="booking-email"
                  type="email"
                  dir="ltr"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857] text-left"
                />
              </div>

              <div>
                <label htmlFor="booking-emirate" className="block text-xs font-medium text-slate-700 mb-1.5">
                  الإمارة
                </label>
                <select
                  id="booking-emirate"
                  value={emirate}
                  onChange={(e) => setEmirate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#047857]"
                >
                  <option value="الشارقة">الشارقة</option>
                  <option value="دبي">دبي</option>
                  <option value="عجمان">عجمان</option>
                  <option value="أبوظبي">أبوظبي</option>
                  <option value="رأس الخيمة">رأس الخيمة</option>
                  <option value="أم القيوين">أم القيوين</option>
                  <option value="الفجيرة">الفجيرة</option>
                </select>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-700 mb-2">
                وسيلة السداد المفضلة (عند تأكيد التعاقد)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('branch')}
                  className={`p-3 rounded-lg border text-right cursor-pointer transition-colors ${
                    paymentMethod === 'branch'
                      ? 'border-[#047857] bg-emerald-50/60 text-slate-950 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  الدفع في فرع مويلح
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-right cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#047857] bg-emerald-50/60 text-slate-950 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  بطاقة ائتمان / خصم
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-lg border text-right cursor-pointer transition-colors ${
                    paymentMethod === 'bank'
                      ? 'border-[#047857] bg-emerald-50/60 text-slate-950 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  تحويل بنكي رسمي
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#047857]"
              />
              <span>
                أوافق على{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('/terms');
                  }}
                  className="text-[#047857] underline font-medium cursor-pointer"
                >
                  الشروط والأحكام
                </button>{' '}
                و{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('/refund-policy');
                  }}
                  className="text-[#047857] underline font-medium cursor-pointer"
                >
                  سياسة الاسترجاع والاستبدال
                </button>{' '}
                و{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('/delivery-policy');
                  }}
                  className="text-[#047857] underline font-medium cursor-pointer"
                >
                  سياسة تنفيذ الخدمة
                </button>
                .
              </span>
            </label>

            {errorMsg && <p className="text-xs text-red-700 font-medium">{errorMsg}</p>}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#047857] hover:bg-[#065F46] rounded-lg cursor-pointer"
              >
                تأكيد طلب الباقة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
