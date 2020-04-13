import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      email: "Email",
      password: "Password",
      login: "Login",
      loggedIn: "Logged in",
      loggedOut: "Logged out",
      pleaseEnterEmail: "Please enter an email",
      pleaseEnterPassword: "Please enter a password",
      pleaseEnterValidEmail: "Please enter a valid email",
      emailNotInOurSystem: "This email is not in our system",
      passwordNotInOurSystem: "This password is not in our system",
    },
  },
  fr: {
    translation: {
      email: "Email",
      password: "Mot de passe",
      login: "Se connecter",
      loggedIn: "Connecté",
      loggedOut: "Déconnecté",
      pleaseEnterEmail: "Veuillez entrer un email",
      pleaseEnterPassword: "Veuillez entrer un mot de passe",
      pleaseEnterValidEmail: "Veuillez entrer un email valide",
      emailNotInOurSystem: "Cet email ne se trouve pas dans notre système",
      passwordNotInOurSystem:
        "Cet mot de passe ne se trouve pas dans notre système",
    },
  },
  es: {
    translation: {
      email: "Email",
      password: "Contraseña",
      login: "Iniciar",
      loggedIn: "Conectado",
      loggedOut: "Desconectado",
      pleaseEnterEmail: "Por favor ingrese un email",
      pleaseEnterPassword: "Por favor ingrese una contraseña",
      pleaseEnterValidEmail: "Por favor ingrese un email válida",
      emailNotInOurSystem: "Este email no está en nuestro sistema",
      passwordNotInOurSystem: "Esta contraseña no está en nuestro sistema",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
