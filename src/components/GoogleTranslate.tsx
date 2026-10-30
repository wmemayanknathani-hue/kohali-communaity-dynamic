import { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read the active googtrans cookie value, e.g. "/auto/mr" */
function getGoogTransCookie(): string {
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("googtrans="));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

/** Set the googtrans cookie on both the current host and the bare domain so
 *  Google Translate picks it up reliably. */
function setGoogTransCookie(value: string) {
  const host = window.location.hostname;
  const domain = host.replace(/^[^.]+/, ""); // e.g. ".kohalisamaj.org"
  document.cookie = `googtrans=${value};path=/`;
  if (domain && domain !== host) {
    document.cookie = `googtrans=${value};path=/;domain=${domain}`;
  }
}

/** Delete the googtrans cookie so translation resets cleanly on logout. */
export function clearGoogTransCookie() {
  const host = window.location.hostname;
  const domain = host.replace(/^[^.]+/, "");
  document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  if (domain && domain !== host) {
    document.cookie = `googtrans=;path=/;domain=${domain};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

/** Programmatically switch language via the hidden <select> Google injects. */
// function applyLanguage(langCode: string) {
//   // The cookie drives translation; set it first.
//   setGoogTransCookie(`/auto/${langCode}`);

//   // Then click the matching <option> in the hidden combo-box Google renders.
//   const select = document.querySelector<HTMLSelectElement>(
//     ".goog-te-combo"
//   );
//   if (select) {
//     select.value = langCode;
//     select.dispatchEvent(new Event("change"));
//   }
// }

/** After Google Translate rewrites the DOM, force-apply the saved language. */
function restoreLanguage() {
  const saved = localStorage.getItem("language");
  if (!saved || saved === "en") return; // "en" = no translation needed

  // If the cookie already matches, the page may already be translated;
  // still trigger the select-change so newly-loaded SPA content is caught.
  const cookie = getGoogTransCookie();
  if (!cookie.endsWith(`/${saved}`)) {
    setGoogTransCookie(`/auto/${saved}`);
  }

  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select && select.value !== saved) {
    select.value = saved;
    select.dispatchEvent(new Event("change"));
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const GoogleTranslate = () => {
  useEffect(() => {
    // ------------------------------------------------------------------
    // 1.  Inject global CSS that hides Google Translate's own UI chrome
    //     (the floating bar, logo, tooltip, banner frame, etc.)
    // ------------------------------------------------------------------
    const STYLE_ID = "gt-hide-ui-style";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        /* Hide the top banner Google injects */
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-tooltip,
        .goog-tooltip-table,
        div.skiptranslate {
          display: none !important;
          visibility: hidden !important;
        }
        /* Prevent the <body> top-margin shift Google applies */
        body {
          top: 0px !important;
        }
        /* Hide the translate widget container itself */
        #google_translate_wrapper,
        #google_translate_element {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // ------------------------------------------------------------------
    // 2.  Core init function — safe to call multiple times
    // ------------------------------------------------------------------
    const initGoogleTranslate = () => {
      if (!window.google?.translate) return;

      const element = document.getElementById("google_translate_element");
      if (!element) return;

      // Re-initialize if already done (e.g. after logout → login cycle)
      // by checking whether the combo-box is already present.
      const alreadyRendered = !!document.querySelector(".goog-te-combo");

      if (!alreadyRendered) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "mr",
            includedLanguages: "mr,en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }

      // Give the widget a moment to render, then restore the user's choice.
      setTimeout(restoreLanguage, 300);
    };

    // Always (re)register the callback so a late-loading script can call it.
    window.googleTranslateElementInit = initGoogleTranslate;

    if (window.google?.translate) {
      // Script already loaded — just (re-)apply language.
      initGoogleTranslate();
    } else if (!document.getElementById("google-translate-script")) {
      // First mount — inject the script.
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        // Script failed (network issue / ad-blocker). Clear stale cookie so
        // it doesn't block a future login attempt.
        clearGoogTransCookie();
      };
      document.body.appendChild(script);
    }

    // ------------------------------------------------------------------
    // 3.  Re-apply translation whenever the React SPA navigates (popstate)
    //     and whenever the component re-mounts after a login/logout cycle.
    // ------------------------------------------------------------------
    const handleNavigation = () => {
      // Small delay so the new page's DOM settles first.
      setTimeout(restoreLanguage, 400);
    };

    window.addEventListener("popstate", handleNavigation);

    // Also watch for React Router's programmatic pushState calls.
    const origPushState = history.pushState.bind(history);
    history.pushState = (...args) => {
      origPushState(...args);
      handleNavigation();
    };

    return () => {
      window.removeEventListener("popstate", handleNavigation);
      // Restore the original pushState when this component unmounts.
      history.pushState = origPushState;
    };
  }, []);

  return (
    // Visually hidden; CSS above also hides it but keep inline styles as
    // a belt-and-suspenders fallback.
    <div
      id="google_translate_wrapper"
      aria-hidden="true"
      style={{
        position: "fixed",
        left: "-10000px",
        top: "-10000px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div id="google_translate_element" />
    </div>
  );
};

export default GoogleTranslate;
