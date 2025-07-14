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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const UpdateSyllabus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const syllbusData = location.state || {};

    const [syllabus_id, setSyllabus_id] = useState("");
    const [sub_course_id, setSubcourses_id] = useState("");
    const [coursename, setCoursename] = useState("");
    const [subcourses_name, setSubcourses_name] = useState(syllbusData.subcourses_name || "");
    const [courses, setCourses] = useState([]);
    const [subCourses, setSubCourses] = useState([]);

    const [module_id, setModule_id] = useState("");
    const [modulename, setModulename] = useState("");

    const [module_name, setModule_name] = useState(syllbusData.module_name || "");
    const [modules, setModules] = useState([]);
    const [title, setTitle] = useState(syllbusData.title || "");
    const [description, setDescription] = useState(syllbusData.description || "");



    useEffect(() => {
        if (syllbusData.module_id) setModule_id(syllbusData.module_id);
        if (syllbusData.module_name) setModule_name(syllbusData.module_name);
    }, [syllbusData]);



    useEffect(() => {
        const fetchSubCourses = async () => {
            const accessToken = localStorage.getItem("remember_token");
            try {
                const BASE_URL = "https://api.sumagotraining.in/public/api";
                const response = await axios.get(`${BASE_URL}/get_subcourse_details_list`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                const subCoursesData = Array.isArray(response.data?.data) ? response.data.data : [];
                setSubCourses(subCoursesData);

                //  Set sub_course_id based on subcourses_name
                const existing = subCoursesData.find(item => item.subcourses_name === subcourses_name);
                if (existing) {
                    setSubcourses_id(existing.subcourses_id);
                }

            } catch (err) {
                console.error("Error fetching subcourses:", err);
            }
        };

        fetchSubCourses();
    }, [subcourses_name]);




    const fetchmodulelistData = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";

            const response = await axios.get(`${BASE_URL}/get_module`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Ensure response.data.data is an array
            const moduleData = Array.isArray(response.data?.data) ? response.data.data : [];

            setModules(moduleData); // Store fetched subcourses
        } catch (err) {
            console.error("Error fetching subcourses:", err);
        }
    };
    useEffect(() => {
        fetchmodulelistData();
    }, []);





    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!subcourses_name || !module_name || !title || !description) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {

                course_id: sub_course_id,
                module_id: id,
                title,
                description,

                module_name: title,
                subcourses_name: subcourses_name,
            };

            const response = await axios.post(`${BASE_URL}/update_syllabus/${syllbusData.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Syllabus updated successfully!");
                navigate("/syllabusdetails");

                setSyllabus_id("");
                setSubcourses_id("");
                setModule_id("");
                setModule_name("");
                setTitle("");
                setDescription("");
                setSubcourses_name("");

            } else {
                toast.error("Failed to update syllabus.");
            }
        } catch (err) {
            console.error("Error uploading syllabus:", err);
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
                                                    UPDATE <span className="highlight">SYLLABUS</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/syllabusdetails')}>
                                            Syllabus Details
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
                                                <Form.Label>Module Name</Form.Label>
                                                <Form.Select
                                                    value={module_id}
                                                    onChange={(e) => {
                                                        const selectedId = e.target.value;
                                                        const selectedModule = modules.find(
                                                            (module) => module.id.toString() === selectedId
                                                        );
                                                        if (selectedModule) {
                                                            setModule_id(selectedModule.id); // number
                                                            setModule_name(selectedModule.title); // use `title` as `module_name`
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Module --</option>
                                                    {modules.map((module, index) => (
                                                        <option key={`module-${module.id}`} value={module.id}>
                                                            {module.title}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>






                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={description}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setDescription(data);
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
export default UpdateSyllabus;