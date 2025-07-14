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



const Coursedetails = () => {
  const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [currentPage]); // Fetch data when page changes

  useEffect(() => {
    handleSearch(""); // Reset search when page changes
  }, [currentPage]);


  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [courses, filteredData]);




  useEffect(() => {
    fetchCourses();
  }, []);
  

  const BASE_URL = "https://api.sumagotraining.in/public/api";
  const fetchCourses = async () => {
    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await axios.get(`${BASE_URL}/get_course`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });


      const coursesData = Array.isArray(response.data?.data) ? response.data.data : [];

      // Sorting the data in descending order based on created_at
      const sortedData = coursesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setCourses(sortedData);
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

  // Function to convert image to Base64
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };



  const handleAddCourse = () => {
   navigate("/addcourse");
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("remember_token");
  //   if (!token) {
  //     toast.error("Unauthorized: Token missing. Please log in again.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("image", image);


  //   try {
  //     const response = await fetch(
  //       "https://api.sumagotraining.in/public/api/add_course",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //         mode: "cors",
  //       }
  //     );


  //     if (response.status === 401) {
  //       toast.error("Unauthorized: Token may be invalid or expired.");
  //       return;
  //     }

  //     if (response.ok) {
  //       toast.success("Course added successfully!");
  //       fetchCourses(); //  Refresh course list
  //       navigate("/addcourse");
  //     }
  //     else {
  //       toast.error(`Submission failed`);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error("An error occurred. Please try again.");
  //   }
  // };


  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: "Sr. No.",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name || "N/A",
    },
    {
      name: "Course image",
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
    {
      name: "Status",
      selector: (row) => (row.is_active ? "Active" : "Inactive"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
            <Button className="ms-1" onClick={() => navigate(`/update-course/${row.id}`, { state: row })}>
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
                  <h5>Course <span className="highlight"> List</span></h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleAddCourse}>
                    <FaPlus /> Add New Course
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
            <DataTable
                                key={forceUpdate}
                                columns={tableColumns(currentPage, rowsPerPage)}
                                data={searchQuery ? filteredData : courses}
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

export default Coursedetails;
