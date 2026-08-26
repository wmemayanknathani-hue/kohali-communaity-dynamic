import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import { MobileLayout } from "./components/layouts/MobileLayout";
import { LoginPage } from "./components/Login";
import { Home } from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Family from "./components/pages/Family";
import ExecutiveCommittee from "./components/pages/ExecutiveCommittee";
import Services from "./components/pages/Services";
import Stats from "./components/pages/Stats";
import Books from "./components/pages/Books";
import BookDetail from "./components/pages/BookDetailPage";
import Support from "./components/pages/Support";
import LiveEvents from "./components/pages/LiveEvents";
import Contact from "./components/pages/Contact";
import BusinessPromotion from "./components/pages/BusinessPromotion";
import CommitteeDetail from "./components/pages/CommitteeDetail";

import { getBookById } from "./data/books";

function BookDetailRoute() {
  const { bookId } = useParams<{ bookId: string }>();

  const book = bookId ? getBookById(bookId) : undefined;

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-xl font-bold">
            पुस्तक सापडले नाही
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            आपण शोधत असलेले पुस्तक उपलब्ध नाही.
          </p>
        </div>
      </div>
    );
  }

  return <BookDetail {...book} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* login sits outside MobileLayout — no bottom nav / sidebar here */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MobileLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/family" element={<Family />} />
          <Route path="/committee" element={<ExecutiveCommittee />} />
          <Route path="/committee/:id" element={<CommitteeDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stats" element={<Stats />} />

          <Route path="/books" element={<Books />} />

          {/* Book details */}
          <Route
            path="/books/:bookId"
            element={<BookDetailRoute />}
          />

          <Route path="/support" element={<Support />} />
          <Route path="/live-events" element={<LiveEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/business-promotion"
            element={<BusinessPromotion />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
