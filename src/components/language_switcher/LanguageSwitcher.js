"use client";
import { setUserLocale } from "@/services/locale";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations("components");

  const handleChange = value => {
    setUserLocale(value);
  };

  const languages = [
    { code: "en", name: t("localeSwitcher.english") },
    { code: "hi", name: t("localeSwitcher.hindi") },
  ];

  return (
    <div className="fixed top-0 right-0 m-2">
      <div className="flex">
        {languages.map(({ code, name }) => (
          <button
            key={`lang-option-${code}`}
            onClick={() => handleChange(code)}
            className="mx-2 cursor-pointer text-blue-700 underline"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
