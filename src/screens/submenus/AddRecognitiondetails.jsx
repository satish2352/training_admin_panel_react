import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import axios from "axios";


const AddRecognitiondetails = () => {
    const [recognitiondetails_id, setRecognitiondetails_id] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category_name, setCategory_name] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [recognitioncategory, setRecognitionCategory] = useState([]);


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




    const fetchrecognitioncategoryData = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";

            const response = await axios.get(`${BASE_URL}/get_recognitioncategory`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Ensure response.data.data is an array
            const recognitioncategorydata = Array.isArray(response.data?.data) ? response.data.data : [];
            console.log(recognitioncategorydata)
            setRecognitionCategory(recognitioncategorydata);
        } catch (err) {
            console.error("Error fetching recognition category:", err);
        }
    };
    useEffect(() => {

        fetchrecognitioncategoryData();
    }, []);





    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !image) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {
                recognitioncategoryid: recognitiondetails_id,
                title,
                description,
                image,
                category_name,
            };





            const response = await axios.post(`${BASE_URL}/add_recognitiondetails`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Recongnition details added successfully!");
                navigate("/recognitiondetails");

                // Clear form
                setTitle("");
                setDescription("");
                setCategory_name("");
                setRecognitionCategory("");

                setImage(null);
                setPreview(null);
            } else {
                toast.error("Failed to add recognition details.");
            }
        } catch (err) {
            console.error("Error uploading recognition details:", err);
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
                                                    ADD <span className="highlight">RECOGNITION DETAILS</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/recognitiondetails')}>
                                            Recognition Details
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Fun at Work Category</Form.Label>
                                                <Form.Select
                                                    value={recognitiondetails_id}
                                                    onChange={(e) => {
                                                        const selected = recognitioncategory.find(cat => cat.id.toString() === e.target.value);
                                                        if (selected) {
                                                            setRecognitiondetails_id(selected.id); // id = funatworkcategoryid
                                                            setCategory_name(selected.title);     // title = category_name
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Category --</option>
                                                    {recognitioncategory.map(cat => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.title}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Course Name" value={title} onChange={(e) => setTitle(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control type="text" as={"textarea"} placeholder="Enter Course Name" value={description} onChange={(e) => setDescription(e.target.value)} />
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
export default AddRecognitiondetails;
