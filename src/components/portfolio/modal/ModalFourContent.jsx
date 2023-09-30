import React from 'react';

const ModalFourContent = () => {
  return (
    <div className="slideshow">
      <figure>
        {/* Project Details Starts */}
        <figcaption>
          <h3>Social Media Project</h3>
          <div className="row open-sans-font">
            <div className="col-12 col-sm-6 mb-2">
              <i className="fa fa-file-text-o pr-2"></i>
              <span className="project-label"> </span>:{' '}
              <span className="ft-wt-600 uppercase">Social Media</span>
            </div>
            {/* End .col */}

            <div className="col-12 col-sm-6 mb-2">
              <i className="fa fa-github pr-2"></i>
              <span className="project-label"> </span>:{' '}
              <span className="ft-wt-600 uppercase">
                {' '}
                <a
                  href="https://github.com/ninganzaremy/Followers-social-network-site"
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
              <span className="project-label"> </span>:{' '}
              <span className="ft-wt-600 uppercase">
                React.js, Node.js, Mysql{' '}
              </span>
            </div>
            {/* End .col */}

            <div className="col-12 col-sm-6 mb-2">
              <i className="fa fa-external-link pr-2"></i>
              <span className="project-label"> </span>:{' '}
              <span className="ft-wt-600 uppercase">
                <a
                  href="https://followers-socio-media.herokuapp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
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
        <div className="videocontainer">
          <video
            id="video"
            className="responsive-video"
            controls
            poster="img/projects/project-4.jpg"
          >
            <source src="img/projects/modal-4.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Main Project Content Ends */}
      </figure>
    </div>
    //  End .slideshow
  );
};

export default ModalFourContent;
