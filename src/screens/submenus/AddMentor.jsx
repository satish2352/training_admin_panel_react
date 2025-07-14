import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import axios from "axios";


const AddMentor = () => {
    const [sub_course_id, setSubcourses_id] = useState("");
    const [subcourses_name, setSubcourses_name] = useState("");
    const [mentor_id, setMentor_id] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [company, setCompany] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [courses, setCourses] = useState([]);

    const [subCourses, setSubCourses] = useState([]);
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

    const handleImageUpload = (file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Only image files are allowed.");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleImageUpload(e.dataTransfer.files[0]);
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

        if (!name || !designation || !company || !image || !skills || !experience || !subcourses_name) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {

                course_id: [`${sub_course_id}`],

                subcourse_details: [subcourses_name],
                name,
                designation,
                company,
                skills,
                image,
                experience,
            };


            const response = await axios.post(`${BASE_URL}/add_mentor`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Mentor added successfully!");
                navigate("/mentordetails");

                // Clear form
                setSubcourses_id("");
                setSubcourses_name("");
                setName("");
                setDesignation("");
                setImage(null);
                setCompany("");
                setSkills("");
                setExperience("");
                setPreview(null);
            } else {
                toast.error("Failed to add mentor.");
            }
        } catch (err) {
            console.error("Error uploading mentor:", err);
            toast.error("Something went wrong.");
        }
    };





    return (

        <div className="container backimg">
            <div>
                <img src={corner} className="corner_img" alt="Responsive Corner" />
            </div>
            <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={logo1} className="img-fluid logo1" alt="..." />
                <img src={logo2} className="img-fluid logo2" alt="..." />
            </div>

            <Container>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Accordion defaultActiveKey="0">
                            <Card className="mt-5 mb-5">
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Container>
                                            <div className="text-start title-container">
                                                <b className="title-text fs-2">
                                                    ADD <span className="highlight">MENTOR</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/mentordetails')}>
                                            Mentor Details
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
                                                <Form.Label>Mentor Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Mentor Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} maxLength={100} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Comapny</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Comapny" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={100} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onChange={(e) => handleImageUpload(e.target.files[0])}
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

                                            <Form.Group className="mb-3">
                                                <Form.Label>Skill</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Skill" value={skills} onChange={(e) => setSkills(e.target.value)} maxLength={100} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Experience</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Experience" value={experience} onChange={(e) => setExperience(e.target.value)} maxLength={100} />
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
export default AddMentor;
