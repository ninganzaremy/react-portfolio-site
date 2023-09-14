import React, {useEffect} from "react";
import ScrollToTop from "./components/ScrollToTop";
import AllRoutes from "./router/AllRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";

const App = () => {
	// this for animation
	useEffect(() => {
		AOS.init({
			duration: 1200,
		});
	}, []);

	return (
		<>
			<ScrollToTop />
			<AllRoutes />
			{/* End contact */}
			<ToastContainer />
			{/* Same as */}
		</>
	);
};

export default App;