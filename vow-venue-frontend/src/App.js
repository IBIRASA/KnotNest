import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventList from './pages/Eventslist';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/eventlist" element={<EventList />} />
      </Routes>
    </Router>
  );
}
export default App;

