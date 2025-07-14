import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";

const Addsubcourse = () => {
    const [coursename, setCoursename] = useState("");
    const [subcourses_name, setSubcourses_name] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [courses, setCourses] = useState([]);
    const [course_id, setCourseId] = useState("");
    const navigate = useNavigate();
    const location = useLocation();





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


    useEffect(() => {
        const courseIdFromLocation = location.state?.course_id;
        if (courseIdFromLocation) {
            setCourseId(courseIdFromLocation);
        }
        fetchCourses();
    }, []);

    const BASE_URL = "https://api.sumagotraining.in/public/api";

    const fetchCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_course`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            setCourses(response.data?.data || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("remember_token");

        if (!token) {
            toast.error("User not authenticated. Please log in again.");
            return;
        }

        const formData = new FormData();
        formData.append("course_id", course_id);
        formData.append("name", coursename);
        formData.append("subcourses_name", subcourses_name);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(
                `${BASE_URL}/add_subcourse`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                    mode: "cors",
                }
            );

            if (response.status === 200) {
                toast.success("Subcourse added successfully!");
                navigate("/subcoursedetails");
            } else {
                toast.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error adding subcourse:", error);
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
    //                         ADD <span className="highlight">SUBCOURSE</span>
    //                     </b>
    //                 </div>
    //             </Container> {/* Breadcrumb with Back Button */}
    //             <Container>
    //                 <div className="d-flex align-items-center">

    //                     <Breadcrumb className="mb-2">
    //                         <Breadcrumb.Item onClick={() => navigate("/subcoursedetails")}>Back</Breadcrumb.Item>
    //                         <Breadcrumb.Item active>Add Subcourse</Breadcrumb.Item>
    //                     </Breadcrumb>
    //                 </div>
    //             </Container>
    //             <div className="container mt-2">
    //                 <Card className="p-4 ms-4 me-4 shadow-lg">
    //                     <Card.Body>
    //                         <Form onSubmit={handleSubmit}>
    //                             <Form.Group className="mb-3">
    //                                 <Form.Label>Course Name</Form.Label>
    //                                 <Form.Select
    //                                     value={coursename}
    //                                     onChange={(e) => {
    //                                         const selectedCourse = courses.find(course => course.name === e.target.value);
    //                                         if (selectedCourse) {
    //                                             setCoursename(selectedCourse.name);
    //                                         }
    //                                     }}
    //                                 >
    //                                     <option value="">-- Select Course --</option>
    //                                     {courses.map((course) => (
    //                                         <option key={course.id} value={course.name}>{course.name}</option>
    //                                     ))}
    //                                 </Form.Select>
    //                             </Form.Group>

    //                             <Form.Group className="mb-3">
    //                                 <Form.Label>Subcourse Name</Form.Label>
    //                                 <Form.Control
    //                                     type="text"
    //                                     placeholder="Enter subcourse name"
    //                                     value={subcourses_name}
    //                                     onChange={(e) => setSubcourses_name(e.target.value)}
    //                                 />
    //                             </Form.Group>

    //                             <Form.Group className="mb-3">
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
    //                             <div className="d-flex justify-content-center"> <Button variant="primary" type="submit">Submit</Button>
    //                                 <Button variant="secondary" className="ms-2" onClick={() => navigate('/subcoursedetails')}>Cancel</Button>
    //                             </div>

    //                         </Form>
    //                     </Card.Body>
    //                 </Card>
    //             </div>

    //         </div>
    //     );
    // };

    // export default Addsubcourse;



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
                            <Card className="mb-4">
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Container>
                                            <div className="text-start title-container">
                                                <b className="title-text fs-2">
                                                    ADD <span className="highlight">SUBCOURSE</span>
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
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Course Name</Form.Label>
                                                <Form.Select
                                                    value={coursename}
                                                    onChange={(e) => {
                                                        const selectedCourse = courses.find(course => course.name === e.target.value);
                                                        if (selectedCourse) {
                                                            setCoursename(selectedCourse.name);
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Course --</option>
                                                    {courses.map((course) => (
                                                        <option key={course.id} value={course.name}>{course.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

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
                                            <div className="d-flex justify-content-center"> <Button className="fs-5" variant="primary" type="submit">Submit</Button>
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

export default Addsubcourse;