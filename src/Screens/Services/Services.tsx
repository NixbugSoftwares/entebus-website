
// src/pages/Home.tsx
import ServiceCard from "../../Components/ServiceCard";

// assets
import BusTracking from "../../assets/BusTracking.png";
import DigitalTicketing from "../../assets/DigitalTicketing.png";
import ExclusivePerk from "../../assets/ExclusivePerk.png";
import Fleet from "../../assets/ScalableFleet.png";
import RouteOptimization from "../../assets/RouteOptimization.png";
import TicketingInsights from "../../assets/TicketingInsightspng.png";
import Reliable from "../../assets/relaiable.png";
import source from "../../assets/open Source.png";

const servicesData = [
  {
    title:"Ticketing Insights & Conductor-Wise Settlement",
    image: TicketingInsights,
    text: "Get end-of-day insights showing exactly how much each conductor is accountable for, ensuring transparency and minimising revenue leakage, whether using digital or paper tickets.",
  },
  {
    title:"Route Optimization & Occupancy Insights",
    image: RouteOptimization,
    text: "Leverage passenger data and heatmaps to reduce empty runs, cut fuel costs, and optimise route planning for better resource utilisation.",
  },
  {
    title:"Real-Time Bus Tracking",
    image: BusTracking,
    text: "Provide live bus location, occupancy levels, and movement updates to both passengers and operators — delivering convenience, transparency, and smarter commute decisions.",
  },
  {
    title:"QR-Based Cryptographic Digital Ticketing",
    image: DigitalTicketing,
    text: "Secure digital tickets powered by cryptographic QR codes — Work even without the internet, ensuring no one can manipulate or fake ticket sales.",
  },
  {
    title:"Scalable Fleet & Staff Management",
    image: Fleet,
    text: "Easily manage any number of buses, routes, and staff from a single dashboard — Our centralized system brings order and control, no matter the scale.",
  },
  {
    title:"Transparent & Reliable Technology",
    image: source,
    text: "Fully open source and community powered — Just a smartphone with internet and GPS is enough.",
  },
  {
    title:"Exclusive Perks Through MNC Partnerships",
    image: ExclusivePerk,
    text: "Unlock powerful benefits by partnering through our platform — Enjoy free thermal papers, printers, and essential hardware components. Passengers benefit from discounted ticket rates, while operators gain access to free fuel, reduced insurance premiums, and more, driving both savings and satisfaction at every level.",
  },
  {
    title:'Maintenance and Technical Support',
    image: Reliable,
    text: "24/7 reliable IT support— On-call and remote assistance for technical issues. Full support for ticket printing hardware devices. Preventive maintenance to reduce software interruptions and downtime.",
  },
];

const Services = () => {
  return (
    <div className="min-vh-100 container" style={{paddingTop:'115px' }}>
      <h1 className="text-center pb-4 text-white"> Features</h1>
      <div className="d-flex flex-wrap  justify-content-center justify-content-xl-between align-items-center gap-4">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} image={service.image} text={service.text} title={service.title || ""}/>
        ))}
      </div>
    </div>
  );
};

export default Services;
