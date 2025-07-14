import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import instance from "../../api/AxiosInstance";
import pdficon from "../imgs/download.png";
import imageicon from "../imgs/imagethumbnail.png"
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import CompletionFormSkeleton from "./CompletionFormSkeleton"; // Import the skeleton component


const CompletionAllDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internDetails, setInternDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const formatDate = (dob) => {
    if (!dob) return ""; // Handle empty case
  
    let dateObj = new Date(dob); // Convert string to Date object
    let day = String(dateObj.getDate()).padStart(2, "0"); // Ensure two-digit day
    let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    let year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
  };


  const contentRef = useRef(null); // Reference to the entire form
  const printButtonRef = useRef(null);


  const handleDownloadPDF = () => {
    if (!contentRef.current) {
      console.error("Content reference is null.");
      return;
    }
  
    // Hide the button before capturing the PDF
    if (printButtonRef.current) {
      printButtonRef.current.style.display = "none";
    }
  
   
    html2canvas(contentRef.current, {
      scale: 2,  // Improves resolution
      useCORS: true,
      backgroundColor: null,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.scrollHeight
  })
      .then((canvas) => {
        const imgWidth = 210;  // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    
        const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]); // Set custom page size
    
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.9), "JPEG", 0, 0, imgWidth, imgHeight);

        // Show the button again after capturing
        if (printButtonRef.current) {
          printButtonRef.current.style.display = "block";
        }
  
        // Generate filename based on student's name
      const fileName = `${fname}_${lname}_Completion_form.pdf`.replace(/\s+/g, "_"); // Replace spaces with underscores

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

        const response = await instance.get(`get-perticular-completion-intern-studId/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        setInternDetails(response.data); // Assuming the first object contains intern details
      } catch (err) {
        setError("Add Completion Details First");
        console.error("Error fetching intern details:", err);
        toast.error('Add Completion Details First!', {
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
        setLoading(false);
      }
    };

    fetchInternDetails();
  }, [id]);


  // Handling loading, error, and missing data states
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  // if (!internDetails) return <p>No intern details found.</p>;


  if (loading) return <CompletionFormSkeleton />;
  if (error) return <p>{error}</p>;
  if (!internDetails) return <p>No intern details found.</p>;

  const {
    fname = "",
    fathername = "",
    mname = "",
    lname = "",
    email = "",
    technology_name: technology = "",
    date_of_joining = "",
    current_working = "",
    selected_mode: selectedMode = "",
    project_title = "",
    describe_project = "",
    placed = "",
    employer_name = "",
    package_in_lpa = "",
    designation_in_current_company = "",
    task_links_1 = "",
    task_links_2 = "",
    task_links_3 = "",
    task_links_4 = "",
    task_links_5 = "",
    project_github = "",
    final_year_project_link = "",
    name_contact_of_first_candidate = "",
    name_contact_of_second_candidate = "",
    name_contact_of_third_candidate = "",
    name_contact_of_fourth_candidate = "",
    name_contact_of_fifth_candidate = "",
    blog_on_your_selected_technology = "",
    google_review_img = "",
    resume_pdf = "",
    feedback_video = "",
  } = internDetails;

   // URLs for assets (if present)
   const googleReviewImgUrl = google_review_img?.startsWith("data:image")
   ? google_review_img // Already a valid Base64 data URL, use as is
   : `data:image/jpeg;base64,${google_review_img}`; // Prepend only if missing
 
   const resumePdfUrl = resume_pdf ? `${resume_pdf}` : null;
   const feedbackVideoUrl = feedback_video
     ? feedback_video.replace("video\\/mp4", "video/mp4")
     : null;
 





  return (
    <>
      <div ref={contentRef}>
        <div className="container backimg">
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
                INTERNS COMPLETION <span className="highlight">FORM</span>
              </b>
            </div>
          </Container>

          <Container className="position-relative text-center homepara">
                                 <p style={{ textAlign: "justify" }}>
                                 We appreciate your dedication, enthusiasm, and commitment to hands-on learning at the Sumago Center of Practical Experience. This journey has equipped you with valuable skills and insights to excel in your future endeavors. 
                                 </p>
                               </Container>
                               <Container className="position-relative text-center welcommsg">
                                 <p>
                                   <b>Congratulations on completing your internship at SCOPE! </b> 
                                 </p>
                               </Container>
                               <Container className="position-relative text-center para2">
                                 <p style={{ textAlign: "justify" }}>
                                 As you move forward, we hope you continue to grow, innovate, and make meaningful contributions. Wishing you success in all your future pursuits—stay connected and keep striving for excellence!
                                 </p>
                               </Container>
                         <div style={{ margin: "40px" }}></div>

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
                    <b className="form-title">INTERNSHIP COMPLETION FORM</b>
                  </div>
                </div>
              </Card.Header>
              <Card.Body
                style={{ backgroundColor: "transparent", color: "white" }}
                className="pt-5"
              >
                <Row>
                  {/* First name */}
                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="d-none d-md-block label-colour"
                    >
                      Name :{" "}
                    </b>
                  </Col>
                  <Col g={10} md={10} sm={12} className="d-none d-md-block">
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
                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Technology:
                    </b>
                  </Col>
                  <Col lg={4} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${technology}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Email ID:
                    </b>
                  </Col>
                  <Col lg={4} md={5} sm={12} className="mb-3">
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
                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Date of Joining :
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

                        className="FormStyeling transparent-input"
                        value={`${formatDate(date_of_joining)}`}
                        />
                    </Form.Group>
                  </Col>

                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Training Mode :
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
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${selectedMode}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Currently Working On :
                    </b>
                  </Col>
                  <Col lg={10} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        placeholder="+91"
                        value={`${current_working}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={2} md={4} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Project Title :
                    </b>
                  </Col>
                  <Col lg={10} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${project_title}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="m-0">
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Describe the Project in 3 to 4 Lines:{" "}
                    </b>
                  </Col>
                  <Col lg={9} md={9} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling"
                        value={`${describe_project}`}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={3} md={3} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Placed Anywhere ? :
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
                        value={`${placed}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Employer Name (If No, Enter NA):
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
                        className="FormStyeling transparent-input"
                        value={`${employer_name}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={3} md={3} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Designation in Current Company (If No, Enter NA) :
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
                        value={`${designation_in_current_company}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={3} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Package in LPA (If No, Enter NA):
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
                        value={`${package_in_lpa}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12} md={12} sm={12} className="mb-3 label-colour">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Provide minimum 5 task links which you uploaded on linkedin
                    </b>{" "}
                  </Col>

                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Link 1 :
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${task_links_1}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Link 2 :
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${task_links_2}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Link 3 :
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${task_links_3}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Link 4 :
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${task_links_4}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Link 5 :
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${task_links_5}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      GitHub Link of Your Final Year Project :
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
                        className="FormStyeling transparent-input"
                        value={`${project_github}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Link of Final Project Completion Video on LinkedIn :
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
                        className="FormStyeling transparent-input"
                        value={`${final_year_project_link}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12} md={12} sm={12} className="mb-3 label-colour">
                    <b style={{ fontFamily: "Century gothic" }}>
                      List of minimum 5 candidates which are refer from your side
                      for company{" "}
                    </b>{" "}
                  </Col>

                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Name & Contact of First Candidate:
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${name_contact_of_first_candidate}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Name & Contact of Second Candidate:
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${name_contact_of_second_candidate}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Name & Contact of Third Candidate:
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${name_contact_of_third_candidate}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Name & Contact of Fourth Candidate:
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${name_contact_of_fourth_candidate}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col llg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Name & Contact of Fifth Candidate:
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${name_contact_of_fifth_candidate}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={2} md={3} sm={12}>
                    <b style={{ fontFamily: "Century Gothic" }} className="label-colour">
                      Upload the screenshots of Google review
                    </b>
                  </Col>
                  
                  <Col lg={4} md={3} sm={12} className="mb-5">
                    <Form.Group className="fname" controlId="googleReview">
                      {googleReviewImgUrl && (
                        <>
                          {/* Clickable Thumbnail */}
                          <img
                            src={imageicon} // Small icon for thumbnail
                            className="img-fluid"
                            alt="Google Review Thumbnail"
                            style={{ maxWidth: "70px", cursor: "pointer" }}
                            onClick={() => openImageModal(googleReviewImgUrl)}
                          />
                          <p
                            style={{ cursor: "pointer", color: "blue", textDecoration: "underline", }}
                            onClick={() => openImageModal(googleReviewImgUrl)}
                          >
                            Click to View Full Image
                          </p>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  
                  {showImageModal && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        {/* Close Button */}
                        <button
                          onClick={closeImageModal}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "white",
                            border: "none",
                            fontSize: "18px",
                            cursor: "pointer",
                            padding: "5px 10px",
                            borderRadius: "5px"
                          }}
                        >
                          ✖
                        </button>
                  
                        {/* Full Image */}
                        <img
                          src={selectedImage}
                          alt="Full Google Review"
                          style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "5px" }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Col lg={2} md={3} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
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
                        value={blog_on_your_selected_technology}
                        className="FormStyeling transparent-input"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={2} md={3} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Upload your training video feedback
                    </b>
                  </Col>
                  <Col lg={4} md={3} sm={12} className="mb-5">
                    {feedbackVideoUrl && (
                      <Form.Group className="fname" controlId="googleReview">
                        <video
                          src={feedbackVideoUrl}
                          controls
                          autoPlay
                          playsInline
                          style={{ maxWidth: "200px", cursor: "pointer" }}
                          onError={() => console.error("Error loading video")}
                        />
                      </Form.Group>
                    )}
                  </Col>

                  <Col lg={2} md={2} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Upload your updated Resume
                    </b>
                  </Col>

                  <Col lg={4} md={4} sm={12} className="mb-5">
                    <Form.Group className="fname" controlId="videoFeedback">
                      {resumePdfUrl && (
                        <a
                          href={resumePdfUrl}
                          download // This will trigger the download action
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "inline-block" }}
                        >
                          {/* Static Image of the PDF (Thumbnail) */}
                          <img
                            src={pdficon}
                            class="img-fluid logo1"
                            alt="PDF Thumbnail"
                            style={{ maxWidth: "70px", cursor: "pointer" }}
                          />

                          <p>Click to Download Resume</p>
                        </a>
                      )}
                    </Form.Group>
                  </Col>

                  {/* <Col lg={2} md={2} sm={12}>
        <b style={{ fontFamily: "Century gothic" }} className="label-colour">
        Upload your updated Resume
        </b>
      </Col>
      <Col lg={4} md={4} sm={12} className="mb-5">
        <Form.Group className="fname" controlId="videoFeedback">
        {resumePdfUrl && (
      
          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
       
      )}
        </Form.Group>
      </Col> */}


                  <div className="button-container">


                    <Button
                      variant="primary"
                      onClick={handleDownloadPDF}
                      ref={printButtonRef}
                      style={{
                        backgroundColor: "#17a2b8",
                        borderColor: "#17a2b8",
                      }} // Change to your desired color
                    >
                      Print
                    </Button>
                  </div>

                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CompletionAllDetails;



