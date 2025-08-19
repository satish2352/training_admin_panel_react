import React, { useState, useEffect } from "react";
import "./InterJoining.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TrainingDuration() {
  const navigate = useNavigate();
  const location = useLocation();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [id, setId] = useState(null);
  const [errors, setErrors] = useState({});
  const [first_name, setfname] = useState("");
  const [loading, setLoading] = useState(false);


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;


    if (!fromDate) {
      newErrors.fromDate = "Please select From Date";
      isValid = false;
    }

    if (!toDate) {
      newErrors.toDate = "Please select To Date";
      isValid = false;
    }

    if (fromDate && toDate && fromDate > toDate) {
      newErrors.fromDate = "From Date cannot be after To Date";
      newErrors.toDate = "To Date cannot be before From Date";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    if (location?.state?.duration) {
      console.log("location?.state?", location?.state.id);
      const [fromStr, toStr] = location.state.duration.split(" to ");

      const fromDates = new Date(fromStr.split("/").reverse().join("-")).toString();
      const toDates = new Date(toStr.split("/").reverse().join("-")).toString();
      const id = location.state.id

      setFromDate(fromDates);
      setToDate(toDates);
      setId(id)
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("fromDatefromDatefromDate", fromDate);
    const from_date = fromDate.toLocaleDateString("en-GB")
    const to_date = toDate.toLocaleDateString("en-GB")
    const duration = `${from_date} to ${to_date}`

    const newData = {
      duration: duration
    };
    try {
      const response = await instance.post("add-duration-details", newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("remember_token")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Data submitted successfully!");
      navigate("/training-duration-list");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("fromDate", fromDate);
    const from_date = new Date(fromDate).toLocaleDateString("en-GB");
    const to_date = new Date(toDate).toLocaleDateString("en-GB");
    const duration = `${from_date} to ${to_date}`

    const newData = {
      id: id,
      duration: duration
    };
    try {
      const response = await instance.post("update-duration-details", newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("remember_token")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Data updated successfully!");
      navigate("/training-duration-list");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container backimg vh-100">
      <img src={corner} className="corner_img" alt="corner" />
      <div className="logo-container d-flex justify-content-center align-items-center my-3">
        <img src={logo1} className="img-fluid logo1 me-3" alt="Logo 1" />
        <img src={logo2} className="img-fluid logo2" alt="Logo 2" />
      </div>

      <Form onSubmit={location?.state ? handleUpdate : handleSubmit}>
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="p-4 shadow-lg border-0" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "15px" }}>
                <Card.Header className="text-center mb-4 border-0 bg-transparent">
                  <h4 style={{ color: "black", fontWeight: "bold" }}>Training Duration</h4>
                </Card.Header>

                <Card.Body>
                  <Row className="mb-3 justify-content-center">
                    <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
                      <strong className="text-black">
                        From Date <span className="text-danger">*</span>
                      </strong>
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                      <Form.Group>
                        <DatePicker
                          selected={fromDate}
                          onChange={(date) => setFromDate(date)}
                          maxDate={toDate || null}
                          dateFormat="dd/MM/yyyy"
                          className="form-control FormStyeling transparent-input"
                          placeholderText="Select From Date"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </Form.Group>
                      {errors.fromDate && (
                        <span className="text-danger">{errors.fromDate}</span>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3 justify-content-center">
                    <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
                      <strong className="text-black">
                        To Date <span className="text-danger">*</span>
                      </strong>
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                      <Form.Group>
                        <DatePicker
                          selected={toDate}
                          onChange={(date) => setToDate(date)}
                          minDate={fromDate || null}
                          dateFormat="dd/MM/yyyy"
                          className="form-control FormStyeling transparent-input"
                          placeholderText="Select To Date"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </Form.Group>
                      {errors.toDate && (
                        <span className="text-danger">{errors.toDate}</span>
                      )}
                    </Col>
                  </Row>

                  {location?.state?.action !== "view" && (
                    <div className="text-center mt-4">
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ backgroundColor: "#c35050", borderColor: "#c35050" }}
                        disabled={loading}
                      >
                        {location?.state ? "Update" : "Submit"}
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}

export default TrainingDuration;
