import { useState } from "react";
import Onboarding from "./Onboarding.jsx";
import MainApp from "./MainApp.jsx";

export default function App() {
  const [profile, setProfile] = useState(null);

  return (
    <div className="app-shell">
      <div className="app-frame">
        {!profile
          ? <Onboarding onComplete={(ans) => setProfile(ans)} />
          : <MainApp profile={profile} onReset={() => setProfile(null)} />
        }
      </div>
    </div>
  );
}
