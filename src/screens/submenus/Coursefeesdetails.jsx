import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEye, FaPrint, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Coursefeesdetails = () => {
    const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => {
        fetchcoursefees();
    }, [currentPage]); // Fetch data when page changes

    useEffect(() => {
        handleSearch(""); // Reset search when page changes
    }, [currentPage]);


    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        setForceUpdate((prev) => prev + 1);
    }, [coursefees, filteredData]);



    useEffect(() => {
        fetchCourses();
        fetchSubcourses();
        fetchcoursefees();
        fetchFeeCategories();
    }, []);

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

    const BASE_URL = "https://api.sumagotraining.in/public/api";
    const fetchcoursefees = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_course_fee_details_list`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });


            // Directly use response.data as it contains the array
            const coursesData = Array.isArray(response.data) ? response.data : [];
            setCoursefees(coursesData); // Set the course fees data
            setData(coursesData); // Update the SearchExportContext data

        } catch (err) {
            console.error("Error fetching course fees details:", err);
        } finally {
            setLoading(false);
        }
    };

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


    const fetchSubcourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_all_subcourses`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const subcoursesData = response.data?.data || [];
            setSubcourses(subcoursesData); // Store fetched subcourses


        } catch (err) {
            console.error("Error fetching subcourses:", err);
        }
    };


    const handleDelete = async (id) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to delete this data?",
            customUI: ({ onClose }) => (
                <div
                    style={{
                        textAlign: "left",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
                        maxWidth: "400px",
                        margin: "0 auto",
                    }}
                >
                    <h2>Confirm to delete</h2>
                    <p>Are you sure you want to delete this data?</p>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <button
                            style={{ marginRight: "10px" }}
                            className="btn btn-primary"
                            onClick={async () => {
                                setLoading(true);
                                const accessToken = localStorage.getItem("remember_token");
                                try {
                                    await instance.delete(`delete_subcourse/${id}`, {
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    toast.success("Data Deleted Successfully");

                                    // Update state directly after deletion
                                    setSubcourses((prevCourses) => prevCourses.filter(course => course.id !== id));

                                } catch (error) {
                                    console.error("Error deleting data:", error);
                                    toast.error("Error deleting data");
                                } finally {
                                    setLoading(false);
                                }
                                onClose();
                            }}
                        >
                            Yes
                        </button>
                        <button className="btn btn-secondary" onClick={() => onClose()}>
                            No
                        </button>
                    </div>
                </div>
            ),
        });
    };


    const handleAddcoursefees = () => {
        navigate("/addcoursefees");
    };

    const handleClose = () => {
        setShowModal(false);
        setCoursename("");
        setSubcourses_name("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("remember_token");
        if (!token) {
            toast.error("User not authenticated. Please log in again.");
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
            const response = await fetch(
                `https://api.sumagotraining.in/public/api/add_course_fee_details`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                    mode: "cors",
                }
            );

            if (response.status === 200) {
                toast.success("Course fees details added successfully!");

                // Update state directly with the new subcourse
                const newSubcourse = {
                    course_id: course_id,
                    coursename: coursename,
                    subcourses_name: subcourses_name,
                    job_assistance: job_assistance,
                    live_class_subscription: live_class_subscription,
                    lms_subscription: lms_subscription,
                    domain_training: domain_training,
                    project_certification_from_companies: project_certification_from_companies,
                    capstone_projects: capstone_projects,
                    adv_ai_dsa: adv_ai_dsa,
                    industry_projects: industry_projects,
                    job_referrals: job_referrals,
                    microsoft_certification: microsoft_certification,
                    sub_course_fee: sub_course_fee,
                    sub_course_duration: sub_course_duration
                };

                setCoursefees((prevCoursefees) => [...prevCoursefees, newSubcourse]);

                // Close the modal
                setShowModal(false);
            } else {
                toast.error(`Error: ${response.data.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.");
        }
    };




    const tableColumns = (currentPage, rowsPerPage) => [
        {
            name: "Sr. No.",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
            width: "100px",
        },
        {
            name: "Fee Category",
            selector: row => row.pro_max_name || '',
            width: "200px",

        },
        {
            name: "Course Name",
            selector: row => row.course_name || '',
            width: "200px",

        },
        {
            name: "Subcourse Name",
            selector: row => row.sub_course_name || '',
            width: "250px",
        },
        {
            name: "Appointment Letter",
            selector: row => row.job_assistance || '',
            width: "150px",

        },

        {
            name: "Mock Interview",
            selector: row => row.live_class_subscription || '',
            width: "150px",

        },
        {
            name: "Completion Certificate",
            selector: row => row.project_certification_from_companies || '',
            width: "200px",

        },
        {
            name: "Experience Letter",
            selector: row => row.industry_projects || '',
            width: "150px",



        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex">
                    <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
                        <Button className="ms-1" onClick={() => navigate(`/update-coursefees/${row.fee_details_id}`, { state: row })}>
                            <FaEdit />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}>
                        <Button className="ms-1" style={{ backgroundColor: "red", color: "white", borderColor: "red" }}
                            onClick={() => handleDelete(row.fee_details_id)}
                        >
                            <FaTrash />
                        </Button>
                    </OverlayTrigger>
                </div>
            ),
        },
    ];


    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col className="d-flex align-items-center">
                                    <h5>Course Fees  <span className="highlight"> Details</span></h5>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-end">
                                    <Button variant="primary" onClick={handleAddcoursefees}>
                                        <FaPlus /> Add Course Fees
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <DataTable
                                key={forceUpdate}
                                columns={tableColumns(currentPage, rowsPerPage)}
                                data={searchQuery ? filteredData : coursefees}
                                pagination
                                paginationDefaultPage={currentPage}
                                paginationPerPage={rowsPerPage}
                                paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
                                onChangePage={(page) => setCurrentPage(page)}
                                onChangeRowsPerPage={(newPerPage, page) => {
                                    setRowsPerPage(newPerPage);
                                    setCurrentPage(page); // Keep page in sync
                                }}
                                responsive
                                striped
                                noDataComponent="Loading...."
                            />

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal for Adding Course */}
            {/* <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Course Fees Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

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
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Mock Interview"
                                value={live_class_subscription}
                                onChange={(e) => setlive_class_subscription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Live Project"
                                value={lms_subscription}
                                onChange={(e) => setlms_subscription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Completion Certificate"
                                value={domain_training}
                                onChange={(e) => setdomain_training(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Experience Letter"
                                value={project_certification_from_companies}
                                onChange={(e) => setproject_certification_from_companies(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Job Assistance"
                                value={capstone_projects}
                                onChange={(e) => setcapstone_projects(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Resume Building"
                                value={adv_ai_dsa}
                                onChange={(e) => setadv_ai_dsa(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Job Guarantee"
                                value={industry_projects}
                                onChange={(e) => setindustry_projects(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Job Refferal"
                                value={job_referrals}
                                onChange={(e) => setjob_referrals(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Training Support (1 Year)"
                                value={microsoft_certification}
                                onChange={(e) => setmicrosoft_certification(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="sub course fee"
                                value={sub_course_fee}
                                onChange={(e) => setsub_course_fee(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="sub course duration"
                                value={sub_course_duration}
                                onChange={(e) => setsub_course_duration(e.target.value)}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </Container>
    );
};

export default Coursefeesdetails;
