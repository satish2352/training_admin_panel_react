import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateSubcoursedetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const subcourseData = location.state || {};
    const [courses, setCourses] = useState([]);
    const [subCourses, setSubCourses] = useState([]);

    const [courses_name, setCourses_name] = useState(subcourseData.courses_name || "");
    const [subcourses_name, setSubcourses_name] = useState(subcourseData.subcourses_name || "");
    const [title, setTitle] = useState(subcourseData.title || "");
    const [description, setDescription] = useState(subcourseData.description || "");
    const [custome_text, setcustome_text] = useState(subcourseData.custome_text || "");
    const [banner, setBanner] = useState(null);
    const [back_image, setBack_image] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(subcourseData.banner || null);
    const [backImagePreview, setBackImagePreview] = useState(subcourseData.back_image || null);

    const BASE_URL = "https://api.sumagotraining.in/public/api";


    useEffect(() => {
        if (subcourseData.back_image) {
            setBackImagePreview(subcourseData.back_image);
        }
    }, [subcourseData.back_image]);

    // Function to convert image to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle Drag and Drop for Banner
    const handleBannerDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const base64 = await convertToBase64(file);
            setBanner(base64);
            setBannerPreview(URL.createObjectURL(file));
        } else {
            toast.error("Only image files are allowed for the banner.");
        }
    };


    // Handle Drag and Drop for Background
    // const handleBackImageDrop = async (e) => {
    //     e.preventDefault();
    //     const file = e.dataTransfer.files[0];
    //     if (file && file.type.startsWith("image/")) {
    //         const base64 = await convertToBase64(file);
    //         setBack_image(base64);
    //         setBackImagePreview(URL.createObjectURL(file));
    //     } else {
    //         toast.error("Only image files are allowed for the background.");
    //     }
    // };


    const handleBackImageDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const base64 = await convertToBase64(file);
            setBack_image(base64);
            setBackImagePreview(base64); // Corrected, use base64
        } else {
            toast.error("Only image files are allowed for the background.");
        }
    };


    useEffect(() => {
        fetchCourses(); // Fetch courses when component mounts
        fetchSubCourses();

    }, []);

    const fetchCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_subcourse_details_list`, {
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


    const fetchSubCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_all_subcourses`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSubCourses(response.data?.data || []);
        } catch (err) {
            console.error("Error fetching subcourses:", err);
        }
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("remember_token");
        const formData = new FormData();
        formData.append("courses_name", courses_name);
        formData.append("subcourses_name", subcourses_name);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("customtext", custome_text);
        formData.append("banner", banner);
        formData.append("back_image", back_image);

        if (banner) formData.append("banner", banner);
        if (back_image) formData.append("back_image", back_image);


        try {
            const response = await fetch(
                `https://api.sumagotraining.in/public/api/update_subcourse_details/${subcourseData.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                toast.success("Subcourse updated successfully!");
                navigate("/subsubcoursedetails");
            } else {
                const responseData = await response.json();
                toast.error(`Update failed: ${responseData.message || "Unknown error"}`);
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
    //                         UPDATE <span className="highlight">SUB-SUBCOURSE</span>
    //                     </b>
    //                 </div>
    //             </Container> {/* Breadcrumb with Back Button */}
    //             <Container>
    //                 <div className="d-flex align-items-center">

    //                     <Breadcrumb className="mb-2">
    //                         <Breadcrumb.Item onClick={() => navigate("/subsubcoursedetails")}>Back</Breadcrumb.Item>
    //                         <Breadcrumb.Item active>Update Sub-subcourse</Breadcrumb.Item>
    //                     </Breadcrumb>
    //                 </div>
    //             </Container>
    //             <Container>
    //                 <Row className="justify-content-center">
    //                     <Col md={8} className="w-100">
    //                         <Card className="p-4 ms-4 me-4 shadow-lg">
    //                             <Card.Body>
    //                                 <Form onSubmit={handleUpdate}>
    //                                     <Form.Group className="mb-3">
    //                                         <Form.Label>Select Course</Form.Label>
    //                                         <Form.Select
    //                                             value={courses_name}
    //                                             onChange={(e) => setCourses_name(e.target.value)}
    //                                         >
    //                                             <option value="">-- Select Course --</option>
    //                                             {[...new Set(courses.map((course) => course.courses_name))].map((uniqueCourse, index) => (
    //                                                 <option key={index} value={uniqueCourse}>
    //                                                     {uniqueCourse}
    //                                                 </option>
    //                                             ))}
    //                                         </Form.Select>
    //                                     </Form.Group>

    //                                     <Form.Group className="mb-3">
    //                                         <Form.Label>Select Subcourse</Form.Label>
    //                                         <Form.Select
    //                                             value={subcourses_name}
    //                                             onChange={(e) => setSubcourses_name(e.target.value)}
    //                                         >
    //                                             <option value="">-- Select Subcourse --</option>
    //                                             {[...new Set(courses.map((course) => course.subcourses_name))].map((uniqueCourse, index) => (
    //                                                 <option key={index} value={uniqueCourse}>
    //                                                     {uniqueCourse}
    //                                                 </option>
    //                                             ))}
    //                                         </Form.Select>
    //                                     </Form.Group>
    //                                     <Form.Group className="mb-3">
    //                                         <Form.Label>Title</Form.Label>
    //                                         <Form.Control
    //                                             type="text"
    //                                             placeholder="Enter title"
    //                                             value={title}
    //                                             onChange={(e) => setTitle(e.target.value)}
    //                                         />
    //                                     </Form.Group>
    //                                     <Form.Group className="mb-3">
    //                                         <Form.Label>Description</Form.Label>
    //                                         <Form.Control
    //                                             type="text"
    //                                             as="textarea" placeholder="Enter description"
    //                                             value={description}
    //                                             onChange={(e) => setDescription(e.target.value)}
    //                                         />
    //                                     </Form.Group>
    //                                     <Form.Group className="mb-3">
    //                                         <Form.Label>Custom Text</Form.Label>
    //                                         <Form.Control
    //                                             type="text"
    //                                             placeholder="Enter custom text"
    //                                             value={custome_text}
    //                                             onChange={(e) => setcustome_text(e.target.value)}
    //                                         />
    //                                     </Form.Group>
    //                                     {/* Banner Upload */}
    //                                     <Form.Group className="mb-3">
    //                                         <Form.Label>Upload Banner Image (Drag and Drop or Click)</Form.Label>
    //                                         <div
    //                                             className="border p-4 text-center"
    //                                             onDrop={handleBannerDrop}
    //                                             onDragOver={(e) => e.preventDefault()}
    //                                         >
    //                                             {bannerPreview ? (
    //                                                 <Image src={bannerPreview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
    //                                             ) : (
    //                                                 <p>Drag & Drop image here or click to upload</p>
    //                                             )}
    //                                         </div>
    //                                         <Form.Control
    //                                             type="file"
    //                                             onChange={async (e) => {
    //                                                 const file = e.target.files[0];
    //                                                 if (file && file.type.startsWith("image/")) {
    //                                                     const base64 = await convertToBase64(file);
    //                                                     setBanner(base64);
    //                                                     setBannerPreview(URL.createObjectURL(file));
    //                                                 } else {
    //                                                     toast.error("Only image files are allowed.");
    //                                                 }
    //                                             }}
    //                                         />
    //                                     </Form.Group>

    //                                     {/* Background Image Upload */}
    //                                     <Form.Group className="mb-3">
    //                                         <Form.Label>Upload Back Image (Drag and Drop or Click)</Form.Label>
    //                                         <div
    //                                             className="border p-4 text-center"
    //                                             onDrop={handleBackImageDrop}
    //                                             onDragOver={(e) => e.preventDefault()}
    //                                         >
    //                                           {backImagePreview ? (
    //     <Image src={backImagePreview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
    // ) : (
    //     <p>Drag & Drop image here or click to upload</p>
    // )}

    //                                         </div>
    //                                         {/* <Form.Control
    //                                             type="file"
    //                                             onChange={async (e) => {
    //                                                 const file = e.target.files[0];
    //                                                 if (file && file.type.startsWith("image/")) {
    //                                                     const base64 = await convertToBase64(file);
    //                                                     setBack_image(base64);
    //                                                     setBackImagePreview(URL.createObjectURL(file));
    //                                                 } else {
    //                                                     toast.error("Only image files are allowed.");
    //                                                 }
    //                                             }}
    //                                         /> */}
    //                                         <Form.Control
    //     type="file"
    //     onChange={async (e) => {
    //         const file = e.target.files[0];
    //         if (file && file.type.startsWith("image/")) {
    //             const base64 = await convertToBase64(file);
    //             setBack_image(base64);
    //             setBackImagePreview(base64); // ✅ Use base64 instead of URL.createObjectURL
    //         } else {
    //             toast.error("Only image files are allowed.");
    //         }
    //     }}
    // />

    //                                     </Form.Group>

    //                                     {/* Buttons */}
    //                                     <div className="d-flex justify-content-center"> <Button variant="primary" type="submit">Submit</Button>
    //                                         <Button variant="secondary" className="ms-2" onClick={() => navigate('/subsubcoursedetails')}>Cancel</Button></div>

    //                                 </Form>
    //                             </Card.Body>
    //                         </Card>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         </div>
    //     );
    // };


    // export default UpdateSubcoursedetails;

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
                                                    UPDATE <span className="highlight">SUB-SUBCOURSE</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/subsubcoursedetails')}>
                                            Sub-subcourse Details
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Select Course</Form.Label>
                                                <Form.Select
                                                    value={courses_name}
                                                    onChange={(e) => setCourses_name(e.target.value)}
                                                >
                                                    <option value="">-- Select Course --</option>
                                                    {[...new Set(courses.map((course) => course.courses_name))].map((uniqueCourse, index) => (
                                                        <option key={index} value={uniqueCourse}>
                                                            {uniqueCourse}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Select Subcourse</Form.Label>
                                                <Form.Select
                                                    value={subcourses_name}
                                                    onChange={(e) => setSubcourses_name(e.target.value)}
                                                >
                                                    <option value="">-- Select Subcourse --</option>
                                                    {[...new Set(courses.map((course) => course.subcourses_name))].map((uniqueCourse, index) => (
                                                        <option key={index} value={uniqueCourse}>
                                                            {uniqueCourse}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    as="textarea" placeholder="Enter description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Custom Text</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter custom text"
                                                    value={custome_text}
                                                    onChange={(e) => setcustome_text(e.target.value)}
                                                    maxLength={100}
                                               />
                                            </Form.Group>
                                            {/* Banner Upload */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Banner Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onDrop={handleBannerDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {bannerPreview ? (
                                                        <Image src={bannerPreview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
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
                                                            setBanner(base64);
                                                            setBannerPreview(URL.createObjectURL(file));
                                                        } else {
                                                            toast.error("Only image files are allowed.");
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            {/* Background Image Upload */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Back Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onDrop={handleBackImageDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {backImagePreview ? (
                                                        <Image src={backImagePreview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
                                                    ) : (
                                                        <p>Drag & Drop image here or click to upload</p>
                                                    )}

                                                </div>
                                                {/* <Form.Control
                                        type="file"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file && file.type.startsWith("image/")) {
                                                const base64 = await convertToBase64(file);
                                                setBack_image(base64);
                                                setBackImagePreview(URL.createObjectURL(file));
                                            } else {
                                                toast.error("Only image files are allowed.");
                                            }
                                        }}
                                    /> */}
                                                <Form.Control
                                                    type="file"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (file && file.type.startsWith("image/")) {
                                                            const base64 = await convertToBase64(file);
                                                            setBack_image(base64);
                                                            setBackImagePreview(base64); // ✅ Use base64 instead of URL.createObjectURL
                                                        } else {
                                                            toast.error("Only image files are allowed.");
                                                        }
                                                    }}
                                                />

                                            </Form.Group>

                                            {/* Buttons */}
                                            <div className="d-flex justify-content-center"> <Button variant="primary" className="fs-5" type="submit">Submit</Button>
                                                {/* <Button variant="secondary" className="ms-2" onClick={() => navigate('/subsubcoursedetails')}>Cancel</Button></div> */}
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


export default UpdateSubcoursedetails;