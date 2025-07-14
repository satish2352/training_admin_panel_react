import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateSubcourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subcourseData = location.state || {};

    const [coursename, setCoursename] = useState(subcourseData.coursename || "");
    const [subcourses_name, setSubcourses_name] = useState(subcourseData.subcourses_name || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(subcourseData.image || null);
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

   
    const handleUpdate = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("remember_token");
        const formData = new FormData();
        formData.append("subcourses_name", subcourses_name);
        formData.append("name", coursename);
        if (image) formData.append("image", image);
    
        try {
            const response = await fetch(
                `${BASE_URL}/update_subcourse/${subcourseData.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
    
            const textResponse = await response.text(); // Read response as text first
    
            console.log("Raw API Response:", textResponse);
    
            try {
                const jsonResponse = JSON.parse(textResponse); // Try converting to JSON
                if (response.ok) {
                    toast.success("Subcourse updated successfully!");
                    navigate("/subcoursedetails");
                } else {
                    toast.error(`Update failed: ${jsonResponse.message || "Unknown error"}`);
                }
            } catch (jsonError) {
                console.error("Error parsing JSON:", jsonError);
                toast.error("Server returned an invalid response. Check console for details.");
            }
        } catch (error) {
            console.error("Error updating subcourse:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    

//     return (
//         <div className="container backimg">
//             <div>
//                 <img src={corner} className="corner_img" alt="Responsive Corner" />
//             </div>
//             <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                 <img src={logo1} class="img-fluid logo1" alt="..." />
//                 <img src={logo2} className="img-fluid logo2" alt="..." />
//             </div>
//             <Container>
//                 <div className="text-center title-container">
//                     <b className="title-text">
//                         UPDATE <span className="highlight">SUBCOURSE</span>
//                     </b>
//                 </div>
//             </Container> {/* Breadcrumb with Back Button */}
//             <Container>
//                 <div className="d-flex align-items-center">

//                     <Breadcrumb className="mb-2">
//                         <Breadcrumb.Item onClick={() => navigate("/subcoursedetails")}>Back</Breadcrumb.Item>
//                         <Breadcrumb.Item active>Update Subcourse</Breadcrumb.Item>
//                     </Breadcrumb>
//                 </div>
//             </Container>
//             <div className="container mt-2">
//                 <Card className="p-4 ms-4 me-4 shadow-lg">
//                     <Card.Body>
//                         <Form onSubmit={handleUpdate}>
//                     {/* Dropdown for Course Selection */}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Select Course</Form.Label>
//                         <Form.Select value={coursename} onChange={(e) => setCoursename(e.target.value)}>
//                             <option value="">-- Select Course --</option>
//                             {[...new Set(courses.map((course) => course.name))].map((uniqueCourse, index) => (
//                                 <option key={index} value={uniqueCourse}>
//                                     {uniqueCourse}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                     </Form.Group>

//                     {/* Subcourse Name Input */}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Subcourse Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter subcourse name"
//                             value={subcourses_name}
//                             onChange={(e) => setSubcourses_name(e.target.value)}
//                         />
//                     </Form.Group>

//                     {/* File Upload */}
//                     <Form.Group className="mb-3">
//                                 <Form.Label>Upload Image (Drag and Drop or Click)</Form.Label>
//                                 <div
//                                     className="border p-4 text-center"
//                                     onDrop={handleDrop}
//                                     onDragOver={(e) => e.preventDefault()}
//                                 >
//                                     {preview ? (
//                                         <Image src={preview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
//                                     ) : (
//                                         <p>Drag & Drop image here or click to upload</p>
//                                     )}
//                                 </div>
//                                 <Form.Control
//                                     type="file"
//                                     onChange={async (e) => {
//                                         const file = e.target.files[0];
//                                         if (file && file.type.startsWith("image/")) {
//                                             const base64 = await convertToBase64(file);
//                                             setImage(base64);
//                                             setPreview(URL.createObjectURL(file));
//                                         } else {
//                                             toast.error("Only image files are allowed.");
//                                         }
//                                     }}
//                                 />
//                             </Form.Group>
//                      <div className="d-flex justify-content-center"> <Button variant="primary" type="submit">Submit</Button>
//                                                     <Button variant="secondary" className="ms-2" onClick={() => navigate('/subcoursedetails')}>Cancel</Button>
//                                                 </div>
//                 </Form>
//                 </Card.Body>
//                 </Card>
//             </div>

//         </div>
//     );
// };

// export default UpdateSubcourse;




return (
    <div className="container backimg">
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
                                          <Card className="mb-4" >
                                              <Card.Header>
                                                  <div className="d-flex justify-content-between align-items-center">
                                                      <Container>
                                                          <div className="text-start title-container">
                                                              <b className="title-text fs-2">
                                                                  UPDATE <span className="highlight">SUBCOURSE</span>
                                                              </b>
                                                          </div>
                                                      </Container>
                                                      <Button className="me-3 fs-5 text-nowrap"
                                                          style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/subcoursedetails')}>
                                                          Subcourse Details
                                                      </Button>
                                                  </div>
                                              </Card.Header>
              
                                              <Accordion.Collapse eventKey="0">
                                                  <Card.Body>
                    <Form onSubmit={handleUpdate}>
                {/* Dropdown for Course Selection */}
                <Form.Group className="mb-3">
                    <Form.Label>Select Course</Form.Label>
                    <Form.Select value={coursename} onChange={(e) => setCoursename(e.target.value)}>
                        <option value="">-- Select Course --</option>
                        {[...new Set(courses.map((course) => course.name))].map((uniqueCourse, index) => (
                            <option key={index} value={uniqueCourse}>
                                {uniqueCourse}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Subcourse Name Input */}
                <Form.Group className="mb-3">
                    <Form.Label>Subcourse Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter subcourse name"
                        value={subcourses_name}
                        onChange={(e) => setSubcourses_name(e.target.value)}
                        maxLength={100}
                    />
                </Form.Group>

                {/* File Upload */}
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
                 <div className="d-flex justify-content-center"> <Button variant="primary" className="fs-5" type="submit">Submit</Button>
                                                {/* <Button variant="secondary" className="ms-2" onClick={() => navigate('/subcoursedetails')}>Cancel</Button> */}
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
export default UpdateSubcourse;