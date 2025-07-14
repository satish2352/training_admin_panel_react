import React from "react";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CompletionFormSkeleton = () => {
    return (
        <div className="container backimg">
          {/* Top Section with Logos */}
          <div>
            <Skeleton height={40} width={300} style={{ marginBottom: "20px" }} />
          </div>
          <div className="logo-container d-flex justify-content-center align-items-center">
            <Skeleton height={80} width={120} style={{ marginRight: "10px" }} />
            <Skeleton height={80} width={120} />
          </div>
    
          {/* Title */}
          <Container>
            <div className="text-center title-container">
              <Skeleton height={40} width={400} />
            </div>
          </Container>
    
          {/* Internship Completion Form Card */}
          <Container fluid>
            <Card style={{ backgroundColor: "transparent", border: "none" }}>
              <Card.Header className="cardpersonal_details" style={{ backgroundColor: "transparent", border: "none" }}>
                <Skeleton height={30} width={250} />
              </Card.Header>
    
              <Card.Body className="pt-5">
                <Row>
                  {/* Name */}
                  <Col lg={2} md={2} sm={12}>
                    <Skeleton height={20} width={100} />
                  </Col>
                  <Col lg={10} md={10} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
                </Row>
    
                <Row>
                  {/* Technology */}
                  <Col lg={2} md={2} sm={12}>
                    <Skeleton height={20} width={100} />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
    
                  {/* Email */}
                  <Col lg={2} md={2} sm={12}>
                    <Skeleton height={20} width={100} />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
                </Row>
    
                <Row>
                  {/* Date of Joining */}
                  <Col lg={2} md={2} sm={12}>
                    <Skeleton height={20} width={150} />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
    
                  {/* Training Mode */}
                  <Col lg={2} md={2} sm={12}>
                    <Skeleton height={20} width={150} />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
                </Row>
    
                <Row>
                  {/* Project Title */}
                  <Col lg={2} md={2} sm={12}>
                    <Skeleton height={20} width={150} />
                  </Col>
                  <Col lg={10} md={10} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
                </Row>
    
                <Row>
                  {/* Describe Project */}
                  <Col lg={3} md={3} sm={12}>
                    <Skeleton height={20} width={250} />
                  </Col>
                  <Col lg={9} md={9} sm={12}>
                    <Skeleton height={60} width={"100%"} />
                  </Col>
                </Row>
    
                <Row>
                  {/* Placed Status */}
                  <Col lg={3} md={3} sm={12}>
                    <Skeleton height={20} width={200} />
                  </Col>
                  <Col lg={3} md={3} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
    
                  {/* Employer Name */}
                  <Col lg={3} md={3} sm={12}>
                    <Skeleton height={20} width={250} />
                  </Col>
                  <Col lg={3} md={3} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
                </Row>
    
                <Row>
                  {/* Package */}
                  <Col lg={3} md={3} sm={12}>
                    <Skeleton height={20} width={250} />
                  </Col>
                  <Col lg={3} md={3} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
                </Row>
    
                {/* Task Links */}
                <Row>
                  <Col lg={12}>
                    <Skeleton height={20} width={400} />
                  </Col>
                </Row>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Row key={index}>
                    <Col lg={2} md={2} sm={12}>
                      <Skeleton height={20} width={100} />
                    </Col>
                    <Col lg={10} md={10} sm={12}>
                      <Skeleton height={40} width={"100%"} />
                    </Col>
                  </Row>
                ))}
    
                {/* GitHub & Project Video Links */}
                <Row>
                  <Col lg={2} md={3} sm={12}>
                    <Skeleton height={20} width={300} />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
    
                  <Col lg={2} md={3} sm={12}>
                    <Skeleton height={20} width={300} />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Skeleton height={40} width={"100%"} />
                  </Col>
                </Row>
    
                {/* Google Review Image */}
                <Row>
                  <Col lg={2} md={3} sm={12}>
                    <Skeleton height={20} width={300} />
                  </Col>
                  <Col lg={4} md={3} sm={12}>
                    <Skeleton height={80} width={80} />
                  </Col>
                </Row>
    
                {/* Feedback Video */}
                <Row>
                  <Col lg={2} md={3} sm={12}>
                    <Skeleton height={20} width={300} />
                  </Col>
                  <Col lg={4} md={3} sm={12}>
                    <Skeleton height={80} width={150} />
                  </Col>
                </Row>
    
                {/* Resume PDF */}
                <Row>
                  <Col lg={2} md={3} sm={12}>
                    <Skeleton height={20} width={300} />
                  </Col>
                  <Col lg={4} md={3} sm={12}>
                    <Skeleton height={80} width={80} />
                  </Col>
                </Row>
    
                {/* Button */}
                <Row className="text-center mt-4">
                  <Skeleton height={50} width={200} />
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      );
    };
    

export default CompletionFormSkeleton;
