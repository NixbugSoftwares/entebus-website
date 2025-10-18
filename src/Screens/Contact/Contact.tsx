const Contact = () => {
  return (
    <div
      className="min-vh-50 container-fluid mt-5 text-white "
      // style={{ backgroundColor: "white" }}
    >
      <h2 className="text-center text-white">Feel Free to Connect with Us</h2>
      <p className="text-center">
        Our team is here to help you with any inquiries or questions you may
        have.
      </p>

      <div className="row mt-4 mx-5 g-4 ">
        {/* Map Section */}
        <div className="col-12 col-md-6 pt-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d704.9205850809!2d76.69837190457953!3d8.763499449457957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ef75a846f879%3A0x1029bae080fd833d!2sNixbug%20Softwares!5e1!3m2!1sen!2sin!4v1758277699465!5m2!1sen!2sin"
            width="90%"
            height="250"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Info */}
        <div className="col-12 col-md-3">
          <h5>Contact Info</h5>
          <div
            className="mb-4"
            style={{
              height: "4px",
              backgroundColor: "white",
              width: "40%",
              borderRadius: "20px",
            }}
          ></div>
          <p className="pb-3 ">
            <i className="fa-solid fa-location-dot fs-5"></i> : Nixbug, Business
            House EP-V-245 2nd floor, Venkulam, Edava PO 695311
          </p>
          <a href="tel:+919496801157" className="text-decoration-none ">
            {" "}
            <p className="text-white pb-3 fs-5">
              <i className="fa-solid fa-phone"></i> : +91 94968 01157
            </p>
          </a>
          {/* <p><i className="fa-solid fa-envelope"></i> : contact@nixbug.com</p> */}
          <a
            href="mailto:contact@nixbug.com"
            className="text-decoration-none pb-3"
          >
            {" "}
            <p className="text-white fs-5">
              <i className="fa-solid fa-envelope"></i> : contact@nixbug.com
            </p>
          </a>
        </div>

        {/* Social Media */}
        <div className="col-12 col-md-3 ps-0  ps-md-5">
          <h5>Socials</h5>
          <div
            className="mb-4"
            style={{
              height: "4px",
              backgroundColor: "white",
              width: "30%",
              borderRadius: "20px",
            }}
          ></div>
          <div className="d-flex gap-4">
            <p>
              <a
                className="social"
                href="https://www.linkedin.com/company/nixbug-softwares/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>{" "}
              </a>
            </p>
            <p>
              {" "}
              <a
                className="social"
                href="https://www.instagram.com/nixbug_softwares?igsh=NjB1dWZ6YWNpN3pu"
                target="_blank"
              >
                <i className="fa-brands fa-square-instagram"></i>
              </a>
            </p>
            <p>
              {" "}
              <a className="social" href="https://nixbug.com/" target="_blank">
                <i className="fa-solid fa-globe"></i>
              </a>
            </p>
          </div>
        </div>
        <p className="text-center">
          ©2025 NixBug Softwares. All rights reserved. T&C Apply
        </p>
      </div>
    </div>
  );
};

export default Contact;
