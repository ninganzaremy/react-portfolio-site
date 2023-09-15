import React from "react";

const personalInfoContent = [
	{ meta: "first name", metaInfo: "Remy" },
	{ meta: "last name", metaInfo: "Ninganza" },
	{ meta: "Address", metaInfo: "Phoenix, AZ" },
	{ meta: "languages", metaInfo: "English, French" },
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