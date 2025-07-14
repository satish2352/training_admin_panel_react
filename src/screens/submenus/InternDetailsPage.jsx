import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Col, Form, Button, OverlayTrigger, Tooltip, } from "react-bootstrap";
import { FaEdit, FaEye } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { HiDownload } from "react-icons/hi";
import instance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import GenerateOfferLetter from "./GenerateOfferLetter.jsx";

const InternDetailsPage = () => {
  const { id } = useParams();
  const [internDetails, setInternDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate();
  useEffect(() => {
    const fetchInternDetails = async () => {
      const accessToken = localStorage.getItem("remember_token");
      try {
        const response = await instance.get(`get-perticular-intern-personal-info/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setInternDetails(response.data[0]); // Assuming the first object contains intern details
      } catch (err) {
        setError("Failed to fetch intern details. Please try again later.");
        console.error("Error fetching intern details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternDetails();
  }, [id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!internDetails) return <p>No intern details found.</p>;



  // const handleDelete = async (id) => {
  //   confirmAlert({
  //     title: "Confirm to delete",
  //     message: "Are you sure you want to delete this data?",
  //     customUI: ({ onClose }) => (
  //       <div
  //         style={{
  //           textAlign: "left",
  //           padding: "20px",
  //           backgroundColor: "white",
  //           borderRadius: "8px",
  //           boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
  //           maxWidth: "400px",
  //           margin: "0 auto",
  //         }}
  //       >
  //         <h2>Confirm to delete</h2>
  //         <p>Are you sure you want to delete this data?</p>
  //         <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
  //           <button
  //             style={{ marginRight: "10px" }}
  //             className="btn btn-primary"
  //             onClick={async () => {
  //               setLoading(true);
  //               const accessToken = localStorage.getItem("remember_token");
  //               try {
  //                 await instance.delete(`/intern-joining/delete/${id}`, {
  //                   headers: {
  //                     Authorization: `Bearer ${accessToken}`,
  //                     "Content-Type": "application/json",
  //                   },
  //                 });
  //                 toast.success("Data Deleted Successfully");
  //                 fetchProducts();
  //               } catch (error) {
  //                 console.error("Error deleting data:", error);
  //                 toast.error("Error deleting data");
  //               } finally {
  //                 setLoading(false);
  //               }
  //               onClose();
  //             }}
  //           >
  //             Yes
  //           </button>
  //           <button className="btn btn-secondary" onClick={() => onClose()}>
  //             No
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //   });
  // };

  const {
    fname = "",
    mname = "",
    fathername = "",
    lname = "",
    email = "",
    parmanenat_address = "",
    current_address = "",
    contact_details = "",
    whatsappno = "",
    blood = "",
    date_of_joining = "",
    technology_name = "",

  } = internDetails;



  return (
    <>
      <div className="container idcardbackimg">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"

        >
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} className="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text">
              INTERN PROFILE
            </b>
          </div>
        </Container>

        {/* Intern Details */}
        <Container fluid>
          <Row>
            {/* Personal Details Section (left side) */}
            <Col md={6} className="text-start">
              <Card
                style={{
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
                className="mt-5"
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
                    <b className="form-title">PERSONAL DETAILS</b>
                  </div>
                </div>
                <Card.Header
                  className="cardpersonal_details"
                  style={{ backgroundColor: "transparent", border: "none" }}
                ></Card.Header>
                <Card.Body>
                  <h5
                    className="text-center mb-4"
                    style={{ fontWeight: "bold", color: "#333" }}
                  ></h5>

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Full Name:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {fname} {mname} {fathername} {lname}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Email:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {email}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Contact:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {contact_details}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Whatsapp:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {whatsappno}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Blood Group:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {blood}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Address:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {parmanenat_address}
                    </Col>
                  </Row>
                  <hr />
                </Card.Body>
              </Card>
            </Col>

            {/* Links Section (right side) */}
            <Col md={6} className="mt-5">
              <Card
                style={{
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
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
                    <b className="form-title">FORMS</b>
                  </div>
                </div>
                <Card.Body>
                  <ul className="list-unstyled" style={{ paddingTop: "40px" }}>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          1. Intern Joining
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>




                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">Add Intern details</Tooltip>
                            }
                          >
                            <Button
                              variant="success"
                              className="ms-1"
                              onClick={() => navigate(`/InterJoining/${id}`, { state: internDetails })}
                            // onClick={() => navigate(`/InterJoining/${id}`)}
                            >
                              <HiUserAdd style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/update-intern-details/${id}`)}
                            >
                              <FaEdit style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>
                            }
                          >
                            <Button
                              variant="secondary"
                              className="ms-1"
                              onClick={() => navigate(`/intern-all-details/${id}`, { state: "row" })}

                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>


                          {/* <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="delete-tooltip">Delete</Tooltip>
                            }
                          >
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => handleDelete(id)}
                            >
                              <FaTrash />
                            </Button>
                          </OverlayTrigger> */}
                        </div>
                      </div>
                    </li>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          2. Id Card Issue
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>



                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">Add Id Card details</Tooltip>
                            }
                          >
                            <Button
                              variant="success"
                              className="ms-1"
                              onClick={() => navigate(`/IdCardIssue/${id}`)}
                            >
                              <HiUserAdd style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/update-Id-card-details/${id}`)}
                            >
                              <FaEdit style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>



                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>
                            }
                          >
                            <Button
                              variant="secondary"
                              className="ms-1"
                              onClick={() => navigate(`/Id-card-all-details/${id}`, { state: "row" })}
                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>

                          {/* <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="delete-tooltip">Delete</Tooltip>
                            }
                          >
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </OverlayTrigger> */}
                        </div>
                      </div>
                    </li>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          3. Completion
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>


                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">Add Completion details</Tooltip>
                            }
                          >
                            <Button
                              variant="success"
                              className="ms-1"
                              onClick={() => navigate(`/Completion/${id}`)}
                            >
                              <HiUserAdd style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/update-completion-details/${id}`)}

                            >
                              <FaEdit style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>



                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>

                            }
                          >
                            <Button
                              variant="secondary"
                              className="ms-1"
                              onClick={() => navigate(`/completion-all-details/${id}`, { state: "row" })}
                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>
                          {/* <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="delete-tooltip">Delete</Tooltip>
                            }
                          >
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </OverlayTrigger> */}
                        </div>
                      </div>
                    </li>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          4. T3 Sheet Details
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>


                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>
                            }
                          >
                            <Button
                              variant="secondary"
                              className="ms-1"
                              // style={{ marginRight:"110px" }}
                              onClick={() => navigate(`/T3SheetAllDetails/${id}`, { state: "row" })}

                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </li>
                    <hr />

                     <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          5. Generate Offer Letter
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="generate-tooltip">Generate Offer Letter</Tooltip>}
                          >
                            <Button
                              variant="secondary"
                              className="ms-1"
                              onClick={() => GenerateOfferLetter(internDetails)}
                            >
                              <HiDownload />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </li> 




                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>


      </div>
    </>
  );
};

export default InternDetailsPage;
