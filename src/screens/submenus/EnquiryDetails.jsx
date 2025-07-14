import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEye, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from 'xlsx';


const Enquirydetails = () => {
    const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [enquiryData, setenquiryData] = useState([]);
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();





    useEffect(() => {
        fetchenquiryData();
    }, [currentPage]); // Fetch data when page changes

    useEffect(() => {
        handleSearch(""); // Reset search when page changes
    }, [currentPage]);


    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        setForceUpdate((prev) => prev + 1);
    }, [enquiryData, filteredData]);




    const fetchenquiryData = async () => {
        setLoading(true);
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token"); // Retrieve token

            if (!accessToken) {
                console.error("No access token found in localStorage.");
                toast.error("Unauthorized: No token available.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${BASE_URL}/get_counselling`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Attach token
                    "Content-Type": "application/json"
                }
            });
            const sortedData = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setenquiryData(sortedData); // Set sorted data
            setData(sortedData); // Update the SearchExportContext data
            console.log("API Response:", response.data); // Debugging log

            if (response.data?.status === "Success") {
                setenquiryData(response.data.data);
            } else {
                console.error("Unexpected API response structure:", response.data);
                toast.error("Failed to fetch enquiry data");
            }
        } catch (err) {
            console.error("Error fetching enquiry data:", err);
            toast.error("Error fetching enquiry data. Please check the console.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchenquiryData();
    }, []);






    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Formats as dd/mm/yyyy
    };

    const exportExcel = () => {
        // Sort data by created_at in descending order (latest first)
        const sortedData = [...enquiryData].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        // Format date fields before exporting
        const formattedProducts = sortedData.map((enquiry) => ({
            ...enquiry,
            created_at: formatDate(enquiry.created_at),
            updated_at: formatDate(enquiry.updated_at),
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiry Data");
        XLSX.writeFile(workbook, "enquiry_details.xlsx");
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
                                    await instance.delete(`delete_course/${id}`, {
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    toast.success("Data Deleted Successfully");

                                    // Update state directly after deletion
                                    setCourses((prevCourses) => prevCourses.filter(course => course.id !== id));

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


    const tableColumns = (currentPage, rowsPerPage) => [
        {
            name: "Sr. No.",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
        },
        {
            name: "Full Name",
            selector: (row) => row.fullname || "N/A",
            width: "200px",
        },
        {
            name: "Email",
            selector: (row) => row.email || "N/A",
            width: "250px",

        },
        {
            name: "Contact",
            selector: (row) => row.contact || "N/A",
            width: "150px",

        },
        {
            name: "Course",
            selector: (row) => row.course || "N/A",
            width: "250px",

        },
        {
            name: "Duration",
            selector: (row) => row.duration || "N/A",
            width: "100px",

        },
        {
            name: "Date",
            selector: (row) => new Date(row.created_at), // Ensures sorting works with dates
            cell: (row) => {
                const dateObj = new Date(row.created_at);
                const date = dateObj.toLocaleDateString("en-GB");
                const time = dateObj.toLocaleTimeString("en-GB", { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
                return `${date} ${time}`;
            },
            sortable: true, // Enables sorting
            width: "200px",
        },

        {
            name: "Status",
            selector: (row) => (row.is_active ? "Active" : "Inactive"),
            width: "100px",

        },
        // {
        //   name: "Actions",
        //   cell: (row) => (
        //     <div className="d-flex">
        //       <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
        //         <Button className="ms-1" onClick={() => navigate(`/update-course/${row.id}`, { state: row })}>
        //           <FaEdit />
        //         </Button>
        //       </OverlayTrigger>
        //       <OverlayTrigger placement="top" overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}>
        //         <Button className="ms-1" style={{ backgroundColor: "red", color: "white", borderColor: "red" }}
        //           onClick={() => handleDelete(row.id)}
        //         >
        //           <FaTrash />
        //         </Button>
        //       </OverlayTrigger>
        //     </div>
        //   ),
        // },
    ];


    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col className="d-flex align-items-center">
                                    <h5>Enquiry <span className="highlight"> Data</span></h5>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-end">
                                    <Button variant="primary" onClick={exportExcel}>
                                        <FaDownload /> Export to Excel
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <DataTable
                                key={forceUpdate}
                                columns={tableColumns(currentPage, rowsPerPage)}
                                data={searchQuery ? filteredData : enquiryData}
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

export default Enquirydetails;
