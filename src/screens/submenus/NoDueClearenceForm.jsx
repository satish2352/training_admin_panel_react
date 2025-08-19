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

const NoDueClearenceForm = () => {
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
        department = "Training",
        completition_date = "",
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
                        <b className="title-text">No Due Clearence Form</b>
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
                                    <Col lg={12} md={12} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Name of Candidate:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${fname} ${mname} ${fathername} ${lname}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>


                                </Row>

                                <Row className="mt-2">
                                    {/* Technology Name */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Technology Name:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${technology_name}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Department:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${department}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>

                                </Row>
                                <Row className="mt-2">
                                    {/* Technology Name */}
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Date of Joining:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${date_of_joining}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>
                                    <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Date of Completition:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${completition_date}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col>

                                </Row>

                                <Row className="mt-2">

                                    {/* Qualification */}
                                    {/* <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Qualification:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={post_graduation_details || graduation_details}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col> */}
                                    {/* Date of Joining */}
                                    {/* <Col lg={6} md={6} sm={12} className="d-flex align-items-center flex-nowrap">
                                        <b className="label-colour me-3" style={{ width: "180px", fontSize: "18px" }}>Date of Joining:</b>
                                        <Form.Control
                                            type="text"
                                            className="FormStyeling transparent-input"
                                            value={`${date_of_joining}`}
                                            style={{ width: "50%", fontSize: "18px" }}
                                        />
                                    </Col> */}

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
                                <p className="text-black mt-3 px-4" style={{fontSize:"18px", fontWeight:"400"}}>*Please obtain all the signature and forward the form to the HR Department</p>


                                <div className="container mt-4">
                                    <Table responsive className="text-center fs-5 m-0 rounded custom-table">
                                        <thead className="table-danger">
                                            <tr>
                                                <th className="w-25">Department</th>
                                                <th className="w-25">Particulars</th>
                                                <th className="w-10">Yes</th>
                                                <th className="w-10">No</th>
                                                <th className="w-20">Remark</th>
                                                <th className="w-20">Sign</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {/* Project Status Section */}
                                            <tr>
                                                <td rowSpan={3} className="align-middle py-2">Project Status</td>
                                                <td className="text-start px-4">1. Live Project</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start px-4">2. Project KT</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start py-4 px-4">
                                                    3. Hand Over
                                                </td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>


                                            {/* Hardware Section */}
                                            <tr>
                                                <td rowSpan={4} className="align-middle py-2">Hardware Department</td>
                                                <td className="text-start px-4">1. System</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start px-4">2. Mouse</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start px-4">3. Charger</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start px-4">4. Dongle</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {/* Accounts Section */}
                                            <tr>
                                                <td rowSpan={2} className="align-middle py-2">Accounts/ Commercials</td>
                                                <td className="text-start px-4">1. Fees Paid</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start py-3 px-4">2. Any Due Amount</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>


                                            <tr>
                                                <td rowSpan={4} className="align-middle py-2">Employed Company</td>
                                                <td className="text-start px-4">1. Company Name</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start px-4">2. Position</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start px-4">3. Package</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-start px-4">4. Interest in Sumago for recruitment</td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td><Form.Check type="checkbox" /></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                    <Table>
                                        <tbody className="card border-1 rounded-0 text-start p-3  border-top-0" style={{ height: "25vh", border: "1px solid black" }}>
                                            <label htmlFor="">Review:</label>
                                        </tbody>
                                        <tbody className="card border-1 border-top-0 rounded-0 text-start p-3 " style={{ height: "10vh", border: "1px solid black" }}>
                                            <label htmlFor="">I, Mr/Mrs/Ms _____________________________________________________________ confirm that there are no dues pending from Sumago Infotech Pvt. Ltd.</label>
                                        </tbody>
                                    </Table>
                                </div>

                                <Row className="justify-content-center mb-3">
                                    <Col lg={4} className="text-center mt-5 pt-5">
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="d-none d-md-block label-colour"
                                        >
                                            Signature of Student
                                        </b>
                                    </Col>
                                    <Col lg={4} className="text-center mt-5 pt-5">
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="d-none d-md-block label-colour"
                                        >
                                            Signature of L & D Head
                                        </b>
                                    </Col>
                                    <Col lg={4} className="text-center mt-5 pt-5">
                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="d-none d-md-block label-colour"
                                        >
                                            Signature of CEO
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

export default NoDueClearenceForm;
