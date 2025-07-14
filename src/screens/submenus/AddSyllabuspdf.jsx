import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import axios from "axios";


const Addsyllabuspdf = () => {
    const [sub_course_id, setSubcourses_id] = useState("");
    const [subcourses_name, setSubcourses_name] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [courses, setCourses] = useState([]);
    const [subCourses, setSubCourses] = useState([]);

    const [coursename, setCoursename] = useState("");
    const navigate = useNavigate();
    const location = useLocation();





    const handleFileUpload = (file) => {
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result);
                setFileName(file.name); // <-- store the file name
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Only PDF files are allowed.");
        }
    };


    const handleDrop = (e) => {
        e.preventDefault();
        handleFileUpload(e.dataTransfer.files[0]);
    };



    const fetchSubCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";

            const response = await axios.get(`${BASE_URL}/get_all_subcourses`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Ensure response.data.data is an array
            const subCoursesData = Array.isArray(response.data?.data) ? response.data.data : [];

            setSubCourses(subCoursesData); // Store fetched subcourses
        } catch (err) {
            console.error("Error fetching subcourses:", err);
        }
    };
    useEffect(() => {
        fetchSubCourses();
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subcourses_name || !file) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {
                subcourse_id: sub_course_id,
                name: subcourses_name,
                file: file,
            };


            const response = await axios.post(`${BASE_URL}/add_syllabus_pdf`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Syllbus Pdf added successfully!");
                navigate("/syllabuspdfdetails");

                // Clear form
                setSubcourses_id("");
                setSubcourses_name("");
                setFile("");
               
            } else {
                toast.error("Failed to add syllabus pdf.");
            }
        } catch (err) {
            console.error("Error uploading syllabus pdf:", err);
            toast.error("Something went wrong.");
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
                            <Card className="mb-4">
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Container>
                                            <div className="text-start title-container">
                                                <b className="title-text fs-2">
                                                    ADD <span className="highlight">SYLLABUS PDF</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/syllabuspdfdetails')}>
                                            Syllabus pdf Details
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Subcourse Name</Form.Label>
                                                <Form.Select
                                                    value={subcourses_name}
                                                    onChange={(e) => {
                                                        const selected = subCourses.find(course => course.subcourses_name === e.target.value);
                                                        if (selected) {
                                                            setSubcourses_name(selected.subcourses_name);
                                                            setSubcourses_id(selected.subcourses_id);
                                                        }
                                                    }}>
                                                    <option value="">-- Select Subcourse --</option>
                                                    {subCourses.map(course => (
                                                        <option key={course.subcourses_id} value={course.subcourses_name}>
                                                            {course.subcourses_name}
                                                        </option>
                                                    ))}
                                                </Form.Select>

                                            </Form.Group>




                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload File (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onChange={(e) => handleFileUpload(e.target.files[0])}
                                                    onDrop={handleDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >{file && <p className="mt-2">Uploaded File: <strong>{fileName}</strong></p>}


                                                </div>
                                                <Form.Control
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (file && file.type === "application/pdf") {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setFile(reader.result);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        } else {
                                                            toast.error("Only PDF files are allowed.");
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

export default Addsyllabuspdf;