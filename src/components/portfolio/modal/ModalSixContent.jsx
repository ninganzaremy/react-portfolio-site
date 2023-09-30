import React from 'react';

const ModalSixContent = () => {
  return (
    <div className="slideshow">
      <figure>
        {/* Project Details Starts */}
        <figcaption>
          <h3>Headphones Page Project</h3>
          <div className="row open-sans-font">
            <div className="col-12 col-sm-6 mb-2">
              <i className="fa fa-file-text-o pr-2"></i>
              <span className="project-label"> </span>:{' '}
              <span className="ft-wt-600 uppercase">Website</span>
            </div>
            {/* End .col */}

            <div className="col-12 col-sm-6 mb-2">
              <i className="fa fa-github pr-2"></i>
              <span className="project-label"> </span>:{' '}
              <span className="ft-wt-600 uppercase">
                <a
                  href="https://ninganzaremy.com/"
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
                Html5, css, JavaScript
              </span>
            </div>
            {/* End .col */}

            <div className="col-12 col-sm-6 mb-2">
              <i className="fa fa-external-link pr-2"></i>
              <span className="project-label"> </span>:{' '}
              <span className="ft-wt-600 uppercase">
                <a
                  href="https://ninganzaremy.com/"
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
        <img src="img/projects/project-6.jpg" alt="Portolio" />
        {/* Main Project Content Ends */}
      </figure>
    </div>
    //  End .slideshow
  );
};

export default ModalSixContent;
