import React from "react";

const ModalEightContent = () => {
	return (
		<div className="slideshow">
			<figure>
				{/* Project Details Starts */}
				<figcaption>
					<h3>Real Estate Project</h3>
					<div className="row open-sans-font">
						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-file-text-o pr-2"></i>
							<span className="project-label"> </span>: <span className="ft-wt-600 uppercase">Real Estate Web App</span>
						</div>
						{/* End .col */}

						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-github pr-2"></i>
							<span className="project-label"> </span>:{" "}
							<span className="ft-wt-600 uppercase">
								<a href="https://ninganzaremy.com" target="_blank" rel="noreferrer">
									Code
								</a>
							</span>
						</div>
						{/* End .col */}

						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-code pr-2"></i>
							<span className="project-label"> </span>: <span className="ft-wt-600 uppercase">React.js, Redux, Node.js</span>
						</div>
						{/* End .col */}

						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-external-link pr-2"></i>
							<span className="project-label"> </span>:{" "}
							<span className="ft-wt-600 uppercase">
								<a href="https://ninganzaremy.com" target="_blank" rel="noreferrer">
									Site
								</a>
							</span>
						</div>
						{/* End .col */}
					</div>
					{/* End .row */}
				</figcaption>
				{/* Project Details Ends */}

				{/*  Main Project Content Starts */}
				<img src="img/projects/project-8.jpg" alt="Portolio" />
				{/* Main Project Content Ends */}
			</figure>
		</div>
		//  End .slideshow
	);
};

export default ModalEightContent;