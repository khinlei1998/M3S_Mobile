import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import br from '../locales/br.json'
export const languageResources = {
  br: {translation: br},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;