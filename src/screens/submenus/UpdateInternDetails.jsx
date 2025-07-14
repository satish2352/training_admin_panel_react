import React, { useState, useEffect } from "react";
import "./InterJoining.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import corner from "../imgs/file (28).png";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast, Bounce  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UpdateInternDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [student_id, setstudent_id] = useState();
    const [fname, setfname] = useState("");
    const [mname, setmname] = useState("");
    const [fathername, setfathername] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [parmanenat_address, setparmanenat_address] = useState("");
    const [current_address, setcurrent_address] = useState("");
    const [contact_details, setcontact_details] = useState("");
    const [whatsappno, setwhatsappno] = useState("");
    const [dob, setdob] = useState("");
    const [age, setAge] = useState("");
    const [gender, setgender] = useState("");
    const [blood, setblood] = useState("");
    const [aadhar, setaadhar] = useState("");
    const [linkdin, setlinkdin] = useState("");
    const [facebook, setfacebook] = useState("");
    const [youtube, setyoutube] = useState("");
    const [anyother_add, setanyother_add] = useState("");
    const [school_name, setschool_name] = useState("");
    const [tenth_per, settenth_per] = useState("");
    const [twelve_diploma_per, settwelve_diploma_per] = useState("");
    const [graduation_details, setgraduation_details] = useState("");
    const [graduation_per, setgraduation_per] = useState("");
    const [post_graduation_details, setPostGraduationDetails] = useState("");
    const [post_graduation_per, setPostGraduationPer] = useState("");
    const [anyother_cirt, setanyother_cirt] = useState("");
    const [selected_branches, setselected_branches] = useState("");
    const [other_branch, setother_branch] = useState(""); // To track 'Other' branch input

    const [father_name, setfather_name] = useState("");
    const [fatherOccupation, setfatherOccupation] = useState("");
    const [father_contactdetails, setfather_contactdetails] = useState("");
    const [father_aadharno, setfather_aadharno] = useState("");
    const [mother_name, setmother_name] = useState("");
    const [motherOccupation, setmotherOccupation] = useState("");
    const [mother_contactdetails, setmother_contactdetails] = useState("");
    const [mother_aadharno, setmother_aadharno] = useState("");
    const [marriedStatus, setMarriedStatus] = useState("");
    const [error, setError] = useState("");
    const [husbandDetails, setHusbandDetails] = useState({
        name: "",
        occupation: "",
        contact: "",
        aadhar: "",
    });
    const [husbandErrors, setHusbandErrors] = useState({
        name: "",
        occupation: "",
        contact: "",
        aadhar: "",
    });
    const [
        Husband_pareantgauaradiandetails,
        setHusband_pareantgauaradiandetails,
    ] = useState("");
    const [HusbandOccupation, setHusbandOccupation] = useState("");
    const [Husband_contactdetails, setHusband_contactdetails] = useState("");
    const [Husband_aadharno, setHusband_aadharno] = useState("");
    const [guardian_name, setguardian_name] = useState("");
    const [GuardianOccupation, setGuardianOccupation] = useState("");
    const [Guardian_contactdetails, setGuardiancontactdetails] = useState("");
    const [Guardian_aadharno, setGuardian_aadharno] = useState("");

    const [date_of_joining, setdate_of_joining] = useState("");
    const [technology_name, settechnology_name] = useState("");
    const [duration, setduration] = useState("");
    const [selectedModules, setSelectedModules] = useState("");
    const [training_mode, setSelectedtraining_mode] = useState("");

    const [intern_experience, setintern_experience] = useState("");
    const [experience, setexperience] = useState("");
    const [characteristics_describe, setcharacteristics_describe] = useState("");
    const [applicant_name, setapplicant_name] = useState("");
    const [place, setplace] = useState("");

    // const [refrance, setRefrance] = useState([]);
    const [refrance_social_media, setrefrance_social_media] = useState("");
    const [refrance_friend, setrefrance_friend] = useState("");
    const [refrance_family, setrefrance_family] = useState("");
    const [refrance_relatives, setrefrance_relatives] = useState("");
    const [refrance_other, setrefrance_other] = useState("");


    const [scoperefer, setscoperefer] = useState([]);
    const [reference_name, setRefereance_name] = useState("");
    const [reference_name1, setRefereance_name1] = useState("");
    const [contact_number, setcontact_number] = useState("");
    const [contact_number1, setcontact_number1] = useState("");
    const [buttom_applicant_name, setbuttonapplicantname] = useState("");
    const [buttom_place, setbuttom_place] = useState("");
    const [errors, setErrors] = useState({});


    const formatDate = (dob) => {
        if (!dob) return ""; // Handle empty case
      
        let dateObj = new Date(dob); // Convert string to Date object
        let day = String(dateObj.getDate()).padStart(2, "0"); // Ensure two-digit day
        let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        let year = dateObj.getFullYear();
      
        return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
      };








    useEffect(() => {
        const fetchInternDetails = async () => {
            const accessToken = localStorage.getItem("remember_token");
            try {
                const response = await axios.get(
                    `https://api.sumagotraining.in/public/api/get-perticular-intern-by-studId/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = response.data[0]; // Assuming the response is an array

                if (!data) {
                    toast.error("Add Intern Details First", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        style: { marginTop: '80px' }, 
                        transition: Bounce, 
                    });
                    navigate(-1);
                    return;
                }
                



                if (data) {
                    // Set all fields
                    setstudent_id(data.id)
                    setfname(data.fname || "");
                    setmname(data.mname || "");
                    setfathername(data.fathername || "");
                    setlname(data.lname || "");
                    setemail(data.email || "");
                    setparmanenat_address(data.parmanenat_address || "");
                    setcurrent_address(data.current_address || "");
                    setcontact_details(data.contact_details || "");
                    setwhatsappno(data.whatsappno || "");
                    setdob(data.dob || "");
                    setAge(data.age || "");
                    setgender(data.gender || "");
                    setblood(data.blood || "");
                    setaadhar(data.aadhar || "");
                    setlinkdin(data.linkdin || "");
                    setfacebook(data.facebook || "");
                    setyoutube(data.youtube || "");
                    setanyother_add(data.anyother_add || "");
                    setschool_name(data.school_name || "");
                    settenth_per(data.tenth_per || "");
                    settwelve_diploma_per(data.twelve_diploma_per || "");
                    setgraduation_details(data.graduation_details || "");
                    setgraduation_per(data.graduation_per || "");
                    setPostGraduationDetails(data.post_graduation_details || "");
                    setPostGraduationPer(data.post_graduation_per || "");
                    setanyother_cirt(data.anyother_cirt || "");
                    setselected_branches(data.selected_branches || "");
                    setother_branch(data.other_branch || "");
                    setfather_name(data.father_name || "");
                    setfatherOccupation(data.fatherOccupation || "");
                    setfather_contactdetails(data.father_contactdetails || "");
                    setfather_aadharno(data.father_aadharno || "");
                    setmother_name(data.mother_name || "");
                    setmotherOccupation(data.motherOccupation || "");
                    setmother_contactdetails(data.mother_contactdetails || "");
                    setmother_aadharno(data.mother_aadharno || "");
                    setMarriedStatus(data.marriedStatus || "");
                    setHusbandDetails({
                        name: data.husband_name || "",
                        occupation: data.HusbandOccupation || "",
                        contact: data.Husband_contactdetails || "",
                        aadhar: data.Husband_aadharno || "",
                    });
                    
                    setguardian_name(data.guardian_name || "");
                    setGuardianOccupation(data.GuardianOccupation || "");
                    // setGuardian_contactdetails(data.Guardian_contactdetails || "");
                    setGuardian_aadharno(data.Guardian_aadharno || "");
                    setdate_of_joining(data.date_of_joining || "");

                    settechnology_name(data.technology_name || "");
                    setduration(data.duration || "");
                    setSelectedModules(data.selectedModules || "");
                    setSelectedtraining_mode(data.training_mode || "");
                    setintern_experience(data.intern_experience || "");
                    setexperience(data.experience || "");
                    setcharacteristics_describe(data.characteristics_describe || "");
                    setapplicant_name(data.applicant_name || "");
                    setplace(data.place || "");
                    setrefrance_social_media(data.refrance_social_media || "");
                    setrefrance_friend(data.refrance_friend || "");
                    setrefrance_family(data.refrance_family || "");
                    setrefrance_relatives(data.refrance_relatives || "");
                    setrefrance_other(data.refrance_other || "");
                    setscoperefer(data.scoperefer || []);
                    setRefereance_name(data.reference_name || "");
                    setRefereance_name1(data.reference_name1 || "");
                    setcontact_number(data.contact_number || "");
                    setcontact_number1(data.contact_number1 || "");
                    setbuttonapplicantname(data.buttom_applicant_name || "");
                    setbuttom_place(data.buttom_place || "");
                }
            } catch (err) {
                setError("Failed to fetch intern details. Please try again later.");
                console.error("Error fetching intern details:", err);
               
            }
        };

        if (id) fetchInternDetails();
    }, [id]);

   

    useEffect(() => {
        if (dob) {
            setAge(calculateAge(dob));
        } else {
            setAge("");
        }
    }, [dob]);

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!fname.trim()) {
            errors.fname = "First Name is required";
            isValid = false;
        }
        if (!mname.trim()) {
            errors.mname = "Mother Name is required";
            isValid = false;
        }

        if (!fathername.trim()) {
            errors.fathername = "Father Name is required";
            isValid = false;
        }
        if (!lname.trim()) {
            errors.lname = "Last Name is required";
            isValid = false;
        }
        if (!email.trim()) {
            errors.email = "email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "invalid email address";
            isValid = false;
        }
        if (!parmanenat_address.trim()) {
            errors.parmanenat_address = "Permanent address is required";
            isValid = false;
        } else if (parmanenat_address.length > 255) {
            errors.parmanenat_address =
                "parmanenat address should not exceed 255 characters";
            isValid = false;
        }
        if (!current_address.trim()) {
            errors.current_address = "Current Address is required";
            isValid = false;
        } else if (current_address.length > 255) {
            errors.current_address =
                "Current Address should not exceed 255 characters";
            isValid = false;
        }

        if (!contact_details) {
            errors.contact_details = "Contact number is required";
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(contact_details)) {
            errors.contact_details =
                "Contact number must start with +91 and be followed by exactly 10 digits";
            isValid = false;
        }

        if (!whatsappno) {
            errors.whatsappno = "WhatsApp number is required";
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(whatsappno)) {
            errors.whatsappno =
                "WhatsApp number must start with +91 and be followed by exactly 10 digits";
            isValid = false;
        }
        if (!dob) {
            errors.dob = "Date of Birth is required";
            isValid = false;
        } else if (!isAgeValid()) {
            errors.dob = "You must be at least 18 years old";
            isValid = false;
        }
        if (!gender) {
            setError("Please select your Gender.");
            isValid = false;
        } else {
            setError("");
        }
        if (!blood.trim()) {
            errors.blood = "Blood group is required";
            isValid = false;
        }
        // if (!aadhar.trim()) {
        //   errors.aadhar = "Aadhar is required";
        //   isValid = false;
        // }

        if (!whatsappno) {
            errors.whatsappno = "WhatsApp number is required";
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(whatsappno)) {
            errors.whatsappno =
                "WhatsApp number must start with +91 and be followed by exactly 10 digits";
            isValid = false;
        }
        if (!dob) {
            errors.dob = "Date of Birth is required";
            isValid = false;
        } else if (!isAgeValid()) {
            errors.dob = "You must be at least 18 years old";
            isValid = false;
        }
        if (!blood.trim()) {
            errors.blood = "Blood group is required";
            isValid = false;
        }
        // if (!aadhar.trim()) {
        //   errors.aadhar = "Aadhar is required";
        //   isValid = false;
        // }

        if (!school_name.trim()) {
            errors.school_name = "School name is required";
            isValid = false;
        } else if (school_name.length > 100) {
            errors.school_name =
                "School name must be less than or equal to 100 characters";
            isValid = false;
        }

        // 10th Percentage Validation (Numeric and within 0-100)
        if (!tenth_per.trim()) {
            errors.tenth_per = "10th percentage is required";
            isValid = false;
        } else if (
            !/^\d+(\.\d{1,2})?$/.test(tenth_per) ||
            parseFloat(tenth_per) < 0 ||
            parseFloat(tenth_per) > 100
        ) {
            errors.tenth_per =
                "10th percentage must be a number between 0 and 100 (can include decimals)";
            isValid = false;
        }

        // 12th/Diploma Percentage Validation (Numeric and within 0-100)
        if (!twelve_diploma_per.trim()) {
            errors.twelve_diploma_per = "12th/Diploma percentage is required";
            isValid = false;
        } else if (
            !/^\d+(\.\d{1,2})?$/.test(twelve_diploma_per) ||
            parseFloat(twelve_diploma_per) < 0 ||
            parseFloat(twelve_diploma_per) > 100
        ) {
            errors.twelve_diploma_per =
                "12th/Diploma percentage must be a number between 0 and 100 (can include decimals)";
            isValid = false;
        }

        // Graduation Details Validation
        if (!graduation_details.trim()) {
            errors.graduation_details = "Graduation details are required";
            isValid = false;
        } else if (graduation_details.length > 100) {
            errors.graduation_details =
                "Graduation details must be less than or equal to 100 characters";
            isValid = false;
        }

        // Graduation Percentage Validation (Numeric and within 0-100)
        if (!graduation_per.trim()) {
            errors.graduation_per = "Graduation percentage is required";
            isValid = false;
        } else if (
            !/^\d+(\.\d{1,2})?$/.test(graduation_per) ||
            parseFloat(graduation_per) < 0 ||
            parseFloat(graduation_per) > 100
        ) {
            errors.graduation_per =
                "Graduation percentage must be a number between 0 and 100 (can include decimals)";
            isValid = false;
        }

        // if (!post_graduation_details.trim()) {
        //   errors.post_graduation_details = "Post Graduation details required";
        //   isValid = false;
        // } else if (post_graduation_details.length > 100) {
        //   errors.post_graduation_details =
        //     "Post Graduation details must be less than or equal to 100 characters";
        //   isValid = false;
        // }

        // Post Graduation Percentage Validation (Numeric and within 0-100)
        // if (!post_graduation_per.trim()) {
        //   errors.post_graduation_per = "Post Graduation percentage required";
        //   isValid = false;
        // } else if (
        //   !/^\d+(\.\d{1,2})?$/.test(post_graduation_per) ||
        //   parseFloat(post_graduation_per) < 0 ||
        //   parseFloat(post_graduation_per) > 100
        // ) {
        //   errors.post_graduation_per =
        //     "Post Graduation percentage must be a number between 0 and 100 (can include decimals)";
        //   isValid = false;
        // }
        if (!anyother_cirt.trim()) {
            errors.anyother_cirt =
                "AnyOther Certification is required (If no, Enter NA)";
            isValid = false;
        } else if (anyother_cirt.length > 255) {
            errors.anyother_cirt =
                "anyother_ irt must be less than or equal to 255 characters";
            isValid = false;
        }

        if (selected_branches.length === 0) {
            errors.selected_branches = "Please select at least one branch";
            isValid = false;
        }

        if (selected_branches.includes("Other") && !other_branch.trim()) {
            errors.other_branch = "Please specify the other branch";
            isValid = false;
        }

        if (!father_name.trim()) {
            errors.father_name = "Father name is required";
            isValid = false;
        } else if (father_name.length > 50) {
            errors.father_name =
                "Father name pareant gauaradian details must be less than or equal to 50 characters";
            isValid = false;
        }

        if (!fatherOccupation.trim()) {
            errors.fatherOccupation = "Father Occupation is required";
            isValid = false;
        } else if (fatherOccupation.length > 50) {
            errors.fatherOccupation =
                "Father Occupation must be less than or equal to 50 characters";
            isValid = false;
        }

        if (!father_contactdetails) {
            errors.father_contactdetails = "Father Contact number is required";
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(father_contactdetails)) {
            errors.father_contactdetails =
                "Father Contact number must start with +91 and be followed by exactly 10 digits";
            isValid = false;
        }

        if (!mother_name.trim()) {
            errors.mother_name = "Mother name is required";
            isValid = false;
        } else if (mother_name.length > 50) {
            errors.mother_name =
                "mother name pareant gauaradian details must be less than or equal to 50 characters";
            isValid = false;
        }

        if (!motherOccupation.trim()) {
            errors.motherOccupation = "Mother Occupation is required";
            isValid = false;
        } else if (motherOccupation.length > 50) {
            errors.motherOccupation =
                "Mother Occupation must be less than or equal to 50 characters";
            isValid = false;
        }

        if (!mother_contactdetails) {
            errors.mother_contactdetails = "Mother Contact number is required";
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(mother_contactdetails)) {
            errors.mother_contactdetails =
                "mother Contact number must start with +91 and be followed by exactly 10 digits";
            isValid = false;
        }

        if (!date_of_joining) {
            errors.date_of_joining = "Date of Birth is required";
            isValid = false;
          }
        if (!intern_experience.trim()) {
            errors.intern_experience = "Experience Field is required";
            isValid = false;
        }
        if (experience.length > 255) {
            errors.experience =
                "experience must be less than or equal to 255 characters";
            isValid = false;
        }
        if (!characteristics_describe.trim()) {
            errors.characteristics_describe = "characteristics describe is required";
            isValid = false;
        } else if (characteristics_describe.length > 500) {
            errors.characteristics_describe =
                "experience must be less than or equal to 500 characters";
            isValid = false;
        }
        if (!applicant_name.trim()) {
            errors.applicant_name = "applicant name is required";
            isValid = false;
        } else if (applicant_name.length > 50) {
            errors.applicant_name =
                "applicant name must be less than or equal to 50 characters";
            isValid = false;
        }
        if (!place.trim()) {
            errors.place = "place is required";
            isValid = false;
        } else if (place.length > 50) {
            errors.place = "place must be less than or equal to 50 characters";
            isValid = false;
        }

        // if (!refereance_name.trim()) {
        //   errors.refereance_name = "refereance name is required";
        //   isValid = false;
        // } else if (refereance_name.length > 50) {
        //   errors.refereance_name =
        //     "refereance name must be less than or equal to 50 characters";
        //   isValid = false;
        // }
        // if (!refereance_name1.trim()) {
        //   errors.refereance_name = "refereance name is required";
        //   isValid = false;
        // } else if (refereance_name1.length > 50) {
        //   errors.refereance_name1 =
        //     "refereance name must be less than or equal to 50 characters";
        //   isValid = false;
        // }

        // if (!conatct_number) {
        //   errors.conatct_number = " Contact number is required";
        //   isValid = false;
        // } else if (!/^\+91\d{10}$/.test(conatct_number)) {
        //   errors.conatct_number =
        //     "contact number must start with +91 and be followed by exactly 10 digits";
        //   isValid = false;
        // }

        // if (!conatct_number1) {
        //   errors.conatct_number1 = " Contact number is required";
        //   isValid = false;
        // } else if (!/^\+91\d{10}$/.test(conatct_number2)) {
        //   errors.conatct_number1 =
        //     "contact number must start with +91 and be followed by exactly 10 digits";
        //   isValid = false;
        // }

        if (!buttom_applicant_name.trim()) {
            errors.buttom_applicant_name = "applicant name is required";
            isValid = false;
        } else if (buttom_applicant_name.length > 50) {
            errors.buttom_applicant_name =
                "applicant name must be less than or equal to 50 characters";
            isValid = false;
        }
        if (!buttom_place.trim()) {
            errors.buttom_place = "place is required";
            isValid = false;
        } else if (buttom_place.length > 50) {
            errors.buttom_place = "place must be less than or equal to 50 characters";
            isValid = false;
        }

        // if (!guardian_name.trim()) {
        //   errors.guardian_name = "Guardian name is required";
        //   isValid = false;
        // } else if (guardian_name.length > 50) {
        //   errors.guardian_name =
        //     "Guardian name pareant gauaradian details must be less than or equal to 50 characters";
        //   isValid = false;
        // }

        // if (!GuardianOccupation.trim()) {
        //   errors.GuardianOccupation = "Guardian Occupation is required";
        //   isValid = false;
        // } else if (GuardianOccupation.length > 50) {
        //   errors.GuardianOccupation =
        //     "Guardian Occupation must be less than or equal to 50 characters";
        //   isValid = false;
        // }

        // if (!Guardian_contactdetails) {
        //   errors.Guardian_contactdetails = "Guardian Contact number is required";
        //   isValid = false;
        // } else if (!/^\+91\d{10}$/.test(Guardian_contactdetails)) {
        //   errors.Guardian_contactdetails =
        //     "Guardian Contact number must start with +91 and be followed by exactly 10 digits";
        //   isValid = false;
        // }
        // if (!Guardian_aadharno.trim()) {
        //   errors.Guardian_aadharno = "Guardian Aadhar is required";
        //   isValid = false;
        // }

        if (!technology_name.trim()) {
            errors.technology_name = "Technology name is required";
            isValid = false;
        } else if (technology_name.length > 100) {
            errors.technology_name =
                "Technology Name must be less than or equal to 50 characters";
            isValid = false;
        }

        // if (!refereance.trim()) {
        //     errors.refereance = 'Please select refereance is required';
        //     isValid = false;
        // }
        if (!duration.trim()) {
            errors.duration = "Please select a duration.";
            isValid = false;
        }

        if (!marriedStatus) {
            setError("Please select your marital status.");
            isValid = false;
        } else {
            setError("");
        }
        // if (!selectedModules.length === 0) {
        //     setErrors({ selectmodule: 'Please select at least one option.' });
        //     return false;
        // }
        if (selectedModules.length === 0) {
            errors.selectedModules = "Please select at least one option.";
            isValid = false;
        }
        if (training_mode.length === 0) {
            errors.training_mode = "Please select at least one option.";
            isValid = false;
        }

        // If any validation fails, update the errors state and set isValid to false
        if (!isValid) {
            setErrors(errors);
        } else {
            setErrors({});
            console.log("Form submitted successfully");
        }

        if (marriedStatus === "Yes") {
            const errors = {};
            const { name, occupation, contact, aadhar } = husbandDetails;

            if (!name.trim()) {
                errors.name = "Husband/Wife name is required.";
                isValid = false;
            }

            if (!occupation.trim()) {
                errors.occupation = "Husband/Wife occupation is required.";
                isValid = false;
            }

            if (!contact.trim()) {
                errors.contact = "Husband/Wife contact details are required.";
                isValid = false;
            }else if (!/^\+91\d{10}$/.test(contact)) {
                errors.contact = "Enter a valid 10-digit contact number.";
                isValid = false;
            }

            if (!aadhar.trim()) {
                errors.aadhar = "Husband/Wife Aadhar number is required.";
                isValid = false;
            } else if (!/^\d{12}$/.test(aadhar)) {
                errors.aadhar = "Enter a valid 12-digit Aadhar number.";
                isValid = false;
            }

            setHusbandErrors(errors);
        }

        if (isValid) {
            console.log("Marital Status:", marriedStatus);
            if (marriedStatus === "Yes") {
                console.log("Husband/Wife Details:", husbandDetails);
            }
        }

        setErrors(errors);
        return isValid;
    };

    const handlePconatactnumberChange = (e) => {
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
    
      setcontact_number(value);
      };

    const handlePconatactnumber2Change = (e) => {
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
    
      setcontact_number1(value);
      };



    const handleHusbandDetailsChange = (field, value) => {
        if (field === "name") {
          // Allow only letters and spaces, and limit to 20 characters
          value = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 20);
        }
    
        if (field === "occupation") {
          // Allow only letters and spaces, and limit to 20 characters
          value = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 20);
        }
        
        
        if (field === "contact") {
          value = value.replace(/\D/g, ""); // Remove all non-numeric characters
      
          // Ensure "+91" is always the prefix
          if (value.startsWith("91")) {
            value = "+91" + value.slice(2, 12); // Keep only 10 digits after "+91"
          } else {
            value = "+91" + value.slice(0, 10); // Forcefully append "+91"
          }
      
          // Prevent deletion of "+91"
          if (value.length < 3) {
            value = "+91";
          }
        }
      
    
        if (field === "aadhar") {
          // Check if input is a number and has at most 12 digits
          if (/^\d{0,12}$/.test(value)) {
            if (value.length === 12) {
              setHusbandErrors((prevErrors) => ({ ...prevErrors, aadhar: null }));
            } else {
              setHusbandErrors((prevErrors) => ({
                ...prevErrors,
                aadhar: "Aadhar number must be exactly 12 digits.",
              }));
            }
          } else {
            return; // Prevent invalid input (non-numeric or exceeding 12 digits)
          }
        }
    
        setHusbandDetails((prev) => ({ ...prev, [field]: value }));
      };
    

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("+91")) {
            setcontact_details(value.slice(0, 13)); // Limit to "+91" and 10 digits
        } else {
            setcontact_details("+91" + value.slice(0, 10));
        }
    };

    const handleWhatsappChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("+91")) {
            setwhatsappno(value.slice(0, 13)); // Limit to "+91" and 10 digits
        } else {
            setwhatsappno("+91" + value.slice(0, 10));
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

    const isAgeValid = () => {
        const birthDate = new Date(dob);
        const today = new Date();
        const ageDiff = today.getFullYear() - birthDate.getFullYear();

        return (
            ageDiff > 18 ||
            (ageDiff === 18 &&
                today >=
                new Date(
                    today.getFullYear(),
                    birthDate.getMonth(),
                    birthDate.getDate()
                ))
        );
    };

    useEffect(() => {
        if (dob) {
            setAge(calculateAge(dob));
        } else {
            setAge("");
        }
    }, [dob]);


    const handleLinkChange = (e, platform) => {
        const value = e.target.value;
        let isValid = false;
        let errorMessage = null;
      
        // Validation for LinkedIn
        if (platform === 'linkedin') {
          const regex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9\-]+$/;
          isValid = regex.test(value);
          errorMessage = isValid ? null : "Please enter a valid LinkedIn URL starting with https://www.linkedin.com/in/";
        }
        
        // Validation for Facebook
        else if (platform === 'facebook') {
          const regex = /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9\.]+$/;
          isValid = regex.test(value);
          errorMessage = isValid ? null : "Please enter a valid Facebook URL starting with https://www.facebook.com/";
        }
      
        // Validation for YouTube
        else if (platform === 'youtube') {
          const regex = /^https:\/\/(www\.)?youtube\.com\/(channel|user|c)\/[a-zA-Z0-9_-]+$/;
          isValid = regex.test(value);
          errorMessage = isValid ? null : "Please enter a valid YouTube URL starting with https://www.youtube.com/";
        }
      
        // Validation for any other URL
        else if (platform === 'anyother') {
          const regex = /^(https:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-_]+)*\/?$/;
          isValid = regex.test(value);
          errorMessage = isValid ? null : "Please enter a valid URL.";
        }
      
        // Set the state based on platform
        if (platform === 'linkedin') {
          setlinkdin(value);
        } else if (platform === 'facebook') {
          setfacebook(value);
        } else if (platform === 'youtube') {
          setyoutube(value);
        } else if (platform === 'anyother') {
          setanyother_add(value);
        }
      
        // Set the error state
        setErrors((prevErrors) => ({
          ...prevErrors,
          [platform]: errorMessage,
        }));
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

    const handle_fatherPhoneChange = (e) => {
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
    
      setfather_contactdetails(value);
      };

    // const handle_fatherPhoneChange = (e) => {
    //     const value = e.target.value;
    //     if (value.startsWith("+91")) {
    //         setfather_contactdetails(value.slice(0, 13)); // Limit to "+91" and 10 digits
    //     } else {
    //         setfather_contactdetails("+91" + value.slice(0, 10));
    //     }
    // };

    
    
    const handle_fatherAadharChange = (e) => {
        const value = e.target.value;
    
        // Check if the input is a number and has exactly 12 digits
        if (/^\d{0,12}$/.test(value)) {
          setfather_aadharno(value);
          // Clear error if input is valid
          if (value.length === 12) {
            setErrors((prevErrors) => ({ ...prevErrors, father_aadharno: null }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              father_aadharno: "Aadhar number must be exactly 12 digits.",
            }));
          }
        }
      };
    
    
    
    
    
    
    const handlemotherAadharChange = (e) => {
        const value = e.target.value;

        // Check if the input is a number and has exactly 12 digits
        if (/^\d{0,12}$/.test(value)) {
            setmother_aadharno(value);
            // Clear error if input is valid
            if (value.length === 12) {
                setErrors((prevErrors) => ({ ...prevErrors, mother_aadharno: null }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mother_aadharno: "Aadhar number must be exactly 12 digits.",
                }));
            }
        }
    };

    const handle_motherPhoneChange = (e) => {
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
    
      setmother_contactdetails(value);
      };

    const handle_husbandAadharChange = (e) => {
        const value = e.target.value;

        // Check if the input is a number and has exactly 12 digits
        if (/^\d{0,12}$/.test(value)) {
            setHusband_aadharno(value);
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

    const handle_husbandPhoneChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("+91")) {
            setHusband_contactdetails(value.slice(0, 13)); // Limit to "+91" and 10 digits
        } else {
            setHusband_contactdetails("+91" + value.slice(0, 10));
        }
    };

    const handle_GuardianAadharChange = (e) => {
        const value = e.target.value;

        // Check if the input is a number and has exactly 12 digits
        if (/^\d{0,12}$/.test(value)) {
            setGuardian_aadharno(value);
            // Clear error if input is valid
            if (value.length === 12) {
                setErrors((prevErrors) => ({ ...prevErrors, Guardian_aadharno: null }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    Guardian_aadharno: "Aadhar number must be exactly 12 digits.",
                }));
            }
        }
    };

    const handle_GuardianPhoneChange = (e) => {
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
    
      setGuardiancontactdetails(value);
      };


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Fill all the details. Please check the highlighted fields.");
            return;
        }
    
        const token = localStorage.getItem("remember_token");
        const newData = {
            fname,
            mname,
            fathername,
            lname,
            email,
            parmanenat_address,
            current_address,
            whatsappno,
            contact_details,
            dob,
            age,
            gender,
            blood,
            aadhar: aadhar.toString(),
            linkdin,
            youtube,
            facebook,
            anyother_add,
            school_name,
            tenth_per,
            twelve_diploma_per,
            graduation_details,
            graduation_per,
            post_graduation_details,
            post_graduation_per,
            anyother_cirt,
            selected_branches,
            other_branch,
            father_name,
            father_contactdetails,
            father_aadharno,
            fatherOccupation,
            mother_name,
            motherOccupation,
            mother_aadharno,
            mother_contactdetails,
            marriedStatus,
            husbandDetails,
            guardian_name,
            GuardianOccupation,
            Guardian_aadharno,
            Guardian_contactdetails,
            date_of_joining,
            technology_name,
            duration,
            selectedModules,
            training_mode,
            intern_experience,
            experience,
            characteristics_describe,
            applicant_name,
            place,
            refrance_social_media,
            refrance_friend,
            refrance_family,
            refrance_relatives,
            refrance_other,
            scoperefer,
            reference_name,
            reference_name1,
            contact_number,
            contact_number1,
            buttom_applicant_name,
            buttom_place,
        };
    
        console.log("ID for update:", id);
        console.log("Data to update:", newData);
    
        try {
            const response = await axios.post(
                `https://api.sumagotraining.in/public/api/update-intern-joining/update/${student_id}`,
                newData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Data updated successfully!");
            navigate("/viewjoining")
            console.log("Update Response:", response.data);
        } catch (error) {
            console.error("Error updating data:", error.response?.data || error.message);
            alert(`Failed to update data. Error: ${error.response?.data?.message || error.message}`);
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
                            UPDATE <span className="highlight">INTERNS</span> DETAILS
                        </b>
                    </div>
                </Container>

                {/* Form Personal Details */}
                <Form onSubmit={handleSubmit}>
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
                                                First Name{" "}
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
                                                    value={fname}
                                                    // onChange={handleChange}
                                                    onChange={(e) => setfname(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.fname ? (
                                                    <span className="error text-danger">
                                                        {errors.fname}
                                                    </span>
                                                ) : (
                                                    "First Name"
                                                )}
                                            </Form.Label>

                                            {/* {errors.fname && <span className="error text-danger">{errors.fname}</span>} */}
                                        </Col>
                                        <Col lg={2} className="d-none d-md-block">
                                            <Form.Group
                                                className="mname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter mother name"
                                                    className="FormStyeling transparent-input"
                                                    value={mname}
                                                    // onChange={handleChange}
                                                    onChange={(e) => setmname(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.mname ? (
                                                    <span className="error text-danger">
                                                        {errors.mname}
                                                    </span>
                                                ) : (
                                                    "Mother Name"
                                                )}
                                            </Form.Label>
                                        </Col>
                                        <Col lg={2} className="d-none d-md-block">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter father name"
                                                    className="FormStyeling transparent-input"
                                                    value={fathername}
                                                    // onChange={handleChange}
                                                    onChange={(e) => setfathername(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.fathername ? (
                                                    <span className="error text-danger">
                                                        {errors.fathername}
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
                                                    value={lname}
                                                    // onChange={handleChange}
                                                    onChange={(e) => setlname(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.lname ? (
                                                    <span className="error text-danger">
                                                        {errors.lname}
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
                                                    value={fname}
                                                    // onChange={handleChange}
                                                    onChange={(e) => setfname(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.fname && (
                                                <span className="error text-danger">
                                                    {errors.fname}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={4} className="pt-4">
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
                                                    value={mname}
                                                    onChange={(e) => setmname(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.mname && (
                                                <span className="error text-danger">
                                                    {errors.mname}
                                                </span>
                                            )}
                                        </Col>
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
                                                    value={fathername}
                                                    onChange={(e) => setfathername(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.fathername && (
                                                <span className="error text-danger">
                                                    {errors.fathername}
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
                                                    value={lname}
                                                    onChange={(e) => setlname(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.lname && (
                                                <span className="error text-danger">
                                                    {errors.lname}
                                                </span>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/* email */}
                                        <Col lg={4}>
                                            <b style={{ fontFamily: "Century gothic" }}>Email Id</b>
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
                                                    value={email}
                                                    onChange={(e) => setemail(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.email && (
                                                <span className="error text-danger">
                                                    {errors.email}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={4}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Permanent Address
                                            </b>
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
                                                    value={parmanenat_address}
                                                    onChange={(e) =>
                                                        setparmanenat_address(e.target.value)
                                                    }
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.parmanenat_address && (
                                                <span className="error text-danger">
                                                    {errors.parmanenat_address}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={4}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Current Address
                                            </b>
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
                                                    value={current_address}
                                                    onChange={(e) => setcurrent_address(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.current_address && (
                                                <span className="error text-danger">
                                                    {errors.current_address}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Contact Details
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
                                                    value={contact_details}
                                                    onChange={handlePhoneChange}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.contact_details && (
                                                <span className="error text-danger">
                                                    {errors.contact_details}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Whatsapp No:
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
                                                    value={whatsappno}
                                                    onChange={handleWhatsappChange} readOnly
                                                    
                                                />
                                            </Form.Group>
                                            {errors.whatsappno && (
                                                <span className="error text-danger">
                                                    {errors.whatsappno}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Date Of Birth
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
                                                    value={`${formatDate(dob)}`}

                                                    onChange={(e) => setdob(e.target.value)}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.dob && (
                                                <span className="error text-danger">{errors.dob}</span>
                                            )}
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className="m-0">
                                            <b style={{ fontFamily: "Century gothic" }}>Age : </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className="FormStyeling"
                                                    value={age}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Gender</b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Male"
                                                    name="gender"
                                                    value="Male"
                                                    onChange={(e) => setgender(e.target.value)}
                                                    checked={gender === "Male"}
                                                    readOnly
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Female"
                                                    name="gender"
                                                    value="Female"
                                                    onChange={(e) => setgender(e.target.value)}
                                                    checked={gender === "Female"}
                                                    readOnly
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Blood Group
                                            </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                  type="text"
                                                    aria-label="Default select example"
                                                    className="FormStyeling transparent-input"
                                                    value={blood}
                                                    onChange={(e) => setblood(e.target.value)}
                                                    readOnly
                                                >
                                                    
                                                </Form.Control>
                                            </Form.Group>
                                            {errors.blood && (
                                                <span className="error text-danger">
                                                    {errors.blood}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Aadhar Card no
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
                                                    className="FormStyeling transparent-input"
                                                    value={aadhar}
                                                    onChange={handleAadharChange}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {errors.aadhar && (
                                                <span className="error text-danger">
                                                    {errors.aadhar}
                                                </span>
                                            )}
                                        </Col>
                                    </Row>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                    {/* Social Meadi address */}
                    <Container fluid>
                        {/* <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                                      <Card.Header className='cardpersonal_details'>
                                          <div className='position-absolute' style={{ backgroundColor: 'black', width: '20px', height: '30px' }}>
                                              <div className="personal-card-heading position-relative">
                                                  <b>SOCIAL MEADI ADDRESS</b>
                                              </div>
                                          </div>
                                      </Card.Header> */}
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
                                        <b className="form-title">SOCIAL MEDIA ADDRESS</b>
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
                                        {/* email */}
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                LinkedIn Address
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
                                                    className="FormStyeling transparent-input"
                                                    value={linkdin}
                                                    onChange={(e) => handleLinkChange(e, 'linkedin')}
                                                    placeholder="LinkedIn URL"
                                                  />
                                                  {errors.linkedin && <span>{errors.linkedin}</span>}
                                            </Form.Group>
                                            {/* {errors.linkdin && <span className="error text-danger">{errors.linkdin}</span>} */}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Facebook Address
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
                                                    className="FormStyeling transparent-input"
                                                    value={facebook}
                                                    onChange={(e) => handleLinkChange(e, 'facebook')}
                                                    placeholder="Facebook URL"
                                                  />
                                                  {errors.facebook && <span>{errors.facebook}</span>}
                                            </Form.Group>
                                            {/* {errors.facebook && <span className="error text-danger">{errors.facebook}</span>} */}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                YouTube Address
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
                                                    className="FormStyeling transparent-input"
                                                    value={youtube}
                                                    onChange={(e) => handleLinkChange(e, 'youtube')}
                          placeholder="YouTube URL"
                        />
                        {errors.youtube && <span>{errors.youtube}</span>}
                                            </Form.Group>
                                            {/* {errors.youtube && <span className="error text-danger">{errors.youtube}</span>} */}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Any Other Address
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
                                                    className="FormStyeling transparent-input"
                                                    value={anyother_add}
                                                    onChange={(e) => handleLinkChange(e, 'anyother')}
                                                    placeholder="Other URL"
                                                  />
                                                  {errors.anyother && <span>{errors.anyother}</span>}
                                            </Form.Group>
                                            {/* {errors.anyother_add && <span className="error text-danger">{errors.anyother_add}</span>} */}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>

                    {/* Educational Details */}
                    <Container fluid>
                        {/* <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                                      <Card.Header className='cardpersonal_details'>
                                          <div className='position-absolute' style={{ backgroundColor: 'black', width: '20px', height: '30px' }}>
                                              <div className="personal-card-heading position-relative">
                                                  <b>EDUCATIONAL DETAILS</b>
                                              </div>
                                          </div>
                                      </Card.Header> */}
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
                                        <b className="form-title">EDUCATIONAL DETAILS</b>
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
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                School Name
                                            </b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter School Name"
                                                    className="FormStyeling transparent-input"
                                                    value={school_name}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setschool_name(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.school_name && (
                                                <span className="error text-danger">
                                                    {errors.school_name}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                10<sup>th</sup> Percentage
                                            </b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter 10th Percentage"
                                                    className="FormStyeling transparent-input"
                                                    value={tenth_per}
                                                    onChange={(e) => {
                                                        let inputValue = e.target.value;
                                                    
                                                        // Allow only numbers with a single optional decimal point
                                                        if (/^\d*\.?\d*$/.test(inputValue)) {
                                                          if (inputValue === "" || parseFloat(inputValue) <= 100) {
                                                            settenth_per(inputValue);
                                                          }
                                                        }
                                                      }}
                                                      onBlur={() => {
                                                        // Ensure the value is at least 35 when user leaves the input field
                                                        if (tenth_per && parseFloat(tenth_per) < 35) {
                                                          settenth_per("35");
                                                        }
                                                      }}
                                                      maxLength={6} // Prevents excessively long input
                                                    />
                                            </Form.Group>
                                            {errors.tenth_per && (
                                                <span className="error text-danger">
                                                    {errors.tenth_per}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                12<sup>th</sup>/Diploma Percentage
                                            </b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter 12th/Diploma percentage"
                                                    className="FormStyeling transparent-input"
                                                    value={twelve_diploma_per}
                                                    onChange={(e) => {
                                                        let inputValue = e.target.value;
                                                    
                                                        // Allow only numbers with a single optional decimal point
                                                        if (/^\d*\.?\d*$/.test(inputValue)) {
                                                          if (inputValue === "" || parseFloat(inputValue) <= 100) {
                                                            settwelve_diploma_per(inputValue);
                                                          }
                                                        }
                                                      }}
                                                      onBlur={() => {
                                                        // Ensure the value is at least 35 when user leaves the input field
                                                        if (twelve_diploma_per && parseFloat(twelve_diploma_per) < 35) {
                                                          settwelve_diploma_per("35");
                                                        }
                                                      }}
                                                      maxLength={6} // Prevents excessively long input
                                                    />
                                            </Form.Group>
                                            {errors.twelve_diploma_per && (
                                                <span className="error text-danger">
                                                    {errors.twelve_diploma_per}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Graduation Details
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Graduation Details"
                                                    className="FormStyeling transparent-input"
                                                    value={graduation_details}
                                                    onChange={(e) => {
                                                        let newValue = e.target.value.replace(/[^A-Za-z.]/g, ""); // Remove spaces
                                                        if (newValue.length <= 20) {
                                                          setgraduation_details(newValue); // Update state only if within 10 characters
                                                        }
                                                      }}
                                                    />
                                            </Form.Group>
                                            {errors.graduation_details && (
                                                <span className="error text-danger">
                                                    {errors.graduation_details}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Graduation Percentage:
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Graduation Percentage"
                                                    className="FormStyeling transparent-input"
                                                    value={graduation_per}
                                                    onChange={(e) => {
                                                        let inputValue = e.target.value;
                                                    
                                                        // Allow only numbers with a single optional decimal point
                                                        if (/^\d*\.?\d*$/.test(inputValue)) {
                                                          if (inputValue === "" || parseFloat(inputValue) <= 100) {
                                                            setgraduation_per(inputValue);
                                                          }
                                                        }
                                                      }}
                                                      onBlur={() => {
                                                        // Ensure the value is at least 35 when user leaves the input field
                                                        if (graduation_per && parseFloat(graduation_per) < 35) {
                                                          setgraduation_per("35");
                                                        }
                                                      }}
                                                      maxLength={6} // Prevents excessively long input
                                                    />
                                            </Form.Group>
                                            {errors.graduation_per && (
                                                <span className="error text-danger">
                                                    {errors.graduation_per}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Post Graduation Details
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Post Graduation Details"
                                                    className="FormStyeling transparent-input"
                                                    value={post_graduation_details || "Not Specified"}
                                                    onChange={(e) => {
                                                        let newValue = e.target.value.replace(/[^A-Za-z.]/g, ""); // Allow only letters and '.'
                                                        if (newValue.length <= 20) {
                                                          setPostGraduationDetails(newValue); // Update state only if within 20 characters
                                                        }
                                                      }}
                                                    />
                                            </Form.Group>
                                            {errors.post_graduation_details && (
                                                <span className="error text-danger">
                                                    {errors.post_graduation_details}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Post Graduation Percentage:
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Post Graduation Percentage"
                                                    className="FormStyeling transparent-input"
                                                    value={post_graduation_per || "Not Specified"}
                                                    onChange={(e) => {
                                                        let inputValue = e.target.value;
                                                    
                                                        // Allow only numbers with a single optional decimal point
                                                        if (/^\d*\.?\d*$/.test(inputValue)) {
                                                          if (inputValue === "" || parseFloat(inputValue) <= 100) {
                                                            setPostGraduationPer(inputValue);
                                                          }
                                                        }
                                                      }}
                                                      onBlur={() => {
                                                        // Ensure the value is at least 35 when user leaves the input field
                                                        if (post_graduation_per && parseFloat(post_graduation_per) < 35) {
                                                          setPostGraduationPer("35");
                                                        }
                                                      }}
                                                      maxLength={6} // Prevents excessively long input
                                                    />
                                            </Form.Group>
                                            {errors.post_graduation_per && (
                                                <span className="error text-danger">
                                                    {errors.post_graduation_per}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Branch</b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            {/* <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                      <Form.Control
                                                          type="text"
                                                          className="FormStyeling transparent-input"
                                                          placeholder="Enter text"
                                                      />
                                                  </Form.Group> */}
                                            <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Computer"
                                                    name="selected_branches"
                                                    value="Computer"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === "Computer"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="IT"
                                                    name="selected_branches"
                                                    value="IT"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === "IT"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Mechanical"
                                                    name="selected_branches"
                                                    value="Mechanical"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === "Mechanical"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="AIDS"
                                                    name="selected_branches"
                                                    value="AIDS"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === "AIDS"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="AIML"
                                                    name="selected_branches"
                                                    value="AIML"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === "AIML"}
                                                />

                                                <Form.Check
                                                    type="radio"
                                                    label="Other"
                                                    name="selected_branches"
                                                    value="Other"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === "Other"}
                                                />
                                            </div>
                                            {errors.selected_branches && (
                                                <span className="error text-danger">
                                                    {errors.selected_branches}
                                                </span>
                                            )}
                                           
                                          
                                            {/* <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="Computer"
                                                              name="Computer"
                                                              checked={selected_branches.includes('Computer')}
                                                              onChange={handleBranchChange}
          
                                                          />
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="IT"
                                                              name="IT"
                                                              checked={selected_branches.includes('IT')}
                                                              onChange={handleBranchChange}
          
                                                          />
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="Mechanical"
                                                              name="Mechanical"
                                                              checked={selected_branches.includes('Mechanical')}
                                                              onChange={handleBranchChange}
          
                                                          />
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="AIDS"
                                                              name="AIDS"
                                                              checked={selected_branches.includes('AIDS')}
                                                              onChange={handleBranchChange}
          
                                                          />
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="AIML"
                                                              name="AIML"
                                                              checked={selected_branches.includes('AIML')}
                                                              onChange={handleBranchChange}
          
                                                          />
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="Other"
                                                              name="Other"
                                                              checked={selected_branches.includes('Other')}
                                                              onChange={handleBranchChange}
          
                                                          />
          
                                                      </div>
                                                      {errors.selected_branches && <span className="error text-danger">{errors.selected_branches}</span>}
                                                      {selected_branches.includes('Other') && (
                                                          <Form.Control
          
                                                              type="text" placeholder="Enter other cirtification" className='FormStyeling transparent-input'
                                                              value={other_branch}
                                                              onChange={handleother_branchChange}
                                                          />
                                                      )}
                                                      {errors.other_branch && <span className="error text-danger">{errors.other_branch}</span>} */}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Any Other Certification
                                            </b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    className="FormStyeling transparent-input"
                                                    value={anyother_cirt}
                                                    onChange={(e) => {
                                                        if (e.target.value.length <= 50) {
                                                          setanyother_cirt(e.target.value); // Update state only if within 50 characters
                                                        }
                                                      }}
                                                    />
                                            </Form.Group>
                                            {errors.anyother_cirt && (
                                                <span className="error text-danger">
                                                    {errors.anyother_cirt}
                                                </span>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>

                    {/* P A R E N T S / G U A R D I A N D E T A I L S */}
                    <Container fluid>
                        {/* <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                                      <Card.Header className="cardpersonal_details">
                                          <div
                                              className="position-absolute"
                                              style={{ backgroundColor: "black", width: "20px", height: "30px" }}
                                          >
                                              <div className="personal-card-heading position-relative">
                                                  <b>PARENTS / GAUARDIANDETAILS</b>
                                              </div>
                                          </div>
                                      </Card.Header> */}
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
                                        <b className="form-title">PARENTS / GUARDIAN DETAILS</b>
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
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Father Name
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Father Name"
                                                    className="FormStyeling transparent-input"
                                                    value={father_name}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setfather_name(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.father_name && (
                                                <span className="error text-danger">
                                                    {errors.father_name}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Father Occupation
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Father Occupation"
                                                    className="FormStyeling transparent-input"
                                                    value={fatherOccupation}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setfatherOccupation(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.fatherOccupation && (
                                                <span className="error text-danger">
                                                    {errors.fatherOccupation}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Father Contact Details
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="+91"
                                                    className="FormStyeling transparent-input"
                                                    value={father_contactdetails}
                                                    onChange={handle_fatherPhoneChange}
                                                />
                                            </Form.Group>
                                            {errors.father_contactdetails && (
                                                <span className="error text-danger">
                                                    {errors.father_contactdetails}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Father Aadhar card no
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Father Aadhar card no"
                                                    className="FormStyeling transparent-input"
                                                    value={father_aadharno}
                                                    onChange={handle_fatherAadharChange}
                                                ></Form.Control>
                                            </Form.Group>
                                            {errors.father_aadharno && (
                                                <span className="error text-danger">
                                                    {errors.father_aadharno}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Mother Name
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Mother Name"
                                                    className="FormStyeling transparent-input"
                                                    value={mother_name}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setmother_name(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.mother_name && (
                                                <span className="error text-danger">
                                                    {errors.mother_name}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Mother Occupation
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Mother Occupation"
                                                    className="FormStyeling transparent-input"
                                                    value={motherOccupation}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setmotherOccupation(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.motherOccupation && (
                                                <span className="error text-danger">
                                                    {errors.motherOccupation}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Mother Contact Details
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="+91"
                                                    className="FormStyeling transparent-input"
                                                    value={mother_contactdetails}
                                                    onChange={handle_motherPhoneChange}
                                                />
                                            </Form.Group>
                                            {errors.mother_contactdetails && (
                                                <span className="error text-danger">
                                                    {errors.mother_contactdetails}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Mother Aadhar card no
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Mother Aadhar card no"
                                                    className="FormStyeling transparent-input"
                                                    value={mother_aadharno}
                                                    onChange={handlemotherAadharChange}
                                                ></Form.Control>
                                            </Form.Group>
                                            {errors.mother_aadharno && (
                                                <span className="error text-danger">
                                                    {errors.mother_aadharno}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Married</b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Yes"
                                                    name="maritalStatus"
                                                    value="Yes"
                                                    onChange={(e) => setMarriedStatus(e.target.value)}
                                                    checked={marriedStatus === "Yes"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="No"
                                                    name="maritalStatus"
                                                    value="No"
                                                    checked={marriedStatus === "No"}
                                                    onChange={(e) => {
                                                        setMarriedStatus(e.target.value);
                                                        setHusbandDetails({
                                                            name: "",
                                                            occupation: "",
                                                            contact: "",
                                                            aadhar: "",
                                                        });
                                                        setHusbandErrors({});
                                                    }}
                                                />
                                            </div>
                                            {error && <span className="text-danger">{error}</span>}
                                        </Col>
                                        <bt />
                                        {marriedStatus === "Yes" && (
                                            <>
                                                <Row>
                                                    <Col lg={4} md={4} sm={12}>
                                                        <b
                                                            style={{ fontFamily: "Century gothic" }}
                                                            className="p-0 m-0"
                                                        >
                                                            Husband/Wife Name
                                                        </b>
                                                    </Col>
                                                    <Col lg={3} md={3} sm={12} className="mb-3">
                                                        <Form.Group
                                                            className="fname"
                                                            controlId="exampleForm.ControlInput1"
                                                        >
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter Husband/Wife name"
                                                                className="FormStyeling transparent-input"
                                                                value={husbandDetails.name}
                                                                onChange={(e) =>
                                                                    handleHusbandDetailsChange(
                                                                        "name",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Form.Group>
                                                        {husbandErrors.name && (
                                                            <span className="text-danger">
                                                                {husbandErrors.name}
                                                            </span>
                                                        )}
                                                    </Col>
                                                    <Col lg={2} md={2} sm={12} className="m-0 ">
                                                        <b style={{ fontFamily: "Century gothic" }}>
                                                            Husband/Wife Occupation
                                                        </b>
                                                    </Col>
                                                    <Col lg={3} md={3} sm={12} className="mb-3">
                                                        <Form.Group
                                                            className="fname"
                                                            controlId="exampleForm.ControlInput1"
                                                        >
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter Husband/Wife occupation"
                                                                className="FormStyeling transparent-input"
                                                                value={husbandDetails.occupation}
                                                                onChange={(e) =>
                                                                    handleHusbandDetailsChange(
                                                                        "occupation",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Form.Group>
                                                        {husbandErrors.occupation && (
                                                            <span className="text-danger">
                                                                {husbandErrors.occupation}
                                                            </span>
                                                        )}
                                                    </Col>

                                                    <Col lg={4} md={4} sm={12}>
                                                        <b style={{ fontFamily: "Century gothic" }}>
                                                            Husband/Wife Contact Details
                                                        </b>
                                                    </Col>
                                                    <Col lg={3} md={3} sm={12} className="mb-3">
                                                        <Form.Group
                                                            className="fname"
                                                            controlId="exampleForm.ControlInput1"
                                                        >
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="+91"
                                                                className="FormStyeling transparent-input"
                                                                value={husbandDetails.contact}
                                                                onChange={(e) =>
                                                                    handleHusbandDetailsChange(
                                                                        "contact",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Form.Group>
                                                        {husbandErrors.contact && (
                                                            <span className="text-danger">
                                                                {husbandErrors.contact}
                                                            </span>
                                                        )}
                                                    </Col>
                                                    <Col lg={2} md={2} sm={12} className="m-0 ">
                                                        <b style={{ fontFamily: "Century gothic" }}>
                                                            Husband/Wife Aadhar No
                                                        </b>
                                                    </Col>
                                                    <Col lg={3} md={3} sm={12} className="mb-3">
                                                        <Form.Group
                                                            className="fname"
                                                            controlId="exampleForm.ControlInput1"
                                                        >
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter Husband/Wife Aadhar card no"
                                                                className="FormStyeling transparent-input"
                                                                value={husbandDetails.aadhar}
                                                                onChange={(e) =>
                                                                    handleHusbandDetailsChange(
                                                                        "aadhar",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            ></Form.Control>
                                                        </Form.Group>
                                                        {husbandErrors.aadhar && (
                                                            <span className="text-danger">
                                                                {husbandErrors.aadhar}
                                                            </span>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Guardian Name
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Guardian Name"
                                                    className="FormStyeling transparent-input"
                                                    value={guardian_name || "Not Specified"}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setguardian_name(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {/* {errors.guardian_name && (
                                  <span className="error text-danger">
                                    {errors.guardian_name}
                                  </span>
                                )} */}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Guardian Occupation
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Guardian Occupation"
                                                    className="FormStyeling transparent-input"
                                                    value={GuardianOccupation || "Not Specified"}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setGuardianOccupation(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {/* {errors.GuardianOccupation && (
                                  <span className="error text-danger">
                                    {errors.GuardianOccupation}
                                  </span>
                                )} */}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Guardian Contact Details
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="+91"
                                                    className="FormStyeling transparent-input"
                                                    value={Guardian_contactdetails || "Not Specified"}
                                                    onChange={handle_GuardianPhoneChange}
                                                />
                                            </Form.Group>
                                            {/* {errors.Guardian_contactdetails && (
                                  <span className="error text-danger">
                                    {errors.Guardian_contactdetails}
                                  </span>
                                )} */}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className="m-0 ">
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Guardian Aadhar card no
                                            </b>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Guardian Aadhar card no"
                                                    className="FormStyeling transparent-input"
                                                    value={Guardian_aadharno || "Not Specified"}
                                                    onChange={handle_GuardianAadharChange}
                                                ></Form.Control>
                                            </Form.Group>
                                            {/* {errors.Guardian_aadharno && (
                                  <span className="error text-danger">
                                    {errors.Guardian_aadharno}
                                  </span>
                                )} */}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>

                    {/* I N T E R N S H I P D E T A I L S */}
                    <Container fluid>
                        {/* <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                                      <Card.Header className="cardpersonal_details">
                                          <div
                                              className="position-absolute"
                                              style={{ backgroundColor: "black", width: "20px", height: "30px" }}
                                          >
                                              <div className="personal-card-heading position-relative">
                                                  <b>INTERNSHIP DETAILS</b>
                                              </div>
                                          </div>
                                      </Card.Header> */}
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
                                        <b className="form-title">INTERNSHIP DETAILS</b>
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
                                      <Col lg={4} md={4} sm={12}>
                                        <b style={{ fontFamily: "Century Gothic" }}>Date Of Joining</b>
                                      </Col>
                                      <Col lg={3} md={3} sm={12} className="mb-3">
                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                          <Form.Control
                                            type="date"
                                            className="FormStyeling transparent-input"
                                            value={date_of_joining}
                                            onChange={(e) => setdate_of_joining(e.target.value)}
                                          />
                                        </Form.Group>
                                        {errors.date_of_joining && (
                                          <span className="error text-danger">{errors.date_of_joining}</span>
                                        )}
                                      </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Technology Name
                                            </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className="FormStyeling transparent-input"
                                                    value={technology_name}
                                                    onChange={(e) => settechnology_name(e.target.value)}
                                                >
                                                    <option>Select Technology</option>
                                                    <option value="MERN Stack Development">
                                                        MERN Stack Development
                                                    </option>
                                                    <option value="MEAN Stack Development">
                                                        MEAN Stack Development
                                                    </option>
                                                    <option value="Full Stack Java Development">
                                                        Full Stack Java Development
                                                    </option>
                                                    <option value="Python Development ">
                                                        Python Development{" "}
                                                    </option>
                                                    <option value="AWS Devops">AWS Devops</option>
                                                    <option value="Data Science">Data Science</option>
                                                    <option value="Data Analytics">Data Analytics</option>
                                                    <option value="AIML">AIML</option>
                                                    <option value="UI-UX Designing">
                                                        UI-UX Designing
                                                    </option>
                                                    <option value="Software Testing">
                                                        Software Testing
                                                    </option>
                                                </Form.Select>
                                            </Form.Group>
                                            {errors.technology_name && (
                                                <span className="error text-danger">
                                                    {errors.technology_name}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Duration</b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="45 Days"
                                                    name="duretion"
                                                    value="45 Days"
                                                    checked={duration === "45 Days"}
                                                    onChange={(e) => setduration(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="3 months"
                                                    name="duretion"
                                                    value="3 months"
                                                    checked={duration === "3 months"}

                                                    onChange={(e) => setduration(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="6 months"
                                                    name="duretion"
                                                    value="6 months"
                                                    checked={duration === "6 months"}
                                                    onChange={(e) => setduration(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="9 months"
                                                    name="duretion"
                                                    value="9 months"
                                                    checked={duration === "9 months"}
                                                    onChange={(e) => setduration(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="12 months"
                                                    name="duretion"
                                                    value="12 months"
                                                    checked={duration === "12 months"}
                                                    onChange={(e) => setduration(e.target.value)}
                                                />
                                            </div>
                                            {errors.duration && (
                                                <div className="text-danger">{errors.duration}</div>
                                            )}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>Module</b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Secure Employment"
                                                    name="selectedModules"
                                                    value="Secure Employment"
                                                    onChange={(e) => setSelectedModules(e.target.value)}
                                                    checked={selectedModules === "Secure Employment"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Pro Career Assurance"
                                                    name="selectedModules"
                                                    value="Pro Career Assurance"
                                                    onChange={(e) => setSelectedModules(e.target.value)}
                                                    checked={selectedModules === "Pro Career Assurance"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Pay After Placement"
                                                    name="selectedModules"
                                                    value="Pay After Placement"
                                                    onChange={(e) => setSelectedModules(e.target.value)}
                                                    checked={selectedModules === "Pay After Placement"}
                                                />
                                            </div>
                                            {errors.selectedModules && (
                                                <div className="text-danger">
                                                    {errors.selectedModules}
                                                </div>
                                            )}
                                            {/* <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="Secure Employment"
                                                              value="secure employment"
                                                              checked={selectedModules.includes('secure employment')}
                                                              onChange={handleCheckboxChange}
                                                          />
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="Pro Career Assurance"
                                                              value="Pro Career Assurance"
                                                              checked={selectedModules.includes('Pro Career Assurance')}
                                                              onChange={handleCheckboxChange}
                                                          />
                                                          <Form.Check
                                                              type="checkbox"
                                                              label="Pay After Placement"
                                                              value="Pay After Placement"
                                                              checked={selectedModules.includes('Pay After Placement')}
                                                              onChange={handleCheckboxChange}
                                                          />
                                                      </div>
                                                      
                                                      {errors.selectedModules && (
                                                          <div className="text-danger">{errors.selectedModules}</div>
                                                      )} */}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Training Mode
                                            </b>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-3">
                                            <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Online"
                                                    name="training_mode"
                                                    value="Online"
                                                    onChange={(e) =>
                                                        setSelectedtraining_mode(e.target.value)
                                                    }
                                                    checked={training_mode === "Online"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Offline"
                                                    name="training_mode"
                                                    value="Offline"
                                                    onChange={(e) =>
                                                        setSelectedtraining_mode(e.target.value)
                                                    }
                                                    checked={training_mode === "Offline"}
                                                />
                                            </div>
                                            {errors.training_mode && (
                                                <div className="text-danger">
                                                    {errors.training_mode}
                                                </div>
                                            )}
                                        </Col>

                                        <Col lg={12} md={12} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Do you have Previous Work , internship or Volunteer
                                                Experience ?
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Yes"
                                                    name="intern"
                                                    value="Yes"
                                                    onChange={(e) => setintern_experience(e.target.value)}
                                                    checked={intern_experience === "Yes"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="No"
                                                    name="intern"
                                                    value="No"
                                                    onChange={(e) => setintern_experience(e.target.value)}
                                                    checked={intern_experience === "No"}
                                                />
                                            </div>
                                            {errors.intern_experience && (
                                                <div className="text-danger">
                                                    {errors.intern_experience}
                                                </div>
                                            )}
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className="mb-5">
                                            {intern_experience === "Yes" && (
                                                <div>
                                                    <Form.Group
                                                        className="fname"
                                                        controlId="exampleForm.ControlInput1"
                                                    >
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Previous Experience"
                                                            className="FormStyeling transparent-input"
                                                            value={experience}
                                                            onChange={(e) =>
                                                                setexperience(e.target.value)
                                                            }
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    {/* {errors.experience && <span className="error text-danger">{errors.experience}</span>} */}
                                                    <Form.Label className="w-100 text-center">
                                                        {errors.experience ? (
                                                            <span className="error text-danger">
                                                                {errors.experience}
                                                            </span>
                                                        ) : (
                                                            "Please Mention Your Experinace"
                                                        )}
                                                    </Form.Label>
                                                </div>
                                            )}
                                        </Col>

                                        <b style={{ fontFamily: "Century gothic" }}>
                                            Which characteristics best describe you?
                                        </b>
                                        <Form.Group
                                            className="fname mb-3"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="FormStyeling transparent-input"
                                                as="textarea"
                                                rows={4}
                                                value={characteristics_describe}
                                                onChange={(e) => {
                                                    const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                    if (onlyLetters.length <= 50) { // Set max length to 30 characters
                                                      setcharacteristics_describe(onlyLetters);
                                                    }
                                                  }}
                                                  maxLength={50}
                                                />
                                        </Form.Group>
                                        {errors.characteristics_describe && (
                                            <div className="text-danger">
                                                {errors.characteristics_describe}
                                            </div>
                                        )}

                                        <b
                                            style={{ fontFamily: "Century gothic" }}
                                            className="mb-3"
                                        >
                                            Note: You have an 8-day period to change your choosen
                                            technology. If you wish to make a change, please do so
                                            within 8-days of timeframe.
                                        </b>

                                        <Col lg={4} md={4} sm={12}>
                                            <div class="box"></div>
                                            <Form.Label className="w-100 text-center">
                                                Applicant Signature
                                            </Form.Label>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <Form.Group
                                                className="fname1 mb-2"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    className=" FormStyeling transparent-input"
                                                    as="textarea"
                                                    rows={4}
                                                    value={applicant_name}
                                                    onChange={(e) => setapplicant_name(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.applicant_name ? (
                                                    <span className="error text-danger">
                                                        {errors.applicant_name}
                                                    </span>
                                                ) : (
                                                    "Please Mention Applicant name"
                                                )}
                                            </Form.Label>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <Form.Group
                                                className="fname1 mb-2"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    className="FormStyeling transparent-input"
                                                    as="textarea"
                                                    rows={4}
                                                    value={place}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setplace(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.place ? (
                                                    <span className="error text-danger">
                                                        {errors.place}
                                                    </span>
                                                ) : (
                                                    "Please Mention place"
                                                )}
                                            </Form.Label>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>

                    {/* R E F E R E N C E */}
                    <Container fluid>
                        {/* <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                                      <Card.Header className="cardpersonal_details">
                                          <div
                                              className="position-absolute"
                                              style={{ backgroundColor: "black", width: "20px", height: "30px" }}
                                          >
                                              <div className="personal-card-heading position-relative">
                                                  <b>REFERENCE</b>
                                              </div>
                                          </div>
                                      </Card.Header> */}

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
                                        <b className="form-title">REFERENCE</b>
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
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Social Media :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Social Media"
                                                    className="FormStyeling transparent-input"
                                                    value={refrance_social_media || "Not Specified"}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setrefrance_social_media(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.refrance_social_media && (
                                                <span className="error text-danger">
                                                    {errors.refrance_social_media}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Friend :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Friend Name"
                                                    className="FormStyeling transparent-input"
                                                    value={refrance_friend || "Not Specified"}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setrefrance_friend(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.refrance_friend && (
                                                <span className="error text-danger">
                                                    {errors.refrance_friend}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Family :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Family"
                                                    className="FormStyeling transparent-input"
                                                    value={refrance_family || "Not Specified"}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setrefrance_family(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.refrance_family && (
                                                <span className="error text-danger">
                                                    {errors.refrance_family}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Relatives :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Relatives"
                                                    className="FormStyeling transparent-input"
                                                    value={refrance_relatives || "Not Specified"}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setrefrance_relatives(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.refrance_relatives && (
                                                <span className="error text-danger">
                                                    {errors.refrance_relatives}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Other :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Other"
                                                    className="FormStyeling transparent-input"
                                                    value={refrance_other || "Not Specified"}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setrefrance_other(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.refrance_other && (
                                                <span className="error text-danger">
                                                    {errors.refrance_other}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={5} md={5} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Would you like to give reference about Scope / Sumago ?
                                                :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className="mb-5">
                                            <Form.Check
                                                type="radio"
                                                label="Yes"
                                                name="scoperefer"
                                                value="Yes"
                                                checked={scoperefer === "Yes"}
                                                onChange={(e) => setscoperefer(e.target.value)}
                                            />
                                        </Col>
                                        <Col lg={1} md={2} sm={12}>
                                            <Form.Check
                                                type="radio"
                                                label="no"
                                                name="scoperefer"
                                                checked={scoperefer === "No"}
                                                onChange={(e) => setscoperefer(e.target.value)}
                                            />
                                            {errors.scoperefer && (
                                                <div className="text-danger">{errors.scoperefer}</div>
                                            )}
                                        </Col>
                                        <bt />
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century Gothic" }}>
                                                Reference name:{" "}
                                            </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1 mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    className="FormStyeling transparent-input"
                                                    value={reference_name}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setRefereance_name(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center"></Form.Label>
                                            {errors.reference_name && (
                                                <span className="error text-danger">
                                                    {errors.reference_name}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput2 mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    className="FormStyeling transparent-input"
                                                    value={reference_name1}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setRefereance_name1(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center"></Form.Label>
                                            {errors.reference_name1 && (
                                                <span className="error text-danger">
                                                    {errors.reference_name1}
                                                </span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Contact number :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1 mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    className="FormStyeling transparent-input"
                                                    placeholder="+91"
                                                    value={contact_number}
                                                    onChange={handlePconatactnumberChange}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center"></Form.Label>
                                            {errors.contact_number && (
                                                <span className="error text-danger">
                                                    {errors.contact_number}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={5} md={5} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1 mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    className="FormStyeling transparent-input"
                                                    placeholder="+91"
                                                    value={contact_number1}
                                                    onChange={handlePconatactnumber2Change}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center"></Form.Label>
                                            {errors.contact_number1 && (
                                                <span className="error text-danger">
                                                    {errors.contact_number1}
                                                </span>
                                            )}
                                        </Col>

                                        <b
                                            className="mb-5"
                                            style={{
                                                fontFamily: "Century Gothic",
                                                textAlign: "justify",
                                            }}
                                        >
                                            I certify that the information I have provided above is
                                            true to the best of my knowledge and belief, without any
                                            malice or intention to commit acts of misrepresentation. I
                                            am aware that any false, misleading, or deceptive
                                            information provided may lead to withdrawal, exclusion, or
                                            disciplinary action, which may be dealt with by the
                                            company or relevant authorities.
                                        </b>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: "Century gothic" }}>
                                                Name of Applicant :{" "}
                                            </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12} className="mb-5">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Applicant Name"
                                                    className="FormStyeling transparent-input"
                                                    value={buttom_applicant_name}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setbuttonapplicantname(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.buttom_applicant_name && (
                                                <span className="error text-danger">
                                                    {errors.buttom_applicant_name}
                                                </span>
                                            )}
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className="m-0">
                                            <b
                                                className="single-line"
                                                style={{ fontFamily: "Century Gothic" }}
                                            >
                                                Place:
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <Form.Group
                                                className="fname"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Place"
                                                    className="FormStyeling transparent-input"
                                                    value={buttom_place}
                                                    onChange={(e) => {
                                                        const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters & spaces
                                                        if (onlyLetters.length <= 20) { // Set max length to 30 characters
                                                          setbuttom_place(onlyLetters);
                                                        }
                                                      }}
                                                      maxLength={20}
                                                    />
                                            </Form.Group>
                                            {errors.buttom_place && (
                                                <span className="error text-danger">
                                                    {errors.buttom_place}
                                                </span>
                                            )}
                                        </Col>

                                        {/* <Col lg={2} md={2} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Name of Applicant : </b></Col>
                                                  <Col lg={4} md={4} sm={12} className='mb-3'>
                                                      <Form.Group className="fname mb-2" controlId="exampleForm.ControlInput1">
                                                          <Form.Control type="date" className='FormStyeling transparent-input' as="textarea" rows={4} value={applicant_name} onChange={(e) => setapplicant_name(e.target.value)}></Form.Control>
                                                      </Form.Group> */}

                                        <Col lg={2} md={2} sm={12} className="m-0">
                                            <b style={{ fontFamily: "Century Gothic" }}>
                                                Date Signed by Applicant:
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <div className="box"></div>
                                        </Col>

                                        {/* <Form.Control
                              <Col lg={2} md={2} sm={12}>
                                <b style={{ fontFamily: "Century gothic" }}>
                                  Name of Applicant :{" "}
                                </b>
                              </Col>
                              <Col lg={4} md={4} sm={12} className="mb-3">
                                <Form.Group
                                  className="fname mb-2"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Control
                                    type="date"
                                    className="FormStyeling transparent-input"
                                    as="textarea"
                                    rows={4}
                                    value={applicant_name}
                                    onChange={(e) => setapplicant_name(e.target.value)}
                                  ></Form.Control>
                                </Form.Group>
                                {/* <Form.Control
                                                              type="date"
                                                              placeholder="Enter date"
                                                              className=' transparent-input'  rows={4}
                                                              
                                                          /> */}
                                        {/* </Col> */}
                                        {/* <Col lg={2} md={2} sm={12} className="m-0">
                              </Col>
                              {/* <Col lg={2} md={2} sm={12} className="m-0">
                                                      <b className="single-line1" style={{ fontFamily: 'Century Gothic' }}>
                                                          Applicant Signature:
                                                      </b>
                                                  </Col>
                                                  <Col lg={4} md={4} sm={12} className="mb-3">
                                                      <div className="box"></div>
                                                  </Col>
                                                  <Col lg={1} md={1} sm={12} className="m-0">
                                                      <b className="single-line" style={{ fontFamily: 'Century Gothic' }}>Place:</b>
                                                  </Col> */}
                                        <Col lg={2} md={2} sm={12} className="m-0">
                                            <b style={{ fontFamily: "Century Gothic" }}>
                                                Applicant Signature:
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <div className="box"></div>
                                        </Col>
                                    </Row>
                                    <div className="button-container">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={{
                                                backgroundColor: "#28a745",
                                                borderColor: "#28a745",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Submit
                                        </Button>


                                    </div>

                                    {/* <Button variant="primary" type='submit'>submit</Button>
          
                                              <Button variant="primary" onClick={handlePrint}>Print</Button> */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                </Form>
            </div>
        </>
    );
}

export default UpdateInternDetails;
