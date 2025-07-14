import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEye, FaPrint, FaTrash } from "react-icons/fa";
import { FaDownLong } from "react-icons/fa6";
import * as XLSX from 'xlsx';

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate, useLocation } from "react-router-dom";

const ViewJoining = () => {
  const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const technologyFilter = queryParams.get("technology");




  useEffect(() => {
    handleSearch(""); // Reset search when page changes
  }, [currentPage]);
  

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); // Fetch data when page changes
  

  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [products, filteredData]);

  const fetchProducts = async () => {
  setLoading(true);
  const accessToken = localStorage.getItem("remember_token");
  try {
    const response = await instance.get("get-intern-joining", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    let sortedProducts = response.data.sort((a, b) => b.id - a.id);

    // Apply filtering if technologyFilter is present
    if (technologyFilter) {
      sortedProducts = sortedProducts.filter(product => product.technology_name === technologyFilter);
    }

    setProducts(sortedProducts);
    setData(sortedProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
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
                  await instance.delete(`intern-joining/delete/${id}`, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                  });
                  toast.success("Data Deleted Successfully");
                  fetchProducts();
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

  // const handlePrint = (id) => {
  //   const printUrl = `/intern-details/${id}`;
  //   const printWindow = window.open(printUrl, "_blank");
  //   printWindow.onload = () => {
  //     printWindow.focus();
  //     printWindow.print();
  //   };
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Formats as dd/mm/yyyy
  };

  const exportExcel = () => {
    // Format date fields before exporting
    const formattedProducts = products.map((product) => ({
      ...product,
      date_of_joining: formatDate(product.date_of_joining),
      dob: formatDate(product.dob),
      aadhar: `'${product.aadhar}'`, // Ensure Aadhaar number is exported as text
    }));



    const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "View Joining");
    XLSX.writeFile(workbook, "View-Joining.xlsx");
  };



  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: "Sr. No.",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },
    {
      name: "Full Name",
      cell: (row) => `${row.fname} ${row.mname} ${row.fathername} ${row.lname}`,
      width:"250px",

    },
    // {
    //   name: "Email Id",
    //   cell: (row) => row.email,
    // },
    {
      name: "Contact Details",
      cell: (row) => row.contact_details,
    },
    {
      name: "Whatsapp No.",
      cell: (row) => row.whatsappno,
    },

    {
      name: "Technology",
      cell: (row) => row.technology_name,
      sortable: true,
      sortFunction: (a, b) => a.technology_name.localeCompare(b.technology_name),
      width:"190px",

    },

    {
      name: "Date of Joining",
      selector: (row) => new Date(row.date_of_joining),
      cell: (row) => formatDate(row.date_of_joining),
      sortable: true,
    },


    {
      name: "Training Mode",
      cell: (row) => row.training_mode,
      sortable: true,
      sortFunction: (a, b) => a.training_mode.localeCompare(b.training_mode),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip id="view-tooltip">View</Tooltip>}>
            <Button className="ms-1" variant="secondary" onClick={() => navigate(`/all-intern-details/${row.id}`)}>
              <FaEye />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}>
            <Button
              className="ms-1"
              style={{ backgroundColor: "red", color: "white", borderColor: "red" }}
              onClick={() => handleDelete(row.id)}
            >
              <FaTrash />
            </Button>
          </OverlayTrigger>
          {/* <OverlayTrigger placement="top" overlay={<Tooltip id="print-tooltip">Print</Tooltip>}>
            <Button
              className="ms-1"
              style={{ backgroundColor: "blue", color: "white", borderColor: "blue" }}
              onClick={() => handlePrint(row.id)}
            >
              <FaPrint />
            </Button>
          </OverlayTrigger> */}
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
                  <h5>Internship Details</h5>
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
  data={searchQuery ? filteredData : products} // Use filtered data only when searching
  pagination
  paginationServer
  paginationTotalRows={products.length}
  onChangePage={(page) => {
    setCurrentPage(page);
    handleSearch(""); // Reset search when changing pages
  }}
  responsive
  striped
  noDataComponent="No Data Available"
/>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewJoining;