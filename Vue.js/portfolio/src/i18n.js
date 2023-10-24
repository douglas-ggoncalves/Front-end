import { createI18n } from 'vue-i18n';
import NavbarTranslations from './translations/NavbarMain';
import HomePageTranslations from './translations/HomePage';
import ProfileTranslations from './translations/ProfileSkills';
import ProjectCards from './translations/ProjectCards';


const messages = {
  en: {
    welcomeMessage: "Welcome to Vue 3",
    ...NavbarTranslations.en,
    ...HomePageTranslations.en,
    ...ProfileTranslations.en,
    ...ProjectCards.en,
    greetings: [
      { url: "home", title: "Home", icon: 'mdi-home' },
        { url: "skills", title: "Skills", icon: 'mdi-hammer-wrench' },
        { url: "projects", title: "Projects", icon: 'mdi-account-box-multiple-outline'},
        { url: "contact", title: "Contact", icon: 'mdi-at' }
    ]
  },
  pt: {
    welcomeMessage: "Bem-vindo ao Vue 3",
    ...NavbarTranslations.pt,
    ...HomePageTranslations.pt,
    ...ProfileTranslations.pt,
    ...ProjectCards.pt,
    greetings: [
      { url: "home", title: "Home", icon: 'mdi-home' },
        { url: "skills", title: "Skills", icon: 'mdi-hammer-wrench' },
        { url: "projects", title: "Projects", icon: 'mdi-account-box-multiple-outline'},
        { url: "contact", title: "Contact", icon: 'mdi-at' }
    ]
  }
}

const i18n = createI18n({
  locale: 'pt', // idioma padrão
 // fallbackLocale: 'en', // idioma de fallback
  messages,
});

export default i18n;