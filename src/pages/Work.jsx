import React from "react";
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

      {/* <h1 className="text-2xl font-semibold tracking-tight mb-4">Milliman</h1> */}

<p className="text-gray-500 text-xs md:text-sm mb-4">#CSharp #DotNet #SQL #Azure #Postman #SendGrid #SAML #DevOps</p>

<p className="text-gray-600 max-w-xl leading-relaxed mb-6">
  I work on backend systems and API integrations that power health insurance marketplace platforms used by employers, brokers, and clients across the U.S.
</p>

<ul className="text-gray-700 text-xs md:text-sm list-disc list-inside text-left mb-8 max-w-lg leading-relaxed space-y-1.5">
  <li><strong>API Design & Integration:</strong> Engineered RESTful APIs that connect payroll, enrollment, and quoting systems</li>
  <li><strong>Cloud Infrastructure:</strong> Azure DevOps for CI/CD automation.</li>
  <li><strong>Security & Authentication:</strong> Implemented SAML 2.0 SSO for secure, cross-organization logins.</li>
  <li><strong>Production Impact:</strong> Shipped backend features supporting thousands of users nationwide.</li>
</ul>




      {/* Footer or CTA */}
      <p className="text-gray-500 mt-8 text-sm">

      </p>
    </div>
  );
}
