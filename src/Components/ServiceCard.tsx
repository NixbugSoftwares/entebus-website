// src/components/ServiceCard.tsx
import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
interface ServiceCardProps {
 title: string;
 image: string;
 text: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ image, text, title }) => {
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 return (
<Card style={{ width: "19rem", height: "450px", borderRadius: "25px" }}className="overflow-hidden">
<div>
<Card.Img variant="top" src={image}
       style={{ width: "100%",
          height: "300px" ,
         objectFit: "cover",
         borderTopLeftRadius: "25px",
         borderTopRightRadius: "25px"}}/>
</div>

<Card.Body className="d-flex flex-column" style={{ borderTop: "1px solid #ddd" }} >
<div style={{ height: "50%" }}>
<Card.Title className="text-center" style={{ fontSize: "20px" }}>
           {title}
</Card.Title>
</div>
       {/* <div style={{ height: "55%" }}>
<Card.Text
           className="text-left "
           style={{
             display: "-webkit-box",
             WebkitLineClamp: 4, // number of lines to show
             WebkitBoxOrient: "vertical",
             overflow: "hidden",
             textOverflow: "ellipsis",
           }}
>
           {text}
</Card.Text>
</div> */}
<div style={{ height: "50%" }} className="d-flex justify-content-center align-items-end">
<Button onClick={handleShow} style={{background:" linear-gradient(90deg, #000000c9 0%, #194ebfc2 90%)"}}>
           View Detail
</Button>
</div>
</Card.Body>


<Modal centered show={show} onHide={handleClose} className="transition-modal">
<Modal.Header closeButton style={{alignItems: "start"}}>
<Modal.Title className="text-center">{title}</Modal.Title>
</Modal.Header>
<Modal.Body>
<div className="text-center"  >
<img
             src={image}
             alt={title}
             className="img-fluid mb-3"
             style={{ width: "400px", height:'380px', borderRadius: "15px" }}
           />
<p>{text}</p>
</div>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose} >
           Close
</Button>
</Modal.Footer>
</Modal>
</Card>
 );
};
export default ServiceCard;