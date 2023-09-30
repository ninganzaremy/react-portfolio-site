import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import Hero from '../../components/hero/Hero';
import Index from '../../components/about/index';
import Address from '../../components/Address';
import Portfolio from '../../components/portfolio/Portfolio';
import Blog from '../../components/blog/Blog';
import Contact from '../../components/Contact';
import Social from '../../components/Social';
import SwitchDark from '../../components/switch/SwitchDark';

const menuItem = [
  {icon: 'fa-home', menuName: 'Home', path: '/'},
  {icon: 'fa-user', menuName: 'About', path: '/about'},
  {icon: 'fa-briefcase', menuName: 'Portfolio', path: '/portfolio'},
  {icon: 'fa-envelope-open', menuName: 'Contact', path: '/contact'},
  {icon: 'fa fa-comments', menuName: 'Blog', path: '/blog'},
];
const tabIndexByPath = {
  '/': 0,
  '/about': 1,
  '/portfolio': 2,
  '/contact': 3,
  '/blog': 4,
};
const HomeDark = () => {
  const location = useLocation();
  const myLogo = 'rn';
  const initialTabIndex = tabIndexByPath[location.pathname] || 0;
  const [selectedTabIndex, setSelectedTabIndex] = useState(initialTabIndex);
  useEffect(() => {
    const currentTabIndex = tabIndexByPath[location.pathname] || 0;
    setSelectedTabIndex(currentTabIndex);
  }, [location.pathname]);
  const handleTabSelect = index => {
    if (index === selectedTabIndex) {
      setSelectedTabIndex(index);
    }
  };
  return (
      <div className="yellow">
        <SwitchDark/>
        <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
          <div className="container">
            <div className="header">
              <div className="logo">
                <Link to="/" onClick={() => handleTabSelect(0)}>
                  <h3>{myLogo.toUpperCase()}</h3>
                </Link>
              </div>
              <TabList
                  className="icon-menu revealator-slideup revealator-once revealator-delay1">
                {menuItem.map((item, i) => (
                    <Link to={item.path} key={i}
                          onClick={() => handleTabSelect(i)}>
                      <Tab className="icon-box">
                        <i className={`fa ${item.icon}`}></i>
                        <h2>{item.menuName}</h2>
                      </Tab>
                    </Link>
                ))}
              </TabList>
            </div>
          </div>
          {/* End of Menu Content */}

          <div className="tab-panel_list">
            {/* Hero Content Starts */}
            <TabPanel className="home ">
              <div
                  className="container-fluid main-container container-home p-0 "
                  data-aos="fade-up"
                  data-aos-duration="1200"
              >
                <div className="color-block d-none d-lg-block"></div>
                <Hero/>
              </div>
            </TabPanel>
            {/* Hero Content Ends */}

            {/* About Content Starts */}
            <TabPanel className="about">
              <div data-aos="fade-up" data-aos-duration="1200">
                <div className="title-section text-left text-sm-center">
                  <h1>
                    ABOUT <span>ME</span>
                  </h1>
                  <span className="title-bg">Resume</span>
                </div>
                {/* End title */}
                <Index/>
              </div>
            </TabPanel>
            {/* About Content Ends */}

            {/* Portfolio Content Starts */}
            <TabPanel className="portfolio professional">
              <div
                  className="title-section text-left text-sm-center"
                  data-aos="fade-up"
                  data-aos-duration="1200"
              >
                <h1>
                  my <span>portfolio</span>
                </h1>
                <span className="title-bg">works</span>
              </div>
              {/* End title */}
              <div
                  className="container grid-gallery main-content"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="100"
              >
                <Portfolio/>
              </div>
              {/* End grid gallery */}
            </TabPanel>
            {/* Portfolio Content Ends */}

            {/* Contact Content Starts */}
            <TabPanel className="contact">
              <div
                  className="title-section text-left text-sm-center"
                  data-aos="fade-up"
                  data-aos-duration="1200"
              >
                <h1>
                  get in <span>touch</span>
                </h1>
                <span className="title-bg">contact</span>
              </div>
              <div
                  className="container"
                  data-aos="fade-up"
                  data-aos-duration="1200"
              >
                <div className="row">
                  {/*  Left Side Starts */}
                  <div className="col-12 col-lg-4">
                    <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
                      LET'S CONNECT 🤝
                    </h3>
                    <p className="open-sans-font mb-4">
                      Drop a 'hi' or share your thoughts! I'm always keen on
                      discussing new projects, creative ideas, or ways to help
                      you
                      bring your vision to life. Whether it's collaboration, a
                      potential partnership, or tackling a unique challenge, I'm
                      here to listen. Together, we can make great things happen.
                    </p>
                    <Address/>
                    {/* End Address */}

                    <Social/>
                    {/* End Social */}
                  </div>
                  {/* Left Side Ends */}

                  {/*  Contact Form Starts  */}
                  <div className="col-12 col-lg-8">
                    <Contact/>
                  </div>
                  {/*  Contact Form Ends */}
                </div>
              </div>
              {/* End .container */}
            </TabPanel>
            {/* Contact Content Ends */}

            {/* Blog Content Starts */}
            <TabPanel className="blog">
              <div
                  className="title-section text-left text-sm-center "
                  data-aos="fade-up"
                  data-aos-duration="1200"
              >
                <h1>
                  my <span>blog</span>
                </h1>
                <span className="title-bg">posts</span>
              </div>
              <div
                  className="container"
                  data-aos="fade-up"
                  data-aos-duration="1200"
              >
                {/*  Articles Starts  */}
                <div className="row pb-50">
                  <Blog/>
                </div>
                {/* Articles Ends */}
              </div>
            </TabPanel>
            {/* Blog Content Ends */}
          </div>
        </Tabs>
      </div>
  );
};

export default HomeDark;