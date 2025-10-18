import { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight, } from "react-icons/fa";
import movingBus from "../../assets/movingbus-unscreen.gif";
import type { Bus, Service, Landmark } from "../../lib/type";
import {
  busGetApi,
  landmarkGetApi,
  serviceGetApi,
  serviceTraceGetApi,
} from "../../apiHelper/apiCall";

// ---------------------------
// Placeholder for server down / no data
// ---------------------------
const BusTrackerPlaceholder = ({ message = "Bus Tracker Unavailable" }) => {
  const placeholderLandmarks = Array.from({ length: 5 });
  return (
    <div
      className="position-relative d-flex flex-column align-items-center"
      style={{
        maxWidth: "400px",
        minHeight: "150px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      {/* Timeline line */}
      <div
        style={{
          position: "absolute",
          top: "70px",
          left: "10px",
          right: "10px",
          height: "4px",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "2px",
        }}
      />

      <div className="d-flex justify-content-between w-100 position-relative">
        {placeholderLandmarks.map((_, i) => (
          <div
            key={i}
            className="d-flex flex-column align-items-center"
            style={{ flex: 1 }}
          >
            <FaMapMarkerAlt size={16} color="rgba(255,255,255,0.3)" />
            <div
              style={{
                height: "6px",
                width: "6px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
                marginTop: "8px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Faded Bus */}
      <div
        className="d-flex flex-column align-items-center mt-3"
        style={{ opacity: 0.3 }}
      >
        <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>
          {message}
        </p>
      </div>
    </div>
  );
};

// Main BusTracker component
const BusTracker = () => {
  const [bus, setBus] = useState<Bus | null>(null);
  const [_service, setService] = useState<Service | null>(null);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [currentLandmarkId, setCurrentLandmarkId] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);

  const visibleCount = 4;
  const itemWidth = 100;

  const updateScrollButtons = () => {
    if (!timelineRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const serviceResponse = await serviceGetApi({ status: 2, order_in: 2 });

        if (!serviceResponse.data?.length) {
          setError("No active service available.");
          return;
        }

        const selectedService = serviceResponse.data[0];
        setService(selectedService);

        const landmarkIds = selectedService.route?.landmark?.map((lm: any) => lm.landmark_id) || [];
        const landmarkResponse = await landmarkGetApi({ id_list: landmarkIds });

        if (!landmarkResponse.data?.length) {
          setError("No landmarks found for this service.");
          return;
        }

        const sortedLandmarks = landmarkIds
          .map((id: number) => landmarkResponse.data.find((lm: any) => lm.id === id))
          .filter(Boolean) as Landmark[];

        setLandmarks(sortedLandmarks.reverse());

        if (selectedService.bus_id) {
          const busResponse = await busGetApi({ id: selectedService.bus_id });
          if (!busResponse.data?.length) {
            setError("Bus details unavailable.");
            return;
          }
          setBus(busResponse.data[0]);
        }

        const traceResponse = await serviceTraceGetApi({
          service_id: selectedService.id,
        });

        if (traceResponse.data?.length) {
          setCurrentLandmarkId(
            traceResponse.data[traceResponse.data.length - 1].landmark_id
          );
        } else {
          setError("No trace data found for this service.");
        }

        const intervalId = setInterval(async () => {
          try {
            const traceRes = await serviceTraceGetApi({
              service_id: selectedService.id,
            });
            if (traceRes.data?.length) {
              setCurrentLandmarkId(
                traceRes.data[traceRes.data.length - 1].landmark_id
              );
            }
          } catch (err) {
            console.error("Error refreshing trace:", err);
          }
        }, 60 * 1000);

        return () => clearInterval(intervalId);
      } catch (error) {
        console.error("Error fetching bus tracker data:", error);
        setError("Server unavailable. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;
    const handleScroll = () => updateScrollButtons();
    timelineElement.addEventListener("scroll", handleScroll);
    updateScrollButtons();
    return () => timelineElement.removeEventListener("scroll", handleScroll);
  }, [landmarks, currentLandmarkId]);

  useEffect(() => {
    if (timelineRef.current && landmarks.length > 0 && currentLandmarkId) {
      const currentIndex = landmarks.findIndex((lm) => lm.id === currentLandmarkId);
      const container = timelineRef.current;
      const scrollPosition =
        currentIndex * itemWidth - Math.floor(visibleCount / 2) * itemWidth;
      container.scrollLeft = Math.max(scrollPosition, 0);
      setTimeout(updateScrollButtons, 100);
    }
  }, [landmarks, currentLandmarkId]);

  const scrollLeft = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        left: -visibleCount * itemWidth,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        left: visibleCount * itemWidth,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 300);
    }
  };

  // -------------------------------
  // Fallback UI
  // -------------------------------
  if (error || landmarks.length === 0) {
    return <BusTrackerPlaceholder message={error || "Tracker not available"} />;
  }

  // -------------------------------
  // Normal timeline UI
  // -------------------------------
  return (
    <div
      className="position-relative"
      style={{ maxWidth: `${visibleCount * itemWidth}px`, }}
    >
      {/* Left Arrow */}
      {landmarks.length > visibleCount && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="btn btn-sm btn-outline-light position-absolute d-none d-md-flex"
          style={{
            top: "50%",
            background: "white",
            color: "black",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaChevronLeft size={14} />
        </button>
      )}

      {/* Right Arrow */}
      {landmarks.length > visibleCount && canScrollRight && (
        <button
          onClick={scrollRight}
          className="btn btn-sm btn-outline-light position-absolute d-none d-md-flex"
          style={{
            right: "-30px",
            top: "50%",
            background: "#fffefeff",
            color: "black",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaChevronRight size={14} />
        </button>
      )}

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="timeline-container py-4 px-2"
        style={{
          position: "relative",
          minHeight: "140px",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            .timeline-container::-webkit-scrollbar { display: none; }
            .bus-tooltip {
              position: absolute;
              bottom: 60px;
              left: 50%;
              transform: translateX(-50%);
              background-color: #fff;
              color: #000;
              font-size: 0.75rem;
              font-weight: bold;
              padding: 2px 6px;
              border-radius: 6px;
              white-space: nowrap;
            }
            .bus-tooltip::after {
              content: '';
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid #fff;
            }
          `}
        </style>

        {/* Horizontal Line */}
        <div
          style={{
            position: "absolute",
            top: "70px",
            left: 0,
            width: `${landmarks.length * itemWidth}px`,
            height: "5px",
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 1,
          }}
        />

        {/* Landmarks + Bus */}
        <div
          className="d-flex align-items-end"
          style={{
            position: "relative",
            zIndex: 2,
            width: `${landmarks.length * itemWidth}px`,
          }}
        >
          {landmarks.map((place, index) => {
            const isCurrent = place.id === currentLandmarkId;
            const isStart = index === 0;
            const isEnd = index === landmarks.length - 1;

            return (
              <div
                key={index}
                className="d-flex flex-column align-items-center position-relative text-center px-2"
                style={{
                  flex: `0 0 ${itemWidth}px`,
                }}
              >
                {isCurrent && bus ? (
                  <div style={{ position: "relative", marginBottom: "6px" }}>
                    <div className="bus-tooltip">{bus.name}</div>
                    <img
                      src={movingBus}
                      alt="Bus"
                      style={{
                        width: "80px",
                        height: "55px",
                        objectFit: "contain",
                        marginBottom: "2px",
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ position: "relative", marginBottom: "20px" }}>
                    <FaMapMarkerAlt
                      size={isStart || isEnd ? 20 : 16}
                      color={isStart || isEnd ? "red" : "#221fbbff"}
                      style={{ position: "relative", top: "-6px" }}
                    />
                  </div>
                )}

                <p
                  title={place.name}
                  className="small mt-1 fw-semibold text-white"
                  style={{
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {place.name.length > 10
                    ? place.name.substring(0, 10) + "..."
                    : place.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusTracker;
