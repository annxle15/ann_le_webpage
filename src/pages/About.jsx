import React, { useState, useEffect, useRef } from 'react';
import profile from "../assets/gradann.jpeg";
import CopyEmailButton from "../components/CopyEmailButton";
import { getConfigData } from "../data/configReader";

export default function About() {
  const configData = getConfigData();

  const [diplomasVisible, setDiplomasVisible] = useState(true);
  const gradAnnRef = useRef(null);

  const gradAnnBorderColor = diplomasVisible ? 'border-red-500' : 'border-white';

  useEffect(() => {
    const handleScroll = () => {
      if (gradAnnRef.current) {
        const rect = gradAnnRef.current.getBoundingClientRect();
        const scrolledPast = rect.top < 0;
        if (scrolledPast && diplomasVisible) setDiplomasVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [diplomasVisible]);

  const handleGradAnnClick = () => setDiplomasVisible(prev => !prev);

  return (
    <>
      <div className="px-7 py-7">
        <h1 className="flex items-center gap-x-2 text-lg font-medium">
          <div className="w-4 h-2 bg-gray-400 rounded-full"></div>
          About
        </h1>
      </div>

{/* --- Education Section --- */}
<div className="px-7 py-7 pt-3">
  <div className="flex flex-col md:flex-row md:items-start gap-10">
    
    {/* LEFT COLUMN: Photo + First Diploma */}
    <div className="flex flex-col items-center md:items-start gap-6 md:w-1/2">
      {/* Graduation Photo */}
      <img
        ref={gradAnnRef}
        onClick={handleGradAnnClick}
        src={profile}
        alt="Graduation"
        className={`border-4 ${gradAnnBorderColor} rounded-xl p-3 shadow-lg w-72 md:w-[26rem] object-cover aspect-[4/3] cursor-pointer transition-all duration-300`}
      />

      {/* Diploma 1 (under the photo) */}
      {diplomasVisible && (
        <div className="flex flex-col items-center w-full max-w-[26rem]">
          <img
            className="border rounded-lg p-3 shadow-lg w-full object-contain aspect-[4/3]"
            src="src/assets/diploma1.jpeg"
            alt="Computer Science Diploma"
          />
          <p className="text-sm text-gray-600 text-center italic  self-center pb-0.5 mt-3">
            BS in Computer Science
          </p>
        </div>
      )}
    </div>

    {/* RIGHT COLUMN: University Info + Second Diploma */}
    <div className="flex flex-col items-center md:items-start gap-6 md:w-1/2">
      {/* University Info */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-semibold">University of Nebraska</h2>
        <p className="text-gray-500 text-sm">Dual Bachelor’s, 2019 – 2023</p>
        <ul className="list-disc list-inside text-gray-600 text-sm mt-2">

        </ul>
      </div>

      {/* Diploma 2 */}
      {diplomasVisible && (
        <div className="flex flex-col items-center w-full max-w-[26rem]">
          <img
            className="border rounded-lg p-3 shadow-lg w-full object-contain aspect-[4/3]"
            src="src/assets/diploma2.jpeg"
            alt="Mathematics Diploma"
          />
          <p className="text-sm text-gray-600 text-center italic inline-block self-center pb-0.5 mt-3">
            BS in Mathematics
          </p>
        </div>
      )}
    </div>
  </div>
</div>


      {/* --- CTA Section --- */}
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-3xl font-semibold">Let's work together.</h1>
        <p className="text-md font-normal text-gray-500 text-center px-3">
          Creating user experience and visual appealing design
        </p>

        <div className="flex items-center justify-center gap-3 mt-4">
          <a href={configData.hireMeLink}>
            <button
              type="button"
              className="flex items-center gap-x-1 border border-black bg-black text-white font-medium rounded-lg text-sm px-3 py-2 shadow-md hover:bg-gray-800 transition"
            >
              Meet Me
            </button>
          </a>
          <CopyEmailButton />
        </div>
      </div>
    </>
  );
}
