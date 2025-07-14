import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Col, Form, Button, Table } from "react-bootstrap";
import instance from "../../api/AxiosInstance";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./T3SheetDetails.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";

const T3SheetDetails = () => {
    const { id } = useParams();
    const [internDetails, setInternDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const contentRef = useRef(null); // Reference to the entire form
    const printButtonRef = useRef(null);

    const handleDownloadPDF = () => {
        if (!contentRef.current) {
            console.error("Content reference is null.");
            return;
        }
    
        // Hide the button before capturing the PDF
        if (printButtonRef.current) {
            printButtonRef.current.style.visibility = "hidden";
        }
    
        html2canvas(contentRef.current, {
            scale: 3,  // Improves resolution
            useCORS: true,
            backgroundColor: null,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.scrollHeight
        })
            .then((canvas) => {
                const pdf = new jsPDF("p", "mm", "a4");
    
                const imgWidth = 210;  
                const imgHeight = (canvas.height * imgWidth) / canvas.width; 
    
                if (imgHeight > 297) {
                    const scaleFactor = 297 / imgHeight;
                    pdf.addImage(canvas.toDataURL("image/jpeg", 1), "JPEG", 0, 0, imgWidth, imgHeight * scaleFactor);
                } else {
                    pdf.addImage(canvas.toDataURL("image/jpeg", 1), "JPEG", 0, 0, imgWidth, imgHeight);
                }
    
                // Show the button again after capturing
                if (printButtonRef.current) {
                    printButtonRef.current.style.visibility = "visible";
                }
    
                   // Generate filename based on student's name
            const fileName = `${fname}_${lname}_T3Sheet.pdf`.replace(/\s+/g, "_"); // Replace spaces with underscores

            // Save the PDF
            pdf.save(fileName);

            
    //   const pdfBlob = pdf.output("blob");
    //   const pdfUrl = URL.createObjectURL(pdfBlob);
    //   window.open(pdfUrl);
    // }).catch((error) => {
    //   console.error("Error generating PDF:", error);

    
        if (printButtonRef.current) {
            printButtonRef.current.style.visibility = "visible";
        }
    });
}

    





    useEffect(() => {
        const fetchInternDetails = async () => {
            const accessToken = localStorage.getItem("remember_token");
            try {
                const response = await instance.get(`get-perticular-intern/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                setInternDetails(response.data[0]);
            } catch (err) {
                setError("Failed to fetch intern details. Please try again later.");
                console.error("Error fetching intern details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInternDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!internDetails) return <p>No intern details found.</p>;

    const handlePrint = () => {
        window.print();
    };

    const {
        fname = "",
        mname = "",
        fathername = "",
        lname = "",
        graduation_details = "",
        post_graduation_details = "",
        date_of_joining = "",
        technology_name = "",
        duration = "",
        selectedModules = "",
        training_mode = "",
    } = internDetails;

    return (
        <>
            <div className="container backimg" ref={contentRef}>
                <div>
                    <img src={corner} className="corner_img" alt="Responsive Corner" />
                </div>
                <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={logo1} className="img-fluid logo1" alt="..." />
                    <img src={logo2} className="img-fluid logo2" alt="..." />
                </div>
                <Container>
                    <div className="text-center title-container">
                        <b className="title-text">T3 SHEET</b>
                    </div>
                </Container>
                <Form>
                    <Container fluid>
                        <Card style={{ backgroundColor: "transparent", border: "none" }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: "transparent", border: "none" }}
                            >
                                {/* <div className="personal-card-heading position-relative">
                                    <b className="form-title"> SCOPE INTERNSHIP DETAILS</b>
                                </div> */}
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: "transparent", color: "white" }} className="pt-5">


                                <Row>
                                    {/* Name of Candidate */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px" ,fontSize: "18px"}}>Name of Candidate:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${fname} ${mname} ${fathername} ${lname}`}
                                            style={{ width: "50%", fontSize: "18px" }  }
                                        />
                                    </Col>

                                    {/* Technology Name */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px",fontSize: "18px" }}>Technology Name:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${technology_name}`}
                                            style={{ width: "50%",fontSize: "18px" }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    {/* Duration of Training */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px",fontSize: "18px" }}>Duration of Training:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${duration}`}
                                            style={{ width: "50%",fontSize: "18px" }}
                                        />
                                    </Col>

                                    {/* Qualification */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px",fontSize: "18px" }}>Qualification:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={post_graduation_details || graduation_details}
                                            style={{ width: "50%" , fontSize: "18px"}}
                                        />
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    {/* Date of Joining */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Date of Joining:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${date_of_joining}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>

                                    {/* Training Mode */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Training Mode:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${training_mode}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    {/* Selected Module */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Selected Module:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${selectedModules}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>
                                </Row>



                                <div className="container mt-4">
                                    <Table  responsive className="text-center fs-5 rounded custom-table">
                                        <thead className="table-danger">
                                            <tr>
                                                <th className="w-25">Contents</th>
                                                <th className="w-25">Allocated To</th>
                                                <th className="w-15">Date</th>
                                                <th className="w-15">Sign</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {/* BDE Department */}
                                            <tr>
                                                <td className="text-start">Enquiry</td>
                                                <td rowSpan={3} className="align-middle py-2">BDE Department</td>
                                                <td rowSpan={3}></td>
                                                <td rowSpan={3}></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start">Enquiry Finalisation</td>
                                            </tr>
                                            <tr>
                                                <td className="text-start">If Enquiry done, informed in group (Updation)</td>
                                            </tr>

                                            {/* Account Department */}
                                            <tr>
                                                <td className="text-start">Fees Followup</td>
                                                <td>Account Department</td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            {/* Installments with Checkboxes */}
                                            {["1st Installment", "2nd Installment", "3rd Installment", "4th Installment"].map((installment, index) => (
                                                <tr key={index}>
                                                    <td className="text-start">
                                                        {installment} <Form.Check inline />
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            ))}

                                            {/* Operation Department */}
                                            <tr>
                                                <td className="text-start">
                                                    System Arrangement:<br /> System/Laptop/Own Laptop
                                                </td>
                                                <td className="align-middle text-center py-2">Operation Department</td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            {/* HR Department */}
                                            <tr>
                                                <td className="text-start">List of documents needed to be collected</td>
                                                <td rowSpan={6} className="align-middle text-center py-2">HR Department</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr><td className="text-start">Appointment Letter</td><td></td><td></td></tr>
                                            <tr><td className="text-start">Welcome Kit</td><td></td><td></td></tr>
                                            <tr><td className="text-start">Induction to Team</td><td></td><td></td></tr>
                                            <tr><td className="text-start">Attendance Record Process</td><td></td><td></td></tr>
                                            <tr><td className="text-start">LinkedIn Updation by Team</td><td></td><td></td></tr>

                                            {/* Learning and Development Head */}
                                            <tr>
                                                <td className="text-start">Seating Arrangement</td>
                                                <td>Learning and Development Head</td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            {/* Training Conduction */}
                                            <tr>
                                                <td className="text-start">Training Conduction</td>
                                                <td rowSpan={2} className="align-middle">Learning and Development Head</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr></tr>

                                            {/* Mock Interviews with Checkboxes */}
                                            {["Mock Interview 1", "Mock Interview 2", "Mock Interview 3"].map((interview, index) => (
                                                <tr key={index}>
                                                    <td className="text-start">
                                                        {interview} <Form.Check inline />
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            ))}

                                            {/* HR Department Interviews */}
                                            <tr>
                                                <td className="text-start">HR Session</td>
                                                <td>HR Department</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start">HR Round (Interview)</td>
                                                <td>HR Department</td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            {/* Intern's Project and Completion */}
                                            <tr>
                                                <td className="text-start">Intern's Project</td>
                                                <td rowSpan={3} className="text-center align-middle py-2">Project Manager</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr><td className="text-start">Intern's Project Allocation</td><td></td><td></td></tr>
                                            <tr><td className="text-start">Intern's Project Delivery (Completion)</td><td></td><td></td></tr>

                                            <tr>
                                                <td className="text-start">Experience Letter / Completion Letter</td>
                                                <td className="text-center align-middle py-2">HR Department</td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            {/* Completion Date Row */}
                                            <tr>
                                                <td colSpan="4" className="fw-bold text-start">Completion Date of Training -</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <Row>

                                    <Col lg={6}>
                                        <b
                                            style={{ fontFamily: "Century gothic", marginTop: "80px", marginLeft: "100px" }}
                                            className="d-none d-md-block label-colour"
                                        >
                                            HR Executive
                                        </b>
                                    </Col>

                                    <Col lg={6}>
                                        <b
                                            style={{ fontFamily: "Century gothic", marginTop: "80px", marginLeft: "300px" }}
                                            className="d-none d-md-block label-colour"
                                        >
                                            CEO
                                        </b>
                                    </Col>
                                </Row>



                                {/* Print Button */}
                                <div className="print-button text-center">
                                    <Button
                                        variant="primary"
                                        onClick={handleDownloadPDF}
                                        ref={printButtonRef}
                                        style={{
                                            backgroundColor: "#17a2b8",
                                            borderColor: "#17a2b8",
                                        }}
                                    >
                                        Print
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

export default T3SheetDetails;
