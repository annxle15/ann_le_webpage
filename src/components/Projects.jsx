import { Link } from "react-router-dom";
import { useState } from "react";
import { getConfigData } from "../data/configReader";
import annplifiedIcon from "../assets/temp_icon.png";

export default function Card() {
  const configData = getConfigData();
  //const projects = configData.projects;
  const projects =  [
    {
      "project-image-url": "",
      "project-name": "UI/UX Brand Design",
      "project-desc": "Click to view live demo",
      "project-tags": "#Angular #Typescript #Tailwind #HTML"
    },
    {
      "project-image-url": "",
      "project-name": "API & Systems Engineering",
      "project-desc": "Click to view summary",
      "project-tags": "#CSharp #Azure #Postman #SQL #..."
    },
    {
      "project-image-url": annplifiedIcon,
      "project-name": "Annplified",
      "project-desc": "Click to view summary",
      "project-tags": "#iOS #Swift #Lua #Adobe #Python"
    }
  ];
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
            Projects & Skills
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => {
            // choose where each card links
            let linkTo = "/projects";
            if (project["project-name"] === "UI/UX Brand Design") {
              linkTo = "/landingproject"; 
            }
            if (project["project-name"] === "API & Systems Engineering") {
              linkTo = "/work"; 
            }

            return (
              <Link
                key={index}
                to={linkTo}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="drop-shadow-md card bg-white rounded-lg px-5 py-3 gap-x-3 flex flex-col md:flex-none md:flex-row hover:-translate-y-1 hover:scale-100 duration-300 transition ease-in-out delay-150 hover:shadow-sm border border-gray-200 hover:border-gray-300"
              >
                <div className="rounded-full overflow-hidden flex items-center justify-center border border-gray-200 hidden md:block">
                  <div className="card-image w-16 h-16 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={project["project-image-url"]}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="font-medium text-lg">
                    {project["project-name"]}
                  </h1>
                  <p className="text-gray-500 text-md">
                    {project["project-desc"]}
                  </p>
                    {/* Project Tags */}
  <div className="flex flex-wrap gap-2 mt-2">
    {project["project-tags"]?.split(" ").map((tag, index) => (
      <span
        key={index}
        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200"
      >
        {tag.replace("#", "")}
      </span>
    ))}
  </div>
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
              </Link>
            );
          })}
        </div>
      </div>
      
    </div>
    
  );
}
