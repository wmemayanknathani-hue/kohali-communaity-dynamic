import { useEffect, useState } from "react";
import { getFcmToken } from "../../fcmToken";

export default function FCMTest() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fcm = getFcmToken();

    setToken(fcm);

    console.log("FCM token:", fcm || "Token nahi mila");
  }, []);

  return (
    <div>
      <h3>FCM Token Test</h3>
      <p>{token ? "FCM token mil gaya" : "FCM token nahi mila"}</p>
      {token && (
        <button onClick={() => navigator.clipboard.writeText(token)}>
          Copy Token
        </button>
      )}
    </div>
  );
}