import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileLayout } from "./components/layouts/MobileLayout";
import { LoginPage } from "./components/Login";
import { Home } from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Family from "./components/pages/Family";
import { ExecutiveCommittee } from "./components/pages/ExecutiveCommittee";
import Services from "./components/pages/Services";
import Stats from "./components/pages/Stats";
import { Support } from "./components/pages/Support";
import { LiveEvents } from "./components/pages/LiveEvents";
import { Contact } from "./components/pages/Contact";
import { BusinessPromotion } from "./components/pages/BusinessPromotion";

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
          <Route path="/services" element={<Services />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/support" element={<Support />} />
          <Route path="/live-events" element={<LiveEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business-promotion" element={<BusinessPromotion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}