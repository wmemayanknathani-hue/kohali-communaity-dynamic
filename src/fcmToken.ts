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

function getFcmCookie(): string {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("fcm="));

  if (!cookie) return "";

  try {
    return normalizeToken(decodeURIComponent(cookie.substring(4)));
  } catch {
    return "";
  }
}

export function saveFcmToken(token: string): void {
  localStorage.setItem(FCM_STORAGE, token);

  document.cookie =
    `fcm=${encodeURIComponent(token)}; max-age=${30 * 86400}; path=/; SameSite=Lax`;
}

export async function getFcmToken(): Promise<{
  token: string;
  dname: {
    brandName: string;
    deviceName: string;
    androidId: string;
    deviceUUID: string;
  };
}> {
  const url = new URL(window.location.href);

  // 1. URL token gets priority
  const urlToken = normalizeToken(url.searchParams.get("fcm"));
  const dName = url.searchParams.get("dname") || "";

  // 2. LocalStorage
  const storedToken = normalizeToken(
    localStorage.getItem(FCM_STORAGE)
  );

  // 3. Cookie
  const cookieToken = getFcmCookie();

  const token = urlToken || storedToken || cookieToken;

  // Decode dname values into separate variables
  const dnameParts = Object.fromEntries(
    dName.split(",").map((item) => {
      const index = item.indexOf(":");

      if (index === -1) {
        return [item.trim(), ""];
      }

      return [
        item.substring(0, index).trim(),
        item.substring(index + 1).trim(),
      ];
    })
  );

  const dname = {
    brandName: dnameParts["Brand Name"] || "",
    deviceName: dnameParts["Device Name"] || "",
    androidId: dnameParts["Android ID"] || "",
    deviceUUID: dnameParts["Device UUID"] || "",
  };

  if (!token) {
    console.log("FCM token not found");
    return {
      token: "",
      dname,
    };
  }

  // Save token
  saveFcmToken(token);

  // Remove FCM from URL
  if (urlToken) {
    url.searchParams.delete("fcm");

    window.history.replaceState(
      {},
      document.title,
      url.pathname + url.search + url.hash
    );
  }

  return {
    token,
    dname,
  };
}