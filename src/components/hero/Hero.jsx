import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import TypewriterComponent from "typewriter-effect";

const heroContent = {
   heroImage: "img/hero/me.png",
   heroMobileImage: "img/hero/me.png",
   heroTitleName: "Remy Ninganza",
   heroDesignation: "Software Engineer",
   heroDescription:
      "Innovative Software Development Engineer with over 3 years of experience in full-stack development and cloud-based solutions. I specialize in building scalable, cloud-optimized applications using Java, JavaScript, React, and Spring Boot.",
   keyTechnologies: {
      "Front-end": ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Sass"],
      "Back-end": ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs"],
      Database: ["PostgreSQL", "MSSQL", "JPA/Hibernate"],
      Cloud: ["AWS (EC2, S3, ECS, ECR, CloudWatch)", "Docker"],
      "Payment Integration": ["Stripe", "PayPal"],
      "Email Services": ["AWS SES"],
      Authentication: ["JWT", "Spring Security"],
      "Database Design": ["PostgreSQL schema modeling"],
      Testing: ["JUnit", "Jest", "Cypress"],
      "Version Control": ["Git", "GitHub"],
      "CI/CD": ["Docker", "Jenkins"],
      "CVEs Management": ["Dependabot", "Github Workflow"],
   },
   achievements: [
      "Implemented a microservices architecture using Spring Boot, improving system modularity and scalability, making it easier to develop and maintain features.",
      "Developed a responsive React-based frontend with Redux, reducing load times by 20% and delivering a seamless cross-device user experience.",
      "Optimized PostgreSQL schema for efficient management of payments, services, and user data, improving data handling efficiency by 25%.",
      "Integrated Stripe payment gateway with real-time webhooks, improving payment processing efficiency by 30%.",
      "Implemented secure JWT-based authentication with Spring Security, enhancing platform security.",
      "Set up CI/CD pipelines using Jenkins and Docker, reducing deployment time by 40% and accelerating production cycles.",
      "Deployed scalable cloud services using AWS (EC2, S3, ECS, ECR, CloudFront, SES), ensuring 99.9% uptime.",
      "Streamlined media management with AWS S3, improving image load times by 15%.",
      "Leveraged AWS SES for automated email notifications, boosting user engagement with important alerts and reminders.",
      "Developed custom React hooks to enhance state management, reducing redundant code by 10%.",
   ],
   commitment:
      "🔹 I'm committed to crafting clean, maintainable code and continuously advancing my knowledge of the latest technologies. Let's connect and explore how we can drive innovation together!",
   heroBtn: "more about me",
};

const Hero = () => {
   const [isVisible, setIsVisible] = useState(false);
   const controls = useAnimation();
   const contentRef = useRef(null);
   const navigate = useNavigate();

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
               controls.start("visible");
            }
         },
         { threshold: 0.1 }
      );

      if (contentRef.current) {
         observer.observe(contentRef.current);
      }

      return () => {
         if (contentRef.current) {
            observer.unobserve(contentRef.current);
         }
      };
   }, [controls]);

   const containerVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
            when: "beforeChildren",
            staggerChildren: 0.2,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.5 },
      },
   };

   return (
      <motion.div
         className="home-details-container align-items-center hero-content-wrapper"
         initial="hidden"
         animate={controls}
         variants={containerVariants}
         ref={contentRef}
      >
         <div className="home-details hero-content  col-12 col-lg-8 offset-lg-4  text-center text-lg-star">
            <motion.img
               src={heroContent.heroMobileImage}
               alt="Profile"
               className="profile-image"
               variants={itemVariants}
            />
            <motion.h1
               className="text-uppercase poppins-font"
               variants={itemVariants}
            >
               {heroContent.heroTitleName}
               <span>{heroContent.heroDesignation}</span>
            </motion.h1>
            <motion.div className="hero-description" variants={itemVariants}>
               <p>{heroContent.heroDescription}</p>
            </motion.div>
            <motion.div className="try-me" variants={itemVariants}>
               <p>🚀 Want to take a shot on me? </p>

               <div className="typewriter-container">
                  <TypewriterComponent
                     options={{
                        strings: [
                           "🤝 Let's try something together!",
                           "🏗️ We can build interesting stuff!",
                           "🔥 Ready to innovate?",
                           "🎨 Let's create something amazing!",
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        deleteSpeed: 1,
                        pauseFor: 2000,
                        cursor: "",
                     }}
                  />
               </div>
            </motion.div>
            <hr className="separator" />
            <motion.div className="technologies-list" variants={itemVariants}>
               <h3 className="text-uppercase custom-title text-center mb-0 ft-wt-600">
                  🌟 Key Technologies
               </h3>
               <div className="tech-categories">
                  {Object.entries(heroContent.keyTechnologies).map(
                     ([category, technologies], index) => (
                        <motion.div
                           key={index}
                           className="tech-category"
                           whileHover={{ scale: 1.02 }}
                           transition={{ type: "spring", stiffness: 300 }}
                        >
                           <h4 className="category-title">{category}</h4>
                           <ul className="tech-items">
                              {technologies.map((tech, techIndex) => (
                                 <motion.li
                                    key={techIndex}
                                    className="tech-item"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                 >
                                    {tech}
                                 </motion.li>
                              ))}
                           </ul>
                        </motion.div>
                     )
                  )}
               </div>
            </motion.div>
            <hr className="separator" />

            <motion.div className="achievements-list" variants={itemVariants}>
               <h3 className="text-uppercase custom-title text-center mb-0 ft-wt-600">
                  💎 Achievements
               </h3>
               <ul className="achievement-items">
                  {heroContent.achievements.map((achievement, index) => (
                     <motion.li
                        key={index}
                        className="achievement-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                     >
                        <span className="achievement-icon">🏆</span>
                        <span className="achievement-text">{achievement}</span>
                     </motion.li>
                  ))}
               </ul>
            </motion.div>
            <motion.p className="open-sans-font" variants={itemVariants}>
               {heroContent.commitment}
            </motion.p>
            <motion.button
               className="button"
               onClick={() => navigate("/about")}
               variants={itemVariants}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
               <span className="button-text">{heroContent.heroBtn}</span>
               <span className="button-icon fa fa-arrow-right"></span>
            </motion.button>
         </div>
      </motion.div>
   );
};
export default Hero;