import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEye, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Mentordetails = () => {
  const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [mentorData, setmentorData] = useState([]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentordata();
  }, [currentPage]); // Fetch data when page changes

  useEffect(() => {
    handleSearch(""); // Reset search when page changes
  }, [currentPage]);


  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [mentorData, filteredData]);





  // Fetch Alumni Data
  const fetchMentordata = async () => {
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

      const response = await axios.get(`${BASE_URL}/get_all_mentors`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach token
          "Content-Type": "application/json"
        }
      });

      console.log("API Response:", response.data); // Debugging log
      const sortedData = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setmentorData(sortedData); // Set sorted data
      setData(sortedData); // Update the SearchExportContext data

      if (response.data?.status === "Success") {
        setmentorData(response.data.data);
      } else {
        console.error("Unexpected API response structure:", response.data);
        toast.error("Failed to fetch mentors data");
      }
    } catch (err) {
      console.error("Error fetching mentors data:", err);
      toast.error("Error fetching mentors data. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentordata();
  }, []);


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
                  await instance.delete(`delete_mentor/${id}`, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                  });
                  toast.success("Data Deleted Successfully");

                  // Update state directly after deletion
                  setmentorData((prevCourses) => prevCourses.filter(course => course.id !== id));

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





  const handleAddMentor = () => {
    navigate("/addmentor");
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
    },
    // {
    //     name: "Course Name",
    //     selector: (row) => row.subcourse_details || "N/A",
    //   },
    {
      name: "Name",
      selector: (row) => row.name || "N/A",
    },
    {
      name: "Designation",
      selector: (row) => row.designation || "N/A",
    },
    {
      name: "Company",
      selector: (row) => row.company || "N/A",
    },
    {
      name: "Experience",
      selector: (row) => row.experience || "N/A",
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
            <Button className="ms-1" onClick={() => navigate(`/update-mentor/${row.id}`, { state: row })}>
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
                  <h5>Mentor <span className="highlight"> List</span></h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleAddMentor}>
                    <FaPlus /> Add Mentor
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <DataTable
                key={forceUpdate}
                columns={tableColumns(currentPage, rowsPerPage)}
                data={searchQuery ? filteredData : mentorData}
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

export default Mentordetails;
