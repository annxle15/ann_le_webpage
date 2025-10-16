import React from "react";
import landingVideo from "../assets/webdesign_demo.mp4";
import mobileVideo from '../assets/mobdesign_demoo.mp4'; 
import netSummaryImage from '../assets/net_1.png'; 
import { useNavigate } from "react-router-dom"; 

export default function Work() {
    const navigate = useNavigate();
  return (
    <div className="px-7 py-10 flex flex-col items-center text-center">
      <button
        onClick={() => navigate("/")}
        className="self-start mb-6 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        ← Back To Home
      </button>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">Work</h1>

      <h1 className="text-2xl font-semibold tracking-tight mb-4">Milliman</h1>
<ul className="text-gray-700 text-sm md:text-base list-disc list-inside text-left mb-8 max-w-lg">
  <li>Built API integrations that connected payroll and application systems</li>
  <li>Implemented SAML SSO for seamless and secure sign-ins</li>
  <li>Shipped production code used by employers, brokers, and clients nationwide</li>
  <li>Designed SQL schemas, wrote stored procedures, and debugged data pipelines to ensure accuracy and reliability</li>
  <li>Managed CI/CD with Azure DevOps pipelines for builds, releases, and environment configs</li>
  <li>Webhook Automation</li>
</ul>

<h1 className="text-2xl font-semibold tracking-tight mb-4">NE Environmental Trust</h1>
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
        a fun and rewarding project! 💡
      </p>
    </div>
  );
}
