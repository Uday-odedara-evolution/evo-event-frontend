// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async () => {
//   // Provide a static locale, fetch a user setting,
//   // read from `cookies()`, `headers()`, etc.
//   const locale = "hi";

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });

import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "../services/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
