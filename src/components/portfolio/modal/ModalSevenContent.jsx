import React from "react";

const ModalSevenContent = () => {
   return (
      <div className="slideshow">
         <figure>
            {/* Project Details Starts */}
            <figcaption>
               <h3>StockPulse - Real-time Stock Monitoring System</h3>
               <div className="row open-sans-font">
                  <div className="col-12 col-sm-6 mb-2">
                     <i className="fa fa-file-text-o pr-2"></i>
                     <span className="project-label"> </span>:{" "}
                     <span className="ft-wt-600 uppercase">Microservices</span>
                  </div>
                  {/* End .col */}

                  <div className="col-12 col-sm-6 mb-2">
                     <i className="fa fa-github pr-2"></i>
                     <span className="project-label"> </span>:{" "}
                     <span className="ft-wt-600 uppercase">
                        {" "}
                        <a
                           href="https://github.com/ninganzaremy/stock-pulse"
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
                     <span className="project-label"> </span>:{" "}
                     <span className="ft-wt-600 uppercase">
                        <ul className="ft-wt-600 uppercase project-tech-list">
                           <li>
                              {" "}
                              Frontend: React 18, TypeScript, Vite, WebSocket
                           </li>
                           <li>Stock Service: Python FastAPI, gRPC</li>
                           <li>
                              Notification Service: Spring Boot 3, Java 17, gRPC
                           </li>
                           <li>Database: PostgresSQL</li>
                        </ul>
                     </span>
                  </div>
                  {/* End .col */}

                  {/*<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-external-link pr-2"></i>
							<span className="project-label"> </span>:{" "}
							<span className="ft-wt-600 uppercase">
								<a href="https://meltmedia-test-site.herokuapp.com" target="_blank" rel="noreferrer">
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
            <img src="img/projects/pulse-stock-grpc.png" alt="Portolio" />
            {/* Main Project Content Ends */}
         </figure>
      </div>
      //  End .slideshow
   );
};

export default ModalSevenContent;