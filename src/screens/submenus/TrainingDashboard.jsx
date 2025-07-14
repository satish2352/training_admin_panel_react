import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FaUsers, FaFileCode, FaUserGraduate , FaClipboardList, FaDatabase , FaFile, FaListAlt  } from "react-icons/fa";
import "../submenus/completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";




// Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const TrainingDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  const fetchDashboardCounts = async () => {
    try {
      const token = localStorage.getItem("remember_token");

      const response = await axios.get(
        "https://api.sumagotraining.in/public/api/get_dashboard_count",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Dashboard Count Data:", response.data);
      setDashboardData(response.data || {});
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };


  

  const summaryCards = [
    {
      label: "Total Courses",
      value: dashboardData.courses?.toString().padStart(2, "0") || "00",
      icon: <FaUsers size={40} className="text-danger" />,
      link: "/coursedetails",
    },
    {
      label: "Total SubCourses",
      value: dashboardData.subcourses?.toString().padStart(2, "0") || "00",
      icon: <FaFileCode size={40} className="text-secondary" />,
      link: "/subcoursedetails",
    },
    {
      label: "Alumni",
      value: dashboardData.alumini?.toString().padStart(2, "0") || "00",
      icon: <FaUserGraduate size={40} className="text-warning-subtle" />,
      link: "/alumnidetails",
    },
    {
      label: "Handson Project",
      value: dashboardData.handsonproject?.toString().padStart(2, "0") || "00",
      icon: <FaDatabase size={40} className="text-primary" />,
      link: "/handsonprojectdetails",

    },
    {
      label: "MOU",
      value: dashboardData.mous?.toString().padStart(2, "0") || "00",
      icon: <FaFile size={40} className="text-danger" />,
      link: "/moudetails",

    },
    {
      label: "Mentor",
      value: dashboardData.mentor?.toString().padStart(2, "0") || "00",
      icon: <FaUsers size={40} className="text-success" />,
      link: "/mentordetails",

    },
    {
      label: "Expert Review",
      value: dashboardData.expertreview?.toString().padStart(2, "0") || "00",
      icon: <FaClipboardList size={40} className="text-primary" />,
      link: "/expertreviewdetails",

    },
    {
      label: "Top Rank",
      value: dashboardData.topranked?.toString().padStart(2, "0") || "00",
      icon: <FaListAlt size={40} className="text-info" />,
      link: "/toprankdetails",

    },
  ];
  
 
  return (
    <>

      <div className="container idcardbackimg">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"
        >
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} className="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text highlight">
            Dashboard
            </b>
          </div>
        </Container>

        <Container className="mt-4">
          <h2 className="text-center mb-4"></h2>

          {/* Summary Cards Row */}
          <Row>
            {summaryCards.map((card, index) => (
              <Col key={index} md={3}>
                <Link to={card.link} style={{ textDecoration: "none", color: "inherit" }}>
                  <Card className="p-3 text-center shadow-sm clickable-card mt-0 mb-5">
                    <div className="d-flex align-items-center justify-content-start gap-4">
                      {card.icon}
                      <p className="mb-0 text-muted  ms-3 fs-5" >{card.label}</p>
                    </div>
                    <hr></hr>
                    <p className="align-items-center mb-0 ms-3 fs-4">{card.value}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>




        </Container>
      </div>
    </>
  );
};
export default TrainingDashboard;
