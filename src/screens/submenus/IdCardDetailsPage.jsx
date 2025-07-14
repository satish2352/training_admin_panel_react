import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import "./completion.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";


const IdCardDetailsPage = () => {
  const { id } = useParams();
  const [internDetails, setInternDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const formatDate = (dob) => {
    if (!dob) return ""; // Handle empty case
  
    let dateObj = new Date(dob); // Convert string to Date object
    let day = String(dateObj.getDate()).padStart(2, "0"); // Ensure two-digit day
    let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    let year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
  };






  // const contentRef = useRef(null); // Reference to the entire form
  // const printButtonRef = useRef(null);

  // const handleDownloadPDF = () => {
  // if (!contentRef.current) {
  //   console.error("Content reference is null.");
  //   return;
  // }

  // if (printButtonRef.current) printButtonRef.current.style.display = "none"; // Hide print button

  // html2canvas(contentRef.current, {
  //   scale: 2, // Improve quality
  //   useCORS: true,
  //   backgroundColor: null, // Transparent background
  // }).then((canvas) => {
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const imgWidth = 210; // A4 width in mm
  //   const pageHeight = 297; // A4 height in mm
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale proportionally

  //   if (imgHeight <= pageHeight) {
  //     //  If content fits on a single page, add directly
  //     pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, imgWidth, imgHeight);
  //   } else {
  //     //  If content is larger than one page, split it
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     while (heightLeft > 0) {
  //       const pageCanvas = document.createElement("canvas");
  //       const pageCtx = pageCanvas.getContext("2d");

  //       const sliceHeight = Math.min(canvas.height - position, (pageHeight * canvas.width) / imgWidth);
  //       pageCanvas.width = canvas.width;
  //       pageCanvas.height = sliceHeight;

  //       pageCtx.drawImage(
  //         canvas,
  //         0, position, // Capture only the needed section
  //         canvas.width, sliceHeight,
  //         0, 0,
  //         pageCanvas.width, pageCanvas.height
  //       );

  //       const pageImage = pageCanvas.toDataURL("image/jpeg");

  //       pdf.addImage(pageImage, "JPEG", 0, 0, imgWidth, (sliceHeight * imgWidth) / canvas.width);

  //       heightLeft -= sliceHeight * (imgWidth / canvas.width);
  //       position += sliceHeight;

  //       if (heightLeft > 0) {
  //         pdf.addPage();
  //       }
  //     }
  //   }
      
  //     if (printButtonRef.current) printButtonRef.current.style.display = "block"; // Show print button
  
  //      // Generate filename based on student's name
  //      const fileName = `${fname}_${lname}_Idcard_details.pdf`.replace(/\s+/g, "_"); // Replace spaces with underscores

  //      // Save the PDF
  //      pdf.save(fileName);
       
  //   //   const pdfBlob = pdf.output("blob");
  //   //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   //   window.open(pdfUrl);
  //   // }).catch((error) => {
  //   //   console.error("Error generating PDF:", error);

 
  //      // Ensure buttons are visible again in case of an error
  //      if (printButtonRef.current) printButtonRef.current.style.display = "block";
  //    });
  //  };
  
  
  



  const BASE_URL = "https://api.sumagotraining.in/public/api";

  useEffect(() => {
    const fetchInternDetails = async () => {
      const accessToken = localStorage.getItem("remember_token");
      console.log("Fetching ID:", id);

      try {
        const response = await axios.get(
          `${BASE_URL}/get-perticular-id-card-info/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response.data); // Debug log
        setInternDetails(response.data); // Ensure fields are at the root level
      } catch (err) {
        setError("Failed to fetch intern details. Please try again later.");
        console.error("Error fetching intern details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternDetails();
  }, [id]);

  // Handling loading, error, and missing data states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!internDetails) return <p>No intern details found.</p>;

  const {
    fname = "",
    fathername ="",
    mname = "",
    lname = "",
    technology_name = "",
    date_of_joining = "",
    contact_details = "",
    blood = "",
    shirt_size = "",
  } = internDetails || {};

  return (
    <>
<div className="idcardbackimg pdf-content">
<div className="pdf-page">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo1} className="img-fluid logo1" alt="Logo 1" />
          <img src={logo2} className="img-fluid logo2" alt="Logo 2" />
        </div>

        {/* Id Card Details */}
        <Container fluid>
          <Card style={{ backgroundColor: "transparent", border: "none" }}>
            <Card.Header
              className="cardpersonal_details"
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <div
                className="position-absolute"
                style={{
                  backgroundColor: "black",
                  width: "20px",
                  height: "30px",
                }}
              >
                <div className="personal-card-heading position-relative">
                  <b className="form-title">ID CARD DETAILS FORM</b>
                </div>
              </div>
            </Card.Header>
            <Card.Body
              style={{ backgroundColor: "transparent", color: "white" }}
              className="pt-5"
            >
              <Row>
                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="d-none d-md-block label-colour"
                  >
                    Name of Intern:
                  </b>
                </Col>
                <Col g={10} md={10} sm={12} className="d-none d-md-block">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      value={`${fname} ${mname} ${fathername} ${lname}`}
                      name="name"
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col lg={2} md={12} sm={10}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Technology Name:
                  </b>
                </Col>
                <Col lg={4} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      value={technology_name}
                      name="technology"
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col lg={2} md={12} sm={10}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Date of Joining:
                  </b>
                </Col>
                <Col lg={4} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      value={`${formatDate(date_of_joining)}`}

                      name="date_of_joining"
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col lg={2} md={12} sm={10}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Contact Details:
                  </b>
                </Col>
                <Col lg={4} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      value={contact_details}
                      name="contact_details"
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col lg={2} md={12} sm={10}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Blood Group:
                  </b>
                </Col>
                <Col lg={4} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      value={blood}
                      name="blood_group"
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col lg={2} md={12} sm={10}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    T-Shirt Size:
                  </b>
                </Col>
                <Col lg={4} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      value={shirt_size}
                      name="shirt_size"
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>


        {/* <div className="button-container">
            <Button
              variant="primary"
              // onClick={handleDownloadPDF}
              // ref={printButtonRef}

              style={{
                backgroundColor: "#17a2b8",
                borderColor: "#17a2b8",
              }} // Change to your desired color
            >
              Print
            </Button> */}
          {/* </div> */}
      </div>
      </div>
    </>
  );
};

export default IdCardDetailsPage;
