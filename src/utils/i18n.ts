import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from '../generated/locale-codes';

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale: string) =>
    import(/* @vite-ignore */ `../generated/locales/${locale}`),
});

export const setLocaleFromUrl = async () => {
  await setLocale(
    new URLSearchParams(location.search).get('lang') || sourceLocale,
  );
};
