import Vue from 'vue';
import VueI18n from 'vue-i18n';

import NavbarTranslations from './translations/NavbarMain';
import HomePageTranslations from './translations/HomePage';
import ProfileTranslations from './translations/ProfileSkills';

Vue.use(VueI18n);

const messages = {
  en: {
    ...NavbarTranslations.en,
    ...HomePageTranslations.en,
    ...ProfileTranslations.en,
  },
  pt: {
    ...NavbarTranslations.pt,
    ...HomePageTranslations.pt,
    ...ProfileTranslations.pt,
  }
}

const i18n = new VueI18n({
  locale: 'pt', // Default Languge
  messages,
});

export default i18n;
