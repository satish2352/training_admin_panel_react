import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Image, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from "../../assets/images/L1.png";
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!newPassword.trim()) {
      errors.newPassword = "New password is required";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://api.sumagotraining.in/public/api/reset-password",
          { email, newPassword },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          toast.success("Password reset successful. Please log in.");
          navigate("/login");
        } else {
          const errorMessage = response.data.message || "Password reset failed";
          toast.error(errorMessage);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            toast.error("Invalid request. Please check your input.");
          } else if (status === 404) {
            toast.error("User not found.");
          } else {
            toast.error("An error occurred. Please try again.");
          }
        } else {
          console.error("Error handling form submission:", error);
          toast.error("Unexpected error. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100  bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-4 p-md-5 bg-white">
              <Row className="align-items-center mb-4">
                <Col xs={12} className="text-center mb-3">
                  <Image src={logo} alt="Logo" fluid style={{ maxWidth: "150px", width: "100%" }} />
                </Col>
                <Col xs={12}>
                  <h3 className="text-center text-primary font-weight-bold">Forgot Password</h3>
                </Col>
              </Row>

              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#007bff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <FaUser className="me-2 text-secondary" />
                      Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-light border-0 shadow-sm rounded-pill px-3"
                    />
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="formBasicNewPassword" className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <FaLock className="me-2 text-secondary" />
                      New Password
                    </Form.Label>
                    <InputGroup className="bg-light border-0 shadow-sm rounded-pill">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="border-0 px-3 rounded-pill"
                      />
                      <InputGroup.Text
                        className="bg-light border-0 rounded-pill"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.newPassword && (
                      <span className="text-danger">{errors.newPassword}</span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="formBasicConfirmPassword" className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <FaLock className="me-2 text-secondary" />
                      Confirm Password
                    </Form.Label>
                    <InputGroup className="bg-light border-0 shadow-sm rounded-pill">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border-0 px-3 rounded-pill"
                      />
                      <InputGroup.Text
                        className="bg-light border-0 rounded-pill"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.confirmPassword && (
                      <span className="text-danger">{errors.confirmPassword}</span>
                    )}
                  </Form.Group>

                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <Button
                        type="submit"
                        className="mt-4 py-2 px-5 rounded-pill shadow-lg clr"
                        style={{ border: "none" }}
                        disabled={loading}
                      >
                        Reset Password
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
