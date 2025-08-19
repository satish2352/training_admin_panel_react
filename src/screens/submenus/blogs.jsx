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



const Blogs = () => {
  const { searchQuery, handleSearch, filteredData, setData } = useSearchExport();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [blogsData, setBlogsData] = useState([]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchnewsData();
  }, [currentPage]); // Fetch data when page changes

  useEffect(() => {
    handleSearch(""); // Reset search when page changes
  }, [currentPage]);


  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [blogsData, filteredData]);




  useEffect(() => {
    fetchnewsData();
  }, []);


  const fetchnewsData = async () => {
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

      const response = await axios.post(`${BASE_URL}/get-blog-list`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach token
          "Content-Type": "application/json"
        }
      });
      const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setBlogsData(sortedData); // Set sorted data
      setData(sortedData); // Update the SearchExportContext data

      if (response.data?.status === "Success") {
        setBlogsData(response.data.data);
      } else {
      }
    } catch (err) {
      if (err.response.status == 401) {
        navigate("/")
      }
      console.error("Error fetching blog data:", err);
      toast.error("Error fetching blog data. Please check the console.");
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
                  await instance.post(`delete-blog-details`, { id: id }, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                  });
                  toast.success("Data Deleted Successfully");

                  // Update state directly after deletion
                  setBlogsData((prevCourses) => prevCourses.filter(course => course.id !== id));

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





  const handleAddNewsdetails = () => {
    navigate("/addblogs");
  };



  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: "Sr. No.",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },
    {
      name: "Title",
      selector: (row) => (row.title),
    },

    {
      name: "Image",
      cell: (row) => {

        return row.images ? ( // also corrected "row.image" to "row.images" for consistency
          <img
            src={row.images}
            alt="Course"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          "No Image"
        );
      },
    },
    {
      name: "Description",
      cell: (row) => {
        const [expanded, setExpanded] = React.useState(false);

        // Get raw text (without HTML tags) to count words
        const plainText = row.description?.replace(/<[^>]+>/g, "") || "";
        const words = plainText.split(/\s+/);
        const isLong = words.length > 200;

        // Create truncated HTML version
        const truncatedHTML = (() => {
          if (expanded || !isLong) return row.description;
          // Get first 50 words, then append ...
          const shortText = words.slice(0, 50).join(" ") + "...";
          return `<p>${shortText}</p>`;
        })();

        return (
          <div style={{ whiteSpace: "normal", wordBreak: "break-word", maxWidth: "250px" }}>
            <div
              dangerouslySetInnerHTML={{ __html: truncatedHTML }}
            />
            {isLong && (
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  marginLeft: "5px",
                  textDecoration: "underline",
                }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "Show More"}
              </span>
            )}
          </div>
        );
      },
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
            <Button className="ms-1" onClick={() => navigate(`/update-blog-details/${row.title}`, { state: row })}>
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
                  <h5>Blogs<span className="highlight"> List</span></h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleAddNewsdetails}>
                    <FaPlus /> Add Blog Details
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <DataTable
                key={forceUpdate}
                columns={tableColumns(currentPage, rowsPerPage)}
                data={searchQuery ? filteredData : blogsData}
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

export default Blogs;
