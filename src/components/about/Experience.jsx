import React from "react";

const experienceContent = [
   {
      year: "   01/2022 - Present",
      position: "FullStack Software Developer ",
      companyName: "Arizona State University",
      details: [
         "➤ UI/UX Enhancement: Developing intuitive, responsive UI components using React.js, JavaScript (ES6+), HTML5, CSS3, and Sass, driving improved user engagement.",
         "➤ Performance Optimization: Restructuring legacy code and implementing efficient front-end patterns, leading to streamlined performance and reduced load times.",
         "➤ Scalable Web Applications: Building robust, scalable web applications using Java, and Vue/React, ensuring high performance across platforms.",
         "➤ Server-Side Optimization: Optimizing backend functionality to reduce processing times, significantly enhancing the performance of search engine and key applications.",
         "➤ Cross-Functional Collaboration: Collaborating with project managers, designers, and engineers in agile sprints to drive continuous improvements and maintain high code quality.",
         "➤ Data-Driven Insights: Integrating Google Analytics across web applications to capture real-time data, supporting data-driven decision-making.",
         "➤ Cloud Solutions & Cost Efficiency: Collaborating on backend optimizations and API integrations using AWS services (S3, Lambda) to improve scalability and reduce infrastructure costs.",
      ],
   },
   {
      year: "01/2021 - 01/2022",
      position: " Quality Assurance Engineer",
      companyName: "Uber Technologies",
      details: [
         " ➤ Tested and validated integrations between ServiceNow, Salesforce, and Zendesk, optimizing system efficiency and interoperability.",
         "➤ Conducted audits of support tickets to ensure strict compliance with internal guidelines, upholding quality and service standards.",
         "➤ Collaborated with engineering teams by identifying and documenting system integration issues, providing detailed insights for timely resolution.",
      ],
   },
   {
      year: "01/2020 - 04/2021",
      position: "Data Analyst",
      companyName: "Apple ( Via Apex Systems )",
      details: [
         " ➤ Collaborated with cross-functional teams, resulting in a 20% improvement in the accuracy of Apple Maps services.",
         "➤ Facilitated a feedback loop between Engineering and Product teams, boosting platform engagement by 10%.",

         "➤ Ensured a 98% consistency rate in data annotations by reviewing and providing detailed feedback to peer contributors.",
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
          <span className="time open-sans-font text-uppercase">{val.year}</span>
          <h5 className="poppins-font text-uppercase">
            {val.position}
            <span className="place open-sans-font">{val.companyName}</span>
          </h5>
          <ul className="details-list">
            {val.details.map((detail, index) => {
              const [boldPart, regularPart] = detail.split(': ', 2);
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