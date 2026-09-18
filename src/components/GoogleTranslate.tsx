import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate = () => {
  const location = useLocation();

  // Initialize Google Translate
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) {
        return;
      }

      // Avoid creating multiple instances
      const element = document.getElementById(
        "google_translate_element"
      );

      if (element && element.innerHTML !== "") {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "mr",
          includedLanguages: "mr,en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");

      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  // Re-apply language whenever route changes
  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("language") || "mr";

    if (savedLanguage === "mr") {
      return;
    }

    const applyLanguage = () => {
      const googleSelect = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement | null;

      if (!googleSelect) {
        return false;
      }

      if (googleSelect.value !== savedLanguage) {
        googleSelect.value = savedLanguage;
        googleSelect.dispatchEvent(new Event("change"));
      }

      return true;
    };

    // React route render hone ke baad Google Translate ko apply karo
    const timer1 = setTimeout(() => {
      applyLanguage();
    }, 300);

    const timer2 = setTimeout(() => {
      applyLanguage();
    }, 800);

    const timer3 = setTimeout(() => {
      applyLanguage();
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  return (
    <div
      id="google_translate_element"
      style={{
        display: "none",
      }}
    />
  );
};

export default GoogleTranslate;