import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEye, FaPlus, FaEdit } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { confirmAlert } from "react-confirm-alert";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";

const ImplantRegistration = () => {
  const { searchQuery, handleSearch } = useSearchExport();
  const [studData, setStudData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page when search query changes
  }, [searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await instance.post(
        "get-certificate-list",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const ViewById = (rowData, action) => {
    navigate("/registration", { state: { ...rowData, action } });
  };

  const EditById = (rowData, action) => {
    navigate("/registration", { state: { ...rowData, action } });
  };

  const generateStaticCertificate = async (rowData) => {
    const input = document.getElementById("certificate-preview");
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
    pdf.save(
      `${rowData?.certificate_no}_${rowData?.first_name} ${rowData?.father_name} ${rowData?.surname}`
    );
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-primary"
              onClick={async () => {
                setLoading(true);
                const accessToken = localStorage.getItem("remember_token");
                try {
                  await instance.delete(
                    `intern-personal-info/delete/${id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  toast.success("Data Deleted Successfully");
                  fetchData();
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

  // 🔍 Filter data based on search query
  const filteredData = studData.reverse().filter((row) => {
    const fullName = `${row.first_name} ${row.father_name} ${row.surname}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    return (
      row.batch_no?.toLowerCase().includes(searchLower) ||
      fullName.includes(searchLower) ||
      row.mobile_no?.toLowerCase().includes(searchLower) ||
      row.certificate_no?.toLowerCase().includes(searchLower) ||
      row.duration?.toLowerCase().includes(searchLower) ||
      row.training_mode?.toLowerCase().includes(searchLower) ||
      row.training_location?.toLowerCase().includes(searchLower) ||
      row.college_name?.toLowerCase().includes(searchLower) ||
      row.technology_name?.toLowerCase().includes(searchLower) ||
      row.timestamp?.toLowerCase().includes(searchLower)
    );
  });

  // 📄 Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: "Sr. No.",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      width: "80px",
    },
    {
      name: "Batch No.",
      cell: (row) => row.batch_no,
    },
    {
      name: "Student Name",
      cell: (row) =>
        `${row.first_name} ${row.father_name} ${row.surname}`,
      width: "230px",
    },
    {
      name: "Contact No.",
      cell: (row) => row.mobile_no,
    },
    {
      name: "Certificate No.",
      cell: (row) => row.certificate_no,
    },
    {
      name: "Duration",
      cell: (row) => row.duration,
    },
    {
      name: "Training Mode",
      cell: (row) => row.training_mode,
    },
    {
      name: "Location",
      cell: (row) => row.training_location,
    },
    {
      name: "College",
      cell: (row) => row.college_name,
    },
    {
      name: "Technology",
      cell: (row) => row.technology_name,
    },
    {
      name: "Registration Date",
      cell: (row) => row.timestamp,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <Button
              className="ms-1"
              variant="success"
              onClick={() => ViewById(row, "view")}
            >
              <FaEye />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <Button
              className="ms-1"
              variant="primary"
              onClick={() => EditById(row, "edit")}
            >
              <FaEdit />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Download Certificate</Tooltip>}
          >
            <Button
              className="ms-1"
              variant="danger"
              onClick={() => {
                setSelectedData(row);
                setTimeout(() => generateStaticCertificate(row), 100);
              }}
            >
              <IoMdDownload />
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
                  <h5>Implant Student List</h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    showExportButton={false}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    onClick={() => navigate("/registration")}
                  >
                    <FaPlus /> Add New Student
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={tableColumns(currentPage, rowsPerPage)}
                data={paginatedData}
                pagination
                paginationServer
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={(newPerPage, page) => {
                  setRowsPerPage(newPerPage);
                  setCurrentPage(1);
                }}
                paginationPerPage={rowsPerPage}
                paginationTotalRows={filteredData.length}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                responsive
                striped
                noDataComponent="No Data Available"
                progressPending={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Hidden Certificate Preview */}
      {selectedData && (
        <div
          id="certificate-preview"
          style={{
            width: "1123px",
            height: "794px",
            position: "absolute",
            left: "-9999px",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            backgroundImage: "url('/certificate/certificate.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "340px",
              width: "100%",
              textAlign: "center",
              color: "#e40026",
              fontSize: "66px",
              fontFamily: "'Italianno', cursive",
              fontWeight: "500",
              letterSpacing: "1px",
            }}
          >
            {`${selectedData.first_name} ${selectedData.father_name} ${selectedData.surname}`}
          </div>
          <div
            style={{
              position: "absolute",
              fontFamily: "AdobeDevanagariBold",
              left: "160px",
              bottom: "142px",
              fontSize: "16px",
              color: "#000",
              fontWeight: "700",
            }}
          >
            {selectedData.duration}
          </div>
          <div
            style={{
              position: "absolute",
              fontFamily: "AdobeDevanagariBold",
              left: "220px",
              bottom: "108px",
              fontSize: "16px",
              color: "#000",
              fontWeight: "700",
            }}
          >
            {selectedData.certificate_no}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "290px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "AdobeDevanagariBold",
              fontSize: "30px",
              color: "#000000",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            “ {selectedData.technology_name} ”
          </div>
        </div>
      )}
    </Container>
  );
};

export default ImplantRegistration;
