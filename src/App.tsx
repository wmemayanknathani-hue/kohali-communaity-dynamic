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
import Business from "./components/pages/Business";
import BusinessDetails from "./components/BusinessDetails";
import CommitteeDetail from "./components/pages/CommitteeDetail";
import Notices from "./components/pages/Notices";
import PhotoGallery from "./components/pages/PhotoGallery";
import VideoGallery from "./components/pages/VideoGallery";
import Events from "./components/pages/Events";
// import EventDetails from "./components/pages/EventDetails";
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
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MobileLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/family" element={<Family />} />
          <Route path="/committee" element={<ExecutiveCommittee />} />
          <Route path="/committee/:id" element={<CommitteeDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookDetailRoute />} />
          <Route path="/support" element={<Support />} />
          <Route path="/live-events" element={<LiveEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business" element={<Business />} />
          <Route path="/business/:businessId" element={<BusinessDetails />} />
          <Route path="/business-promotion" element={<BusinessPromotion />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/events" element={<Events />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/video-gallery" element={<VideoGallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
