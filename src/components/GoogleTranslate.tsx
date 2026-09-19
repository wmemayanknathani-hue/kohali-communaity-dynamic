import { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (!window.google?.translate) {
        return;
      }

      const element = document.getElementById(
        "google_translate_element"
      );

      if (!element) {
        return;
      }

      // Already initialized
      if (element.dataset.initialized === "true") {
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

      element.dataset.initialized = "true";
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    // Google already loaded
    if (window.google?.translate) {
      initGoogleTranslate();
      return;
    }

    // Script already exists
    if (document.getElementById("google-translate-script")) {
      return;
    }

    const script = document.createElement("script");

    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="google_translate_wrapper"
      style={{
        position: "fixed",
        left: "-10000px",
        top: "-10000px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <div id="google_translate_element" />
    </div>
  );
};

export default GoogleTranslate;