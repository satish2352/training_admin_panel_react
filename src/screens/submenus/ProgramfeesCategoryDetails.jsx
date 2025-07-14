import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProgramfeesCategoryDetails = () => {
    const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [feescategory, setFeescategory] = useState([]);
    const navigate = useNavigate();

    const BASE_URL = "https://api.sumagotraining.in/public/api";

    useEffect(() => {
        fetchfeescategory();
    }, [currentPage]); // Fetch data when page changes

    useEffect(() => {
        handleSearch(""); // Reset search when page changes
    }, [currentPage]);


    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        setForceUpdate((prev) => prev + 1);
    }, [feescategory, filteredData]);




    useEffect(() => {
        fetchfeescategory();
    }, []);

    const fetchfeescategory = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_feecategory`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const feescategorydata = Array.isArray(response.data?.data) ? response.data.data : [];

            const sortedData = feescategorydata.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            setFeescategory(sortedData);
            setData(sortedData); // Update the SearchExportContext data

        } catch (err) {
            console.error("Error fetching course details:", err);
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
                                    await instance.delete(`delete_feecategory/${id}`, {
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    toast.success("Data Deleted Successfully");

                                    setFeescategory((prev) => prev.filter((course) => course.id !== id)); // ✅ Corrected update
                                } catch (error) {
                                    console.error("Error deleting data:", error);
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

    const handleFeescategory = () => {
        navigate("/addprogramfeescategory");
    };

    // const handleClose = () => {
    //     setShowModal(false);
    //     setTitle(""); 
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const token = localStorage.getItem("remember_token");
    //     if (!token) {
    //         toast.error("Unauthorized: Token missing. Please log in again.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("title", title); // 

    //     try {
    //         const response = await fetch(`${BASE_URL}/add_feecategory`, {
    //             method: "POST",
    //             headers: { Authorization: `Bearer ${token}` },
    //             body: formData,
    //             mode: "cors",
    //         });

    //         if (response.ok) {
    //             toast.success("Program Fees Category added successfully!");
    //             fetchfeescategory(); 
    //             handleClose();
    //         } else {
    //             toast.error("Submission failed");
    //         }
    //     } catch (error) {
    //         console.error("Error submitting form:", error);
    //         toast.error("An error occurred. Please try again.");
    //     }
    // };

    const tableColumns = (currentPage, rowsPerPage) => [
        {
            name: "Sr. No.", selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1
        },

        {
            name: "Program Fees Category Name", selector: (row) => row.title || "N/A"
        },

        {
            name: "Status", selector: (row) => (row.is_active ? "Active" : "Inactive")
        },

        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex">
                    <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
                        <Button className="ms-1" onClick={() => navigate(`/update-feecategory/${row.id}`, { state: row })}>
                            <FaEdit />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}>
                        <Button className="ms-1" style={{ backgroundColor: "red", color: "white", borderColor: "red" }}
                            onClick={() => handleDelete(row.id)}
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
                                <Col><h5>Program Fees<span className="highlight"> Category Details</span></h5></Col>
                                <Col className="d-flex justify-content-end"><SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} /></Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-end">
                                    <Button variant="primary" onClick={handleFeescategory}>
                                        <FaPlus /> Add Program Fees Category
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <DataTable
                                key={forceUpdate}
                                columns={tableColumns(currentPage, rowsPerPage)}
                                data={searchQuery ? filteredData : feescategory}
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

            {/* <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Add Details</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Program Fees Category Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter category name" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal> */}
        </Container>
    );
};

export default ProgramfeesCategoryDetails;
