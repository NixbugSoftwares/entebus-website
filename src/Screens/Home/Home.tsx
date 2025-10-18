import Carousel from "react-bootstrap/Carousel";
import QR from "../../assets/QR.png";
import Ticketing from "../../assets/Ticketing.png";
import Route from "../../assets/Route.png";
import BusTracker from "./busTracker";

const carouselItems = [
  {
    image: Ticketing,
    caption: "Ticketing Insights & Conductor-wise Settlement",
  },
  { image: QR, caption: "Secure QR-Based Digital Ticketing" },
  { image: Route, caption: "Route Optimisation & Occupancy Insights" },
];

const Home = () => {
  return (
    <div
      className="min-vh-100"
      style={{ backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div
        style={{ paddingTop: "50px" }}
        className="d-flex flex-column flex-lg-row gap-5 align-items-center min-vh-100 text-dark container pb-2"
      >
        {/* Carousel Column */}
        <div className="w-100 w-lg-50 order-1 order-lg-2 d-flex flex-column justify-content-center mt-5">
          <div className="h-100">
            <Carousel
              fade
              className="h-100"
              style={{ borderRadius: "30px", overflow: "hidden" }}
            >
              {carouselItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={item.image}
                    alt={`slide-${index}`}
                  />
                  <Carousel.Caption>
                    <p className="text-white p-1  rounded" style={{backgroundColor:"#1a1919a1"}}>{item.caption}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>

        {/* Text + BusTracker Column (split for responsive control) */}
        <div className="w-100 w-lg-50 order-2 order-lg-1 d-flex flex-column justify-content-center ">
          {/* BusTracker comes second on PC but before text on mobile */}
          <div className="order-2 order-lg-2  d-lg-none">
            <BusTracker />
          </div>
          <div className="order-3 order-lg-1">
            <h1
              className="fw-bold"
              style={{ color: "#004AAC", fontSize: "4rem" }}
            >
              Entebus
            </h1>
            {/* <h3 className="mt-2 fs-3 text-white">
              "Transform Your Manual Bus Business <br />
              into a Smart, Automated System with
              <span style={{ color: "#004AAC" }}> ENTEBUS!"</span>
            </h3> */}
            <h3 className="mt-2 pb-2 fs-3 text-white">
              "Seamless Travel, Everywhere You Go"
            </h3>
            {/* <p className="fs-5 mt-3 text-white">
              ENTEBUS is an all-in-one smart automation software designed
              specifically for bus operators. From ticketing to route
              optimization, fleet management to compliance, we help digitize and
              streamline every aspect of your operations.
            </p> */}
            <p className="fs-5 mt-3 text-white">
              Entebus is an Open-Source, End-To-End Solution powering the Future
              of connected and Intelligent Public Transport.
              We empower transport operators with Digital Solutions for
              Ticketing, Route Optimization, and Fleet Management.
            </p>
            {/* <p className="fs-5 mt-3 text-white">
              We empower transport operators with Digital Solutions for
              Ticketing, Route Optimization, and Fleet Management.
            </p> */}
          </div>
          {/* BusTracker for PC view (after text) */}
          <div className="order-3 order-lg-3 mt-4 d-none d-lg-block">
            <BusTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
