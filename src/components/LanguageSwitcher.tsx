import Link from "next/link";
import { localeLabels, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  getHref: (locale: Locale) => string;
  label: string;
};

export function LanguageSwitcher({
  currentLocale,
  getHref,
  label,
}: LanguageSwitcherProps) {
  return (
    <nav className="language-switcher" aria-label={label}>
      <span>{label}</span>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={getHref(locale)}
              aria-current={locale === currentLocale ? "page" : undefined}
            >
              {localeLabels[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
