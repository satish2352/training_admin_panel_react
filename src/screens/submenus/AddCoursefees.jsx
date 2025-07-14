import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "./completion.css";
import axios from "axios";

import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";

const Addcoursefees = () => {
    const [coursename, setCoursename] = useState("");
    const [subcourses_name, setSubcourses_name] = useState("");

    const [job_assistance, setjob_assistance] = useState("");
    const [live_class_subscription, setlive_class_subscription] = useState("");
    const [lms_subscription, setlms_subscription] = useState("");
    const [domain_training, setdomain_training] = useState("");
    const [project_certification_from_companies, setproject_certification_from_companies] = useState("");
    const [capstone_projects, setcapstone_projects] = useState("");
    const [adv_ai_dsa, setadv_ai_dsa] = useState("");
    const [industry_projects, setindustry_projects] = useState("");
    const [job_referrals, setjob_referrals] = useState("");
    const [microsoft_certification, setmicrosoft_certification] = useState("");
    const [sub_course_fee, setsub_course_fee] = useState("");
    const [sub_course_duration, setsub_course_duration] = useState("");

    const [feeCategories, setFeeCategories] = useState([]);
    const [selectedFeeCategory, setSelectedFeeCategory] = useState("");
    const [courses, setCourses] = useState([]);
    const [Subcourses, setSubcourses] = useState([]);
    const [coursefees, setCoursefees] = useState([]);

    const navigate = useNavigate();


    const location = useLocation();
    const [course_id, setCourseId] = useState(location.state?.course_id || "");

    useEffect(() => {
        console.log("Selected Course Name:", coursename);
    }, [coursename]);

    const BASE_URL = "https://api.sumagotraining.in/public/api";


    useEffect(() => {
        const courseIdFromLocation = location.state?.course_id;
        if (courseIdFromLocation) {
            setCourseId(courseIdFromLocation);
        }
        fetchCourses();
        fetchSubcourses();
        fetchFeeCategories();
    }, []);

    const fetchCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_course`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Courses API Response:", response.data); // Debugging log
            setCourses(response.data?.data || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const fetchSubcourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_all_subcourses`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Subcourses API Response:", response.data); // Debugging log
            setSubcourses(response.data?.data || []);
        } catch (err) {
            console.error("Error fetching subcourses:", err);
        }
    };

    const fetchFeeCategories = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_feecategory`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Fee Categories API Response:", response.data); // Debugging log
            setFeeCategories(response.data?.data || []);
        } catch (err) {
            console.error("Error fetching program fee categories:", err);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("remember_token");
        if (!token) {
            toast.error("Unauthorized: Token missing. Please log in again.");
            return;
        }

        const formData = new FormData();
        formData.append("course_id", course_id);
        formData.append("name", coursename);
        formData.append("job_assistance", job_assistance);
        formData.append("live_class_subscription", live_class_subscription);
        formData.append("lms_subscription", lms_subscription);
        formData.append("domain_training", domain_training);
        formData.append("project_certification_from_companies", project_certification_from_companies);
        formData.append("capstone_projects", capstone_projects);
        formData.append("adv_ai_dsa", adv_ai_dsa);
        formData.append("industry_projects", industry_projects);
        formData.append("job_referrals", job_referrals);
        formData.append("microsoft_certification", microsoft_certification);
        formData.append("sub_course_fee", sub_course_fee);
        formData.append("sub_course_duration", sub_course_duration);

        try {
            const response = await fetch(`${BASE_URL}/add_course_fee_details`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                toast.success("Course fees details added successfully!!");
                navigate("/coursefeesdetails"); // Navigate to listing page
            } else {
                toast.error("Failed to add category. Please try again.");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("An error occurred. Please try again.");
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
                            <Card className="mb-5">
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Container>
                                            <div className="text-start title-container">
                                                <b className="title-text fs-2">
                                                    ADD COURSE<span className="highlight"> FEES</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/coursefeesdetails')}>
                                            Course Fees Details
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Program Fee Category</Form.Label>
                                                <Form.Select
                                                    value={selectedFeeCategory}
                                                    onChange={(e) => setSelectedFeeCategory(e.target.value)}
                                                >
                                                    <option value="">-- Select pro max category --</option>
                                                    {[...new Set(feeCategories.map((category) => category.title))].map((uniqueTitle, index) => (
                                                        <option key={index} value={uniqueTitle}>
                                                            {uniqueTitle}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Course Name</Form.Label>
                                                <Form.Select
                                                    value={coursename}
                                                    onChange={(e) => {
                                                        const selectedCourse = courses.find((course) => course.name === e.target.value);
                                                        if (selectedCourse) {
                                                            setCoursename(selectedCourse.name); // Set coursename
                                                            setCourseId(selectedCourse.id); // Set course_id
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Course --</option>
                                                    {courses.map((course) => (
                                                        <option key={course.id} value={course.name}>
                                                            {course.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>




                                            <Form.Group className="mb-3">
                                                <Form.Label>Subcourse Name</Form.Label>
                                                <Form.Select
                                                    value={subcourses_name}
                                                    onChange={(e) => setSubcourses_name(e.target.value)}
                                                >
                                                    <option value="">-- Select Subcourse --</option>
                                                    {Subcourses.filter((subcourse) => subcourse.coursename === coursename).map(
                                                        (subcourse) => (
                                                            <option key={subcourse.id} value={subcourse.subcourses_name}>
                                                                {subcourse.subcourses_name}
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Select>
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Appointment Letter"
                                                    value={job_assistance}
                                                    onChange={(e) => setjob_assistance(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Mock Interview"
                                                    value={live_class_subscription}
                                                    onChange={(e) => setlive_class_subscription(e.target.value)}
                                                    maxLength={100}
                                               />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Live Project"
                                                    value={lms_subscription}
                                                    onChange={(e) => setlms_subscription(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Completion Certificate"
                                                    value={domain_training}
                                                    onChange={(e) => setdomain_training(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Experience Letter"
                                                    value={project_certification_from_companies}
                                                    onChange={(e) => setproject_certification_from_companies(e.target.value)}
                                                    maxLength={100}
                                               />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Job Assistance"
                                                    value={capstone_projects}
                                                    onChange={(e) => setcapstone_projects(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Resume Building"
                                                    value={adv_ai_dsa}
                                                    onChange={(e) => setadv_ai_dsa(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Job Guarantee"
                                                    value={industry_projects}
                                                    onChange={(e) => setindustry_projects(e.target.value)}
                                                    maxLength={100}
                                               />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Job Refferal"
                                                    value={job_referrals}
                                                    onChange={(e) => setjob_referrals(e.target.value)}
                                                    maxLength={100}
                                               />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Training Support (1 Year)"
                                                    value={microsoft_certification}
                                                    onChange={(e) => setmicrosoft_certification(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Sub course Fee"
                                                    value={sub_course_fee}
                                                    onChange={(e) => setsub_course_fee(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Sub course Duration"
                                                    value={sub_course_duration}
                                                    onChange={(e) => setsub_course_duration(e.target.value)}
                                                    maxLength={100}
                                               />
                                            </Form.Group>


                                            <div className="d-flex justify-content-center"> <Button variant="primary" className="fs-5" type="submit">Submit</Button>


                                                {/* <Button variant="secondary" className="ms-2" onClick={() => navigate('/coursefeesdetails')}>Cancel</Button> */}
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

export default Addcoursefees;
