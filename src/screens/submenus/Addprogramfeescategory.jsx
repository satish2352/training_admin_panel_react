import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";

const AddProgramFeesCategory = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "https://api.sumagotraining.in/public/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("remember_token");
    if (!token) {
      toast.error("Unauthorized: Token missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);

    try {
      const response = await fetch(`${BASE_URL}/add_feecategory`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        toast.success("Program Fees Category added successfully!");
        navigate("/programfeescategorydetails"); // Navigate to listing page
      } else {
        toast.error("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("An error occurred. Please try again.");
    }
  };




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
                          ADD PROGRAM<span className="highlight"> FEES CATEGORY</span>
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
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter category name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          maxLength={100}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-center"> <Button variant="primary" className="fs-5" type="submit">Submit</Button>


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


export default AddProgramFeesCategory;