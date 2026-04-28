/**
 * FAQ page — accents use CSS variables from src/styles/theme.css:
 * - Active accordion / links: --site-accent-purple / --site-accent-purple-hover (Layout.tsx nav: purple-600)
 * - Page subtitle / optional CTAs: --site-accent-orange (Home.tsx CTA: orange-500)
 */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ChevronDown } from "lucide-react";
import { faqSections, type FaqItem } from "./faqContent";

const SECTION_ANCHOR_ID = "faq";

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const triggerId = `faq-trigger-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <h3 className="text-base font-semibold text-slate-900 m-0">
        <button
          type="button"
          id={triggerId}
          className={`flex w-full items-center justify-between gap-4 py-5 pl-4 pr-4 text-left transition-colors duration-200 ease-out md:pl-5 md:pr-5 rounded-md md:rounded-lg border-l-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--site-accent-purple)] focus-visible:ring-offset-2 ${
            isOpen
              ? "text-[color:var(--site-accent-purple)] border-[color:var(--site-accent-purple)] bg-[var(--site-accent-purple-subtle-bg)]"
              : "text-slate-900 border-transparent hover:bg-[var(--site-accent-purple-subtle-bg)]"
          }`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="flex-1 pr-2">{item.question}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[color:var(--site-accent-purple)] transition-transform duration-200 ease-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div
            className={`faq-answer px-4 pb-5 pt-0 md:px-5 md:pb-6 border-l-4 ${
              isOpen ? "border-[color:var(--site-accent-purple)]" : "border-transparent"
            }`}
            dangerouslySetInnerHTML={{ __html: item.answerHtml }}
          />
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const location = useLocation();
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash === `#${SECTION_ANCHOR_ID}`) {
      const el = document.getElementById(SECTION_ANCHOR_ID);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash, location.pathname]);

  const toggleItem = (sectionId: string, itemId: string) => {
    const key = `${sectionId}:${itemId}`;
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex-1 pt-20 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-10 md:mb-14">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Registration, classes, tuition, the competitive program, recitals, and the{" "}
            <span className="text-[color:var(--site-accent-orange)] font-semibold">Rothesay Ballet + DATA</span>{" "}
            partnership — answers for families new and returning.
          </p>
        </header>

        <div id={SECTION_ANCHOR_ID} className="scroll-mt-24 space-y-12 md:space-y-16">
          {faqSections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              <h2
                id={`${section.id}-heading`}
                className="text-2xl font-bold text-slate-900 px-4 pt-6 pb-2 md:px-6 md:pt-8 border-b border-slate-100 bg-slate-50/80"
              >
                {section.title}
              </h2>
              <div className="divide-y divide-slate-100 px-2 md:px-3 pb-2">
                {section.items.map((item) => {
                  const key = `${section.id}:${item.id}`;
                  const isOpen = openKey === key;
                  return (
                    <FaqAccordionItem
                      key={item.id}
                      item={item}
                      isOpen={isOpen}
                      onToggle={() => toggleItem(section.id, item.id)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-500">
          Dynamic Academy of The Arts — 6 Market Street, Quispamsis NB E2E 4B1 —{" "}
          <a href="tel:+15068471164" className="font-semibold text-[color:var(--site-accent-purple)] hover:text-[color:var(--site-accent-purple-hover)] underline underline-offset-2 transition-colors duration-150">
            (506) 847-1164
          </a>{" "}
          —{" "}
          <a
            href="mailto:dynamicacademyofthearts@gmail.com"
            className="font-semibold text-[color:var(--site-accent-purple)] hover:text-[color:var(--site-accent-purple-hover)] underline underline-offset-2 transition-colors duration-150"
          >
            dynamicacademyofthearts@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
