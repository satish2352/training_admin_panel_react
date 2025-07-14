import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateNewsLetterdetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const newsletterData = location.state || {};

    const [newsletter_id, setNewsletter_id] = useState("");
    const [newsletter_month, setNewsletter_month] = useState(newsletterData.newsletter_month || "");
    const [newsletter_year, setNewsletter_year] = useState(newsletterData.newsletter_year || "");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(newsletterData.image || null);
    const [fileName, setFileName] = useState(newsletterData.file || "");
    const [errors, setErrors] = useState({
        newsletter_year: ""
    });



    const validateYear = (value) => {
        const yearRegex = /^\d{4}$/;
        return yearRegex.test(value) ? "" : "Enter a valid 4-digit year.";
    };


    useEffect(() => {
        if (newsletterData.file) {
            setFileName(newsletterData.file);
        }
    }, [newsletterData]);

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


    const handleFileDrop = (e) => {
        e.preventDefault();
        handleFileUpload(e.dataTransfer.files[0]);
    };




    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!file || !image) {
            toast.error("Please upload both PDF and image.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            // Convert PDF to base64
            const pdfBase64 = await convertToBase64(file);

            const payload = {
                newsletter_month,
                newsletter_year,
                file: pdfBase64,
                image
            };

            const response = await axios.post(`${BASE_URL}/update_newsletter/${newsletterData.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.data?.status === "Success") {
                toast.success("Newsletter updated successfully!");
                navigate("/newsletterdetails");

                // Reset
                setNewsletter_month("");
                setNewsletter_year("");
                setImage(null);
                setFile(null);
                setPreview(null);
                setFileName("");
            } else {
                toast.error(response.data?.message || "Failed to update newsletter.");
            }
        } catch (err) {
            console.error("Error uploading newsletter:", err);
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
                    <Col md={10}> {/* Setting col-10 width */}
                        <Accordion defaultActiveKey="0">
                            <Card className="mt-5 mb-5">
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Container>
                                            <div className="text-start title-container">
                                                <b className="title-text fs-2">
                                                    UPDATE <span className="highlight">NEWS LETTER DETAILS</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/newsletterdetails')}>
                                            NewsLetter Details
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Newsletter Month</Form.Label>
                                                <Form.Control type="text" placeholder="Enter title" value={newsletter_month} onChange={(e) => setNewsletter_month(e.target.value)} maxLength={50} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Newsletter Year</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter year"
                                                    value={newsletter_year}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, "");
                                                        setNewsletter_year(val);
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            newsletter_year: validateYear(val)
                                                        }));
                                                    }}
                                                    isInvalid={!!errors.newsletter_year}
                                                    maxLength={4}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.newsletter_year}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload File (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onDrop={async (e) => {
                                                        e.preventDefault();
                                                        const pdfFile = e.dataTransfer.files[0];
                                                        if (pdfFile && pdfFile.type === "application/pdf") {
                                                            const base64 = await convertToBase64(pdfFile);
                                                            setFile(pdfFile); // original File object
                                                            setFileName(pdfFile.name);
                                                        } else {
                                                            toast.error("Only PDF files are allowed.");
                                                        }
                                                    }}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {file ? (
                                                        <p className="mt-2">Uploaded File: <strong>{fileName}</strong></p>
                                                    ) : (
                                                        <p>Drag & Drop PDF here or click to upload</p>
                                                    )}
                                                </div>
                                                <Form.Control
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={async (e) => {
                                                        const pdfFile = e.target.files[0];
                                                        if (pdfFile && pdfFile.type === "application/pdf") {
                                                            const base64 = await convertToBase64(pdfFile);
                                                            setFile(pdfFile); // original File
                                                            setFileName(pdfFile.name);
                                                        } else {
                                                            toast.error("Only PDF files are allowed.");
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onDrop={async (e) => {
                                                        e.preventDefault();
                                                        const imgFile = e.dataTransfer.files[0];
                                                        if (imgFile && imgFile.type.startsWith("image/")) {
                                                            const base64 = await convertToBase64(imgFile);
                                                            setImage(base64);
                                                            setPreview(URL.createObjectURL(imgFile));
                                                        } else {
                                                            toast.error("Only image files are allowed.");
                                                        }
                                                    }}
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
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const imgFile = e.target.files[0];
                                                        if (imgFile && imgFile.type.startsWith("image/")) {
                                                            const base64 = await convertToBase64(imgFile);
                                                            setImage(base64);
                                                            setPreview(URL.createObjectURL(imgFile));
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
export default UpdateNewsLetterdetails;