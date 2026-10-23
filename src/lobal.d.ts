export {};

declare global {
  interface Window {
    fcm?: {
      getFCMToken?: () => string;
    };
  }
}