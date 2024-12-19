import React from "react";

const experienceContent = [
   {
      year: "   01/2022 - Present",
      position: "Software Engineer ",
      companyName: "American Express",
      details: [
         "➤ UInnovative Project Contributions: Collaborating on impactful projects at American Express, leveraging modern technologies such as Java, Spring Boot, React, and AWS to deliver high-quality solutions that enhance user and system efficiency.",
         "➤ Scalable System Development: Designing and building scalable, cloud-optimized systems using Java, Spring Boot, React, and AWS, ensuring high performance, reliability, and maintainability across platforms.",
      ],
   },
   {
      year: "   01/2022 - 12/2024",
      position: "FullStack Software Developer ",
      companyName: "Arizona State University",
      details: [
         "➤ UI/UX Enhancement: Developed intuitive, responsive UI components using React.js, JavaScript (ES6+), HTML5, CSS3, and Sass, improving user engagement.",
         "➤ Performance Optimization: Restructured legacy code and implemented efficient front-end patterns, reducing load times and improving system performance.",
         "➤ Scalable Web Applications: Built robust, scalable web applications using Java and Vue/React, ensuring consistent high performance across platforms.",
         "➤ Server-Side Optimization: Optimized backend functionality, reducing processing times and enhancing key application performance by significant margins.",
         "➤ Cross-Functional Collaboration: Collaborated with project managers, designers, and engineers in agile sprints to ensure continuous improvement and maintain high code quality.",
         "➤ Data-Driven Insights: Integrated Google Analytics across applications to capture real-time data, supporting informed decision-making.",
         "➤ Cloud Solutions & Cost Efficiency: Optimized backend processes and API integrations using AWS services (S3, Lambda) to enhance scalability and reduce infrastructure costs.",
      ],
   },
   {
      year: "01/2021 - 01/2022",
      position: "Quality Assurance Engineer",
      companyName: "Uber Technologies",
      details: [
         "➤ Integration Testing: Tested and validated integrations between ServiceNow, Salesforce, and Zendesk, optimizing system efficiency and interoperability.",
         "➤ Quality Assurance: Conducted audits of support tickets to ensure strict compliance with internal guidelines, upholding quality and service standards.",
         "➤ Issue Resolution: Collaborated with engineering teams by identifying and documenting system integration issues, providing detailed insights for timely resolution.",
      ],
   },
   {
      year: "01/2020 - 04/2021",
      position: "Data Analyst",
      companyName: "Apple (Via Apex Systems)",
      details: [
         "➤ Cross-Functional Collaboration: Collaborated with cross-functional teams, resulting in a 20% improvement in the accuracy of Apple Maps services.",
         "➤ Platform Engagement: Facilitated a feedback loop between Engineering and Product teams, boosting platform engagement by 10%.",
         "➤ Quality Control: Ensured a 98% consistency rate in data annotations by reviewing and providing detailed feedback to peer contributors.",
      ],
   },
];

const Experience = () => {
   return (
      <ul>
         {experienceContent.map((val, i) => (
            <li key={i}>
               <div className="icon">
                  <i className="fa fa-briefcase"></i>
               </div>
               <span className="time open-sans-font text-uppercase">
                  {val.year}
               </span>
               <h5 className="poppins-font text-uppercase">
                  {val.position}
                  <span className="place open-sans-font">
                     {val.companyName}
                  </span>
               </h5>
               <ul className="details-list">
                  {val.details.map((detail, index) => {
                     const [boldPart, regularPart] = detail.split(": ", 2);
                     return (
                        <li key={index} className="open-sans-font">
                           <strong>{boldPart} :</strong> {regularPart}
                        </li>
                     );
                  })}
               </ul>
            </li>
         ))}
      </ul>
   );
};

export default Experience;