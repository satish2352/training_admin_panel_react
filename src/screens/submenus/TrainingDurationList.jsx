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

const TrainingDurationList = () => {
  const { searchQuery, handleSearch } = useSearchExport();
  const [durationData, setDurationData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const accessToken = localStorage.getItem("remember_token");
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await instance.post(
        "get-duration-list",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDurationData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const EditById = async (rowData, action) => {
    setLoading(true);
    // localStorage.setItem("timeDurationData", JSON.stringify(rowData))
    // try {
      navigate("/training-duration", { state: rowData });
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // } finally {
    //   setLoading(false);
    // }

  };


  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: "Sr. No.",
      cell: (row, id) => id + 1,
      width: "150px",
      center: true,
    },
    {
      name: "Duration",
      cell: (row) => row.duration,
      width: "500px",
      center: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <Button
              className="ms-1"
              variant="primary"
              onClick={() => EditById(row, "edit")}
            >
              <FaEdit />
            </Button>
          </OverlayTrigger>
        </div>
      ),
      center: true,
      width: "400px"
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
                  <h5>Time Duration List</h5>
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
                    onClick={() => navigate("/training-duration")}
                  >
                    <FaPlus /> Add Time Duration
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={tableColumns()}
                data={durationData}
                responsive
                striped
                noDataComponent="No Data Available"
                progressPending={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrainingDurationList;
