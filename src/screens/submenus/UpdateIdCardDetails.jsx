import React, { useState, useEffect } from "react";
import "./InterJoining.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import corner from "../imgs/file (28).png";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

function UpdateIdCardDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [student_id, setstudent_id] = useState();
    const [fname, setfname] = useState("");
    const [mname, setmname] = useState("");
    const [fathername, setfathername] = useState("");
    const [lname, setlname] = useState("");
    const [technology_name, settechnology_name] = useState("");
    const [date_of_joining, setdate_of_joining] = useState("");
    const [contact_details, setcontact_details] = useState("");
    const [blood, setblood] = useState("");
    const [shirt_size, setshirt_size] = useState("");
    const [errors, setErrors] = useState("");


    const formatDate = (dob) => {
        if (!dob) return ""; // Handle empty case
      
        let dateObj = new Date(dob); // Convert string to Date object
        let day = String(dateObj.getDate()).padStart(2, "0"); // Ensure two-digit day
        let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        let year = dateObj.getFullYear();
      
        return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
      };



    useEffect(() => {
        const fetchInternDetails = async () => {
            const accessToken = localStorage.getItem("remember_token");
            try {
                const response = await axios.get(
                    `https://api.sumagotraining.in/public/api/get-perticular-id-card-info-studId/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = response.data; // Assuming the response is an array

                if (data) {
                    // Set all fields
                    setstudent_id(data.id)
                    setfname(data.fname || "");
                    setmname(data.mname || "");
                    setfathername(data.fathername || "");
                    setlname(data.lname || "");

                    settechnology_name(data.technology_name || "");
                    setdate_of_joining(data.date_of_joining || "");
                    setcontact_details(data.contact_details || "");
                    setblood(data.blood || "");
                    setshirt_size(data.shirt_size || "");
                }
            } catch (err) {
                setErrors("Failed to fetch intern details. Please try again later.");
                console.error("Error fetching intern details:", err);
                toast.error("Add Id Card Details First", {
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
            }
        };

        if (id) fetchInternDetails();
    }, [id]);


    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!fname.trim()) {
            errors.fname = "First Name is required";
            isValid = false;
        }
        if (!mname.trim()) {
            errors.mname = "Mother Name is required";
            isValid = false;
        }

        if (!fathername.trim()) {
            errors.fathername = "Father Name is required";
            isValid = false;
        }
        if (!lname.trim()) {
            errors.lname = "Last Name is required";
            isValid = false;
        }
        if (!technology_name.trim()) {
            errors.technology_name = "technology_name is required";
            isValid = false;
        }
        if (!date_of_joining.trim()) {
            errors.date_of_joining = "date_of_joining is required";
            isValid = false;
        }
        if (!contact_details.trim()) {
            errors.contact_details = "contact_details is required";
            isValid = false;
        }
        if (!blood.trim()) {
            errors.blood = "blood is required";
            isValid = false;
        }
        if (!shirt_size.trim()) {
            errors.shirt_size = "shirt_size is required";
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Validation failed. Please check the highlighted fields.");
            return;
        }

        const token = localStorage.getItem("remember_token");
        const newData = {
            fname,
            fathername,
            mname,
            lname,
            technology_name,
            date_of_joining,
            contact_details,
            blood,
            shirt_size,
        };
        console.log("ID for update:", id);
        console.log("Data to update:", newData);

        try {
            const response = await axios.post(
                `https://api.sumagotraining.in/public/api/update-intern-id-card-info/update/${student_id}`,
                newData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Data updated successfully!");
            navigate("/ViewIdCard")
            console.log("Update Response:", response.data);
        } catch (error) {
            console.error("Error updating data:", error.response?.data || error.message);
            toast.error(`Failed to update data. Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <>
            <div className="container idcardbackimg">
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
                    <img src={logo1} className="img-fluid logo1" alt="Logo 1" />
                    <img src={logo2} className="img-fluid logo2" alt="Logo 2" />
                </div>

                {/* Id Card Details */}
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
                                        <b className="form-title">UPDATE ID CARD DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body
                                style={{ backgroundColor: "transparent", color: "white" }}
                                className="pt-5"
                            >
                                <Row>
                                    <Col lg={2} md={2} sm={12}>
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="d-none d-md-block label-colour"
                                        >
                                            Name of Intern:
                                        </b>
                                    </Col>
                                    <Col g={10} md={10} sm={12} className="d-none d-md-block">
                                        <Form.Group
                                            className="fname"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="FormStyeling transparent-input"
                                                value={`${fname} ${mname} ${fathername} ${lname}`}
                                                name="name"
                                                onChange={(e) => setfname(e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        {errors.fname && (
                                            <span className="error text-danger">
                                                {errors.fname}
                                            </span>
                                        )}
                                    </Col>

                                    <Col lg={2} md={12} sm={10}>
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="label-colour"
                                        >
                                            Technology Name:
                                        </b>
                                    </Col>
                                    <Col lg={4} md={3} sm={12} className="mb-3">
                                        <Form.Group
                                            className="fname"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="FormStyeling transparent-input"
                                                value={technology_name}
                                                name="technology"
                                                onChange={(e) => settechnology_name(e.target.value)}

                                            />
                                        </Form.Group>
                                        {errors.technology_name && (
                                            <span className="error text-danger">
                                                {errors.technology_name}
                                            </span>
                                        )}
                                    </Col>

                                    <Col lg={2} md={12} sm={10}>
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="label-colour"
                                        >
                                            Date of Joining:
                                        </b>
                                    </Col>
                                    <Col lg={4} md={3} sm={12} className="mb-3">
                                        <Form.Group
                                            className="fname"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="FormStyeling transparent-input"
                                                value={`${formatDate(date_of_joining)}`}

                                                name="date_of_joining"
                                                onChange={(e) => setdate_of_joining(e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        {errors.date_of_joining && (
                                            <span className="error text-danger">
                                                {errors.date_of_joining}
                                            </span>
                                        )}
                                    </Col>

                                    <Col lg={2} md={12} sm={10}>
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="label-colour"
                                        >
                                            Contact Details:
                                        </b>
                                    </Col>
                                    <Col lg={4} md={3} sm={12} className="mb-3">
                                        <Form.Group
                                            className="fname"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="FormStyeling transparent-input"
                                                value={contact_details}
                                                name="contact_details"
                                                onChange={(e) => setcontact_details(e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        {errors.contact_details && (
                                            <span className="error text-danger">
                                                {errors.contact_details}
                                            </span>
                                        )}
                                    </Col>

                                    <Col lg={2} md={12} sm={10}>
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="label-colour"
                                        >
                                            Blood Group:
                                        </b>
                                    </Col>
                                    <Col lg={4} md={3} sm={12} className="mb-3">
                                        <Form.Group
                                            className="fname"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="FormStyeling transparent-input"
                                                value={blood}
                                                name="blood_group"
                                                onChange={(e) => setblood(e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        {errors.blood && (
                                            <span className="error text-danger">
                                                {errors.blood}
                                            </span>
                                        )}
                                    </Col>

                                    <Col lg={2} md={12} sm={10}>
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="label-colour"
                                        >
                                            T-Shirt Size:
                                        </b>
                                    </Col>
                                    <Col lg={4} md={3} sm={12} className="mb-3">
                                        <Form.Group
                                            className="fname"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Select
                                                aria-label="Default select example"
                                                className="FormStyeling transparent-input"
                                                value={shirt_size}
                                                onChange={(e) => setshirt_size(e.target.value)}
                                                name="shirt_size"
                                            >
                                                <option>Select T-Shirt Size</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XXL ">XXL</option>
                                                <option value="Free Size ">Free Size</option>
                                            </Form.Select>
                                        </Form.Group>
                                        {errors.shirt_size && (
                                            <span className="error text-danger">
                                                {errors.shirt_size}
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                                <div className="button-container">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        style={{
                                            backgroundColor: "#28a745",
                                            borderColor: "#28a745",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Submit
                                    </Button>


                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </Form>
            </div>
        </>
    );
};

export default UpdateIdCardDetails;
