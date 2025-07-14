import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseData = location.state || {};

  const [name, setName] = useState(courseData.name || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(courseData.image || null);
  const [courses, setCourses] = useState([]); // Store courses

  const BASE_URL = "https://api.sumagotraining.in/public/api";

  useEffect(() => {
    fetchCourses(); // Fetch courses when component mounts
  }, []);

  // Function to convert image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchCourses = async () => {
    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await axios.get(`${BASE_URL}/get_course`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const coursesData = response.data?.data || [];
      setCourses(coursesData); // Store fetched courses
    } catch (err) {
      console.error("Error fetching course details:", err);
    }
  };


  // Function to handle image drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const base64 = await convertToBase64(file);
      setImage(base64);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("Only image files are allowed.");
    }
  };

  // Function to handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!courseData.id) {
      toast.error("Invalid course ID.");
      return;
    }

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        `https://api.sumagotraining.in/public/api/update_course/${courseData.id}`,
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
        toast.success("Course updated successfully!");
        navigate("/coursedetails");
      } else {
        toast.error(`Update failed: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("An error occurred. Please try again.");
    }
  };



  //   return (
  //     <div className="container idcardbackimg">
  //       <div>
  //         <img src={corner} className="corner_img" alt="Responsive Corner" />
  //       </div>
  //       <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  //         <img src={logo1} class="img-fluid logo1" alt="..." />
  //         <img src={logo2} className="img-fluid logo2" alt="..." />
  //       </div>
  //       <Container>
  //         <div className="text-center title-container">
  //           <b className="title-text">
  //             UPDATE <span className="highlight">COURSE</span>
  //           </b>
  //         </div>
  //       </Container>
  //       <div className="d-flex align-items-end">

  //         <Breadcrumb className="mb-2">
  //           <Breadcrumb.Item onClick={() => navigate("/coursedetails")}>Back</Breadcrumb.Item>
  //           <Breadcrumb.Item active>Update Course</Breadcrumb.Item>
  //         </Breadcrumb>
  //       </div>
  //       <Container fluid className=" d-flex flex-column align-items-center justify-content-center">
  //         <Card className="p-4 mt-4 w-100 shadow-lg">
  //           <Form onSubmit={handleUpdate}>


  //             <Form.Group className="mb-3">
  //               <Form.Label>Course Name</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="Enter course name"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //               />
  //             </Form.Group>
  //                           <Form.Group className="mb-3">
  //                                       <Form.Label>Upload Image (Drag and Drop or Click)</Form.Label>
  //                                       <div
  //                                           className="border p-4 text-center"
  //                                           onDrop={handleDrop}
  //                                           onDragOver={(e) => e.preventDefault()}
  //                                       >
  //                                           {preview ? (
  //                                               <Image src={preview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
  //                                           ) : (
  //                                               <p>Drag & Drop image here or click to upload</p>
  //                                           )}
  //                                       </div>
  //                                       <Form.Control
  //                                           type="file"
  //                                           onChange={async (e) => {
  //                                               const file = e.target.files[0];
  //                                               if (file && file.type.startsWith("image/")) {
  //                                                   const base64 = await convertToBase64(file);
  //                                                   setImage(base64);
  //                                                   setPreview(URL.createObjectURL(file));
  //                                               } else {
  //                                                   toast.error("Only image files are allowed.");
  //                                               }
  //                                           }}
  //                                       />
  //                                   </Form.Group>
  //             <div className="d-flex justify-content-center">
  //               <Button variant="primary" type="submit">Submit</Button>
  //               <Button variant="secondary" className="ms-2" onClick={() => navigate('/coursedetails')}>Cancel</Button>
  //             </div>

  //           </Form>
  //         </Card>
  //       </Container>

  //     </div>
  //   );
  // };
  // export default UpdateCourse;


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
          <Col md={10}> {/* Setting col-10 width */}
            <Accordion defaultActiveKey="0">
              <Card className="mt-5">
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <Container>
                      <div className="text-start title-container">
                        <b className="title-text fs-2">
                          UPDATE <span className="highlight">COURSE</span>
                        </b>
                      </div>
                    </Container>
                    <Button className="me-3 fs-5 text-nowrap"
                      style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/coursedetails')}>
                      Course Details
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form onSubmit={handleUpdate}>


                      <Form.Group className="mb-3">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter course name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Upload Image (Drag and Drop or Click)</Form.Label>
                        <div
                          className="border p-4 text-center"
                          onDrop={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          {preview ? (
                            <Image src={preview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
                          ) : (
                            <p>Drag & Drop image here or click to upload</p>
                          )}
                        </div>
                        <Form.Control
                          type="file"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file && file.type.startsWith("image/")) {
                              const base64 = await convertToBase64(file);
                              setImage(base64);
                              setPreview(URL.createObjectURL(file));
                            } else {
                              toast.error("Only image files are allowed.");
                            }
                          }}
                        />
                      </Form.Group>
                      <div className="d-flex justify-content-center">
                        <Button variant="primary" className="fs-5" type="submit">Submit</Button>
                        {/* <Button variant="secondary" className="ms-2" onClick={() => navigate('/coursedetails')}>Cancel</Button> */}
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
export default UpdateCourse;