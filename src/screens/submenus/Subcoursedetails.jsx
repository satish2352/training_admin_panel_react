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



const Subcoursedetails = () => {
  const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [coursename, setCoursename] = useState("");
  const [subcourses_name, setSubcourses_name] = useState("");
  const [image, setImage] = useState(null);
  const [courses, setCourses] = useState([]); // Store courses
  const [Subcourses, setSubcourses] = useState([]);
  const navigate = useNavigate();



  const location = useLocation();
  const [course_id, setCourseId] = useState(location.state?.course_id || "");

  useEffect(() => {
  }, [coursename]);












  useEffect(() => {
    fetchSubcourses();
  }, [currentPage]); // Fetch data when page changes

  useEffect(() => {
    handleSearch(""); // Reset search when page changes
  }, [currentPage]);


  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [Subcourses, filteredData]);







  // Function to convert image to Base64
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };



  useEffect(() => {
    fetchSubcourses();
  }, []);
  const BASE_URL = "https://api.sumagotraining.in/public/api";

  const fetchSubcourses = async () => {
    const accessToken = localStorage.getItem("remember_token");
    try {
      // Fetch subcourses
      const subcourseResponse = await axios.get(`${BASE_URL}/get_all_subcourses`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const subcoursesData = subcourseResponse.data?.data || [];

      // Fetch course fees
      const feesResponse = await axios.get(`${BASE_URL}/get_course_fee_details_list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const feesData = feesResponse.data || [];

      // Merge subcourse details with their corresponding fee details
      // Merge subcourse details with their corresponding fee details
      const mergedData = subcoursesData.map(subcourse => {
        const feeDetail = feesData.find(fee => fee.subcourses_id === subcourse.subcourses_id);
        return {
          ...subcourse,
          sub_course_fee: feeDetail ? feeDetail.sub_course_fee : "N/A",
          sub_course_duration: feeDetail ? feeDetail.sub_course_duration : "N/A",
        };
      });

      // Sort by subcourses_id in descending order
      const sortedData = mergedData.sort((a, b) => b.subcourses_id - a.subcourses_id);

      setSubcourses(sortedData);
      setData(sortedData); // Update the SearchExportContext data


    } catch (err) {
      console.error("Error fetching Subcourse details:", err);
    } finally {
      setLoading(false);
    }
  };


  // const fetchCourses = async () => {
  //   const accessToken = localStorage.getItem("remember_token");
  //   try {
  //     const response = await axios.get(`${BASE_URL}/get_course`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const coursesData = response.data?.data || [];
  //     setCourses(coursesData); // Store fetched courses
  //   } catch (err) {
  //     console.error("Error fetching course details:", err);
  //   }
  // };



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
                  await instance.delete(`delete_subcourse/${id}`, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                  });
                  toast.success("Data Deleted Successfully");

                  // Update state directly after deletion
                  setSubcourses((prevCourses) => prevCourses.filter(course => course.id !== id));

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






  const handleAddSubcourse = () => {
    navigate("/addsubcourse");
  };



  // const handleClose = () => {
  //   setShowModal(false);
  //   setCoursename("");
  //   setSubcourses_name("");
  //   setImage(null);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("remember_token");
  //   if (!token) {
  //     toast.error("User not authenticated. Please log in again.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("course_id", course_id);
  //   formData.append("name", coursename);
  //   formData.append("subcourses_name", subcourses_name);
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await fetch(
  //       "https://api.sumagotraining.in/public/api/add_subcourse",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //         mode: "cors",
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Subcourse added successfully!");

  //       // Update state directly with the new subcourse
  //       const newSubcourse = {
  //         course_id: course_id,
  //         coursename: coursename,
  //         subcourses_name: subcourses_name,
  //         image: image.name,
  //       };

  //       setSubcourses((prevSubcourses) => [...prevSubcourses, newSubcourse]);

  //       // Close the modal
  //       setShowModal(false);
  //     } else {
  //       toast.error(`Error: ${response.data.message || "Unknown error"}`);
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
      name: "Course name",
      cell: (row) => `${row.coursename} `,
      sortable: true,
      sortFunction: (a, b) => a.coursename.localeCompare(b.coursename),
    },
    {
      name: "Subcourse name",
      cell: (row) => `${row.subcourses_name} `,
      sortable: true,
      sortFunction: (a, b) => a.subcourses_name.localeCompare(b.subcourses_name),
    },

    {
      name: "Subcourse image",
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
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
            <Button className="ms-1" onClick={() => navigate(`/update-subcourse/${row.course_id}`, { state: row })}>
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
                  <h5>Subcourse <span className="highlight"> List</span> </h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleAddSubcourse}>
                    <FaPlus /> Add Subcourse
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <DataTable
                key={forceUpdate}
                columns={tableColumns(currentPage, rowsPerPage)}
                data={searchQuery ? filteredData : Subcourses}
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
          <Modal.Title>Add Subcourse</Modal.Title>
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
                    setCoursename(selectedCourse.name); // Set coursename
                    setCourseId(selectedCourse.id); // Set course_id
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
              <Form.Label>Subcourse Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subcourse name"
                value={subcourses_name}
                onChange={(e) => setSubcourses_name(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                type="file"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith("image/")) {
                    try {
                      const base64 = await convertToBase64(file);
                      setImage(base64);
                    } catch (err) {
                      console.error("Base64 Conversion Error:", err);
                    }
                  } else {
                    setErrors("Only image files are allowed.");
                  }
                }}
              />
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

export default Subcoursedetails;
