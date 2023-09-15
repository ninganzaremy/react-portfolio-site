import React, {useState} from "react";
import Modal from "react-modal";
import Index from "../../components/about/index";

const heroContent = {
	heroImage: "img/hero/me.png",
	heroMobileImage: "me-mobile",
	heroTitleName: "Remy Ninganza",
	heroDesignation: "Software Developer ",
	heroDescriptions: `Full-Stack Software Developer | AWS Certified Developer
With a deep-rooted expertise in both front-end and back-end development, I specialize in delivering end-to-end solutions — from designing intuitive front-end user interfaces to architecting robust back-end infrastructures. 
Being an AWS Certified Developer, my full-stack capabilities are further amplified by cloud-optimized, scalable deployments.
`,
	heroBtn: "more about me",
};

const Hero = () => {
	const [isOpen, setIsOpen] = useState(false);
	function toggleModalOne() {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<div className="row home-details-container align-items-center">
				<div
					className="col-lg-4 bg position-fixed d-none d-lg-block"
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL + heroContent.heroImage})`,
					}}></div>
				<div className="col-12 col-lg-8 offset-lg-4 home-details  text-center text-lg-start">
					<div>
						<img src={`img/hero/${heroContent.heroMobileImage}.jpg`} className="img-fluid main-img-mobile d-sm-block d-lg-none" alt="hero man" />

						<h1 className="text-uppercase poppins-font">
							{heroContent.heroTitleName}<span style={{ fontSize: '2rem' }}>{heroContent.heroDesignation}</span>
						</h1>
						<p className="open-sans-font">{heroContent.heroDescriptions}</p>
						<button className="button" onClick={toggleModalOne}>
							<span className="button-text">{heroContent.heroBtn}</span>
							<span className="button-icon fa fa-arrow-right"></span>
						</button>
					</div>
				</div>
			</div>
			{/* End home-details-container */}

			{/* Start Modal for About More */}
			<Modal isOpen={isOpen} onRequestClose={toggleModalOne} contentLabel="My dialog" className="custom-modal dark hero" overlayClassName="custom-overlay dark" closeTimeoutMS={500}>
				<div>
					<button className="close-modal" onClick={toggleModalOne}>
						<img src="/img/cancel.svg" alt="close icon" />
					</button>
					{/* End close icon */}

					<div className="box_inner about">
						<div data-aos="fade-up" data-aos-duration="1200">
							<div className="title-section text-left text-sm-center">
								<h1>
									ABOUT <span>ME</span>
								</h1>
								<span className="title-bg">Resume</span>
							</div>

							{/* End title */}
							<Index />
						</div>
					</div>
				</div>
				{/* End modal box news */}
			</Modal>
			{/* End  Modal for About More */}
		</>
	);
};

export default Hero;