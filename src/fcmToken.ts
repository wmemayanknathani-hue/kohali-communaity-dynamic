
const FCM_STORAGE = "fcm";

function normalizeToken(value: string | null): string {
  const token = (value || "")
    .trim()
    .replace(/^["']+|["']+$/g, "")
    .trim();

  if (!token || /^(null|no|fcm)$/i.test(token)) {
    return "";
  }

  return token;
}

export function saveFcmToken(token: string): void {
  localStorage.setItem(FCM_STORAGE, token);

  document.cookie =
    `fcm=${encodeURIComponent(token)}; max-age=${30 * 86400}; path=/; SameSite=Lax`;
}

export function getFcmToken(): string {
  // 1. First get FCM from URL
  const url = new URL(window.location.href);
  const urlToken = normalizeToken(url.searchParams.get("fcm"));

  if (urlToken) {
    saveFcmToken(urlToken);

    // Remove token from URL after saving
    url.searchParams.delete("fcm");
    window.history.replaceState(
      {},
      document.title,
      url.pathname + url.search + url.hash
    );

    return urlToken;
  }

  // 2. Otherwise get from localStorage
  const storedToken = normalizeToken(
    localStorage.getItem(FCM_STORAGE)
  );

  if (storedToken) return storedToken;

  // 3. Otherwise get from browser cookie
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("fcm="));

  if (cookie) {
    try {
      const cookieToken = normalizeToken(
        decodeURIComponent(cookie.substring(4))
      );

      if (cookieToken) {
        localStorage.setItem(FCM_STORAGE, cookieToken);
        return cookieToken;
      }
    } catch {
      // Ignore malformed cookie
    }
  }

  return "";
}
