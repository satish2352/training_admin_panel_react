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



const Upcomingeventsdetails = () => {
    const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [eventData, setEventData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();





    useEffect(() => {
        fetchEventdata();
    }, [currentPage]);


    useEffect(() => {
        handleSearch("");
    }, [currentPage]);


    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        setForceUpdate((prev) => prev + 1);
    }, [eventData, filteredData]);


    useEffect(() => {
        fetchEventdata();
    }, []);


    const fetchEventdata = async () => {
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const response = await axios.get(`${BASE_URL}/get_event_upcoming`);

            console.log("API Response:", response.data);

            if (Array.isArray(response.data)) {
                setEventData(response.data);
            } else {
                console.error("Unexpected API response structure:", response.data);
                toast.error("Failed to fetch events data");
            }
        } catch (err) {
            console.error("Error fetching events data:", err);
            toast.error("Error fetching events data. Please check the console.");
        } finally {
            setLoading(false);
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
                                    await instance.delete(`delete_event_upcoming/${id}`, {
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    toast.success("Data Deleted Successfully");

                                    // Update state directly after deletion
                                    setEventData((prevCourses) => prevCourses.filter(course => course.id !== id));

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





    const handleUpcomingEvent = () => {
        navigate("/add-upcoming-events");
    };




    const tableColumns = (currentPage, rowsPerPage) => [
        {
            name: "Sr. No.",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
        },

        {
            name: "Image",
            cell: (row) =>
                row.image ? (
                    <img
                        src={row.image}
                        alt="Course"
                        style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
                    />
                ) : (
                    "No Image"
                ),
        }, {
            name: "Status",
            selector: (row) => (row.is_active ? "Active" : "Inactive"),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex">
                    <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
                        <Button className="ms-1" onClick={() => navigate(`/update-upcoming-events/${row.id}`, { state: row })}>
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
                                <Col className="d-flex align-items-center">
                                    <h5>Upcoming Event <span className="highlight"> List</span> </h5>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-end">
                                    <Button variant="primary" onClick={handleUpcomingEvent}>
                                        <FaPlus /> Add Upcoming Events
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <DataTable
                                key={forceUpdate}
                                columns={tableColumns(currentPage, rowsPerPage)}
                                data={searchQuery ? filteredData : eventData}
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


        </Container>
    );
};

export default Upcomingeventsdetails;
