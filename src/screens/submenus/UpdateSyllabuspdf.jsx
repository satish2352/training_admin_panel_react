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


const UpdateSyllabuspdf = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const syllabuspdfData = location.state || {};

    const [sub_course_id, setSubcourses_id] = useState("");
    const [subcourses_name, setSubcourses_name] = useState(syllabuspdfData.name || "");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(syllabuspdfData.file || null);
    const [coursename, setCoursename] = useState("");
    const [subCourses, setSubCourses] = useState([]);

    const [courses, setCourses] = useState([]); // Store courses
    
    useEffect(() => {
        if (syllabuspdfData.file) {
            setFileName(syllabuspdfData.file);
        }
    }, [syllabuspdfData]);
    
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





    useEffect(() => {
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
    



    const handleUpdate = async (e) => {
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


            const response = await axios.post(`${BASE_URL}/update_syllbus_pdf/${syllabuspdfData.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Syllbus Pdf updated successfully!");
                navigate("/syllabuspdfdetails");

                // Clear form
                setSubcourses_id("");
                setSubcourses_name("");
                setFile("");
               

            } else {
                toast.error("Failed to update syllabus pdf.");
            }
        } catch (err) {
            console.error("Error updating syllabus pdf:", err);
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
                                                    UPDATE <span className="highlight">SYLLABUS PDF</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/syllabuspdfdetails')}>
                                            Syllabus Pdf Details
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
                                                <Form.Label>Upload New File (Drag and Drop or Click)</Form.Label>
                                                <div
  className="border p-4 text-center"
  onDrop={handleDrop}
  onDragOver={(e) => e.preventDefault()}
  onClick={() => document.getElementById("pdfInput").click()}
  style={{ cursor: "pointer" }}
>
  {fileName ? (
    <p className="mt-2">Uploaded File: <strong>{fileName}</strong></p>
  ) : (
    <p>Drag & Drop PDF here or click to upload</p>
  )}
</div>

<Form.Control
  id="pdfInput"
  type="file"
  accept="application/pdf"
  style={{ display: "none" }}
  onChange={(e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
        setFileName(file.name);
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
export default UpdateSyllabuspdf;