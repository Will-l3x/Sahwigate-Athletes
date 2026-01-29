import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationForm';
import { CreateEventForm } from './components/CreateEventForm';
import { CreateClubForm } from './components/CreateClubForm';
import { ClubDashboard } from './components/ClubDashboard';
import { ClubDetails } from './components/ClubDetails';
import { LandingPage } from './components/LandingPage';
import { AthleteDashboard } from './components/AthleteDashboard';
import { LiveTracker } from './components/LiveTracker';
import { AthleteEvents } from './components/AthleteEvents';
import { AthletePassport } from './components/AthletePassport';
import { AthleteResults } from './components/AthleteResults';
import { ClubRoster } from './components/ClubRoster';
import { ClubEvents } from './components/ClubEvents';
import { ClubCreateEventForm } from './components/ClubCreateEventForm';
import { ClubFinance } from './components/ClubFinance';
import { ClubMerch } from './components/ClubMerch';
import { AthleteClubDiscovery } from './components/AthleteClubDiscovery';
import { OrganizerAnalytics } from './components/OrganizerAnalytics';
import { OrganizerMedical } from './components/OrganizerMedical';
import { OrganizerLogistics } from './components/OrganizerLogistics';
import { OrganizerMerch } from './components/OrganizerMerch';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { LoginPage } from './components/LoginPage';

// Layouts
import { AthleteLayout } from './layouts/AthleteLayout';
import { ClubLayout } from './layouts/ClubLayout';
import { OrganizerLayout } from './layouts/OrganizerLayout';

// Placeholders
import * as P from './components/Placeholders';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/live" element={<LiveTracker />} />

        {/* PORAL: ATHLETE */}
        <Route path="/athlete" element={<AthleteLayout />}>
          <Route index element={<Navigate to="/athlete/dashboard" replace />} />
          <Route path="dashboard" element={<AthleteDashboard />} />
          <Route path="events" element={<AthleteEvents />} />
          <Route path="clubs" element={<AthleteClubDiscovery />} />
          <Route path="passport" element={<AthletePassport />} />
          <Route path="results" element={<AthleteResults />} />
          {/* <Route path="club" element={<P.AthleteClub />} /> Removed legacy link */}
        </Route>

        {/* PORTAL: CLUB ADMIN */}
        <Route path="/club" element={<ClubLayout />}>
          <Route index element={<Navigate to="/club/dashboard" replace />} />
          <Route path="dashboard" element={<ClubDashboard />} />
          <Route path="events" element={<ClubEvents />} />
          <Route path="events/new" element={<ClubCreateEventForm />} />
          <Route path="roster" element={<ClubRoster />} />
          <Route path="finance" element={<ClubFinance />} />
          <Route path="kit" element={<ClubMerch />} />
          <Route path="settings" element={<P.ClubSettings />} />
          <Route path=":id" element={<ClubDetails />} /> {/* Legacy mapping for now */}
        </Route>

        {/* PORTAL: ORGANIZER */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route index element={<Navigate to="/organizer/dashboard" replace />} />
          <Route path="dashboard" element={<OrganizerDashboard />} />
          <Route path="events/new" element={<CreateEventForm />} />
          <Route path="logistics" element={<OrganizerLogistics />} />
          <Route path="medical" element={<OrganizerMedical />} />
          <Route path="analytics" element={<OrganizerAnalytics />} />
          <Route path="merch" element={<OrganizerMerch />} />
        </Route>

        {/* LEGACY REDIRECTS (To prevent broken links during dev) */}
        <Route path="/dashboard" element={<Navigate to="/athlete/dashboard" replace />} />
        <Route path="/club-dashboard" element={<Navigate to="/club/dashboard" replace />} />
        <Route path="/create-event" element={<Navigate to="/organizer/events/new" replace />} />
        <Route path="/create-club" element={<CreateClubForm />} /> {/* Needs its own home in Club Portal? or Public? Keeping public for now */}

      </Routes>
    </Router>
  );
}

export default App;
