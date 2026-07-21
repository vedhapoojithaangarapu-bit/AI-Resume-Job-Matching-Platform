import "../styles/Landing.css";

import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import GoalSelection from "../components/GoalSelection.jsx";
import UploadSection from "../components/UploadSection.jsx";
import ReportModules from "../components/ReportModules.jsx";
import Footer from "../components/Footer.jsx";
import HelpButton from "../components/HelpButton.jsx";

import { useState } from "react";

function Landing() {
  const [selectedGoal, setSelectedGoal] = useState("job-match");

  return (
    <div className="page">
      <Navbar />

      <main>
        <Hero />

        <GoalSelection
          selectedGoal={selectedGoal}
          onSelectGoal={setSelectedGoal}
        />

        <UploadSection selectedGoal={selectedGoal} />

        <ReportModules />
      </main>

      <Footer />

      <HelpButton />
    </div>
  );
}

export default Landing;