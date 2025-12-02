import React from "react";
import landingVideo from "../assets/webdesign_demo.mp4";
import mobileVideo from '../assets/mobdesign_demoo.mp4'; 
import { useNavigate } from "react-router-dom"; 
export default function LandingProject() {
  const navigate = useNavigate();
  return (

    <div className="px-7 py-10 flex flex-col items-center text-center">
      <button
        onClick={() => navigate("/")}
        className="self-start mb-6 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        ← Back To Home
      </button>


      
      <h1 className="text-4xl font-semibold tracking-tight mb-4">Landing Page UI Design</h1>
      <p className="text-gray-600 max-w-xl leading-relaxed mb-8">
      Built during my internship as part of a full product rebrand. I joined design discussions, made creative decisions, and grew my frontend skills in the process
      </p>

      {/* Highlights */}
      <ul className="text-gray-700 text-sm md:text-base list-disc list-inside text-left mb-8 max-w-lg">
        <li>Collaborated in design reviews and UI/UX meetings</li>
        <li>Figma designs &#8594; Code (Angular, TypeScript, HTML/CSS)</li>
        <li>Focused on usability and clean user experience</li>
      </ul>

      {/* Video Section */}
      <p className="text-gray-600 max-w-xl leading-relaxed mb-3 mt-3">
Demo
      </p>
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black">
        
      <video
  src={landingVideo}
  className="w-full h-auto"
  controls
  loop
  muted
  autoPlay
  playsInline
/> 

      </div>
      <p className="text-gray-600 max-w-xl leading-relaxed mb-3 mt-3">
      Mobile Compatibility 
      </p>
      <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-black aspect-[9/17]">
        <video
          src={mobileVideo}
          className="w-full h-full object-cover" // object-cover helps fill the container
          controls
          loop
          muted
          autoPlay
          playsInline
        />
      </div>

      {/* Footer or CTA */}
      <p className="text-gray-500 mt-8 text-sm">

      </p>
    </div>
  );
}
