import React, { useState, useEffect } from "react";
import "./InterJoining.css";
import { toast, Bounce } from "react-toastify";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import corner from "../imgs/file (28).png";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

function UpdateCompletionDetails() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState("");


    const formatDate = (dob) => {
        if (!dob) return ""; // Handle empty case

        let dateObj = new Date(dob); // Convert string to Date object
        let day = String(dateObj.getDate()).padStart(2, "0"); // Ensure two-digit day
        let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        let year = dateObj.getFullYear();

        return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
    };











    const [student_id, setstudent_id] = useState();
    const [formData, setFormData] = useState({
        fname: "",
        mname: "",
        fathername: "",
        lname: "",
        technology_name: "",
        email: "",
        date_of_joining: "",
        selected_mode: "",
        current_working: "",
        project_title: "",
        describe_project: "",
        placed: "",
        employer_name: "",
        designation_in_current_company: "",
        package_in_lpa: "",
        task_links_1: "",
        task_links_2: "",
        task_links_3: "",
        task_links_4: "",
        task_links_5: "", project_github: "",
        final_year_project_link: "",
        name_contact_of_first_candidate: "",
        name_contact_of_second_candidate: "",
        name_contact_of_third_candidate: "",
        name_contact_of_fourth_candidate: "",
        name_contact_of_fifth_candidate: "",
        blog_on_your_selected_technology: "",
        review_image: "",
        resume_pdf: "",
        feedback_video: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    // Fetching data when component mounts
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem("remember_token");
                const response = await axios.get(
                    `https://api.sumagotraining.in/public/api/get-perticular-completion-intern-studId/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = response.data;

                if (data) {
                    setstudent_id(data.id || id);
                    setFormData((prev) => ({
                        ...prev,

                        fname: data.fname || "",
                        mname: data.mname || "",
                        fathername: data.fathername || "",
                        lname: data.lname || "",
                        technology_name: data.technology_name || "",
                        email: data.email || "",
                        date_of_joining: data.date_of_joining || "",
                        selected_mode: data.selected_mode || "",
                        current_working: data.current_working || "",
                        project_title: data.project_title || "",
                        describe_project: data.describe_project || "",
                        placed: data.placed || "",
                        employer_name: data.employer_name || "",
                        designation_in_current_company: data.designation_in_current_company || "",
                        package_in_lpa: data.package_in_lpa || "",
                        task_links_1: data.task_links_1 || "",
                        task_links_2: data.task_links_2 || "",
                        task_links_3: data.task_links_3 || "",
                        task_links_4: data.task_links_4 || "",
                        task_links_5: data.task_links_5 || "",
                        project_github: data.project_github || "",
                        final_year_project_link: data.final_year_project_link || "",

                        name_contact_of_first_candidate: data.name_contact_of_first_candidate || "",
                        name_contact_of_second_candidate: data.name_contact_of_second_candidate || "",
                        name_contact_of_third_candidate: data.name_contact_of_third_candidate || "",
                        name_contact_of_fourth_candidate: data.name_contact_of_fourth_candidate || "",
                        name_contact_of_fifth_candidate: data.name_contact_of_fifth_candidate || "",

                        blog_on_your_selected_technology: data.blog_on_your_selected_technology || "",
                        google_review_img: data.google_review_img || "",
                        resume_pdf: data.resume_pdf || "",
                        feedback_video: data.feedback_video || "",

                    }));
                }
            } catch (err) {
                console.error("Error fetching details:", err);
                toast.error("Add Completion Details First", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: { marginTop: '80px' },
                    transition: Bounce,
                });
                navigate(-1)
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);



    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.fname.trim()) {
            errors.fname = "First Name is required";

        }
        if (!formData.lname.trim()) {
            errors.lname = "Last Name is required";

        }

        if (!formData.technology_name.trim()) {
            errors.technology_name = "Technology is required";
        }

        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is not valid";
        }
        if (!formData.date_of_joining)
            errors.date_of_joining = "Date of joining is required";
        if (!formData.selected_mode)
            errors.selected_mode = "Training mode is required";
        if (!formData.current_working)
            errors.current_working = "current working is required";
        if (!formData.project_title)
            errors.project_title = "Project title is required";
        if (!formData.describe_project)
            errors.describe_project = "Project description is required";
        if (!formData.placed) errors.placed = "Placed status is required";
        if (!formData.employer_name)
            errors.employer_name = "employer name is required";
        if (!formData.designation_in_current_company)
            errors.designation_in_current_company = "Designation is required";
        if (!formData.package_in_lpa) {
            errors.package_in_lpa = "Package is required.";
        } else if (
            isNaN(formData.package_in_lpa) &&
            formData.package_in_lpa.toUpperCase() !== "NA"
        ) {
            errors.package_in_lpa = "Please provide a valid number or enter 'NA'.";
        }


        if (!formData.project_github) {
            errors.project_github = "GitHub link is required";
        } else {
            const githubUrlPattern =
                /^(https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)(\.git)?$/;
            if (!githubUrlPattern.test(formData.project_github)) {
                errors.project_github = "Please provide a valid GitHub repository URL";
            }
        }

        if (!formData.final_year_project_link) {
            errors.final_year_project_link = "Final year project link is required";
        } else {
            const urlPattern =
                /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}([\/\w .-]*)*\/?$/;
            if (!urlPattern.test(formData.final_year_project_link)) {
                errors.final_year_project_link =
                    "Please provide a valid URL for the final year project";
            }
        }


        if (!formData.name_contact_of_first_candidate)
            errors.name_contact_of_first_candidate =
                "Name Contact of first candidate is required.";
        if (!formData.name_contact_of_second_candidate)
            errors.name_contact_of_second_candidate =
                "Name Contact of second candidate is required.";
        if (!formData.name_contact_of_third_candidate)
            errors.name_contact_of_third_candidate =
                "Name Contact of third candidate is required.";
        if (!formData.name_contact_of_fourth_candidate)
            errors.name_contact_of_fourth_candidate =
                "Name Contact of fourth candidate is required.";
        if (!formData.name_contact_of_fifth_candidate)
            errors.name_contact_of_fifth_candidate =
                "Name Contact of fifth candidate is required.";
        if (!formData.blog_on_your_selected_technology)
            errors.blog_on_your_selected_technology =
                "blog on your selected technology is required.";


        // if (!formData.review_image) {
        //     errors.review_image = "Image upload is required.";
        // }
        if (!formData.resume_pdf) {
            errors.resume_pdf = "PDF upload is required.";
        }
        if (!formData.feedback_video) {
            errors.feedback_video = "Video upload is required.";
        }
        setErrors(errors);
        return isValid;
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Always update the formData first
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        let isValid = true;
        let errorMessage = "";

        // Validation for Project Title (max 100 characters)
        if (name === "project_title" && value.length > 100) {
            isValid = false;
            errorMessage = "Project title cannot exceed 100 characters";
        }

        // Validation for Describe Project (max 100 characters)
        else if (name === "describe_project" && value.length > 100) {
            isValid = false;
            errorMessage = "Project description cannot exceed 100 characters";
        }

        // LinkedIn URL Validation for task_links_1 to task_links_5
        else if (
            ["task_links_1", "task_links_2", "task_links_3", "task_links_4", "task_links_5"].includes(name)
        ) {
            const linkedInRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/;
            if (!linkedInRegex.test(value)) {
                isValid = false;
                errorMessage = "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)";
            }
        }

        // Set the error message if validation fails
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: isValid ? "" : errorMessage,
        }));
    };



    const handleFileChange = async (file, name) => {
        if (!file) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Please select a valid file.",
            }));
            return;
        }

        // File validation rules
        let isValid = true;
        let errorMessage = "";
        const fileType = file.type;
        const fileSize = file.size;

        if (name === "review_image") {
            if (!fileType.startsWith("image/")) {
                isValid = false;
                errorMessage = "Only image files are allowed.";
            } else if (fileSize > 2 * 1024 * 1024) { // 2MB limit
                isValid = false;
                errorMessage = "Image size must not exceed 2MB.";
            }
        }

        if (name === "feedback_video") {
            if (!fileType.startsWith("video/")) {
                isValid = false;
                errorMessage = "Only video files are allowed.";
            } else if (fileSize > 5 * 1024 * 1024) { // 5MB limit
                isValid = false;
                errorMessage = "Video size must not exceed 5MB.";
            }
        }

        if (name === "resume_pdf") {
            if (fileType !== "application/pdf") {
                isValid = false;
                errorMessage = "Only PDF files are allowed.";
            }
        }

        if (!isValid) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage,
            }));
            return;
        }

        try {
            const base64 = await convertToBase64(file);
            setFormData((prevData) => ({
                ...prevData,
                [name]: base64,
                [`${name}_fileName`]: file.name, // Store file name
            }));
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        } catch (error) {
            console.error("Error converting file to Base64:", error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Failed to process the file.",
            }));
        }
    };

    // Convert File to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Create a new object without empty file fields
        const filteredFormData = { ...formData };
        if (!filteredFormData.review_image) delete filteredFormData.review_image;
        if (!filteredFormData.resume_pdf) delete filteredFormData.resume_pdf;
        if (!filteredFormData.feedback_video) delete filteredFormData.feedback_video;

        console.log("Payload before API request:", filteredFormData);

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("remember_token");
            const response = await axios.post(
                `https://api.sumagotraining.in/public/api/update-intern-completion-details/update/${student_id}`,
                filteredFormData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("API Response after submit:", response.data);
            toast.success("Data updated successfully!");
            navigate('/viewcompletion');
        } catch (err) {
            console.error("Error updating data:", err);
            toast.error("Failed to update data. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };







    return (
        <>
            <div className="container backimg ">
                <div>
                    <img src={corner} className="corner_img" alt="Responsive Corner" />
                </div>
                <div
                    className="logo-container"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img src={logo1} class="img-fluid logo1" alt="..." />
                    <img src={logo2} class="img-fluid logo2" alt="..." />
                </div>
                <Container>
                    <div className="text-center title-container">
                        <b className="title-text">
                            UPDATE <span className="highlight">COMPLETION</span> DETAILS
                        </b>
                    </div>
                </Container>

                {/* Form Personal Details */}
                <Form onSubmit={handleSubmit}>
                    <Container fluid>

                        <Card style={{ backgroundColor: "transparent", border: "none" }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: "transparent", border: "none" }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{
                                        backgroundColor: "black",
                                        width: "20px",
                                        height: "30px",
                                    }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">PERSONAL DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body
                                style={{ backgroundColor: "transparent", color: "white" }}
                                className="pt-5"
                            >
                                <Card.Title className="text-black"></Card.Title>
                                <Card.Text className="text-black">
                                    <Row>
                                        <Col lg={2} md={2} sm={12} className="mt-3">
                                            <b style={{ fontFamily: "Century gothic" }}>Name : </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={`${formData.fname} ${formData.mname} ${formData.fathername} ${formData.lname}`}
                                                    onChange={handleInputChange} readOnly
                                                    isInvalid={!!errors.fname}
                                                    className="FormStyeling transparent-input"
                                                    placeholder="Enter Your Name"
                                                />
                                            </Form.Group>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.fname}
                                            </Form.Control.Feedback>
                                            {errors.fname && (
                                                <span className="error text-danger">{errors.fname}</span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={10}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Technology Name
                                            </b>
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    aria-label="Default select example"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.technology_name}
                                                    onChange={handleInputChange} readOnly
                                                    // onChange={(e) => settechnology_name(e.target.value)}

                                                    name="technology" // this ensures the right field is updated
                                                >

                                                </Form.Control>
                                            </Form.Group>
                                            {errors.technology && (
                                                <span className="error text-danger">
                                                    {errors.technology}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={1} md={2} sm={12} className="mt-3">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Email Id :{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={5} md={5} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange} className="FormStyeling transparent-input" readOnly
                                                />
                                            </Form.Group>
                                            {errors.email && (
                                                <span className="error text-danger">
                                                    {errors.email}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12} className="mt-3">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Date of Joining :{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="date_of_joining"
                                                    value={`${formatDate(formData.date_of_joining)}`}

                                                    onChange={handleInputChange} className="FormStyeling transparent-input" readOnly
                                                />
                                            </Form.Group>
                                            {errors.date_of_joining && (
                                                <span className="error text-danger">
                                                    {errors.date_of_joining}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="mt-3">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Training mode :{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col
                                            lg={4}
                                            md={4}
                                            sm={12}
                                            className="mb-3 d-flex justify-content-start"
                                        >
                                            <Form.Check
                                                type="radio"
                                                aria-label="radio 1"
                                                label="Online"
                                                className="me-3"
                                                name="selected_mode"
                                                value="Online"
                                                checked={formData.selected_mode === "Online"}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, selected_mode: e.target.value }))} readOnly
                                            />
                                            <Form.Check
                                                type="radio"
                                                aria-label="radio 2"
                                                label="Offline"
                                                name="selected_mode"
                                                value="Offline"
                                                checked={formData.selected_mode === "Offline"}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, selected_mode: e.target.value }))} readOnly

                                            />

                                            {errors.selected_mode && (
                                                <span className="error text-danger">
                                                    {errors.selected_mode}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="mt-3">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Current working on :{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-2 mt-3">
                                            <div className="d-flex flex-wrap justify-content-start radio-container">
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 1"
                                                    label="SRS Preparation"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value="SRS Preparation"
                                                    checked={formData.current_working === "SRS Preparation"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, current_working: e.target.value }))}

                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 2"
                                                    label="Project Development"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value="Project Development"
                                                    checked={formData.current_working === "Project Development"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, current_working: e.target.value }))}

                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 3"
                                                    label="Project Deployment"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value="Project Deployment"
                                                    checked={formData.current_working === "Project Deployment"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, current_working: e.target.value }))}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 4"
                                                    label="Placed"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value="Placed"
                                                    checked={formData.current_working === "Placed"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, current_working: e.target.value }))}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 5"
                                                    label="Other"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value="Other"
                                                    checked={formData.current_working === "Other"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, current_working: e.target.value }))}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 6"
                                                    label="Live Task Working"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value="Live Task Working"
                                                    checked={formData.current_working === "Live Task Working"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, current_working: e.target.value }))}
                                                />
                                                {errors.current_working && (
                                                    <span className="error text-danger">
                                                        {errors.current_working}
                                                    </span>
                                                )}
                                            </div>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="mt-3">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Project Title :{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="project_title"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.project_title}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 100) { // Set max length to 100 characters
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                project_title: onlyLetters,
                                                            }));
                                                        }
                                                    }}
                                                    maxLength={100}
                                                />

                                            </Form.Group>
                                            {errors.project_title && (
                                                <span className="error text-danger">
                                                    {errors.project_title}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="mt-2">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Describe project in 3 to 4 lines :{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={5} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="describe_project"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.describe_project}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            {errors.describe_project && (
                                                <span className="error text-danger">
                                                    {errors.describe_project}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Placed Anywhere? :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-3">
                                            <div
                                                className="d-flex justify-content-start"
                                            >
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 1"
                                                    label="Yes"
                                                    className="me-3"
                                                    name="placed"
                                                    value="Yes"
                                                    checked={formData.placed === "Yes"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, placed: e.target.value }))}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 2"
                                                    label="No"
                                                    name="placed"
                                                    value="No"
                                                    checked={formData.placed === "No"}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, placed: e.target.value }))}
                                                />
                                            </div>
                                            {errors.placed && (
                                                <span className="error text-danger">
                                                    {errors.placed}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Employer Name(If no, Enter NA):
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="employer_name"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.employer_name}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.employer_name && (
                                                <span className="error text-danger">
                                                    {errors.employer_name}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Designation In current company (If no, Enter NA):{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="designation_in_current_company"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.designation_in_current_company}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 100) { // Set max length to 100 characters
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                designation_in_current_company: onlyLetters,
                                                            }));
                                                        }
                                                    }}
                                                    maxLength={100}
                                                />

                                            </Form.Group>
                                            {errors.designation_in_current_company && (
                                                <span className="error text-danger">
                                                    {errors.designation_in_current_company}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Package in LPA(If no, Enter NA):{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="package_in_lpa"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.package_in_lpa}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.package_in_lpa && (
                                                <span className="error text-danger">
                                                    {errors.package_in_lpa}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={12} md={12} sm={12} className="mb-3">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Provide minimum 5 task links which you uploaded on
                                                linkedin
                                            </b>{" "}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Link 1 : </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="task_links_1"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.task_links_1}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.task_links_1 && (
                                                <span className="error text-danger">
                                                    {errors.task_links_1}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Link 2 : </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    name="task_links_2"
                                                    type="text"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.task_links_2}
                                                    onChange={handleInputChange}

                                                    v />
                                            </Form.Group>
                                            {errors.task_links_2 && (
                                                <span className="error text-danger">
                                                    {errors.task_links_2}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Link 3 : </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="task_links_3"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.task_links_3}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            {errors.task_links_3 && (
                                                <span className="error text-danger">
                                                    {errors.task_links_3}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Link 4 : </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="task_links_4"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.task_links_4}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            {errors.task_links_4 && (
                                                <span className="error text-danger">
                                                    {errors.task_links_4}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Link 5 : </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="task_links_5"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.task_links_5}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            {errors.task_links_5 && (
                                                <span className="error text-danger">
                                                    {errors.task_links_5}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                GitHub link of your final year project Link:{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={2} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="project_github"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.project_github}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.project_github && (
                                                <span className="error text-danger">
                                                    {errors.project_github}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Link of final project completion video on linked in Link
                                                :{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="final_year_project_link"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.final_year_project_link}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.final_year_project_link && (
                                                <span className="error text-danger">
                                                    {errors.final_year_project_link}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={12} md={12} sm={12} className="mb-3">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                List of minimum 5 candidates which are referred from
                                                your side for the company
                                            </b>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b
                                                className="responsive-text"
                                                style={{ fontFamily: "Century gothic" }}
                                            >
                                                Name & Contact of first candidate:
                                            </b>
                                        </Col>

                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="name_contact_of_first_candidate"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.name_contact_of_first_candidate}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_first_candidate && (
                                                <span className="error text-danger">
                                                    {errors.name_contact_of_first_candidate}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Name & Contact of second candidate:
                                            </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput2"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="name_contact_of_second_candidate"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.name_contact_of_second_candidate}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_second_candidate && (
                                                <span className="error text-danger">
                                                    {errors.name_contact_of_second_candidate}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Name & Contact of third candidate:
                                            </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="name_contact_of_third_candidate"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.name_contact_of_third_candidate}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_third_candidate && (
                                                <span className="error text-danger">
                                                    {errors.name_contact_of_third_candidate}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Name & Contact of fourth candidate:
                                            </b>
                                        </Col>
                                        <Col lg={10} md={9} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput4"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="name_contact_of_fourth_candidate"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.name_contact_of_fourth_candidate}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_fourth_candidate && (
                                                <span className="error text-danger">
                                                    {errors.name_contact_of_fourth_candidate}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Name & Contact of fifth candidate:
                                            </b>
                                        </Col>
                                        <Col lg={10} md={9} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput5"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="name_contact_of_fifth_candidate"
                                                    className="FormStyeling transparent-input"
                                                    value={formData.name_contact_of_fifth_candidate}
                                                    onChange={handleInputChange}

                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_fifth_candidate && (
                                                <span className="error text-danger">
                                                    {errors.name_contact_of_fifth_candidate}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Upload the screenshots of Google review: <span className="text-danger">*</span>
                                            </b>
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-5">
                                            <FileUploader
                                                handleChange={(file) => handleFileChange(file, "review_image")}
                                                name="review_image"
                                                types={["JPG", "PNG"]}
                                                maxSize={2}
                                            />
                                            {formData.review_image_fileName && <p>Uploaded File: {formData.review_image_fileName}</p>}
                                            {errors.review_image && <p className="text-danger">{errors.review_image}</p>}
                                            <p>(Image size must not exceed 2 MB) <span className="text-danger">*</span></p>
                                        </Col>



                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Write minimum one Blog on your selected technology{" "}
                                            </b>{" "}
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="blog_on_your_selected_technology"
                                                    value={formData.blog_on_your_selected_technology}
                                                    onChange={handleInputChange}
                                                    className="FormStyeling transparent-input"
                                                />
                                            </Form.Group>
                                            {errors.blog_on_your_selected_technology && (
                                                <span className="error text-danger">
                                                    {errors.blog_on_your_selected_technology}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Upload your training video feedback: <span className="text-danger">*</span>
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-5">
                                            <FileUploader
                                                handleChange={(file) => handleFileChange(file, "feedback_video")}
                                                name="feedback_video"
                                                types={["MP4", "AVI", "MOV"]}
                                                maxSize={5}
                                            />
                                            {formData.feedback_video_fileName && <p>Uploaded File: {formData.feedback_video_fileName}</p>}
                                            {errors.feedback_video && <p className="text-danger">{errors.feedback_video}</p>}
                                            <p>(Video size must not exceed 5 MB) <span className="text-danger">*</span></p>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Upload your updated Resume: <span className="text-danger">*</span>
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-5">
                                            <FileUploader
                                                handleChange={(file) => handleFileChange(file, "resume_pdf")}
                                                name="resume_pdf"
                                                types={["PDF"]}
                                            />
                                            {formData.resume_pdf_fileName && <p>Uploaded File: {formData.resume_pdf_fileName}</p>}
                                            {errors.resume_pdf && <p className="text-danger">{errors.resume_pdf}</p>}
                                            <p>(Only PDF files are allowed.)<span className="text-danger">*</span></p>
                                        </Col>


                                        {/* <input type="file" ref={pdfRef} accept="application/pdf" />
                    <input type="file" ref={imageRef} accept="image/*" />
                    <input type="file" ref={videoRef} accept="video/*" /> */}
                                    </Row>

                                    <div className="button-container">
                                        {/* <Button
                      variant="primary"
                      type="submit"
                      style={{
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                      }} // Change to your desired color
                    >
                      Submit
                    </Button> */}

                                        <div className="button-container">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={isSubmitting} // Disable button while submitting
                                                style={{
                                                    backgroundColor: "#28a745",
                                                    borderColor: "#28a745",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                {isSubmitting ? "Submitting..." : "Submit"}{" "}
                                                {/* Text changes based on isSubmitting */}
                                            </Button>


                                        </div>

                                        {/* <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button> */}
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                </Form>
            </div>
        </>
    );
};

export default UpdateCompletionDetails;
