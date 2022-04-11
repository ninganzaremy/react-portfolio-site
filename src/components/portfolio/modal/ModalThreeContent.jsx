import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ModalThreeContent = () => {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: false,
	};

	return (
		<div className="slideshow">
			<figure>
				{/* Project Details Starts */}
				<figcaption>
					<h3>Restaurant Project</h3>
					<div className="row open-sans-font">
						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-file-text-o pr-2"></i> <span className="project-label"> </span>: <span className="ft-wt-600 uppercase">Restaurant Web App</span>
						</div>
						{/* End .col */}

						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-github pr-2"></i>
							<span className="project-label"> </span>:{" "}
							<span className="ft-wt-600 uppercase">
								<a href="https://github.com/ninganzaremy/Restaurant-application/" target="_blank" rel="noreferrer">
									Code
								</a>
							</span>
						</div>
						{/* End .col */}

						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-code pr-2"></i>
							<span className="project-label"> </span>: <span className="ft-wt-600 uppercase"> React.js, Javascript, PHP</span>
						</div>
						{/* End .col */}

						<div className="col-12 col-sm-6 mb-2">
							<i className="fa fa-external-link pr-2"></i>
							<span className="project-label"> </span>:{" "}
							<span className="ft-wt-600 uppercase">
								<a href="https://bola-restaurant.herokuapp.com/" target="_blank" rel="noreferrer">
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
				<Slider {...settings}>
					<div className="slide_item">
						<img src="img/projects/project-3.jpg" alt="slide 1" />
					</div>
					<div className="slide_item">
						<img src="img/projects/restaurant-2.jpg" alt="slide 1" />
					</div>
					<div className="slide_item">
						<img src="img/projects/restaurant-1.jpg" alt="slide 1" />
					</div>
				</Slider>
				{/* Main Project Content Ends */}
			</figure>
		</div>
		//  End .slideshow
	);
};

export default ModalThreeContent;
