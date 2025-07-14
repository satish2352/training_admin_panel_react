import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEye, FaPrint, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";

const ViewInternJoining = () => {
  const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   const accessToken = localStorage.getItem("remember_token");
  //   try {
  //     const response = await instance.get("get-intern-personal-info", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     // Sort products by ID (assuming higher ID means newer record)
  //     const sortedProducts = response.data.sort((a, b) => b.id - a.id);

  //     setProducts(sortedProducts);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };
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
      const response = await instance.get("get-intern-personal-info", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const sortedProducts = response.data.sort((a, b) => b.id - a.id);

      setProducts(sortedProducts);
      setData(sortedProducts); // Update the SearchExportContext data
    } catch (error) {
      console.error("Error fetching products:", error);
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
                  await instance.delete(`intern-personal-info/delete/${id}`, {
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


  //   const handlePrint = (id) => {
  //   const printUrl = `/intern-details/${id}`;
  //   const printWindow = window.open(printUrl, "_blank");
  //   printWindow.onload = () => {
  //     printWindow.focus();
  //     printWindow.print();
  //   };
  // };


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
    {
      name: "Email Id",
      cell: (row) => row.email,
      width:"250px",
    },
    {
      name: "Contact Details",
      cell: (row) => row.contact_details,
    },
    {
      name: "Whatsapp No.",
      cell: (row) => row.whatsappno,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="d-flex">
            <OverlayTrigger placement="top" overlay={<Tooltip id="view-tooltip">View</Tooltip>}>
              <Button className="ms-1" variant="secondary" onClick={() => navigate(`/intern-details/${row.id}`, { state: row })}>
                <FaEye />
              </Button>
            </OverlayTrigger>
         
            <OverlayTrigger placement="top" overlay={<Tooltip id="view-tooltip">Edit</Tooltip>}>
              <Button className="ms-1" onClick={() =>
                navigate(`/update-intern-personal-details/${row.id}`, { state: row })}>
                <FaEdit />
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
        );
      },
    }

  ];

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col className="d-flex align-items-center">
                  <h5>New Interns Details</h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    onClick={() => navigate('/PersonalDetailsPage')}
                  >
                    <FaPlus /> Add New Intern
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

export default ViewInternJoining;
