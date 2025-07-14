import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaDownLong } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

const ViewImplanttraining = () => {
    const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

     useEffect(() => {
            fetchProducts();
        }, [currentPage]); // Fetch data when page changes
    

    useEffect(() => {
        handleSearch(""); // Reset search when page changes
    }, [currentPage]);

    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        setForceUpdate((prev) => prev + 1);
    }, [products, filteredData]);


    const fetchProducts = async () => {
        setLoading(true);

        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await instance.get("get_implant_training_data", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            setProducts(sortedData);
            setData(sortedData); // Update the SearchExportContext data

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Formats as dd/mm/yyyy
    };

    const exportExcel = () => {
        const formattedProducts = products.map((product) => ({
            ...product,
            created_at: formatDateTime(product.created_at), // Ensures the "Date" field is exported properly
            updated_at: formatDate(product.updated_at),
            dob: formatDate(product.dob),
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Implant Training Details");
        XLSX.writeFile(workbook, "implant-training-details.xlsx");
    };

    // Helper function to format date & time for Excel export
    const formatDateTime = (dateString) => {
        const dateObj = new Date(dateString);
        const date = dateObj.toLocaleDateString("en-GB");
        const time = dateObj.toLocaleTimeString("en-GB", { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
        return `${date} ${time}`;
    };



    const tableColumns = (currentPage, rowsPerPage) => [
        {
            name: "Sr. No.",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
            width: "100px",
        },
        {
            name: "Student Name",
            cell: (row) => `${row.stud_name}`,
            width: "200px",
        },
        {
            name: "Email Id",
            cell: (row) => row.email,
            width: "250px",
        },
        {
            name: "Contact No.",
            cell: (row) => row.contact,
            width: "150px",
        },
        {
            name: "Whatsapp No.",
            cell: (row) => row.wapp_no,
            width: "150px",
        },
        {
            name: "DOB",
            cell: (row) => new Date(row.dob).toLocaleDateString("en-GB"),
            width: "150px",
        },
        {
            name: "College",
            cell: (row) => row.college,
            width: "250px",
        },
        {
            name: "Branch",
            cell: (row) => row.branch,
            sortable: true,
            sortFunction: (a, b) => a.branch.localeCompare(b.branch),
        },
        {
            name: "Year",
            selector: (row) => row.year,
            sortable: true,
            width: "150px",
            sortFunction: (a, b) => {
                const yearOrder = { "First Year": 1, "Second Year": 2, "Third Year": 3, "Final Year": 4 };
                return yearOrder[a.year] - yearOrder[b.year];
            }
        },
        {
            name: "Technology",
            cell: (row) => row.technology,
            width: "250px",
            sortable: true,
            sortFunction: (a, b) => a.technology.localeCompare(b.technology),
        },
        {
            name: "Location",
            cell: (row) => row.location,
            sortable: true,
            sortFunction: (a, b) => a.location.localeCompare(b.location),
        },
        {
            name: "Mode",
            cell: (row) => row.mode,
            sortable: true,
            sortFunction: (a, b) => a.mode.localeCompare(b.mode),
        },
        {
            name: "Date",
            cell: (row) => {
                const dateObj = new Date(row.created_at);
                const date = dateObj.toLocaleDateString("en-GB");
                const time = dateObj.toLocaleTimeString("en-GB", { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
                return `${date} ${time}`;
            },
            width: "200px",
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
                                    <h5>Implant Training Details</h5>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-end">
                                    <Button
                                        variant="primary"
                                        onClick={exportExcel}
                                    >
                                        <FaDownLong /> Export to Excel
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                        <DataTable
                                key={forceUpdate}
                                columns={tableColumns(currentPage, rowsPerPage)}
                                data={searchQuery ? filteredData : products}
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

export default ViewImplanttraining;