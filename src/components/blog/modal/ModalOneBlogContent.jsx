import React from "react";

const ModalOneBlogContent = () => {
	return (
		//  Article Starts
		<article>
			<div className="title-section text-left text-sm-center">
				<h1>
					Post <span>Details</span>
				</h1>
				<span className="title-bg">posts</span>
			</div>
			{/* Meta Starts */}

			<div className="meta open-sans-font">
				<span>
					<i className="fa fa-user"></i> Remy
				</span>
				<span className="date">
					<i className="fa fa-calendar"></i> 9 January 2022
				</span>
				<span>
					<i className="fa fa-tags"></i> wordpress, business, economy, design
				</span>
			</div>
			{/* Meta Ends */}
			{/* Article Content Starts */}

			<h1>How I got my first Job as Web Dev</h1>
			<img src="img/blog/blog-post-1.jpg" className="img-fluid" alt="Blog" />
			<div className="blog-excerpt open-sans-font pb-5">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<div className="quotebox">
					<div className="icon">
						<img src="img/blog/quote.svg" alt="blog quote" />
					</div>
					<p>Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.” - Bill Gates.</p>
				</div>
				<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			</div>
			{/* Article Content Ends */}
		</article>
		// Article Ends
	);
};

export default ModalOneBlogContent;
