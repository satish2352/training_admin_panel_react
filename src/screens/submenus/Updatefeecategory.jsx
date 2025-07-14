import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const Updatefeecategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseData = location.state || {};

  const [title, setTitle] = useState(courseData.title || "");





  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!courseData.id) {
      toast.error("Invalid course ID.");
      return;
    }

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("title", title);

    try {
      const response = await fetch(
        `https://api.sumagotraining.in/public/api/update_feecategory/${courseData.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log("Updating Course ID:", courseData.id);

      const textResponse = await response.text();
      console.log("Raw API Response:", textResponse); // Debugging

      if (response.ok) {
        toast.success("Program fee category updated successfully!");
        navigate("/programfeescategorydetails");
      } else {
        toast.error(`Update failed: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("An error occurred. Please try again.");
    }
  };



  //   return (
  //           <div className="container idcardbackimg">
  //               <div>
  //                   <img src={corner} className="corner_img" alt="Responsive Corner" />
  //               </div>
  //               <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  //                   <img src={logo1} class="img-fluid logo1" alt="..." />
  //                   <img src={logo2} className="img-fluid logo2" alt="..." />
  //               </div>
  //               <Container>
  //                   <div className="text-center title-container">
  //                       <b className="title-text">
  //                           UPDATE <span className="highlight">FEE CATEGORY</span>
  //                       </b>
  //                   </div>
  //               </Container> {/* Breadcrumb with Back Button */}
  //               <Container>
  //                   <div className="d-flex align-items-center">

  //                       <Breadcrumb className="mb-2">
  //                           <Breadcrumb.Item onClick={() => navigate("/programfeescategorydetails")}>Back</Breadcrumb.Item>
  //                           <Breadcrumb.Item active>Update Feecategory</Breadcrumb.Item>
  //                       </Breadcrumb>
  //                   </div>
  //               </Container>
  //               <div className="container mt-2">
  //                   <Card className="p-4 ms-4 me-4 shadow-lg">
  //                       <Card.Body>
  //         <Form onSubmit={handleUpdate}>
  //           <Form.Group className="mb-3">
  //             <Form.Label>Program Fees Category Name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               placeholder="Enter course name"
  //               value={title}
  //               onChange={(e) => setTitle(e.target.value)}
  //             />
  //           </Form.Group>

  //           <div className="d-flex justify-content-center"> <Button variant="primary" type="submit">Submit</Button>
  //                                                             <Button variant="secondary" className="ms-2" onClick={() => navigate('/programfeescategorydetails')}>Cancel</Button>
  //                                                         </div>
  //                         </Form>
  //                         </Card.Body>
  //                         </Card>
  //                     </div>

  //                 </div>
  //             );
  //         };


  // export default Updatefeecategory;

  return (
    <div className="container idcardbackimg">
      <div>
        <img src={corner} className="corner_img" alt="Responsive Corner" />
      </div>
      <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={logo1} class="img-fluid logo1" alt="..." />
        <img src={logo2} className="img-fluid logo2" alt="..." />
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Accordion defaultActiveKey="0">
              <Card className=" mt-5">
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <Container>
                      <div className="text-start title-container">
                        <b className="title-text fs-2">
                          UPDATE PROGRAM<span className="highlight"> FEES CATEGORY</span>
                        </b>
                      </div>
                    </Container>
                    <Button className="me-3 fs-5 text-nowrap"
                      style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/programfeescategorydetails')}>
                      Fees Category Details
                    </Button>
                  </div>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form onSubmit={handleUpdate}>
                      <Form.Group className="mb-3">
                        <Form.Label>Program Fees Category Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter course name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-center"> <Button variant="primary" type="submit">Submit</Button>
                        {/* <Button variant="secondary" className="ms-2" onClick={() => navigate('/programfeescategorydetails')}>Cancel</Button> */}
                      </div>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};



export default Updatefeecategory;