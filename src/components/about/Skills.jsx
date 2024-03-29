import React from "react";

const skillsContent = [

	{ skillClass: "p90", skillPercent: "90", skillName: "JAVASCRIPT" },
	{ skillClass: "p80", skillPercent: "80", skillName: "JAVA" },
	{ skillClass: "p75", skillPercent: "75", skillName: "REACT" },
	{ skillClass: "p65", skillPercent: "65", skillName: "AWS" },
	{ skillClass: "p60", skillPercent: "60", skillName: "SQL" },
	{ skillClass: "p60", skillPercent: "60", skillName: "HTML" },
	{ skillClass: "p60", skillPercent: "60", skillName: "CSS" },
	{ skillClass: "p50", skillPercent: "50", skillName: "BOOTSTRAP" },
];

const Skills = () => {
	return (
		<>
			{skillsContent.map((val, i) => (
				<div className="col-6 col-md-3 mb-3 mb-sm-5" key={i}>
					<div className={`c100 ${val.skillClass}`}>
						<span>{val.skillPercent}%</span>
						<div className="slice">
							<div className="bar"></div>
							<div className="fill"></div>
						</div>
					</div>
					<h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">{val.skillName}</h6>
				</div>
			))}
		</>
	);
};

export default Skills;