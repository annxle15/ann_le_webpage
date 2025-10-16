import { Link } from "react-router-dom";
import { useState } from "react";
import { getConfigData } from "../data/configReader";
import netLogo from "../assets/net_logo.jpg";
import workLogo from "../assets/work_icon.jpeg";
import unlLogo from "../assets/unl_logo.png";

const experience =  [
    {
      "exp-image-url": workLogo,
      "exp-name": "Milliman",
      "exp-desc": "Software Engineer",
      "new-tab": false,
      "exp-link": "/work",
    },
    {
      "exp-image-url": netLogo,
      "exp-name": "NE Environmental Trust",
      "exp-desc": "Software Developer",
      "new-tab": false,
      "exp-link": "/work",
    },
    {
      "exp-image-url": unlLogo,
      "exp-name": "UNL Math Department",
      "exp-desc": "Undegraduate Research Assistant",
      "exp-link": "https://math.unl.edu/outreach-and-impact/recognition/",
      "new-tab": true
    }
  ];

export default function Card() {
  const configData = getConfigData();
  const projects = configData.projects;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const svgClass = isHovered
    ? "w-6 h-6 text-gray-500 transition delay-150"
    : "w-6 h-6 text-gray-300";

  return (
    <div className="px-2">
        <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-5 ">
          <div className="flex items-center justify-between mb-5">
            <div className="font-medium text-lg flex items-center gap-x-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              Experience
            </div>
            <button
              type="button"
              className="gap-x-2 text-gray-900 bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-y-3"> 
            {experience.map((exp, index) => (
    <a
    key={index}
    href={exp["exp-link"]}
    target={exp["new-tab"] ? "_blank" : "_self"}
    rel={exp["new-tab"] ? "noopener noreferrer" : undefined}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className="drop-shadow-sm card bg-white rounded-lg px-5 py-3 gap-x-3 flex flex-col md:flex-row items-center hover:-translate-y-0.5 duration-300 transition ease-in-out hover:shadow-lg border border-gray-200 hover:border-gray-300 cursor-pointer"
  >
                <div className="rounded-full overflow-hidden flex items-center justify-center border border-gray-200 hidden md:block">
                  <div className="card-image w-16 h-16 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={exp["exp-image-url"]}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h1 className="font-medium text-lg">
                    {exp["exp-name"]}
                  </h1>
                  <p className="text-gray-500 text-md">
                    {exp["exp-desc"]}
                  </p>
                </div>
                <button className="ml-auto hidden md:inline-block">
                  <svg
                    className={svgClass}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </a>
            ))}
          </div>
        </div>
      
    </div>
    
  );
}
