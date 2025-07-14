import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateAlumni = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const AlumniData = location.state || {};


    const [sub_course_id, setSubcourses_id] = useState(AlumniData.sub_course_id || "");
    const [subcourses_name, setSubcourses_name] = useState(
        Array.isArray(AlumniData.subcourse_details) ? AlumniData.subcourse_details[0] : ""
    );
    const [name, setName] = useState(AlumniData.name || "");
    const [designation, setDesignation] = useState(AlumniData.designation || "");
    const [company, setCompany] = useState(AlumniData.company || "");
    const [company_logo, setCompany_logo] = useState(null);
    const [company_logoPreview, setCompany_logoPreview] = useState(AlumniData.company_logoPreview || null);

    const [image, setImage] = useState(null);
    const [profileimgPreview, setProfileimgPreview] = useState(AlumniData.profileimgPreview || null);
    const [courses, setCourses] = useState([]);
    const [subCourses, setSubCourses] = useState([]);





    // Function to convert image to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCompany_logoUpload = (file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCompany_logo(reader.result);
                setCompany_logoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Only image files are allowed.");
        }
    };

    const handleCompany_logoDrop = (e) => {
        e.preventDefault();
        handleImageUpload(e.dataTransfer.files[0]);
    };



    const handleImageUpload = (file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setProfileimgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Only image files are allowed.");
        }
    };

    const handleProfileImageDrop = (e) => {
        e.preventDefault();
        handleImageUpload(e.dataTransfer.files[0]);
    };




    console.log("Location State:", location.state);

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




    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name || !designation || !company || !company_logo || !image || !sub_course_id || !subcourses_name) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {
                sub_course_id: [`${sub_course_id}`],
                subcourse_details: [subcourses_name],

                name,
                designation,
                company,
                company_logo,
                image,
            };


            const response = await axios.post(`${BASE_URL}/update_alumini/${AlumniData.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Alumni updated successfully!");
                navigate("/alumnidetails");

                // Clear form
                setSubcourses_id("");
                setSubcourses_name("");
                setName("");
                setDesignation("");
                setImage(null);
                setCompany("");
                setCompany_logo(null);
                setCompany_logoPreview(null);
                setProfileimgPreview(null);
            } else {
                toast.error("Failed to update alumni.");
            }
        } catch (err) {
            console.error("Error uploading alumni:", err);
            toast.error("Something went wrong.");
        }
    };



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
                                                    UPDATE <span className="highlight">ALUMNI</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/alumnidetails')}>
                                            Alumni Details
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>
                                            {/* Dropdown for Course Selection */}
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
                                                <Form.Label>Alumni Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter alumni name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Control type="text" placeholder="Enter designation" value={designation} onChange={(e) => setDesignation(e.target.value)} maxLength={100} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter company name" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={100} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Profile Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onChange={(e) => handleImageUpload(e.target.files[0])}
                                                    onDrop={handleProfileImageDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {profileimgPreview ? (
                                                        <Image src={profileimgPreview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
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
                                                            setProfileimgPreview(URL.createObjectURL(file));
                                                        } else {
                                                            toast.error("Only image files are allowed.");
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Company Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onChange={(e) => handleCompany_logoUpload(e.target.files[0])}
                                                    onDrop={handleCompany_logoDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {company_logoPreview ? (
                                                        <Image src={company_logoPreview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
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
                                                            setCompany_logo(base64);
                                                            setCompany_logoPreview(URL.createObjectURL(file));
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


export default UpdateAlumni;