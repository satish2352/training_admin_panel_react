import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const Updatecoursefees = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseData = location.state || {};
  const Coursefeesdata = location.state || {};

  const [coursename, setCoursename] = useState(Coursefeesdata.coursename || "");
  const [subcourses_name, setSubcourses_name] = useState(Coursefeesdata.subcourses_name || "");

  const [job_assistance, setjob_assistance] = useState(Coursefeesdata.job_assistance || "");
  const [live_class_subscription, setlive_class_subscription] = useState(Coursefeesdata.live_class_subscription || "");
  const [lms_subscription, setlms_subscription] = useState(Coursefeesdata.lms_subscription || "");
  const [domain_training, setdomain_training] = useState(Coursefeesdata.domain_training || "");
  const [project_certification_from_companies, setproject_certification_from_companies] = useState(Coursefeesdata.project_certification_from_companies || "");
  const [capstone_projects, setcapstone_projects] = useState(Coursefeesdata.capstone_projects || "");
  const [adv_ai_dsa, setadv_ai_dsa] = useState(Coursefeesdata.adv_ai_dsa || "");
  const [industry_projects, setindustry_projects] = useState(Coursefeesdata.industry_projects || "");
  const [job_referrals, setjob_referrals] = useState(Coursefeesdata.job_referrals || "");
  const [microsoft_certification, setmicrosoft_certification] = useState(Coursefeesdata.microsoft_certification || "");
  const [sub_course_fee, setsub_course_fee] = useState(Coursefeesdata.sub_course_fee || "");
  const [sub_course_duration, setsub_course_duration] = useState(Coursefeesdata.sub_course_duration || "");



  const [feeCategories, setFeeCategories] = useState([]);
  const [pro_max_name, setSelectedFeeCategory] = useState(Coursefeesdata.pro_max_name || "");
  const [courses, setCourses] = useState([]);
  const [Subcourses, setSubcourses] = useState([]);
  const [coursefees, setCoursefees] = useState([]);
  useEffect(() => {
    fetchCourses();
    fetchFeeCategories();
    fetchSubcourses();
  }, []);

  useEffect(() => {
    if (Coursefeesdata) {
      setCoursename(Coursefeesdata.course_name || ""); // Ensure course name is set
      setSelectedFeeCategory(Coursefeesdata.pro_max_name || ""); // Set Fee Category
      setSubcourses_name(Coursefeesdata.subcourses_name || ""); // Set Subcourse Name
    }
  }, [Coursefeesdata]); // Runs only when Coursefeesdata is available


  //   useEffect(() => {
  //          fetchCourses();
  //          fetchSubcourses();
  //          fetchcoursefees();
  //          fetchFeeCategories();
  //      }, []);

  const BASE_URL = "https://api.sumagotraining.in/public/api";

  const fetchCourses = async () => {
    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await axios.get(`${BASE_URL}/get_course`, {
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


  const fetchSubcourses = async (selectedCourse) => {
    if (!selectedCourse) {
      console.error("Selected course is undefined or empty.");
      return;
    }

    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await axios.get(`${BASE_URL}/get_all_subcourses?course_name=${selectedCourse}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const subcoursesData = response.data?.data || [];
      setSubcourses(subcoursesData);
    } catch (err) {
      console.error("Error fetching subcourse details:", err.response?.data || err.message);
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

      const feeData = response.data?.data || [];
      setFeeCategories(feeData); // Store fetched fee categories
    } catch (err) {
      console.error("Error fetching program fee categories:", err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!courseData.id) {
      toast.error("Invalid course ID.");
      return;
    }

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("course_id", Coursefeesdata.course_id);
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
      const response = await fetch(
        `https://api.sumagotraining.in/public/api/update_course_fee_details/${courseData.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log("Updating Course fees ID:", courseData.id);

      const textResponse = await response.text();
      console.log("Raw API Response:", textResponse); // Debugging

      if (response.ok) {
        toast.success("Program fee category updated successfully!");
        navigate("/coursefeesdetails");
      } else {
        toast.error(`Update failed: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
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
                          UPDATE COURSE<span className="highlight"> FEES</span>
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
                    <Form onSubmit={handleUpdate}>
                      <Form.Group className="mb-3">
                        <Form.Label>Program Fee Category</Form.Label>
                        <Form.Select
                          value={pro_max_name}
                          onChange={(e) => setSelectedFeeCategory(e.target.value)}
                        >
                          <option value="">-- Select pro max category --</option>
                          {feeCategories.map((category, index) => (
                            <option key={index} value={category.title} selected={category.title === pro_max_name}>
                              {category.title}
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
                              setCoursename(selectedCourse.name); // Set course name
                            }
                          }}
                        >
                          <option value="">-- Select Course --</option>
                          {courses.map((course) => (
                            <option key={course.id} value={course.name} selected={course.name === coursename}>
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
                          {Subcourses.filter((subcourse) => subcourse.coursename === coursename).map((subcourse) => (
                            <option key={subcourse.id} value={subcourse.subcourses_name}>
                              {subcourse.subcourses_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>




                      <Form.Group className="mb-3">
                        <Form.Label>Appointment Letter</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Appointment Letter"
                          value={job_assistance}
                          onChange={(e) => setjob_assistance(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Mock Interview</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Mock Interview"
                          value={live_class_subscription}
                          onChange={(e) => setlive_class_subscription(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Live Project</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Live Project"
                          value={lms_subscription}
                          onChange={(e) => setlms_subscription(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Completion Certificate</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Completion Certificate"
                          value={domain_training}
                          onChange={(e) => setdomain_training(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Experience Letter</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Experience Letter"
                          value={project_certification_from_companies}
                          onChange={(e) => setproject_certification_from_companies(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Job Assistance</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Job Assistance"
                          value={capstone_projects}
                          onChange={(e) => setcapstone_projects(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Resume Building</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Resume Building"
                          value={adv_ai_dsa}
                          onChange={(e) => setadv_ai_dsa(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Job Guarantee</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Job Guarantee"
                          value={industry_projects}
                          onChange={(e) => setindustry_projects(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Job Refferal</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Job Refferal"
                          value={job_referrals}
                          onChange={(e) => setjob_referrals(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Training Support (1 Year)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Training Support (1 Year)"
                          value={microsoft_certification}
                          onChange={(e) => setmicrosoft_certification(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Sub course Fee</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Sub course Fee"
                          value={sub_course_fee}
                          onChange={(e) => setsub_course_fee(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Sub course Duration</Form.Label>
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

export default Updatecoursefees;
