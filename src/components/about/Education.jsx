import React from "react";

const educationContent = [
	{
		year: "2022",
		degree: "AWS CERTIED DEVELOPER",
		institute: "AWS",
		details: `Gained a comprehensive understanding of application life-cycle management. Demonstrated proficiency in writing applications with AWS service APIs, AWS CLI, and SDKs; using containers; and deploying with a CI/CD pipeline.`,
	},
	{
		year: "2020",
		degree: "SOFTWARE ENGINEERING",
		institute: "CITY UNIVERSITY OF NEW YORK",
		details: `Graduated from CUNY Software development training program that covered the competencies needed for web client programming, systems design and implementation, and smart phone application development `,
	},
	{
		year: "2015",
		degree: "BA In Computer Science",
		institute: "LIGHT UNIVERSITY OF BUJUMBURA",
		details: `Graduated with a four-year BA degree in computer science with focuses on a variety of specialties including software development and programming. `,
	},
];

const Education = () => {
	return (
		<ul>
			{educationContent.map((val, i) => (
				<li key={i}>
					<div className="icon">
						<i className="fa fa-briefcase"></i>
					</div>
					<span className="time open-sans-font text-uppercase">{val.year}</span>
					<h5 className="poppins-font text-uppercase">
						{val.degree}
						<span className="place open-sans-font">{val.institute}</span>
					</h5>
					<p className="open-sans-font">{val.details}</p>
				</li>
			))}
		</ul>
	);
};

export default Education;
