import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateMOUdetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const moudetailsData = location.state || {};

    const [moucategoryid, setMOUCategory_id] = useState("");
    const [title, setTitle] = useState(moudetailsData.title || "");
    const [description, setDescription] = useState(moudetailsData.description || "");
    const [category_name, setCategory_name] = useState(moudetailsData.category_name || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(moudetailsData.image || null);
    const [moucategory, setMOUcategory] = useState([]);



    useEffect(() => {
        fetchmoucategoryData();
    }, []);

    useEffect(() => {
        // Once category list and data are both available, match by category_name
        if (moucategory.length > 0 && category_name) {
            const matchedCategory = moucategory.find(
                (cat) => cat.title === category_name
            );
            if (matchedCategory) {
                setMOUCategory_id(matchedCategory.id);
            }
        }
    }, [moucategory, category_name]);




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




    const fetchmoucategoryData = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";

            const response = await axios.get(`${BASE_URL}/get_moucategory`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Ensure response.data.data is an array
            const moucategoryData = Array.isArray(response.data?.data) ? response.data.data : [];
            console.log(moucategoryData)
            setMOUcategory(moucategoryData); // Store fetched subcourses
        } catch (err) {
            console.error("Error fetching recongnition details:", err);
        }
    };
    useEffect(() => {

        fetchmoucategoryData();
    }, []);



    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !description || !image) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {
                moucategoryid: moucategoryid,
                title: title,

                description,
                image,
                category_name,

            };


            const response = await axios.post(`${BASE_URL}/update_moudetails/${moudetailsData.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("MOU details updated successfully!");
                navigate("/moudetails");

                // Clear form
                setMOUcategory("");
                setTitle("");
                setDescription("");
                setImage(null);
                setPreview(null);
                setCategory_name("");


            } else {
                toast.error("Failed to update MOU details.");
            }
        } catch (err) {
            console.error("Error uploading MOU details:", err);
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
                                                    UPDATE <span className="highlight">MOU DETAILS</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/moudetails')}>
                                            MOU Details
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>MOU Category</Form.Label>
                                                <Form.Select
                                                    value={moucategoryid}
                                                    onChange={(e) => {
                                                        const selected = moucategory.find(cat => cat.id.toString() === e.target.value);
                                                        if (selected) {
                                                            setMOUCategory_id(selected.id); // id = funatworkcategoryid
                                                            setCategory_name(selected.title);     // title = category_name
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Category --</option>
                                                    {moucategory.map(cat => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.title}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    as={"textarea"}
                                                    placeholder="Enter description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
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
export default UpdateMOUdetails;