import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FaUsers, FaFileCode, FaCheckCircle, FaClipboardList, FaLaptopCode, FaUserCircle } from "react-icons/fa";
import "../submenus/completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";




// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [internData, setInternData] = useState([]);
  const [completionData, setCompletionData] = useState([]);
  const [techData, setTechData] = useState([]);
  const [recentInterns, setRecentInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("remember_token");

      // Fetch Intern Joining Data
      const internResponse = await axios.get(
        "https://api.sumagotraining.in/public/api/get-intern-joining",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fetch Completion Students Data
      const completionResponse = await axios.get(
        "https://api.sumagotraining.in/public/api/get-intern-completion-details",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Intern Data:", internResponse.data);
      console.log("Completion Data:", completionResponse.data);

      setInternData(internResponse.data);
      setCompletionData(completionResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTechnologyData();
  }, []);

  const fetchTechnologyData = async () => {
    try {
      const token = localStorage.getItem("remember_token");
      const response = await axios.get(
        "https://api.sumagotraining.in/public/api/get-intern-joining",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Transform data to get student count per technology
      const techCountMap = {};
      response.data.forEach((entry) => {
        const tech = entry.technology_name;
        techCountMap[tech] = (techCountMap[tech] || 0) + 1;
      });

      // Convert to array format
      const transformedData = Object.keys(techCountMap).map((tech) => ({
        technology: tech,
        studentCount: techCountMap[tech].toString().padStart(2, '0'),
      }));

      setTechData(transformedData);
    } catch (error) {
      console.error("Error fetching technology data:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchRecentInterns();
  }, []);

  const fetchRecentInterns = async () => {
    try {
      const token = localStorage.getItem("remember_token");
      const response = await axios.get(
        "https://api.sumagotraining.in/public/api/get-intern-joining",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const sortedInterns = response.data
        .sort((a, b) => new Date(b.date_of_joining) - new Date(a.date_of_joining))
        .slice(0, 5);

      setRecentInterns(sortedInterns);
    } catch (error) {
      console.error("Error fetching recent interns:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Function to get the ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // Covers 4-20
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };




  // Calculate Summary
  const totalInterns = internData.length.toString().padStart(2, '0');
  const completedInterns = completionData.length.toString().padStart(2, '0');

  const courses = 10; // Placeholder for courses
  const t3Sheet = totalInterns;

  // UI Card Data
  const summaryCards = [
    { label: "Total Interns", value: totalInterns, icon: <FaUsers size={40} className="text-danger" />, link: "/viewjoining" },
    { label: "Total Courses", value: courses, icon: <FaFileCode size={40} className="text-secondary" /> },
    { label: "Completion", value: completedInterns, icon: <FaCheckCircle size={40} className="text-success" />, link: "/viewcompletion" },
    { label: "T3 - Sheet", value: t3Sheet, icon: <FaClipboardList size={40} className="text-primary" />, link: "/ViewT3Sheet" },
  ];


  // Grouping Students Joined Per Month Per Technology
  const monthlyJoinData = {};
  const completionByTechnology = {};
  const totalByTechnology = {};

  internData.forEach((intern) => {
    const month = new Date(intern.date_of_joining).toLocaleString("default", { month: "short", year: "numeric" });
    const tech = intern.technology_name || "Unknown";

    if (!monthlyJoinData[month]) monthlyJoinData[month] = {};
    monthlyJoinData[month][tech] = (monthlyJoinData[month][tech] || 0) + 1;

    totalByTechnology[tech] = (totalByTechnology[tech] || 0) + 1;
  });

  completionData.forEach((student) => {
    const tech = student.technology_name || "Unknown";
    completionByTechnology[tech] = (completionByTechnology[tech] || 0) + 1;
  });

  // Extract months and technologies dynamically
  const months = Object.keys(monthlyJoinData).sort((a, b) => new Date(a) - new Date(b));
  const technologies = [...new Set(internData.map((intern) => intern.technology_name))].filter(Boolean);

  // Create dataset for each technology in Bar Chart
  const datasets = technologies.map((tech) => ({
    label: tech,
    data: months.map((month) => monthlyJoinData[month][tech] || 0),
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random colors
    borderWidth: 1,
  }));

  // Data for Monthly Joining Per Technology (Stacked Bar Chart)
  const monthlyTechChartData = {
    labels: months,
    datasets,
  };
  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1, // Ensure increments of 1
          precision: 0, // Avoid decimal values
        },
      },
    },
  };




  // Data for Completion Students Per Technology (Pie Chart)
  const completionChartData = {
    labels: Object.keys(completionByTechnology).length > 0 ? Object.keys(completionByTechnology) : ["No Data"],
    datasets: [
      {
        data: Object.values(completionByTechnology).length > 0 ? Object.values(completionByTechnology) : [1],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
      },
    ],
  };


  return (
    <>

      <div className="container backimg">
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
            <b className="title-text">
              Intern Management Dashboard
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
                  <Card className="p-3 text-center shadow-sm clickable-card mt-0 mb-0">
                    <div className="d-flex align-items-center justify-content-start gap-4">
                      {card.icon}
                      <h5 className="mb-0 text-muted ms-3">{card.label}</h5>
                    </div>
                    <h3 className="align-items-center mb-0 ms-3">{card.value}</h3>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>


          <Container className="mt-4">
            <h2 className="text-center mb-4">Technology Wise Student Count</h2>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <Row>
                {techData.map((tech, index) => (
                  <Col key={index} md={3}>
                    <Card
                      className="p-2 mb-3 text-center shadow-sm"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/viewjoining?technology=${tech.technology}`)}
                    >
                      <div className="d-flex justify-content-center">
                        <FaLaptopCode size={40} className="text-info" />
                      </div>
                      <h6 className="mt-2 text-muted">{tech.technology}</h6>
                      <h3>{tech.studentCount}</h3>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Container>

          <Row className="mt-4">
            {/* Students Joined Per Month Per Technology (Bar Chart) */}
            <Col md={8}>
              <Card className="p-3">
                <h5 className="text-center">Students Joined Per Month Per Technology</h5>
                <Bar data={monthlyTechChartData} options={barChartOptions} />
              </Card>
            </Col>

            {/* Completion Students Per Technology (Pie Chart) */}
            <Col md={4}>
              <Card className="p-3">
                <h5 className="text-center">Completion Students Per Technology</h5>
                <Pie data={completionChartData} />
              </Card>
            </Col>
          </Row>

          {/* Recent Interns List */}
          <Card className="p-3 mt-4">
            <h5 className="mb-3">Recently Joined Interns</h5>
            <ListGroup variant="flush">
              {recentInterns.map((intern, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <FaUserCircle size={40} className="me-3 text-secondary" />
                    <div>
                      {/* Display First Name & Last Name */}
                      <h6 className="mb-0">
                        {intern.fname && intern.lname
                          ? `${intern.fname} ${intern.lname}`
                          : intern.fname || "Unknown"}
                      </h6>

                      {/* Display Technology Name */}
                      <small className="text-muted">{intern.technology_name}</small>

                      {/* Display Training Mode */}
                      <div> Training Mode:&nbsp;
                        <span
                          className={`badge  ${intern.training_mode === "Online"
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                        >
                          {intern.training_mode || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    {/* Display Formatted Date */}
                    <span className="me-3">{formatDate(intern.date_of_joining)}</span>

                    {/* View Button */}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/intern-details/${intern.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>



        </Container>
      </div>
    </>
  );
};
export default Dashboard;
