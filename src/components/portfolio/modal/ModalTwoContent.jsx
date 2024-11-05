import React from "react";

const ModalTwoContent = () => {
   return (
      <div className="slideshow">
         <figure>
            {/* Project Details Starts */}
            <figcaption>
               <h3>Spring Boot - AWS - Fullstack App</h3>
               <div className="row open-sans-font">
                  <div className="col-12 col-sm-6 mb-2">
                     <i className="fa fa-file-text-o pr-2"></i>
                     <span className="project-label"> </span>:{" "}
                     <span className="ft-wt-600 uppercase">Spring Boot</span>
                  </div>
                  {/* End .col */}

                  <div className="col-12 col-sm-6 mb-2">
                     <i className="fa fa-github pr-2"></i>
                     <span className="project-label"> </span>:{" "}
                     <span className="ft-wt-600 uppercase">
                        <a
                           href="https://github.com/ninganzaremy/goalglo"
                           target="_blank"
                           rel="noreferrer"
                        >
                           Code
                        </a>
                     </span>
                  </div>
                  {/* End .col */}

                  <div className="col-12 col-sm-6 mb-2">
                     <i className="fa fa-code pr-2"></i>
                     <span className="project-label"> Technologies</span>:{" "}
                     <ul className="ft-wt-600 uppercase project-tech-list">
                        <li>Frontend: React, Redux, Vite</li>
                        <li>Backend: Java, Spring Boot, Spring Security</li>
                        <li>Database: PostgresSQL</li>
                        <li>Deployment: AWS (ECR, ECS, S3, CloudFront)</li>
                     </ul>
                  </div>
                  {/* End .col */}

                  {/*<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-external-link pr-2"></i>
							<span className="project-label"> </span>:{" "}
							<span className="ft-wt-600 uppercase">
								<a href="https://ninganzaremy.com/" target="_blank" rel="noreferrer">
									Site
								</a>
							</span>
						</div>*/}
                  {/* End .col */}
               </div>
               {/* End .row */}
            </figcaption>
            {/* Project Details Ends */}

            {/*  Main Project Content Starts */}
            <div className="videocontainer">
               <video
                  id="video"
                  className="responsive-video"
                  controls
                  poster="img/projects/goalglo.png"
               >
                  <source
                     src="img/projects/goalglo-preview.mp4"
                     type="video/mp4"
                  />
               </video>
            </div>
            {/* Main Project Content Ends */}
         </figure>
      </div>
      //  End .slideshow
   );
};

export default ModalTwoContent;