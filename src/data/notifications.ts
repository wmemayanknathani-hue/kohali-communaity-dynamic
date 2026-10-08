// src/data/notifications.ts

export type NotificationCategory =
  | "सूचना" // Latest notices
  | "कार्यक्रम" // Event notifications
  | "स्मरणपत्र" // Upcoming event reminders
  | "लाइव्ह" // Live event notifications
  | "घोषणा" // Community announcements
  | "व्यवसाय" // Business promotions
  | "अपडेट" // Important updates
  | "सेवा" // Service-related notifications
  | "फोटो" // Photo-related notifications
  | "व्हिडिओ" // Video-related notifications
  | "पुस्तक" // Book-related notifications
  | "इतर"; // Other

export type Notification = {
  id: string;
  title: string;
  description: string;
  date: string; // display label, e.g. "आज", "काल", "१२ ऑग"
  category: NotificationCategory;
  read: boolean;
  type: string; // backend type, e.g. "business_promotion" (see ROUTES below)
};

export const categoryLabel: Record<NotificationCategory, string> = {
  सूचना: "सूचना",
  कार्यक्रम: "कार्यक्रम",
  स्मरणपत्र: "स्मरणपत्र",
  लाइव्ह: "लाइव्ह",
  घोषणा: "घोषणा",
  अपडेट: "अपडेट",
  सेवा: "सेवा",
  व्यवसाय: "व्यवसाय",
  फोटो: "फोटो",
  व्हिडिओ: "व्हिडिओ",
  पुस्तक: "पुस्तक",
  इतर: "इतर",
};

// One accent color per category
export const categoryAccent: Record<NotificationCategory, string> = {
  सूचना: "var(--gold-500)",
  कार्यक्रम: "var(--maroon-700)",
  स्मरणपत्र: "var(--gold-500)",
  लाइव्ह: "var(--maroon-900)",
  घोषणा: "var(--gold-500)",
  अपडेट: "var(--maroon-500,var(--maroon-700))",
  सेवा: "var(--maroon-800)",
  व्यवसाय: "var(--gold-500)",
  फोटो: "var(--maroon-800)",
  व्हिडिओ: "var(--gold-500)",
  पुस्तक: "var(--maroon-800)",
  इतर: "var(--gold-500)",
};

// notification.type -> route
const ROUTES: Record<string, string> = {
  business_promotion: "/business",
  live_program: "/live-events",
  notices: "/notices",
  events: "/live-events",
  photos: "/photo-gallery",
  videos: "/video-gallery",
  books: "/books",
  commite: "/committee",
  family_member: "/family",
};

export function getNotificationRoute(type: string): string | null {
  return ROUTES[type] ?? null;
}

export function groupByDate(notifications: Notification[]) {
  const groups: { date: string; items: Notification[] }[] = [];
  for (const n of notifications) {
    const g = groups.find((g) => g.date === n.date);
    if (g) g.items.push(n);
    else groups.push({ date: n.date, items: [n] });
  }
  return groups;
}

// Dummy data for the /notifications page — replace with the same source
// your Header passes into <NotificationDropdown />.
export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "वार्षिक स्नेहसंमेलन २०२६",
    description:
      "रविवारी सकाळी १० वाजता समाज भवन येथे स्नेहसंमेलन आयोजित करण्यात आले आहे. सर्वांनी उपस्थित राहावे.",
    date: "आज",
    category: "कार्यक्रम",
    read: false,
    type: "events",
  },
  {
    id: "2",
    title: "लाइव्ह कार्यक्रम सुरू",
    description: "सत्यनारायण पूजेचे थेट प्रक्षेपण आता सुरू झाले आहे.",
    date: "आज",
    category: "लाइव्ह",
    read: false,
    type: "live_program",
  },
  {
    id: "3",
    title: "नवीन व्यवसाय जोडला गेला",
    description: "श्री गणेश किराणा स्टोअर्स आता 'आपले व्यवसाय' मध्ये उपलब्ध आहे.",
    date: "आज",
    category: "व्यवसाय",
    read: true,
    type: "business_promotion",
  },
  {
    id: "4",
    title: "महत्त्वाची सूचना",
    description: "सदस्य नोंदणी पडताळणीसाठी आपले प्रोफाइल अद्ययावत करा.",
    date: "काल",
    category: "सूचना",
    read: false,
    type: "notices",
  },
  {
    id: "5",
    title: "समिती बैठकीचे निमंत्रण",
    description: "कार्यकारी समितीची मासिक बैठक शनिवारी दुपारी ४ वाजता होईल.",
    date: "काल",
    category: "घोषणा",
    read: true,
    type: "commite",
  },
  {
    id: "6",
    title: "नवीन फोटो अल्बम",
    description: "रक्तदान शिबिराचे फोटो गॅलरीत जोडले आहेत.",
    date: "१२ ऑग",
    category: "फोटो",
    read: true,
    type: "photos",
  },
  {
    id: "7",
    title: "ग्रंथालयात नवीन पुस्तक",
    description: "कोहाळी समाजाचा इतिहास हे नवीन पुस्तक आता वाचनासाठी उपलब्ध.",
    date: "१२ ऑग",
    category: "पुस्तक",
    read: true,
    type: "books",
  },
];