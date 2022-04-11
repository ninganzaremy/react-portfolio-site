import React from "react";

const Address = () => {
	return (
		<>
			<p className="open-sans-font custom-span-contact position-relative">
				<i className="fa fa-map position-absolute"></i>
				<span className="d-block">Address Point</span>Tempe, AZ.
			</p>
			{/* End .custom-span-contact */}

			<p className="open-sans-font custom-span-contact position-relative">
				<i className="fa fa-envelope-open position-absolute"></i>
				<span className="d-block">mail me</span> <a href="mailto:remy@ninganzaremy.com">Remy</a>
			</p>
			{/* End .custom-span-contact */}

			<p className="open-sans-font custom-span-contact position-relative">
				<i className="fa fa-phone-square position-absolute"></i>
				<span className="d-block">call me</span> <a href="Tel: +1(862) 267-0710">+1(862) 267-0710</a>
			</p>
			{/* End .custom-span-contact */}
		</>
	);
};

export default Address;
