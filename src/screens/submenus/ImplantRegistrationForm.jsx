import React, { useState, useEffect } from "react";
import "./InterJoining.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import { useLocation, useNavigate } from "react-router-dom";
import corner from "../imgs/file (28).png";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import instance from "../../api/AxiosInstance";

const polytechnicOptions = [
  { value: "K. K. Wagh Polytechnic", label: "K. K. Wagh Polytechnic" },
  { value: "MET Polytechnic", label: "MET Polytechnic" },
  { value: "NDMVP RSM Polytechnic", label: "NDMVP RSM Polytechnic" },
  { value: "Mahavir Polytechnic", label: "Mahavir Polytechnic" },
  { value: "Sandip Polytechnic", label: "Sandip Polytechnic" },
  { value: "Gurukul Polytechnic", label: "Gurukul Polytechnic" },
  { value: "Gulabrao Deokar Polytechnic", label: "Gulabrao Deokar Polytechnic" },
  { value: "JMCT Polytechnic", label: "JMCT Polytechnic" },
  { value: "Government Polytechnic, Nandurbar", label: "Government Polytechnic, Nandurbar" },
  { value: "SHHJB Polytechnic", label: "SHHJB Polytechnic" },
  { value: "Government Polytechnic Jalgaon", label: "Government Polytechnic Jalgaon" },
  { value: "R. C. Patel Polytechnic", label: "R. C. Patel Polytechnic" },
  { value: "Government Polytechnic, Jintur", label: "Government Polytechnic, Jintur" },
  { value: "Sanjivani KBP Polytechnic, Kopargaon", label: "Sanjivani KBP Polytechnic, Kopargaon" },
  { value: "Amrutvahini Polytechnic", label: "Amrutvahini Polytechnic" },
  { value: "SND Polytechnic Yeola", label: "SND Polytechnic Yeola" },
  { value: "J.T. Mahajan Polytechnic, Faizpur", label: "J.T. Mahajan Polytechnic, Faizpur" },
  { value: "GP Solapur", label: "GP Solapur" },
  { value: "M.S. Gosavi Polytechnic", label: "M.S. Gosavi Polytechnic" },
  { value: "KBH Polytechnic,Malegaon", label: "KBH Polytechnic,Malegaon" },
  { value: "MMANTC", label: "MMANTC" },
  { value: "Shantiniketan Polytechnic", label: "Shantiniketan Polytechnic" },
  { value: "Government Polytechnic Latur", label: "Government Polytechnic Latur" },
  { value: "Government Polytechnic, Aurangabad", label: "Government Polytechnic, Aurangabad" },
  { value: "Government Polytechnic Auti", label: "Government Polytechnic Auti" },
  { value: "Government Polytechnic Beed", label: "Government Polytechnic Beed" },
  { value: "Government Polytechnic Thane", label: "Government Polytechnic Thane" },
  { value: "Government Polytechnic Vikramgad", label: "Government Polytechnic Vikramgad" },
  { value: "MIT Poly, Aurangabad", label: "MIT Poly, Aurangabad" },
  { value: "Government Polytechnic Osmanabad", label: "Government Polytechnic Osmanabad" },
  { value: "Sanjay Ghodawat Polytechnic, Kolhapur", label: "Sanjay Ghodawat Polytechnic, Kolhapur" },
  { value: "Government Polytechnic Hingoli", label: "Government Polytechnic Hingoli" },
  { value: "Government Polytechnic Jalna", label: "Government Polytechnic Jalna" },
  { value: "Government Polytechnic Nanded", label: "Government Polytechnic Nanded" },
  { value: "Indira Gandhi Polytechnic Nagar", label: "Indira Gandhi Polytechnic Nagar" },
  { value: "Gramin Polytechnic Nanded", label: "Gramin Polytechnic Nanded" },
  { value: "P. Dr. V.V.Instt. Loni", label: "P. Dr. V.V.Instt. Loni" },
  { value: "MGM Polytechnic", label: "MGM Polytechnic" },
  { value: "Soniya Gandhi Polytechnic", label: "Soniya Gandhi Polytechnic" },
  { value: "SSVPS Polytechnic", label: "SSVPS Polytechnic" },
  { value: "GP Malvan", label: "GP Malvan" },
  { value: "Ahinsa Polytechnic", label: "Ahinsa Polytechnic" },
  { value: "KVN Naik Polytechnic", label: "KVN Naik Polytechnic" },
  { value: "GP Ambad", label: "GP Ambad" },
  { value: "Matoshri Polytechnic", label: "Matoshri Polytechnic" },
  { value: "Parikrama Polytechnic", label: "Parikrama Polytechnic" },
  { value: "Faculty of Polytechnic Akole", label: "Faculty of Polytechnic Akole" },
  { value: "KCE Jalgaon", label: "KCE Jalgaon" },
  { value: "Bharti Vidyapith", label: "Bharti Vidyapith" },
  { value: "GH Raisoni", label: "GH Raisoni" },
  { value: "KBP Satara Polytechnic", label: "KBP Satara Polytechnic" },
  { value: "SSC Polytechnic", label: "SSC Polytechnic" },
  { value: "MIT Polytechnic Yeola", label: "MIT Polytechnic Yeola" },
  { value: "Brahma Valley Polytechnic", label: "Brahma Valley Polytechnic" },
  { value: "Godavari Polytechnic", label: "Godavari Polytechnic" },
  { value: "Trimurti Institute of Polytechnic", label: "Trimurti Institute of Polytechnic" },
  { value: "GP Khamgaon", label: "GP Khamgaon" },
  { value: "Pd. Dr. V.B. Kolte College of Engineering, Malkapur", label: "Pd. Dr. V.B. Kolte College of Engineering, Malkapur" },
  { value: "Institute of Engg. & Technology, Kannad", label: "Institute of Engg. & Technology, Kannad" },
  { value: "VPM's Polytechnic Thane", label: "VPM's Polytechnic Thane" },
  { value: "S.S. Jondhale Polytechnic", label: "S.S. Jondhale Polytechnic" },
  { value: "Sharadchandrika Suresh Patil Polytechnic, Chopda", label: "Sharadchandrika Suresh Patil Polytechnic, Chopda" },
  { value: "GP Dhule", label: "GP Dhule" },
  { value: "Kadva Polytechnic", label: "Kadva Polytechnic" },
  { value: "Government Polytechnic Awasari", label: "Government Polytechnic Awasari" },
  { value: "Sinhgad Technical Education Society's Sou. Venutai Chavan Polytechnic, Vadgaon (BK)-Pune", label: "Sinhgad Technical Education Society's Sou. Venutai Chavan Polytechnic, Vadgaon (BK)-Pune" },
  { value: "Bharati Vidyapeeth's Jawaharlal Nehru Institute of Technology, Pune", label: "Bharati Vidyapeeth's Jawaharlal Nehru Institute of Technology, Pune" },
  { value: "Jaihind Comprehensive Educational Institute's Jaihind Polytechnic, Kuran-Pune", label: "Jaihind Comprehensive Educational Institute's Jaihind Polytechnic, Kuran-Pune" },
  { value: "Zeal Education Society's Zeal Polytechnic, Pune-Pune", label: "Zeal Education Society's Zeal Polytechnic, Pune-Pune" },
  { value: "Marathwada Mitra Mandal's Polytechnic, Thergaon-Pune", label: "Marathwada Mitra Mandal's Polytechnic, Thergaon-Pune" },
  { value: "DY.Patil Pratishthan's Dr. D.Y.Patil Polytechnic, Kasaba Bavada-Kolhapur", label: "DY.Patil Pratishthan's Dr. D.Y.Patil Polytechnic, Kasaba Bavada-Kolhapur" },
  { value: "Government Polytechnic, Karad-Satara", label: "Government Polytechnic, Karad-Satara" },
  { value: "Yashwant Vidyapeeth's Smt. Premalatai Chavan Polytechnic, Karad-Satara", label: "Yashwant Vidyapeeth's Smt. Premalatai Chavan Polytechnic, Karad-Satara" },
  { value: "Shri Kapildhara Polytechnic, Nashik-Nashik", label: "Shri Kapildhara Polytechnic, Nashik-Nashik" },
  { value: "Sunsuba Polytechnic, Igatpuri-Nashik", label: "Sunsuba Polytechnic, Igatpuri-Nashik" },
  { value: "Potdar Polytechnic, Malegaon-Nashik", label: "Potdar Polytechnic, Malegaon-Nashik" },
  { value: "Shikshan Maharshi Dadasaheb Rawal Government Polytechnic, Dhule-Dhule", label: "Shikshan Maharshi Dadasaheb Rawal Government Polytechnic, Dhule-Dhule" },
  { value: "Sanjay Education Society's Polytechnic, Dhule", label: "Sanjay Education Society's Polytechnic, Dhule" },
  { value: "Netaji Subhashchandra Bose Education Trust's Netaji Polytechnic College, Ajang-Dhule", label: "Netaji Subhashchandra Bose Education Trust's Netaji Polytechnic College, Ajang-Dhule" },
  { value: "Nagaon Education Society's Gangamai Polytechnic, Nagaon-Dhule", label: "Nagaon Education Society's Gangamai Polytechnic, Nagaon-Dhule" },
  { value: "Omkar Bahuuddeshiya Vikas Sanstha's Nikam Institute of Technology, Dhule", label: "Omkar Bahuuddeshiya Vikas Sanstha's Nikam Institute of Technology, Dhule" },
  { value: "GGSP, Nashik", label: "GGSP, Nashik" },
  { value: "Sant Gajanan Maharaj Polytechnic, Kolhapur", label: "Sant Gajanan Maharaj Polytechnic, Kolhapur" },
  { value: "MIT Polytechnic, Rotegaon, Vajapur", label: "MIT Polytechnic, Rotegaon, Vajapur" },
  { value: "Dr. Punjabrao Deshmukh Polytechnic", label: "Dr. Punjabrao Deshmukh Polytechnic" },
  { value: "CSMSS Polytechnic, Sambhajinagar", label: "CSMSS Polytechnic, Sambhajinagar" },
  { value: "PES Polytechnic, Sambhajinagar", label: "PES Polytechnic, Sambhajinagar" },
  { value: "GP Murtijapur", label: "GP Murtijapur" },
  { value: "Karmayogi Institute of Technology, Pandharpur", label: "Karmayogi Institute of Technology, Pandharpur" },
  { value: "Yashwantrao Chavan Polytechnic Beed", label: "Yashwantrao Chavan Polytechnic Beed" },
  { value: "Sanjay Ghodawat Institute, Kolhapur", label: "Sanjay Ghodawat Institute, Kolhapur" },
  { value: "GP Gadchiroli", label: "GP Gadchiroli" },
  { value: "Trimurti Polytechnic, Jalgaon", label: "Trimurti Polytechnic, Jalgaon" },
  { value: "NIT Polytechnic, Nashik", label: "NIT Polytechnic, Nashik" },
  { value: "Shatabdi Polytechnic, Nashik", label: "Shatabdi Polytechnic, Nashik" },
  { value: "Dnyaneshwar Polytechnic, Ahmednagar", label: "Dnyaneshwar Polytechnic, Ahmednagar" },
  { value: "Vasantrao More Polytechnic, Jalgaon", label: "Vasantrao More Polytechnic, Jalgaon" },
  { value: "Vidyalankar Polytechnic, Mumbai", label: "Vidyalankar Polytechnic, Mumbai" },
  { value: "MSS Jalna", label: "MSS Jalna" },
  { value: "Arvind Gawali College of Engineering, Satara", label: "Arvind Gawali College of Engineering, Satara" },
  { value: "GMC Polytechnic, Shahada", label: "GMC Polytechnic, Shahada" },
  { value: "KES Polytechnic, Lohgaon", label: "KES Polytechnic, Lohgaon" },
  { value: "Yashoda Shikshan Prasarak Mandal, Satara", label: "Yashoda Shikshan Prasarak Mandal, Satara" },
  { value: "Samarth Polytechnic, Junnar Pune", label: "Samarth Polytechnic, Junnar Pune" },
  { value: "Adarsh Polytechnic, Vita", label: "Adarsh Polytechnic, Vita" },
  { value: "PKTC, Pune", label: "PKTC, Pune" },
  { value: "Government Polytechnic, Pune", label: "Government Polytechnic, Pune" },
  { value: "CSSM Polytechnic, Satara", label: "CSSM Polytechnic, Satara" },
  { value: "A.G. Patil Polytechnic, Solapur", label: "A.G. Patil Polytechnic, Solapur" },
  { value: "Adsul Polytechnic", label: "Adsul Polytechnic" },
  { value: "Parul University, Vadodara", label: "Parul University, Vadodara" },
  { value: "SSC Polytechnic, Chalisgaon", label: "SSC Polytechnic, Chalisgaon" },
  { value: "Gautam Polytechnic, Kolpewadi", label: "Gautam Polytechnic, Kolpewadi" },
  { value: "Sharadchandra Pawar Polytechnic, Aurangabad", label: "Sharadchandra Pawar Polytechnic, Aurangabad" },
  { value: "SVERIE's College of Engineering, Pandharpur", label: "SVERIE's College of Engineering, Pandharpur" },
  { value: "LGGP Polytechnic, Nashik", label: "LGGP Polytechnic, Nashik" },
  { value: "TKIET Polytechnic, Warananagar", label: "TKIET Polytechnic, Warananagar" }
];


// let training_durationData = ["02/06/2025 to 22/08/2025", "03/06/2025 to 23/08/2025", "04/06/2025 to 24/08/2025"]

function ImplantRegistrationForm() {
  const navigate = useNavigate();
  const location = useLocation([])
  const [batch_no, setBatchNo] = useState("");
  const [first_name, setfname] = useState("");
  // const [mother_name, setmname] = useState("");
  const [father_name, setfathername] = useState("");
  const [surname, setlname] = useState("");
  // const [email_address, setemail] = useState("");
  const [training_mode, setMode] = useState("");
  const [training_duration, setDuration] = useState("");
  const [training_location, setLocation] = useState("");
  // const [gender, setGender] = useState("");
  const [mobile_no, setcontactNo] = useState("");
  // const [whatsappNo, setwhatsappNo] = useState("");
  const [technology_name, setTechnology] = useState("");
  const [training_durationData, setTrainingDuration] = useState([]);
  const [id, setId] = useState();
  // const [branch, setBranch] = useState("");
  // const [dob, setdob] = useState("");
  const [college_name, setCollege] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData()
    if (location?.state) {
      setBatchNo(location.state.batch_no)
      setfname(location.state.first_name)
      // setmname(location.state.mother_name)
      setfathername(location.state.father_name)
      setlname(location.state.surname)
      // setemail(location.state.email_address)
      setcontactNo(location.state.mobile_no)
      setMode(location.state.training_mode)
      setLocation(location.state.training_location)
      setTechnology(location.state.technology_name)
      setCollege(location.state.college_name)
      setId(location.state.id)
      setDuration(location.state.duration)
    }

  }, [location])

  const fetchData = async () => {
    const accessToken = localStorage.getItem("remember_token");
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
      console.log("response.data.dataresponse.data.data", response.data.data);
      setTrainingDuration(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Ensure "+91" is always the prefix
    // if (value.startsWith("91")) {
    //   value = "+91" + value.slice(2, 12); // Keep only 10 digits after "+91"
    // } else {
    //   value = "+91" + value.slice(0, 10);
    // }

    // If user deletes everything, reset to "+91"
    // if (value.length < 3) {
    //   value = "+91";
    // }
    // Enforce mobile number to start only with 6,7,8,9
    if (value.length >= 4) { // Ensure there are at least 1 digit after "+91"
      const firstDigit = value.charAt(3); // Get the first digit of the mobile number
      if (!["6", "7", "8", "9"].includes(firstDigit)) {
        return; // Stop updating state if invalid number is entered
      }
    }

    setcontactNo(value);
  };



  // Calculate max & min date for age restriction
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0]; // 10 years ago
  const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0]; // 80 years ago

  const handleDateChange = (e) => {
    let inputDate = e.target.value; // YYYY-MM-DD format
    setdob(inputDate);

    if (inputDate < minDate || inputDate > maxDate) {
      setErrors("Age must be between 10 and 80 years.");
      setFormattedDob("");
      return;
    } else {
      setErrors("");
    }
    // Convert to DD/MM/YYYY format
    let [year, month, day] = inputDate.split("-");
    setFormattedDob(`${day}/${month}/${year}`);
  };



  // const validateEmail = (email_address) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email_address);
  // };

  // const handleEmailChange = (e) => {
  //   const inputEmail = e.target.value;
  //   setemail(inputEmail);

  // if (!validateEmail(inputEmail)) {
  //   setemailError("Please enter a valid email address.");
  // } else {
  //   setemailError("");
  // }
  // };




  const handleWhatsappChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Ensure "+91" is always the prefix
    if (value.startsWith("91")) {
      value = "+91" + value.slice(2, 12); // Keep only 10 digits after "+91"
    } else {
      value = "+91" + value.slice(0, 10);
    }

    // If user deletes everything, reset to "+91"
    if (value.length < 3) {
      value = "+91";
    }
    // Enforce mobile number to start only with 6,7,8,9
    if (value.length >= 4) { // Ensure there are at least 1 digit after "+91"
      const firstDigit = value.charAt(3); // Get the first digit of the mobile number
      if (!["6", "7", "8", "9"].includes(firstDigit)) {
        return; // Stop updating state if invalid number is entered
      }
    }

    setwhatsappNo(value);
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;

    // Check if the input is a number and has exactly 12 digits
    if (/^\d{0,12}$/.test(value)) {
      setaadhar(value);
      // Clear error if input is valid
      if (value.length === 12) {
        setErrors((prevErrors) => ({ ...prevErrors, aadhar: null }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          aadhar: "Aadhar number must be exactly 12 digits.",
        }));
      }
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months, ${days} days`;
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!batch_no.trim()) {
      errors.batch_no = "Batch Number is required";
      isValid = false;
    }
    if (!first_name.trim()) {
      errors.first_name = "First Name is required";
      isValid = false;
    }
    // if (!mother_name.trim()) {
    //   errors.mother_name = "Mother Name is required";
    //   isValid = false;
    // }
    if (!father_name.trim()) {
      errors.father_name = "Father Name is required";
      isValid = false;
    }
    if (!surname.trim()) {
      errors.surname = "Last Name is required";
      isValid = false;
    }
    // if (!email_address.trim()) {
    //   errors.email_address = "Email is required";
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(email_address)) {
    //   errors.email_address = "Invalid email address";
    //   isValid = false;
    // }
    // if (!whatsappNo) {
    //   errors.whatsappNo = "Whatsapp number is required";
    //   isValid = false;
    // } else if (!/^\+91\d{10}$/.test(whatsappNo)) {
    //   errors.whatsappNo =
    //     "Contact number must start with +91 and have 10 digits";
    //   isValid = false;
    // }
    // if (!mobile_no) {
    //   errors.mobile_no = "Contact number is required";
    //   isValid = false;
    // } else if (!/^\+91\d{10}$/.test(mobile_no)) {
    //   errors.mobile_no =
    //     "Contact number must start with +91 and have 10 digits";
    //   isValid = false;
    // }
    // if (!dob) {
    //   errors.dob = "Date of Birth is required";
    //   isValid = false;
    // }
    // if (!gender) {
    //   errors.gender = "Please select your gender";
    //   isValid = false;
    // }
    if (!training_location) {
      errors.training_location = "Please select your location";
      isValid = false;
    }
    if (!training_duration) {
      errors.training_duration = "Please select training duration";
      isValid = false;
    }
    if (!training_mode) {
      errors.training_mode = "Please select your training mode";
      isValid = false;
    }
    if (!technology_name) {
      errors.technology_name = "Please select your technology";
      isValid = false;
    }
    if (!college_name) {
      errors.college_name = "Please select your college";
      isValid = false;
    }
    // if (!branch) {
    //   errors.branch = "Please select your branch";
    //   isValid = false;
    // }
    // if (!academicYear) {
    //   errors.academicYear = "Please select your academic year";
    //   isValid = false;
    // }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;


    let mobileNo = `+91${mobile_no}`

    const token = localStorage.getItem("remember_token");
    const newData = {
      first_name,
      // mother_name,
      father_name,
      surname,
      // email_address,
      mobile_no: mobileNo,
      technology_name,
      college_name,
      batch_no,
      training_mode,
      training_location,
      duration: training_duration
    };

    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await instance.post("add-certificate-details", newData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      });
      toast.success("Data submitted successfully!");
      navigate("/implant-registration");
      console.log("response", response);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("remember_token");
    const newData = {
      first_name,
      // mother_name,
      father_name,
      surname,
      // email_address,
      mobile_no: mobile_no,
      technology_name,
      college_name,
      batch_no,
      training_mode,
      training_location,
      duration: training_duration,
      id
    };

    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await instance.post("update-certificate-details", newData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      });
      toast.success("Data updated successfully!");
      navigate("/implant-registration");
      console.log("response", response);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="container backimg ">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} class="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text">
              INTERNS PERSONAL <span className="highlight">DETAILS</span>
            </b>
          </div>
        </Container>
        <Container className="position-relative text-center homepara">
          <p>
            SCOPE , where we believe in empowering individuals through education
            and skill development. Established with a vision to foster
            excellence and innovation in learning, Scope is dedicated to
            providing high-quality training programs tailored to meet the
            diverse needs of our students.
          </p>
        </Container>

        <Container className="position-relative text-center welcommsg">
          <p>
            <b>Welcome To</b> <b>Sumago Center of Practical Experience!!</b>
          </p>
        </Container>

        <Container className="position-relative text-center para2">
          <p style={{ textAlign: "justify" }}>
            We’re glad to have you on board as part of our intern team. Get
            ready to dive into hands-on learning, sharpen your skills, and make
            meaningful contributions. Let’s make this journey both rewarding and
            memorable!
          </p>
        </Container>
        <div style={{ margin: "40px" }}></div>

        {/* Form Personal Details */}

        <Form onSubmit={location?.state ? handleUpdate : handleSubmit}>
          <Container fluid>
            <Card style={{ backgroundColor: "transparent", border: "none" }}>
              <Card.Header
                className="cardpersonal_details"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  className="position-absolute"
                  style={{
                    backgroundColor: "black",
                    width: "20px",
                    height: "30px",
                  }}
                >
                  <div className="personal-card-heading position-relative">
                    <b className="form-title">PERSONAL DETAILS</b>
                  </div>
                </div>
              </Card.Header>
              <Card.Body
                style={{ backgroundColor: "transparent", color: "white" }}
                className="pt-5"
              >
                <Card.Title className="text-black"></Card.Title>
                <Card.Text className="text-black">
                  <Row>
                    {/* First name */}
                    <Col lg={4}>
                      <b
                        style={{ fontFamily: "Century gothic" }}
                        className="d-none d-md-block"
                      >
                        Student Name : <span className="text-danger">*</span>{" "}
                      </b>
                    </Col>
                    <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={first_name}
                          onChange={(e) => {
                            const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                            if (onlyLetters.length <= 20) { // Set max length to 30 characters
                              setfname(onlyLetters);
                            }
                          }}
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.first_name ? (
                          <span className="error text-danger">
                            {errors.first_name}
                          </span>
                        ) : (
                          "First Name"
                        )}
                      </Form.Label>

                      {/* {errors.first_name && <span className="error text-danger">{errors.first_name}</span>} */}
                    </Col>
                    {/* <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="mname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter mother name"
                          className="FormStyeling transparent-input"
                          value={mother_name}
                          onChange={(e) => {
                            const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                            if (onlyLetters.length <= 20) { // Set max length to 30 characters
                              setmname(onlyLetters);
                            }
                          }}
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.mother_name ? (
                          <span className="error text-danger">
                            {errors.mother_name}
                          </span>
                        ) : (
                          "Mother Name"
                        )}
                      </Form.Label>
                    </Col> */}
                    <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter father name"
                          className="FormStyeling transparent-input"
                          value={father_name}
                          onChange={(e) => {
                            const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                            if (onlyLetters.length <= 20) { // Set max length to 30 characters
                              setfathername(onlyLetters);
                            }
                          }}
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.father_name ? (
                          <span className="error text-danger">
                            {errors.father_name}
                          </span>
                        ) : (
                          "Father Name"
                        )}
                      </Form.Label>
                    </Col>
                    <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="lname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter last name"
                          className="FormStyeling transparent-input"
                          value={surname}
                          onChange={(e) => {
                            const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                            if (onlyLetters.length <= 20) { // Set max length to 30 characters
                              setlname(onlyLetters);
                            }
                          }}
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.surname ? (
                          <span className="error text-danger">
                            {errors.surname}
                          </span>
                        ) : (
                          "Last Name"
                        )}
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-block d-md-none">
                    <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>First Name</b>
                    </Col>
                    <Col lg={8}>
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={first_name}
                          // onChange={handleChange}
                          onChange={(e) => setfname(e.target.value)}
                        />
                      </Form.Group>
                      {errors.first_name && (
                        <span className="error text-danger">
                          {errors.first_name}
                        </span>
                      )}
                    </Col>
                    {/* <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Mother Name
                      </b>
                    </Col>
                    <Col lg={8}>
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={mother_name}
                          onChange={(e) => setmname(e.target.value)}
                        />
                      </Form.Group>
                      {errors.mother_name && (
                        <span className="error text-danger">
                          {errors.mother_name}
                        </span>
                      )}
                    </Col> */}
                    <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Father Name
                      </b>
                    </Col>
                    <Col lg={8}>
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={father_name}
                          onChange={(e) => setfathername(e.target.value)}
                        />
                      </Form.Group>
                      {errors.father_name && (
                        <span className="error text-danger">
                          {errors.father_name}
                        </span>
                      )}
                    </Col>
                    <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>last Name</b>
                    </Col>
                    <Col lg={8} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={surname}
                          onChange={(e) => setlname(e.target.value)}
                        />
                      </Form.Group>
                      {errors.surname && (
                        <span className="error text-danger">
                          {errors.surname}
                        </span>
                      )}
                    </Col>
                  </Row>


                  <Row>
                    {/* email */}
                    {/* <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>Email Id : <span className="text-danger">*</span></b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={email_address}
                          onChange={handleEmailChange} />
                      </Form.Group>
                      {errors.email_address && (
                        <span className="error text-danger">
                          {errors.email_address}
                        </span>
                      )}
                    </Col> */}
                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Batch No : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={batch_no}
                          onChange={(e) => setBatchNo(e.target.value)}
                        >
                          <option>Select Batch No</option>
                          <option value="B1">B1</option>
                          <option value="B2">B2</option>
                          <option value="B3">B3</option>
                          <option value="B4">B4</option>
                          <option value="B5">B5</option>
                          <option value="B6">B6</option>
                          <option value="B7">B7</option>
                          <option value="B8">B8</option>
                          <option value="B9">B9</option>
                          <option value="B10">B9</option>
                          <option value="B11">B11</option>
                          <option value="B12">B12</option>
                          <option value="B13">B13</option>
                          <option value="B14">B14</option>
                          <option value="B15">B15</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.batch_no && (
                        <span className="error text-danger">
                          {errors.batch_no}
                        </span>
                      )}
                    </Col>
                    {/* <Col lg={2} md={2} sm={12} className="m-0 ">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Contact No : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          placeholder="+91"
                          className="FormStyeling transparent-input"
                          value={mobile_no}
                          onChange={handlePhoneChange}
                        />
                      </Form.Group>
                      {errors.mobile_no && (
                        <span className="error text-danger">
                          {errors.mobile_no}
                        </span>
                      )}
                    </Col> */}
                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Contact No : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          placeholder="+91"
                          className="FormStyeling transparent-input"
                          value={mobile_no}
                          onChange={handlePhoneChange}
                          maxLength={10}
                        />
                      </Form.Group>
                      {errors.mobile_no && (
                        <span className="error text-danger">
                          {errors.mobile_no}
                        </span>
                      )}
                    </Col>

                    {/* <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Whatsapp No : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          placeholder="+91"
                          value={whatsappNo}
                          onChange={handleWhatsappChange}
                        />
                      </Form.Group>
                      {errors.whatsappNo && (
                        <span className="error text-danger">
                          {errors.whatsappNo}
                        </span>
                      )}
                    </Col> */}
                    {/* <Col lg={2} md={2} sm={12} className="m-0 ">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Date Of Birth : <span className="text-danger">*</span>
                      </b>
                    </Col> */}
                    {/* <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="date"
                          className="FormStyeling transparent-input"
                          value={dob}
                          onChange={handleDateChange}
                          max={maxDate} // Max age is 10 years old
                          min={minDate} // Min age is 80 years old
                        />
                      </Form.Group>
                      {errors.dob && (
                        <span className="error text-danger">{errors.dob}</span>
                      )}
                    </Col> */}
                    {/* <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Gender : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option>Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.gender && (
                        <span className="error text-danger">
                          {errors.gender}
                        </span>
                      )}
                    </Col> */}
                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Training Mode : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={training_mode}
                          onChange={(e) => setMode(e.target.value)}
                        >
                          <option>Select Training Mode</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.training_mode && (
                        <span className="error text-danger">
                          {errors.training_mode}
                        </span>
                      )}
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Training Location : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={training_location}
                          onChange={(e) => setLocation(e.target.value)}
                        >
                          <option>Select Training Location</option>
                          <option value="Nashik">Nashik</option>
                          <option value="Pune">Pune</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.training_location && (
                        <span className="error text-danger">
                          {errors.training_location}
                        </span>
                      )}
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Training Duration : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={training_duration || "Select Training Duration"}
                          onChange={(e) => setDuration(e.target.value)}
                        >
                          <option value={""}>Select Training Duration</option>
                          {
                            training_durationData.map((item, id) => {
                              return (
                                <option value={item.duration}>{item.duration}</option>
                              )
                            })
                          }
                          <option disabled value={location?.state?.duration}>{location?.state?.duration}</option>

                        </Form.Select>
                      </Form.Group>
                      {errors.training_duration && (
                        <span className="error text-danger">
                          {errors.training_duration}
                        </span>
                      )}
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Select Technology : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={technology_name}
                          onChange={(e) => setTechnology(e.target.value)}
                        >
                          <option value="">Select Technology</option>
                          <option value="AI/ML, Data Science Using Python">AI/ML, Data Science Using Python</option>
                          <option value="Full Stack Development Using Java">Full Stack Development Using Java</option>
                          <option value="Full Stack Development Using React">Full Stack Development Using React</option>
                          <option value="Full Stack Development Using Python">Full Stack Development Using Python</option>
                          <option value="Data Analytics Using Python">Data Analytics Using Python</option>
                          <option value="Mobile Application Development">Mobile Application Development</option>
                          <option value="Design Engineering with UIUX & Frontend Designing">Design Engineering with UIUX & Frontend Designing</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.technology_name && (
                        <span className="error text-danger">
                          {errors.technology_name}
                        </span>
                      )}
                    </Col>

                    <Col lg={4}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        College Name : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={college_name}
                          onChange={(e) => setCollege(e.target.value)}
                        >
                          <option>Select College</option>
                          {
                            polytechnicOptions.map((item, id) => {
                              return (
                                <option value={item.value}>{item.label}</option>
                              )
                            })
                          }
                        </Form.Select>
                      </Form.Group>
                      {errors.college_name && (
                        <span className="error text-danger">
                          {errors.college_name}
                        </span>
                      )}
                    </Col>


                    {/* <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Select Branch : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                        >
                          <option>Select Branch</option>
                          <option value="CO">CO</option>
                          <option value="IT">IT</option>
                          <option value="EE">EE</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.branch && (
                        <span className="error text-danger">
                          {errors.branch}
                        </span>
                      )}
                    </Col> */}

                    {/* <Col lg={2} md={2} sm={12} className="m-0 ">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Academic Year : <span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"

                          className="FormStyeling transparent-input"
                          value={academicYear}
                          onChange={(e) => {
                            const inputText = e.target.value;

                            if (inputText.length <= 100) { // Limit to 100 characters
                              setAcademicYear(inputText);
                            }
                          }}
                          maxLength={100} // Optional: Prevents further typing beyond 100 characters
                        />
                      </Form.Group>
                      {errors.academicYear && (
                        <span className="error text-danger">
                          {errors.academicYear}
                        </span>
                      )}
                    </Col> */}
                  </Row>
                  {
                    location?.state?.action !== "view" &&
                    <div className="button-container">
                      <Button
                        variant="primary"
                        type="submit"
                        style={{
                          backgroundColor: "#c35050",
                          borderColor: "#c35050",
                          marginRight: "10px",
                        }}
                      >
                        {location?.state ? "Update" : "Submit"}
                      </Button>
                    </div>
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Form>
      </div>
    </>
  );
}

export default ImplantRegistrationForm;