import React, { useState } from 'react';
import { Check, Info, X } from 'lucide-react';
import { PackageCategory, SERVICE_PACKAGES, ServicePackage } from '../data/businessData';

interface ServicesSectionProps {
  onSelectPackageForBooking: (pkg: ServicePackage) => void;
  standalone?: boolean;
}

const FILTER_TABS: { id: PackageCategory; label: string }[] = [
  { id: 'all', label: 'جميع الباقات' },
  { id: 'traditional', label: 'الاستقدام ونقل الكفالة' },
  { id: 'flexible', label: 'الباقة المرنة (شهري)' },
  { id: 'residency', label: 'الإقامة والفحص الطبي' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectPackageForBooking,
  standalone = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('all');
  const [inspectedPackage, setInspectedPackage] = useState<ServicePackage | null>(null);

  const filteredPackages =
    activeCategory === 'all'
      ? SERVICE_PACKAGES
      : SERVICE_PACKAGES.filter((pkg) => pkg.category === activeCategory);

  return (
    <section
      id="services"
      className={`bg-[#F8FAFC] ${standalone ? 'py-12 lg:py-16' : 'py-16 lg:py-20'} border-b border-slate-200`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Heading & Interactive Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium text-[#047857]">الباقات والخدمات المعتمدة</p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-950 font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              باقات واضحة بالدرهم الإماراتي مع تفصيل الضمان ومدة التنفيذ
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              تُعرض كافة الباقات بأسعارها الأساسية قبل ضريبة القيمة المضافة (5%) مع توضيح الشروط والأحكام وآلية الاستبدال والاسترجاع لكل باقة على حدة.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="تصفية الباقات حسب النوع"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start md:self-auto"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredPackages.map((pkg) => {
            const vatAmount = Math.round(pkg.priceAed * pkg.vatRate);
            const totalWithVat = pkg.priceAed + vatAmount;

            return (
              <article
                key={pkg.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Package Image */}
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden border-b border-slate-200 relative">
                    <img
                      src={pkg.image}
                      alt={pkg.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div className="space-y-2">
                      {/* Clean unboxed metadata separator */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-medium text-[#047857]">{pkg.indexLabel}</span>
                        <span>{pkg.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{pkg.sku}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.merchantAttributes.availability}</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-950 font-display leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{pkg.subtitle}</p>
                    </div>

                    {/* Transparent AED Pricing Breakdown */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 flex flex-wrap items-baseline justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">{pkg.billingCycle}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-slate-950 tabular-nums font-display">
                            {pkg.priceAed.toLocaleString('en-US')}
                          </span>
                          <span className="text-xs font-semibold text-slate-700">درهم إماراتي (AED)</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-left text-xs text-slate-600 space-y-0.5 tabular-nums">
                        <p>+ ضريبة 5%: {vatAmount.toLocaleString('en-US')} د.إ</p>
                        <p className="font-semibold text-slate-900">
                          الإجمالي شامل الضريبة: {totalWithVat.toLocaleString('en-US')} د.إ
                        </p>
                      </div>
                    </div>

                    {/* Key Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-4">
                      <div>
                        <span className="text-slate-500 block mb-0.5">مدة العقد / الإنجاز</span>
                        <span className="font-medium text-slate-900">{pkg.durationLabel}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">التنفيذ والتسليم</span>
                        <span className="font-medium text-slate-900">{pkg.deliveryTime}</span>
                      </div>
                    </div>

                    {/* Deliverables List */}
                    <ul className="space-y-2 pt-1">
                      {pkg.includedItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 sm:px-7 py-4 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectPackageForBooking(pkg)}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#047857] hover:bg-[#065F46] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    طلب هذه الباقة
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectedPackage(pkg)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Info className="w-4 h-4 shrink-0" />
                    <span>تفاصيل الشروط والضمان</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Package Specifications & Merchant Transparency Modal */}
      {inspectedPackage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pkg-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setInspectedPackage(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{inspectedPackage.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{inspectedPackage.sku}</span>
                </div>
                <h3 id="pkg-modal-title" className="text-xl font-bold text-slate-950 font-display">
                  {inspectedPackage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedPackage(null)}
                aria-label="إغلاق التفاصيل"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">{inspectedPackage.summary}</p>

            <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 text-sm">
              <div className="p-3.5 flex justify-between gap-4">
                <span className="text-slate-500">السعر الأساسي</span>
                <span className="font-semibold text-slate-950 tabular-nums">
                  {inspectedPackage.priceAed.toLocaleString('en-US')} درهم إماراتي (AED)
                </span>
              </div>
              <div className="p-3.5 flex justify-between gap-4">
                <span className="text-slate-500">ضريبة القيمة المضافة (5%)</span>
                <span className="font-medium text-slate-900 tabular-nums">
                  {Math.round(inspectedPackage.priceAed * inspectedPackage.vatRate).toLocaleString('en-US')} درهم إماراتي
                </span>
              </div>
              <div className="p-3.5 flex justify-between gap-4 bg-slate-50">
                <span className="font-medium text-slate-800">الإجمالي النهائي المستحق</span>
                <span className="font-bold text-[#047857] tabular-nums">
                  {(
                    inspectedPackage.priceAed +
                    Math.round(inspectedPackage.priceAed * inspectedPackage.vatRate)
                  ).toLocaleString('en-US')}{' '}
                  درهم إماراتي
                </span>
              </div>
              <div className="p-3.5 flex justify-between gap-4">
                <span className="text-slate-500">الضمان المعتمد</span>
                <span className="text-slate-900 text-left">{inspectedPackage.warrantyLabel}</span>
              </div>
              <div className="p-3.5 flex justify-between gap-4">
                <span className="text-slate-500">نطاق التغطية</span>
                <span className="text-slate-900">{inspectedPackage.merchantAttributes.serviceArea}</span>
              </div>
              <div className="p-3.5 flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="text-slate-500 shrink-0">سياسة الإلغاء والاسترداد</span>
                <span className="text-slate-900 sm:text-left">
                  {inspectedPackage.merchantAttributes.cancellationRule}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setInspectedPackage(null)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                إغلاق
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = inspectedPackage;
                  setInspectedPackage(null);
                  onSelectPackageForBooking(target);
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#047857] hover:bg-[#065F46] rounded-lg cursor-pointer"
              >
                متابعة لطلب الباقة
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
