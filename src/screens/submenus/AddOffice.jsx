import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import { Textarea } from "react-bootstrap-icons";
import axios from "axios";

const AddOffice = () => {
    const [office_id, setOffice_id] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [email, setEmail] = useState("");
    const [mobile_no, setMobile] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({
        email: "",
        link: "",
    });

    const navigate = useNavigate();
    const location = useLocation();


    const handle_mobileno = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

        // Ensure "+91" is always the prefix
        if (value.startsWith("91")) {
            value = "+91" + value.slice(2, 12); // Keep only 10 digits after "+91"
        } else {
            value = "+91" + value.slice(0, 10);
        }

        // If user deletes everything, reset to "+91"
        if (value.length < 3) {
            value = "+91";
        }
        // Enforce mobile number to start only with 6,7,8,9
        if (value.length >= 4) { // Ensure there are at least 1 digit after "+91"
            const firstDigit = value.charAt(3); // Get the first digit of the mobile number
            if (!["6", "7", "8", "9"].includes(firstDigit)) {
                return; // Stop updating state if invalid number is entered
            }
        }

        setMobile(value);
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Invalid email address.";
    };

    const validateLink = (value) => {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/;
        return urlRegex.test(value) ? "" : "Invalid URL format.";
    };




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




    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const linkError = validateLink(link);

        setErrors({
            email: emailError,
            link: linkError,
        });

        if (emailError || linkError  || !title || !description || !image) {
            toast.error("Please fix errors before submitting.");
            return;
        }



        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {
                id: office_id,
                title,
                description,
                link,
                email,
                mobile_no,
                image
            };

            const response = await axios.post(`${BASE_URL}/add_ourOffice`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Office details added successfully!");
                navigate("/officesdetails");
                setOffice_id("");
                setTitle("");
                setDescription("");
                setLink("");
                setEmail("");
                setMobile("");
                setImage(null);
                setPreview(null);
            } else {
                toast.error("Failed to add office details.");
            }
        } catch (err) {
            console.error("Error uploading office details:", err);
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
                                                    ADD <span className="highlight">OFFICE</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/officesdetails')}>
                                            Offices Details
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    as={"textarea"}
                                                    placeholder="Enter description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    maxLength={200}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Google Maps Link</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Link"
                                                    value={link}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setLink(val);
                                                        setErrors((prev) => ({ ...prev, link: validateLink(val) }));
                                                    }}
                                                    isInvalid={!!errors.link}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.link}
                                                </Form.Control.Feedback>
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setEmail(val);
                                                        setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
                                                    }}
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Mobile no</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Mobile no" value={mobile_no} onChange={handle_mobileno} />
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
export default AddOffice;
