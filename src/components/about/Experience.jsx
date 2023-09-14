import React from "react";

const experienceContent = [
	{
		year: "   01/2022 - Present",
		position: " Web Application Developer ",
		companyName: "Arizona State University",
		details: [
			"Full-Stack Development: Design, build and maintain applications using Java, JavaScript, React.js, Node.js, and Microsoft SQL Server. Familiar with Tomcat server hosting and AWS deployments. Employ Git for version control and team collaboration",
			"Cloud & Performance: Implement Java batch applications via AWS Lambda triggers, enhancing stateless code execution efficiency",
			" React.js Refactoring: Converted a sizable Vue codebase to a more efficient React setup.Designed unified table components leveraging specialized React libraries to manage and distribute data.Integrated proprietary components sourced from private packages.This refactoring resulted in a 40% codebase reduction",
			" Code Quality & Mentorship: Regularly conduct code reviews to ensure best practices and high-quality code.Play a pivotal role in onboarding and setting up new software developers, ensuring a smooth transition and integration into the team",
			" Debugging & Monitoring: Skilled in troubleshooting across diverse environments; leveraging Splunk for log analysis and investigation in case of hosted environment issues",
			" Automation & Productivity: Implement automation strategies with Google Scripts, achieving a 60% boost in team operational efficiency"
		],
	},
	{
		year: "05/2021 - 12/2021",
		position: " Quality Assurance Analyst",
		companyName: "Uber Technologies",
		details: [
				"Production Standards & Design: Formulated and implemented new production and design standards, incorporating iterative improvements based on requirements",
"QA Audits & Monitoring: Spearheaded quality assurance audits, consistently recording and monitoring results from various organizational processes and procedures",
"Testing Protocols: Established comprehensive testing protocols for uniform implementation across all service lines."],
	},
	{
		year: "01/2020 - 04/2021",
		position: "Data Analyst",
		companyName: "Apple",
		details: [
			"Cross-Functional Collaboration: Engaged with a multifaceted team, concentrating on in-depth assessment of Maps services and features",

		"Engineering & Product Liaison: Partnered closely with Engineering and Product teams to quantify, measure, and monitor user experiences and usage metrics across the Maps platform",

		"Quality Oversight: Maintained high standards of quality and consistency by diligently reviewing the contributions of peer group members"
]
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