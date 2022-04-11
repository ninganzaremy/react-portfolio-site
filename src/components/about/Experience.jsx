import React from "react";

const experienceContent = [
	{
		year: "   01/2022 - Present",
		position: " Web Developer",
		compnayName: "Arizona State University",
		details: `Developing, testing and implementing  new software programs.
Designing and updating software database. This includes, but is not limited to: Software Applications, Web Sites, Data Communication Processes and User Interfaces.
Maintening and recommending software improvements to ensure strong functionality and optimization.
Independently installing, customizing and integrating commercial software packages.
Facilitating root cause analysis of system issues.
Working with experienced team members to conduct root cause analysis of issues, review new and existing code and/or perform unit testing`,
	},
	{
		year: "05/2021 - 12/2021",
		position: " Quality Assurance Analyst",
		compnayName: "Uber Technologies",
		details: `Developed new standards for production and design, with improvements as needed.
Conducted quality assurance audits and monitors and records results from processes and procedures within the organization. 
Created testing protocols for implementation across all service lines`,
	},
	{
		year: "01/2020 - 04/2021",
		position: "Data Analyst",
		compnayName: "Apple",
		details: `Worked with the cross-functional team focusing on the deep evaluation of Maps services and features.
		Collaborated directly with the Engineering and Product teams responsible for quantifying, measuring and monitoring usage and user experiences across Maps platform.
		Ensured quality and consistency by reviewing the efforts of members in the peer group`,
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
						<span className="place open-sans-font">{val.compnayName}</span>
					</h5>
					<p className="open-sans-font">{val.details}</p>
				</li>
			))}
		</ul>
	);
};

export default Experience;
