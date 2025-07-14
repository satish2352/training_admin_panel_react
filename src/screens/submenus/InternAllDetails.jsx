import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import instance from "../../api/AxiosInstance";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



const InternAllDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [internDetails, setInternDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dob) => {
    if (!dob) return ""; // Handle empty case
  
    let dateObj = new Date(dob); // Convert string to Date object
    let day = String(dateObj.getDate()).padStart(2, "0"); // Ensure two-digit day
    let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    let year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
  };

  const contentRef = useRef(null); // Reference to the entire webpage
  const internshipRef = useRef(null); // Reference for "INTERNSHIP DETAILS" section
  const printButtonRef = useRef(null);

  const handleDownloadPDF = () => {
    if (!contentRef.current) {
      console.error("Content reference is null.");
      return;
    }
  
    if (printButtonRef.current) {
      printButtonRef.current.style.display = "none"; // Hide print button before capturing
    }
  
    html2canvas(contentRef.current, {
      scale: 2, // Improve quality
      useCORS: true,
      backgroundColor: null, // Transparent background
      willReadFrequently: true,  // Ensures proper transparency handling
    }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const marginTop = 10; // Top margin for 2nd page onwards
      const marginBottom = 12; // Bottom margin for all pages
      const usableHeight = pageHeight - marginBottom; // Reduce height by bottom margin
  
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 0; // Track page number
  
      while (heightLeft > 0.5 * usableHeight) {
        let pageCanvas = document.createElement("canvas");
        let pageCtx = pageCanvas.getContext("2d");
      
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(
          usableHeight * (canvas.width / imgWidth), 
          heightLeft * (canvas.width / imgWidth) // Ensure last page height is correct
        );
      
        pageCtx.drawImage(
          canvas,
          0, pageCount * usableHeight * (canvas.width / imgWidth), // Capture correct slice
          canvas.width, pageCanvas.height,
          0, 0,
          pageCanvas.width, pageCanvas.height
        );
      
        const pageImage = pageCanvas.toDataURL("image/jpeg", 0.8);
        pdf.addImage(
          pageImage,
          "JPEG",
          0,
          pageCount === 0 ? 0 : marginTop, // Adjust margin only for second page onwards
          imgWidth,
          pageCanvas.height * (imgWidth / canvas.width) // Maintain aspect ratio
        );
      
        heightLeft -= pageCanvas.height * (imgWidth / canvas.width); // Reduce remaining height
        pageCount++;
      
        if (heightLeft > 0.5 * usableHeight) {
          pdf.addPage();
        }
      }
      
  
      if (printButtonRef.current) {
        printButtonRef.current.style.display = "block"; // Show print button again
      }
  
     
      // Generate filename based on student's name
      const fileName = `${fname}_${lname}_Joining_form.pdf`.replace(/\s+/g, "_"); // Replace spaces with underscores

      // Save the PDF
      pdf.save(fileName);

      
    //   const pdfBlob = pdf.output("blob");
    //   const pdfUrl = URL.createObjectURL(pdfBlob);
    //   window.open(pdfUrl);
    // }).catch((error) => {
    //   console.error("Error generating PDF:", error);


      // Ensure buttons are visible again in case of an error
      if (printButtonRef.current) printButtonRef.current.style.display = "block";
    });
  };
  
  





  useEffect(() => {
    const fetchInternDetails = async () => {
      const accessToken = localStorage.getItem("remember_token");
      try {
        const response = await axios.get(`https://api.sumagotraining.in/public/api/get-perticular-intern-by-studId/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response.data); // Log the response

        const data = response.data[0]; // Assuming the response is an array
        if (!data) {
          toast.error("Add Intern Details First", {
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
          
          navigate(-1);
          return;
        }

        // Set intern details if data is present
        setInternDetails(data);
      } catch (err) {
        setError("Failed to fetch intern details. Please try again later.");
        console.error("Error fetching intern details:", err);
        toast.error("Failed to fetch intern details. Please try again later!", {
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
       
        return;
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInternDetails(); // Ensure `id` is valid before calling
  }, [id]);

    // Handling loading, error, and missing data states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!internDetails) return <p>No intern details found.</p>;
  

  const {
    fname = "",
    mname = "",
    fathername = "",
    lname = "",
    email = "",
    parmanenat_address = "",
    current_address = "",
    contact_details = "",
    whatsappno = "",
    dob = "",
    age = "",
    gender = "",
    blood = "",
    aadhar = "",
    linkdin = "",
    facebook = "",
    youtube = "",
    anyother_add = "",
    school_name = "",
    tenth_per = "",
    duretion = "",
    intern = "",
    twelve_diploma_per = "",
    graduation_details = "",
    graduation_per = "",
    post_graduation_details = "",
    post_graduation_per = "",
    anyother_cirt = "",
    selected_branches = "",
    other_branch = "",
    father_name = "",
    father_contactdetails = "",
    father_aadharno = "",
    fatherOccupation = "",
    mother_name = "",
    motherOccupation = "",
    mother_aadharno = "",
    mother_contactdetails = "",

    marriedStatus = "",
    husband_name = "",
    HusbandOccupation = "",
    Husband_contactdetails = "",
    Husband_aadharno = "",

    husbandDetails = "",
    guardian_name = "",
    GuardianOccupation = "",
    Guardian_aadharno = "",
    Guardian_contactdetails = "",
    maritalStatus = "",
    date_of_joining = "",
    technology_name = "",
    duration = "",
    selectedModules = "",
    training_mode = "",
    intern_experience = "",
    experience = "",
    characteristics_describe = "",
    applicant_name = "",
    place = "",
    refrance_social_media,
    refrance_friend,
    refrance_family,
    refrance_relatives,
    refrance_other,
    scoperefer = "",
    reference_name = "",
    reference_name1 = "",
    contact_number = "",
    contact_number1 = "",
    buttom_applicant_name = "",
    buttom_place = "",
  } = internDetails;

  return (
    <>
      <div className="container backimg export-container" ref={contentRef}>
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} className="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text">
              INTERNS JOINING <span className="highlight">FORM</span>
            </b>
          </div>
        </Container>
        <Container className="position-relative text-center homepara">
          <p>
            SCOPE, where we believe in empowering individuals through education
            and skill development. Established with a vision to foster
            excellence and innovation in learning, Scope is dedicated to
            providing high-quality training programs tailored to meet the
            diverse needs of our students.
          </p>
        </Container>
        <Container className="position-relative text-center welcommsg">
          <p>
            <b>Welcome To </b> <b>Sumago Center of Practical Experience!!</b>
          </p>
        </Container>
        <Container className="position-relative text-center para2">
          <p style={{ textAlign: "justify" }}>
            We’re glad to have you on board as part of our intern team. Get
            ready to dive into hands-on learning, sharpen your skills, and make
            meaningful contributions. Let’s make this journey both rewarding and
            memorable!
          </p>
        </Container>

        {/* Intern Details */}
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
              <Row>
                {/* First name */}
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="d-none d-md-block label-colour"
                  >
                    First Name :{" "}
                  </b>
                </Col>
                <Col lg={8} className="d-none d-md-block">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${fname} ${mname} ${fathername} ${lname}`}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/* email */}
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Email Id :
                  </b>
                </Col>
                <Col lg={8} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${email}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Permanent Address :
                  </b>
                </Col>
                <Col lg={8} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${parmanenat_address}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Current Address :
                  </b>
                </Col>
                <Col lg={8} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"

                      className="FormStyeling transparent-input"
                      value={`${current_address}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Contact Details :
                  </b>
                </Col>
                <Col lg={3} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      placeholder="+91"
                      className="FormStyeling transparent-input"
                      value={`${contact_details}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={2} sm={12} className="m-0 ">
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Whatsapp No :
                  </b>
                </Col>
                <Col lg={3} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      placeholder="+91"
                      value={`${whatsappno}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Date Of Birth :
                  </b>
                </Col>
                <Col lg={3} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      placeholder="+91"
                      className="FormStyeling transparent-input"
                      value={`${formatDate(dob)}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={1} md={1} sm={12} className="m-0">
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Age :{" "}
                  </b>
                </Col>
                <Col lg={4} md={4} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling"
                      value={`${age}`}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Gender:
                  </b>
                </Col>
                <Col lg={8} md={8} sm={12} className="mb-3">
                  <Form.Group controlId="gender">
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      value={`${gender}` || "Not Specified"}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Blood Group :
                  </b>
                </Col>
                <Col lg={8} md={8} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${blood}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Aadhar Card No :
                  </b>
                </Col>
                <Col lg={8} md={8} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${aadhar}`}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
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
                  <b className="form-title">SOCIAL MEDIA ADDRESS</b>
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
                  {/* email */}
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      LinkedIn Address :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${linkdin}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Facebook Address :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${facebook}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Youtube Address :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${youtube}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Anyother Address :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${anyother_add}`}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
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
                  <b className="form-title">EDUCATIONAL DETAILS</b>
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
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      School Name :{" "}
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter school name"
                        className="FormStyeling transparent-input"
                        value={`${school_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      10<sup>th</sup> Percentage :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter 10th percentage"
                        className="FormStyeling transparent-input"
                        value={`${tenth_per}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      12<sup>th</sup>/Diploma Percentage :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter 12th/Diploma percentage"
                        className="FormStyeling transparent-input"
                        value={`${twelve_diploma_per}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Graduation Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter graduation details"
                        className="FormStyeling transparent-input"
                        value={`${graduation_details}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Graduation Percentage :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter graduation percentage"
                        className="FormStyeling transparent-input"
                        value={`${graduation_per}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Post Graduation Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter post graduation details"
                        className="FormStyeling transparent-input"
                        value={`${post_graduation_details}` || "Not Sepcified"}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Post Graduation Percentage :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter graduation percentage"
                        className="FormStyeling transparent-input"
                        value={`${post_graduation_per}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Branch :</b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter graduation percentage"
                      className="FormStyeling transparent-input"
                      value={`${selected_branches}`}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Any Other Certification :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${anyother_cirt}`}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
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
                  <b className="form-title">PARENTS / GUARDIAN DETAILS</b>
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
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Name :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter fathername"
                        className="FormStyeling transparent-input"
                        value={`${father_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Occupation:
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter father occupation"
                        className="FormStyeling transparent-input"
                        value={`${fatherOccupation}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Contact Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${father_contactdetails}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Aadhar Card No :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Father Aadhar card no"
                        className="FormStyeling transparent-input"
                        value={`${father_aadharno}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Name :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter fathername"
                        className="FormStyeling transparent-input"
                        value={`${mother_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Occupation :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter father occupation"
                        className="FormStyeling transparent-input"
                        value={motherOccupation}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Contact Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${mother_contactdetails}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Aadhar card No. :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter mother Aadhar card no"
                        className="FormStyeling transparent-input"
                        value={`${mother_aadharno}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Married :</b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="FormStyeling transparent-input"
                        value={`${marriedStatus}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <bt />
                  {marriedStatus === 'Yes' && (
                    <>
                      <Row>
                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} className='p-0 m-0' >Husband/Wife Name</b></Col>
                        <Col lg={3} md={3} sm={12} className='mb-3'>
                          <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" className='FormStyeling transparent-input' value={husband_name}
                            />
                          </Form.Group>

                        </Col>
                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Husband/Wife Occupation</b></Col>
                        <Col lg={3} md={3} sm={12} className='mb-3'>
                          <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" className='FormStyeling transparent-input' value={HusbandOccupation}
                            />
                          </Form.Group>

                        </Col>

                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Husband/Wife Contact Details</b></Col>
                        <Col lg={3} md={3} sm={12} className='mb-3'>
                          <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" className='FormStyeling transparent-input' value={Husband_contactdetails}
                            />
                          </Form.Group>

                        </Col>
                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Husband/Wife Aadhar No</b></Col>
                        <Col lg={3} md={3} sm={12} className='mb-3'>
                          <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" className='FormStyeling transparent-input' value={Husband_aadharno}
                            ></Form.Control>
                          </Form.Group>

                        </Col>
                      </Row>


                    </>
                  )}
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Name :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Guardian Name"
                        className="FormStyeling transparent-input"
                        value={`${guardian_name}` || "Not Specified"}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Occupation:
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Guardian Occupation"
                        className="FormStyeling transparent-input"
                        value={`${GuardianOccupation}` || "Not Specified"}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Contact Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${Guardian_contactdetails}` || "Not Specified"}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Aadhar card No :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Guardian Aadhar card no"
                        className="FormStyeling transparent-input"
                        value={`${Guardian_aadharno}` || "Not Specified"}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>



        <Container fluid>
          <Card style={{ backgroundColor: "transparent", border: "none" }} ref={internshipRef} className="section internship-section">
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
                  <b className="form-title">INTERNSHIP DETAILS</b>
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
                  <Col lg={4}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Date Of Joining :
                    </b>
                  </Col>
                  <Col lg={8}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${formatDate(date_of_joining)}`}
                        />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Technology Name :
                    </b>
                  </Col>
                  <Col lg={8}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${technology_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Duration :</b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="duretion"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${duration}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Module :</b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="duretion"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${selectedModules}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Training Mode:
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group controlId="trainingMode">
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={training_mode || "Not Specified"}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <b style={{ fontFamily: "Century gothic" }} className="mb-3">
                    Do you have Previous Work , internship or Volunteer
                    Experience ?
                  </b>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="duretion"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="FormStyeling transparent-input"
                        value={`${intern_experience}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-2">
                    {intern_experience == "Yes" && (
                      <div>
                        <Form.Group
                          className="duretion"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="text"
                            className="FormStyeling transparent-input"
                            value={`${experience}`}
                          />
                        </Form.Group>
                      </div>
                    )}
                  </Col>

                  <b style={{ fontFamily: "Century gothic" }}>
                    Which characteristics best describe you?
                  </b>
                  <Form.Group
                    className="fname mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      as="textarea"
                      rows={4}
                      value={characteristics_describe}
                    ></Form.Control>
                  </Form.Group>
                  <b style={{ fontFamily: "Century gothic" }} className="mb-3">
                    Note: You have an 8-day period to change your choosen
                    technology. If you wish to make a change, please do so
                    within 8-days of timeframe.
                  </b>

                  <Col lg={4} md={4} sm={12}>
                    <div class="box"></div>
                    <Form.Label className="w-100 text-center">
                      Applicant Signature
                    </Form.Label>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="fname1 mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className=" FormStyeling transparent-input"
                        as="textarea"
                        rows={4}
                        value={applicant_name}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="fname1 mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        as="textarea"
                        rows={4}
                        value={place}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>

        {/* R E F E R E N C E */}
        <Container fluid>
          {/* <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header className="cardpersonal_details">
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: "black", width: "20px", height: "30px" }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b>REFERENCE</b>
                                    </div>
                                </div>
                            </Card.Header> */}
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
                  <b className="form-title">REFERENCE</b>
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
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Social Media :{" "}
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Social Media"
                        className="FormStyeling transparent-input"
                        value={refrance_social_media || "Not Specified"}

                      />
                    </Form.Group>

                  </Col>

                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Friend :{" "}
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Friend Name"
                        value={refrance_friend || "Not Specified"}
                        className="FormStyeling transparent-input"

                      />
                    </Form.Group>

                  </Col>

                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Family :{" "}
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Family"
                        className="FormStyeling transparent-input"
                        value={refrance_family || "Not Specified"}

                      />
                    </Form.Group>

                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Relatives :{" "}
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Relatives"
                        className="FormStyeling transparent-input"
                        value={refrance_relatives || "Not Specified"}

                      />
                    </Form.Group>

                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Other :{" "}
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Other"
                        className="FormStyeling transparent-input"
                        value={refrance_other || "Not Specified"}

                      />
                    </Form.Group>

                  </Col>



                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Would you like to give reference about Scope / Sumago ? :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${scoperefer}`}
                      />
                    </Form.Group>
                  </Col>

                  <bt />
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Reference name :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${reference_name}`}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>
                  <Col lg={5} md={5} sm={12}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${reference_name1}`}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Contact number :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        placeholder="+91"
                        value={contact_number}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>
                  <Col lg={5} md={5} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        placeholder="+91"
                        value={contact_number1}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>

                  <b
                    className="mb-5"
                    style={{
                      fontFamily: "Century Gothic",
                      textAlign: "justify",
                    }}
                  >
                   <Form.Check inline className="custom-checkbox" />I certify that the information I have provided above is true
                    to the best of my knowledge and belief, without any malice
                    or intention to commit acts of misrepresentation. I am aware
                    that any false, misleading, or deceptive information
                    provided may lead to withdrawal, exclusion, or disciplinary
                    action, which may be dealt with by the company or relevant
                    authorities.
                  </b>

                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Name of Applicant :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter applicant name"
                        className="FormStyeling transparent-input"
                        value={`${buttom_applicant_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={1} md={1} sm={12} className="m-0">
                    <b
                      className="single-line"
                      style={{ fontFamily: "Century Gothic" }}
                    >
                      Place:
                    </b>
                  </Col>
                  <Col lg={4} md={4} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter place"
                        className="FormStyeling transparent-input"
                        value={`${buttom_place}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={2} md={2} sm={12} className="m-0">
                    <b style={{ fontFamily: "Century Gothic" }}>
                      Date Signed by Applicant:
                    </b>
                  </Col>
                  <Col lg={4} md={4} sm={12} className="mb-3">
                    <div className="box"></div>

                    {/* <Form.Control
                                                    type="date"
                                                    placeholder="Enter date"
                                                    className=' transparent-input'  rows={4}
                                                    
                                                /> */}
                  </Col>
                  {/* <Col lg={2} md={2} sm={12} className="m-0">
                                            <b className="single-line1" style={{ fontFamily: 'Century Gothic' }}>
                                                Applicant Signature:
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <div className="box"></div>
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className="m-0">
                                            <b className="single-line" style={{ fontFamily: 'Century Gothic' }}>Place:</b>
                                        </Col> */}
                  <Col lg={2} md={2} sm={12} className="m-0">
                    <b style={{ fontFamily: "Century Gothic" }}>
                      Applicant Signature:
                    </b>
                  </Col>
                  <Col lg={4} md={4} sm={12} className="mb-3">
                    <div className="box"></div>
                  </Col>
                </Row>
                <div className="button-container">
                                        {/* <Button
                                            variant="primary"
                                            type="submit"
                                            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }} // Change to your desired color
                                        >
                                            Submit
                                        </Button> */}

                                        <Button
                                            variant="primary"
                                            onClick={handleDownloadPDF}
                                            ref={printButtonRef}
                                            style={{ backgroundColor: "#17a2b8", borderColor: "#17a2b8" }} // Change to your desired color
                                        >
                                            Print
                                        </Button>
                                    </div>

                
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default InternAllDetails;