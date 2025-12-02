import React from "react";
import landingVideo from "../assets/webdesign_demo.mp4";
import mobileVideo from '../assets/mobdesign_demoo.mp4'; 
import netSummaryImage from '../assets/net_1.png'; 
import { useNavigate } from "react-router-dom"; 

export default function Net() {
    const navigate = useNavigate();
  return (
    <div className="px-7 py-10 flex flex-col items-center text-center">
      <button
        onClick={() => navigate("/")}
        className="self-start mb-6 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        ← Back To Home
      </button>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">NE Environment Trust</h1>
      <p className="text-gray-600 max-w-xl leading-relaxed mb-8">
      Collaborated on a six-person team to plan, build, and ship a full-stack web application. We followed Agile practices and met regularly with stakeholders to gather requirements and share progress.
      </p>
<ul className="text-gray-700 text-sm md:text-base list-disc list-inside text-left mb-8 max-w-lg">
  <li>Developed internal tools for grant tracking and reporting</li>
  <li>.NET Core • JavaScript • MVC • SQL • Azure • Razor Pages</li>

</ul>

<div className="w-full max-w-4xl px-4 md:px-0"> {/* Wrapper for size control */}
          <img 
              src={netSummaryImage}
              alt="NET Project Horizontal Summary"
              // Tailwind classes for display:
              // w-full: Takes up full width of parent (max-w-4xl)
              // rounded-lg: Nice rounded corners
              // shadow-xl: Adds a nice depth effect
              // border: Optional border to frame it
              className="w-full rounded-lg shadow-xl border border-gray-200"
          />
      </div>

      {/* Footer or CTA */}
      <p className="text-gray-500 mt-8 text-sm">
        Reach out to chat more about this experience!
      </p>
    </div>
  );
}
