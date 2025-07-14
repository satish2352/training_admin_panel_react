import React, { useState, useEffect } from "react";
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


const Subsubcoursedetails = () => {
  const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const [subcoursedetails, setSubcoursedetails] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subCourses, setSubCourses] = useState([]);
  const [coursename, setCoursename] = useState("");
  const [subcourses_name, setSubcourses_name] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [custome_text, setcustome_text] = useState("");
  const [banner, setBanner] = useState(null);
  const [back_image, setBack_image] = useState(null);





  useEffect(() => {
    fetchSubcoursedetails();
  }, [currentPage]); // Fetch data when page changes

  useEffect(() => {
    handleSearch(""); // Reset search when page changes
  }, [currentPage]);


  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [subcoursedetails, filteredData]);











  const navigate = useNavigate();

  useEffect(() => {
    fetchSubcoursedetails();

  }, []);


  const BASE_URL = "https://api.sumagotraining.in/public/api";







  const fetchSubcoursedetails = async () => {
    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await axios.get(`${BASE_URL}/get_subcourse_details_list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Ensure response.data.data is an array
      const coursesData = Array.isArray(response.data?.data) ? response.data.data : [];

      // Sorting the data in descending order based on created_at
      const sortedData = coursesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setSubcoursedetails(sortedData);
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
                  await instance.delete(`delete_subcourse_details/${id}`, {
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



  const handleAddCourse = () => {
    navigate("/addsubsubcourse");
  };

  // const handleClose = () => {
  //   setShowModal(false);
  //   setCoursename("");
  //   setBack_image(null);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("remember_token");
  //   const formData = new FormData();
  //   formData.append("coursename", coursename);
  //   formData.append("subcourses_name", subcourses_name);
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("customtext", custome_text);
  //   formData.append("banner", banner);
  //   formData.append("back_image", back_image);

  //   try {
  //     const response = await fetch(
  //       "https://api.sumagotraining.in/public/api/add_subcourse_details",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       toast.success("Subcourse details added successfully!");
  //       navigate("/addsubsubcourse");
  //     } else {
  //       const responseData = await response.json();
  //       alert(`Submission failed: ${responseData.message || "Unknown error"}`);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: "Sr. No.",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },
    {
      name: "Course name",
      cell: (row) => `${row.courses_name} `,
      sortable: true,
      sortFunction: (a, b) => a.courses_name.localeCompare(b.courses_name),
    },
    {
      name: "Banner image",
      cell: (row) =>
        row.banner ? (
          <img
            src={row.banner}
            alt="Course"
            style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      name: "Subcourse name",
      cell: (row) => `${row.subcourses_name} `,
      sortable: true,
      sortFunction: (a, b) => a.subcourses_name.localeCompare(b.subcourses_name),
    },
    {
      name: "Title",
      cell: (row) => `${row.title} `,
      sortable: true,
      sortFunction: (a, b) => a.title.localeCompare(b.title),
    },
    {
      name: "Description",
      cell: (row) => (
        <span title={row.description}>
          {row.description?.substring(0, 80) || "No description available"}...
        </span>

      ),
    },

    {
      name: "Custom Text",
      cell: (row) => `${row.custome_text} `,
      sortable: true,
      sortFunction: (a, b) => a.custome_text.localeCompare(b.custome_text),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
            <Button className="ms-1" onClick={() => navigate(`/update-subcoursedetails/${row.sub_course_id}`, { state: row })}>
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
                  <h5>Sub-subcourse <span className="highlight"> List</span></h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleAddCourse}>
                    <FaPlus /> Subcourse Details
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <DataTable
                key={forceUpdate}
                columns={tableColumns(currentPage, rowsPerPage)}
                data={searchQuery ? filteredData : subcoursedetails}
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

      {/* Modal for Adding Course */}
      {/* <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subcourse Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Select
                value={coursename}
                onChange={(e) => {
                  const selectedCourse = courses.find((course) => course.name === e.target.value);
                  if (selectedCourse) {
                    setCoursename(selectedCourse.name); 
                  }
                }}
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Subcourse</Form.Label>
              <Form.Select
                value={subcourses_name}
                onChange={(e) => {
                  const selectedSubcourse = subCourses.find((sub) => sub.subcourses_name === e.target.value);
                  if (selectedSubcourse) {
                    setSubcourses_name(selectedSubcourse.subcourses_name);
                  }
                }}
              >
                <option value="">-- Select Subcourse --</option>
                {subCourses.map((sub) => (
                  <option key={sub.subcourses_id} value={sub.subcourses_name}>
                    {sub.subcourses_name} ({sub.coursename})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>



            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Custom Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter custom text"
                value={custome_text}
                onChange={(e) => setcustome_text(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={(e) => setBanner(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={(e) => setBack_image(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default Subsubcoursedetails;
