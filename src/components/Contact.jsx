import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ReCAPTCHA} from 'react-google-recaptcha';

const Contact = () => {
  const form = useRef();
  const recaptchaRef = useRef();
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const sendEmail = e => {
    e.preventDefault();
    emailjs
    .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID.toString(),
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID.toString(),
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID.toString(),
    )
    .then(
        result => {
          toast.success('Message Sent Successfully!', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          document.getElementById('myForm').reset();
          // Reset reCAPTCHA after successful email submission
          recaptchaRef.current.reset();
          setIsRecaptchaVerified(false);
        },
        error => {
          toast.error('Ops Message Not Sent!', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
    );
  };
  return (
      <>
        <form id="myForm" className="contactform" ref={form}
              onSubmit={sendEmail}>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <input type="text" name="name" placeholder="YOUR NAME"
                       required/>
              </div>
            </div>
            {/* End .col */}

            <div className="col-12 col-md-6">
              <div className="form-group">
                <input
                    type="email"
                    name="user_email"
                    placeholder="YOUR EMAIL"
                    required
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-12 col-md-12">
              <div className="form-group">
                <input
                    type="text"
                    name="subject"
                    placeholder="YOUR SUBJECT"
                    required
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-12">
              <div className="form-group">
              <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  required
              ></textarea>
              </div>
            </div>
            {/* End .col */}

            <div className="col-12">
              <button type="submit" className="button"
                      disabled={!isRecaptchaVerified}>
                <span className="button-text">Send Message</span>
                <span className="button-icon fa fa-send"></span>
              </button>
            </div>
            <div className="col-12">
              <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_SITE_KEY.toString()}
                  onChange={() => setIsRecaptchaVerified(true)}
                  onExpired={() => setIsRecaptchaVerified(false)}
                  onErrored={() => {
                    toast.error(
                        'Error with reCAPTCHA. Please try again later.');
                    setIsRecaptchaVerified(false);
                  }}
              />
            </div>
            {/* End .col */}
          </div>
        </form>
      </>
  );
};
export default Contact;