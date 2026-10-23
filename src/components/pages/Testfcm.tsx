import { useEffect, useState } from "react";

function FCMTest() {
  const [fcmToken, setFcmToken] = useState("");

  useEffect(() => {
    const token = window.fcm?.getFCMToken?.();

    console.log("Android FCM object:", window.fcm);
    console.log("Android FCM token:", token);

    if (typeof token === "string" && token) {
      setFcmToken(token);
    }
  }, []);

  return (
    <div>
      <h3>FCM Token Test</h3>
      <p>{fcmToken || "Wait for Token"}</p>
    </div>
  );
}

export default FCMTest;