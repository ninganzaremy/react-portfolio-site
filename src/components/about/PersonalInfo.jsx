import React from "react";

const personalInfoContent = [
	{ meta: "first name", metaInfo: "Remy" },
	{ meta: "last name", metaInfo: "Ninganza" },
	{ meta: "Link", metaInfo: " linkedin.com/in/remy-ninganza" },
	{ meta: "Git", metaInfo: "github.com/ninganzaremy" },
	{ meta: "Address", metaInfo: "Tempe, AZ" },
	{ meta: "languages", metaInfo: "French, English" },
];

const PersonalInfo = () => {
	return (
		<ul className="about-list list-unstyled open-sans-font">
			{personalInfoContent.map((val, i) => (
				<li key={i}>
					<span className="title">{val.meta}: </span>
					<span className="value d-block d-sm-inline-block d-lg-block d-xl-inline-block">{val.metaInfo}</span>
				</li>
			))}
		</ul>
	);
};

export default PersonalInfo;
