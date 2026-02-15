"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'ka', label: 'ქართული' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    if (nextLocale !== locale) {
      startTransition(() => {
        router.replace(`/${nextLocale}${pathname.substring(3)}`);
      });
    }
  };

  return (
    <select value={locale} onChange={handleChange} disabled={isPending} className="rounded border px-2 py-1">
      {locales.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}