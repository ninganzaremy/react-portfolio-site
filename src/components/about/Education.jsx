import React from 'react';

const educationContent = [
  {
    year: '2022',
    degree: 'AWS CERTIED DEVELOPER',
    institution: 'AWS',
    details: [
      'Application Life-Cycle Management: Acquired an in-depth understanding of the complete application life-cycle, from development to deployment',

      'AWS Service Proficiency: Demonstrated expertise in crafting applications using AWS service APIs, AWS CLI, and SDKs, ensuring seamless integration and functionality',
      'Container Utilization: Proficient in leveraging container solutions for application deployment and management',
      '	CI/CD Deployment: Skilled in deploying applications through Continuous Integration and Continuous Deployment pipelines, ensuring rapid and efficient rollouts.',
      '	Cloud-Based Application Development: Capable of developing, deploying, and debugging applications in the cloud, strictly adhering to AWS best practices.',
    ],
  },
  {
    year: '2020',
    degree: 'SOFTWARE ENGINEERING',
    institution: 'CITY UNIVERSITY OF NEW YORK',
    details: [
      'Web Client Programming: Graduated from the CUNY TechWorks Software Development training program, gaining expertise in crafting and optimizing web-based client applications.',
      'Systems Design & Implementation: Acquired hands-on experience in architecting robust systems and ensuring their effective implementation.',
      'Smartphone App Development: Honed skills in developing intuitive and efficient applications for smartphones, catering to a wide range of user needs.',
    ],
  },
  {
    year: '2015',
    degree: 'BA In Computer Science',
    institution: 'LIGHT UNIVERSITY OF BUJUMBURA',
    details: [
      'BCS in Computer Science: Completed a four-year Bachelor of Science in Computer Science at LIGHT UNIVERSITY OF BUJUMBURA.',
      'Software Development Focus: Gained comprehensive skills in designing, building, and maintaining software solutions.',
      'Programming Mastery: Developed expertise in various programming paradigms and languages, ensuring versatility and adaptability in the tech industry.',
    ],
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
            <span className="place open-sans-font">{val.institution}</span>
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

export default Education;
