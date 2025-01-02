import { setLocaleFromUrl } from './utils/i18n';
import '@unocss/reset/tailwind-compat.css';
import './app.css';

(async () => {
  await setLocaleFromUrl();
  import('./components/ak-header');
  import('./components/ak-cipher');
})();
