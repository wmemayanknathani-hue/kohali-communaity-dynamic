import book1 from "../assets/book-history.jpg";
import book2 from "../assets/book-inspiration.jpg";
import book3 from "../assets/book-research.jpg";
import book4 from "../assets/book-ebook.jpg";
import book5 from "../assets/book-documents.jpg";

export type Book = {
  id: string;
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  pages: string;
  description: string;
  highlights?: string[];
  pdfUrl?: string;
};

// Public sample PDF used for online viewing (demo).
const SAMPLE_PDF = "https://www.orimi.com/pdf-test.pdf";


export const books: Book[] = [
  {
    id: "kohali-itihas",
    image: book1,
    category: "समाज इतिहास",
    title: "कोहळी समाजाचा इतिहास",
    author: "संपादक मंडळ",
    date: "जाने. २०२४",
    pages: "२४८",
    description:
      "कोहळी समाजाचा इतिहास, परंपरा, संस्कृती आणि सामाजिक वाटचाल यांचा सविस्तर आढावा घेणारे हे पुस्तक आहे.",
    highlights: [
      "कोहळी समाजाचा इतिहास",
      "समाजाची परंपरा आणि संस्कृती",
      "महत्त्वाच्या व्यक्तिमत्त्वांचा परिचय",
      "सामाजिक विकासाचा आढावा",
    ],
    pdfUrl: SAMPLE_PDF,
  },

  {
    id: "preranadayi-vyaktimatve",
    image: book2,
    category: "प्रेरणादायी साहित्य",
    title: "प्रेरणादायी व्यक्तिमत्वे",
    author: "प्रेरणा प्रकाशन",
    date: "मार्च २०२४",
    pages: "१८६",
    description:
      "समाजासाठी प्रेरणादायी कार्य करणाऱ्या व्यक्तिमत्त्वांची माहिती आणि त्यांच्या कार्याचा परिचय.",
    highlights: [
      "प्रेरणादायी व्यक्तिमत्त्वे",
      "समाजासाठी केलेले कार्य",
      "यशोगाथा",
    ],
    pdfUrl: SAMPLE_PDF,
  },

  {
    id: "samaj-sanshodhan",
    image: book3,
    category: "समाज संशोधन",
    title: "समाज संशोधन",
    author: "प्रा. डॉ. अनिल देशमुख",
    date: "जून २०२३",
    pages: "३१२",
    description:
      "समाजाच्या विविध पैलूंचा अभ्यास आणि संशोधनात्मक माहिती या पुस्तकामध्ये दिली आहे.",
    highlights: [
      "समाजाचा अभ्यास",
      "संशोधनात्मक माहिती",
      "सामाजिक परिस्थितीचा आढावा",
    ],
    pdfUrl: SAMPLE_PDF,
  },

  {
    id: "digital-ebooks",
    image: book4,
    category: "ई-बुक्स",
    title: "डिजिटल ई-बुक्स",
    author: "डिजिटल प्रकाशन समिती",
    date: "ऑक्टो. २०२४",
    pages: "१२८",
    description:
      "डिजिटल स्वरूपात उपलब्ध असलेल्या विविध समाजोपयोगी पुस्तकांचा संग्रह.",
    highlights: [
      "डिजिटल स्वरूप",
      "ऑनलाइन वाचन",
      "सोपे आणि जलद उपलब्धता",
    ],
    pdfUrl: SAMPLE_PDF,
  },

  {
    id: "samaj-dastavej",
    image: book5,
    category: "समाज दस्तऐवज",
    title: "समाज दस्तऐवज",
    author: "कोहळी समाज विकास मंडळ",
    date: "डिसें. २०२३",
    pages: "९६",
    description:
      "कोहळी समाजाशी संबंधित महत्त्वाचे दस्तऐवज आणि ऐतिहासिक नोंदी यांचा संग्रह.",
    highlights: [
      "ऐतिहासिक दस्तऐवज",
      "महत्त्वाच्या नोंदी",
      "समाज विकासाशी संबंधित माहिती",
    ],
    pdfUrl: SAMPLE_PDF,
  },
];

export function getBookById(id: string) {
  return books.find((book) => book.id === id);
}
