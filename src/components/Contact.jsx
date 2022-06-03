import React from "react";
import { useForm, ValidationError } from "@formspree/react";

function Contact() {
	const [state, handleSubmit] = useForm("xnqqywgb");
	if (state.succeeded) {
		return <p style={{ color: "white", background: "green", padding: "2rem", textAlign: "center" }}>Your request was received. We'll be in touch shortly.</p>;
	}

	return (
		<>
			<form className="contactform" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<input id="name" type="text" name="name" required placeholder="YOUR NAME" />
							<ValidationError prefix="name" field="name" errors={state.errors} />
						</div>
					</div>
					{/* End .col */}

					<div className="col-12 col-md-6">
						<div className="form-group">
							<input type="email" name="email" required placeholder="YOUR EMAIL" />
							<ValidationError prefix="Email" field="email" errors={state.errors} />
						</div>
					</div>
					{/* End .col */}

					<div className="col-12 col-md-12">
						<div className="form-group">
							<input type="text" id="subject" name="subject" required placeholder="YOUR SUBJECT" />
							<ValidationError prefix="Subject" field="subject" errors={state.errors} />
						</div>
					</div>
					{/* End .col */}

					<div className="col-12">
						<div className="form-group">
							<textarea id="message" name="message" required placeholder="YOUR MESSAGE" />
							<ValidationError prefix="Message" field="message" errors={state.errors} />
						</div>
					</div>
					{/* End .col */}

					<div className="col-12">
						<button type="submit" disabled={state.submitting} className="button">
							<span className="button-text" required>
								Send Message
							</span>
							<span className="button-icon fa fa-send"></span>
						</button>
					</div>
					{/* End .col */}
				</div>
			</form>

			{/* End contact */}
		</>
	);
}

export default Contact;
