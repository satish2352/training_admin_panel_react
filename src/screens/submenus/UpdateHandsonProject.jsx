import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import { Textarea } from "react-bootstrap-icons";


const UpdateHandsonProject = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handsondetailsData = location.state || {};

    const [handson_category_id, setHandson_category_id] = useState(handsondetailsData.handson_category_id || "");
    const [category_name, setCategory_name] = useState(handsondetailsData.category_name || "");
    const [sub_course_id, setSubcourses_id] = useState("");
    const [subcourses_name, setSubcourses_name] = useState(
        Array.isArray(handsondetailsData.subcourse_details) ? handsondetailsData.subcourse_details[0] : ""
    );
    const [coursename, setCoursename] = useState("");

    const [title, setTitle] = useState(handsondetailsData.title || "");
    const [desc, setDescription] = useState(handsondetailsData.desc || "");
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCourses, setSubCourses] = useState([]);




    const fetchhandsoncategoryData = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";

            const response = await axios.get(`${BASE_URL}/get_category`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Ensure response.data.data is an array
            const categoryData = Array.isArray(response.data?.data) ? response.data.data : [];

            setCategory(categoryData); // Store fetched subcourses
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };
    useEffect(() => {
        fetchhandsoncategoryData();
    }, []);



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

            setCourses(subCoursesData); // Store fetched subcourses
        } catch (err) {
            console.error("Error fetching subcourses:", err);
        }
    };
    useEffect(() => {
        fetchSubCourses();
    }, []);



    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !desc || !category_name || !subcourses_name) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {
                handson_category_id,
                sub_course_id: [`${sub_course_id}`],
                title,
                desc,
                category_name,
                subcourse_details: [subcourses_name],
            };


            const response = await axios.post(`${BASE_URL}/update_handson_project_details/${handsondetailsData.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Hands on project details updated successfully!");
                navigate("/handsonprojectdetails");

                // Clear form
                setSubcourses_id("");
                setSubcourses_name("");
                setTitle("");
                setDescription("");
                setHandson_category_id("");
                setCategory_name("");

            } else {
                toast.error("Failed to update hands on project details.");
            }
        } catch (err) {
            console.error("Error uploading hands on project details:", err);
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
                                                    UPDATE <span className="highlight">HANDSON PROJECT</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/handsonprojectdetails')}>
                                            Handson Project Details
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Subcourse Name</Form.Label>
                                                <Form.Select
                                                    value={subcourses_name}
                                                    onChange={(e) => {
                                                        setSubcourses_name(e.target.value);

                                                        const selectedCourse = courses.find(course => course.subcourses_name === e.target.value);
                                                        if (selectedCourse) {
                                                            setCoursename(selectedCourse.coursename);
                                                            setSubcourses_id(selectedCourse.subcourses_id);
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Subcourse --</option>
                                                    {courses.map((course, index) => (
                                                        <option key={`subcourse-${course.subcourses_id || index}`} value={course.subcourses_name}>
                                                            {course.subcourses_name}
                                                        </option>
                                                    ))}

                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Hands on Category</Form.Label>
                                                <Form.Select
                                                    value={handson_category_id}
                                                    onChange={(e) => {
                                                        const selectedId = e.target.value;
                                                        const selectedCategory = category.find(category => category.id.toString() === selectedId);
                                                        if (selectedCategory) {
                                                            setCategory_name(selectedCategory.title);
                                                            setHandson_category_id(selectedCategory.id);
                                                        }
                                                    }}
                                                >

                                                    <option value="">-- Select Hands on Category --</option>
                                                    {category.map((category, index) => (
                                                        <option key={`category-${category.id || index}`} value={category.id}>
                                                            {category.title}
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
                                                    as={"textarea"}
                                                    placeholder="Enter description"
                                                    value={desc}
                                                    onChange={(e) => setDescription(e.target.value)}
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
export default UpdateHandsonProject;