import React, { useState, useEffect, useRef } from 'react'
import './completion.css'
import logo1 from '../imgs/SCOPE FINAL LOGO Black.png';
import logo2 from '../imgs/SUMAGO Logo (2) (1).png';
import corner from '../imgs/file (28).png';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

function InterJoining() {

    const [fname, setfname] = useState('')
    const [mname, setmname] = useState('')
    const [fathername, setfathername] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [parmanenat_address, setparmanenat_address] = useState('')
    const [current_address, setcurrent_address] = useState('')
    const [contact_details, setcontact_details] = useState('')
    const [whatsappno, setwhatsappno] = useState('')
    const [dob, setdob] = useState('')
    const [age, setAge] = useState('')
    const [blood, setblood] = useState('')
    const [aadhar, setaadhar] = useState('')
    const [linkdin, setlinkdin] = useState('')
    const [facebook, setfacebook] = useState('')
    const [youtube, setyoutube] = useState('')
    const [anyother_add, setanyother_add] = useState('')
    const [school_name, setschool_name] = useState('');
    const [tenth_per, settenth_per] = useState('');
    const [twelve_diploma_per, settwelve_diploma_per] = useState('');
    const [graduation_details, setgraduation_details] = useState('');
    const [graduation_per, setgraduation_per] = useState('');
    const [post_graduation_details, setPostGraduationDetails] = useState('');
    const [post_graduation_per, setPostGraduationPer] = useState('');
    const [anyother_cirt, setanyother_cirt] = useState('')
    const [selected_branches, setselected_branches] = useState('');
    const [other_branch, setother_branch] = useState('');  // To track 'Other' branch input

    const [father_name, setfather_name] = useState('')
    const [fatherOccupation, setfatherOccupation] = useState('')
    const [father_contactdetails, setfather_contactdetails] = useState('')
    const [father_aadharno, setfather_aadharno] = useState('')
    const [mother_name, setmother_name] = useState('')
    const [motherOccupation, setmotherOccupation] = useState('')
    const [mother_contactdetails, setmother_contactdetails] = useState('')
    const [mother_aadharno, setmother_aadharno] = useState('')
    const [marriedStatus, setMarriedStatus] = useState('');
    const [error, setError] = useState('');
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [husbandDetails, setHusbandDetails] = useState({
        name: '',
        occupation: '',
        contact: '',
        aadhar: '',
    });
    const [husbandErrors, setHusbandErrors] = useState({
        name: '',
        occupation: '',
        contact: '',
        aadhar: '',
    });
    const [Husband_pareantgauaradiandetails, setHusband_pareantgauaradiandetails] = useState('')
    const [HusbandOccupation, setHusbandOccupation] = useState('')
    const [Husband_contactdetails, setHusband_contactdetails] = useState('')
    const [Husband_aadharno, setHusband_aadharno] = useState('')
    const [guardian_name, setguardian_name] = useState('')
    const [GuardianOccupation, setGuardianOccupation] = useState('')
    const [Guardian_contactdetails, setGuardiancontactdetails] = useState('')
    const [Guardian_aadharno, setGuardian_aadharno] = useState('')

    const [technology_name, settechnology_name] = useState('')
    const [duration, setduration] = useState("");
    const [selectedModules, setSelectedModules] = useState('');

    const [intern_experience, setintern_experience] = useState('')
    const [experince, setexprience] = useState('');
    const [characteristics_describe, setcharacteristics_describe] = useState('')
    const [applicant_name, setapplicant_name] = useState('')
    const [place, setplace] = useState('')
  
    const [refrance, setRefrance] = useState([]);
    const [refereance_name, setrefereance_name] = useState('')
    const [conatct_number, setconatct_number] = useState('')
    const [buttom_applicant_name, setbuttonapplicantname] = useState('')
    const [buttom_place, setbuttom_place] = useState('')


    const [errors, setErrors] = useState({})


    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            // Add the selected option to the state if checked
            setRefrance((prev) => [...prev, value]);
        } else {
            // Remove the option from the state if unchecked
            setRefrance((prev) => prev.filter((item) => item !== value));
        }
    };
    const handlePrint = () => {
        window.print();
      };
  
    const handleRefereanceChange = (e) => {
        const { name, checked } = e.target;
        setRefereance(prevSelected => {
            if (checked) {
                return [...prevSelected, name];
            } else {
                return prevSelected.filter(refereance => refereance !== name);
            }
        });
    };

    // const handleother_branchChange = (e) => {
    //     setother_branch(e.target.value);
    // };


    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!fname.trim()) {
            errors.fname = 'first Name is required';
            isValid = false;
        }
        if (!mname.trim()) {
            errors.mname = 'mother Name is required';
            isValid = false;
        }

        if (!fathername.trim()) {
            errors.fathername = 'father name is required';
            isValid = false;
        }
        if (!lname.trim()) {
            errors.lname = 'last name is required';
            isValid = false;
        }
        if (!email.trim()) {
            errors.email = 'email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'invalid email address';
            isValid = false;
        }
        if (!parmanenat_address.trim()) {
            errors.parmanenat_address = 'parmanenat address is required';
            isValid = false;
        } else if (parmanenat_address.length > 255) {
            errors.parmanenat_address = 'parmanenat address should not exceed 255 characters';
            isValid = false;
        }
        if (!current_address.trim()) {
            errors.current_address = 'Current Address is required';
            isValid = false;
        } else if (current_address.length > 255) {
            errors.current_address = 'Current Address should not exceed 255 characters';
            isValid = false;
        }

        if (!contact_details) {
            errors.contact_details = 'Contact number is required';
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(contact_details)) {
            errors.contact_details = 'Contact number must start with +91 and be followed by exactly 10 digits';
            isValid = false;
        }

        if (!whatsappno) {
            errors.whatsappno = 'WhatsApp number is required';
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(whatsappno)) {
            errors.whatsappno = 'WhatsApp number must start with +91 and be followed by exactly 10 digits';
            isValid = false;
        }
        if (!dob) {
            errors.dob = 'Date of Birth is required';
            isValid = false;
        } else if (!isAgeValid()) {
            errors.dob = 'You must be at least 18 years old';
            isValid = false;
        }
        if (!blood.trim()) {
            errors.blood = 'Blood group is required';
            isValid = false;
        }
        if (!aadhar.trim()) {
            errors.aadhar = 'Aadhar is required';
            isValid = false;
        }
        if (!linkdin.trim()) {
            errors.linkdin = 'linkdin address is required';
            isValid = false;
        }
        if (!facebook.trim()) {
            errors.facebook = ' facebook address is required';
            isValid = false;
        }
        if (!youtube.trim()) {
            errors.youtube = ' youtube address is required';
            isValid = false;
        }
        if (!anyother_add.trim()) {
            errors.anyother_add = ' anyother address is required';
            isValid = false;
        }

        if (!school_name.trim()) {
            errors.school_name = 'School name is required';
            isValid = false;
        } else if (school_name.length > 100) {
            errors.school_name = 'School name must be less than or equal to 100 characters';
            isValid = false;
        }

        // 10th Percentage Validation (Numeric and within 0-100)
        if (!tenth_per.trim()) {
            errors.tenth_per = '10th percentage is required';
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test(tenth_per) || parseFloat(tenth_per) < 0 || parseFloat(tenth_per) > 100) {
            errors.tenth_per = '10th percentage must be a number between 0 and 100 (can include decimals)';
            isValid = false;
        }

        // 12th/Diploma Percentage Validation (Numeric and within 0-100)
        if (!twelve_diploma_per.trim()) {
            errors.twelve_diploma_per = '12th/Diploma percentage is required';
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test(twelve_diploma_per) || parseFloat(twelve_diploma_per) < 0 || parseFloat(twelve_diploma_per) > 100) {
            errors.twelve_diploma_per = '12th/Diploma percentage must be a number between 0 and 100 (can include decimals)';
            isValid = false;
        }

        // Graduation Details Validation
        if (!graduation_details.trim()) {
            errors.graduation_details = 'Graduation details are required';
            isValid = false;
        } else if (graduation_details.length > 100) {
            errors.graduation_details = 'Graduation details must be less than or equal to 100 characters';
            isValid = false;
        }

        // Graduation Percentage Validation (Numeric and within 0-100)
        if (!graduation_per.trim()) {
            errors.graduation_per = 'Graduation percentage is required';
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test(graduation_per) || parseFloat(graduation_per) < 0 || parseFloat(graduation_per) > 100) {
            errors.graduation_per = 'Graduation percentage must be a number between 0 and 100 (can include decimals)';
            isValid = false;
        }

        if (!post_graduation_details.trim()) {
            errors.post_graduation_details = 'Post Graduation details required';
            isValid = false;
        } else if (post_graduation_details.length > 100) {
            errors.post_graduation_details = 'Post Graduation details must be less than or equal to 100 characters';
            isValid = false;
        }

        // Post Graduation Percentage Validation (Numeric and within 0-100)
        if (!post_graduation_per.trim()) {
            errors.post_graduation_per = 'Post Graduation percentage required';
            isValid = false;
        } else if ((!/^\d+(\.\d{1,2})?$/.test(post_graduation_per) || parseFloat(post_graduation_per) < 0 || parseFloat(post_graduation_per) > 100)) {
            errors.post_graduation_per = 'Post Graduation percentage must be a number between 0 and 100 (can include decimals)';
            isValid = false;
        }
        if (!anyother_cirt.trim()) {
            errors.anyother_cirt = 'anyother cirt is required';
            isValid = false;
        } else if (anyother_cirt.length > 255) {
            errors.anyother_cirt = 'anyother_ irt must be less than or equal to 255 characters';
            isValid = false;
        }

        if (selected_branches.length === 0) {
            errors.selected_branches = 'Please select at least one branch';
            isValid = false;
        }

        if (selected_branches.includes('Other') && !other_branch.trim()) {
            errors.other_branch = 'Please specify the other branch';
            isValid = false;
        }

        if (!father_name.trim()) {
            errors.father_name = 'Father name is required';
            isValid = false;
        } else if (father_name.length > 50) {
            errors.father_name = 'father name pareant gauaradian details must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!fatherOccupation.trim()) {
            errors.fatherOccupation = 'father Occupation is required';
            isValid = false;
        } else if (fatherOccupation.length > 50) {
            errors.fatherOccupation = 'father Occupation must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!father_contactdetails) {
            errors.father_contactdetails = 'Father Contact number is required';
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(father_contactdetails)) {
            errors.father_contactdetails = 'Father Contact number must start with +91 and be followed by exactly 10 digits';
            isValid = false;
        }
        if (!father_aadharno.trim()) {
            errors.father_aadharno = 'Father Aadhar is required';
            isValid = false;
        }

        if (!mother_name.trim()) {
            errors.mother_name = 'mother name is required';
            isValid = false;
        } else if (mother_name.length > 50) {
            errors.mother_name = 'mother name pareant gauaradian details must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!motherOccupation.trim()) {
            errors.motherOccupation = 'mother Occupation is required';
            isValid = false;
        } else if (motherOccupation.length > 50) {
            errors.motherOccupation = 'mother Occupation must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!mother_contactdetails) {
            errors.mother_contactdetails = 'mother Contact number is required';
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(mother_contactdetails)) {
            errors.mother_contactdetails = 'mother Contact number must start with +91 and be followed by exactly 10 digits';
            isValid = false;
        }
        if (!mother_aadharno.trim()) {
            errors.mother_aadharno = 'mother Aadhar is required';
            isValid = false;
        }
        if (!intern_experience.trim()) {
            errors.intern_experience = 'Experience Feild is required';
            isValid = false;
        }
        if (experince.length > 255) {
            errors.experince = 'experince must be less than or equal to 255 characters';
            isValid = false;
        }
        if (!characteristics_describe.trim()) {
            errors.characteristics_describe = 'characteristics describe is required';
            isValid = false;
        } else if (characteristics_describe.length > 500) {
            errors.characteristics_describe = 'experince must be less than or equal to 500 characters';
            isValid = false;
        }
        if (!applicant_name.trim()) {
            errors.applicant_name = 'applicant name is required';
            isValid = false;
        } else if (applicant_name.length > 50) {
            errors.applicant_name = 'applicant name must be less than or equal to 50 characters';
            isValid = false;
        }
        if (!place.trim()) {
            errors.place = 'place is requied';
            isValid = false;
        } else if (place.length > 50) {
            errors.place = 'place must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!refereance_name.trim()) {
            errors.refereance_name = 'refereance name is required';
            isValid = false;
        } else if (refereance_name.length > 50) {
            errors.refereance_name = 'refereance name must be less than or equal to 50 characters';
            isValid = false;
        }
        if (!conatct_number) {
            errors.conatct_number = ' Contact number is required';
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(conatct_number)) {
            errors.conatct_number = 'ontact number must start with +91 and be followed by exactly 10 digits';
            isValid = false;
        }
        if (!buttom_applicant_name.trim()) {
            errors.buttom_applicant_name = 'applicant name is required';
            isValid = false;
        } else if (buttom_applicant_name.length > 50) {
            errors.buttom_applicant_name = 'applicant name must be less than or equal to 50 characters';
            isValid = false;
        }
        if (!buttom_place.trim()) {
            errors.buttom_place = 'place is requied';
            isValid = false;
        } else if (buttom_place.length > 50) {
            errors.buttom_place = 'place must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!guardian_name.trim()) {
            errors.guardian_name = 'Guardian name is required';
            isValid = false;
        } else if (guardian_name.length > 50) {
            errors.guardian_name = 'Guardian name pareant gauaradian details must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!GuardianOccupation.trim()) {
            errors.GuardianOccupation = 'Guardian Occupation is required';
            isValid = false;
        } else if (GuardianOccupation.length > 50) {
            errors.GuardianOccupation = 'Guardian Occupation must be less than or equal to 50 characters';
            isValid = false;
        }

        if (!Guardian_contactdetails) {
            errors.Guardian_contactdetails = 'Guardian Contact number is required';
            isValid = false;
        } else if (!/^\+91\d{10}$/.test(Guardian_contactdetails)) {
            errors.Guardian_contactdetails = 'Guardian Contact number must start with +91 and be followed by exactly 10 digits';
            isValid = false;
        }
        if (!Guardian_aadharno.trim()) {
            errors.Guardian_aadharno = 'Guardian Aadhar is required';
            isValid = false;
        }

        if (!technology_name.trim()) {
            errors.technology_name = 'Technology name is required';
            isValid = false;
        } else if (technology_name.length > 100) {
            errors.GuardianOccupation = 'Technology Name must be less than or equal to 50 characters';
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
            setError('Please select your marital status.');
            isValid = false;
        } else {
            setError('');
        }
        // if (!selectedModules.length === 0) {
        //     setErrors({ selectmodule: 'Please select at least one option.' });
        //     return false;
        // }
        if (selectedModules.length === 0) {
            errors.selectedModules = 'Please select at least one option.';
            isValid = false;
        }

        // If any validation fails, update the errors state and set isValid to false
        if (!isValid) {
            setErrors(errors);
        } else {
            setErrors({});
            console.log('Form submitted successfully');
        }



        if (marriedStatus === 'Yes') {
            const errors = {};
            const { name, occupation, contact, aadhar } = husbandDetails;

            if (!name.trim()) {
                errors.name = 'Husband name is required.';
                isValid = false;
            }

            if (!occupation.trim()) {
                errors.occupation = 'Husband occupation is required.';
                isValid = false;
            }

            if (!contact.trim()) {
                errors.contact = 'Husband contact details are required.';
                isValid = false;
            } else if (!/^\d{10}$/.test(contact)) {
                errors.contact = 'Enter a valid 10-digit contact number.';
                isValid = false;
            }

            if (!aadhar.trim()) {
                errors.aadhar = 'Husband Aadhar number is required.';
                isValid = false;
            } else if (!/^\d{12}$/.test(aadhar)) {
                errors.aadhar = 'Enter a valid 12-digit Aadhar number.';
                isValid = false;
            }

            setHusbandErrors(errors);
        }

        if (isValid) {
            console.log('Marital Status:', marriedStatus);
            if (marriedStatus === 'Yes') {
                console.log('Husband Details:', husbandDetails);
            }
        }




        setErrors(errors);
        return isValid;
    };

    const handlePconatactnumberChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("+91")) {
            setconatct_number(value.slice(0, 13)); // Limit to "+91" and 10 digits
        } else {
            setconatct_number("+91" + value.slice(0, 10));
        }
    };

    const handleHusbandDetailsChange = (field, value) => {
        setHusbandDetails((prev) => ({ ...prev, [field]: value }));
        setHusbandErrors((prev) => ({ ...prev, [field]: '' })); // Clear error on input change
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

        return ageDiff > 18 || (ageDiff === 18 && today >= new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()));
    };

    useEffect(() => {
        if (dob) {
            setAge(calculateAge(dob));
        } else {
            setAge('');
        }
    }, [dob]);

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
                    aadhar: 'Aadhar number must be exactly 12 digits.',
                }));
            }
        }
    };

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
                    father_aadharno: 'Aadhar number must be exactly 12 digits.',
                }));
            }
        }
    };

    const handle_fatherPhoneChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("+91")) {
            setfather_contactdetails(value.slice(0, 13)); // Limit to "+91" and 10 digits
        } else {
            setfather_contactdetails("+91" + value.slice(0, 10));
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
                    mother_aadharno: 'Aadhar number must be exactly 12 digits.',
                }));
            }
        }
    };

    const handle_motherPhoneChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("+91")) {
            setmother_contactdetails(value.slice(0, 13)); // Limit to "+91" and 10 digits
        } else {
            setmother_contactdetails("+91" + value.slice(0, 10));
        }
    };



    // const handleStatusChange = (event) => {
    //     const value = event.target.value;
    //     setIsMarried(value === "Yes");

    //     if (value === "No") {
    //         // Clear fields and errors when "No" is selected
    //         setHusband_pareantgauaradiandetails('null');
    //         setHusbandOccupation('null');
    //         setHusband_contactdetails('');
    //         setHusband_aadharno('null');
    //         setErrors({});
    //     }
    // };

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
                    aadhar: 'Aadhar number must be exactly 12 digits.',
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
                    Guardian_aadharno: 'Aadhar number must be exactly 12 digits.',
                }));
            }
        }
    };

    const handle_GuardianPhoneChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("+91")) {
            setGuardiancontactdetails(value.slice(0, 13)); // Limit to "+91" and 10 digits
        } else {
            setGuardiancontactdetails("+91" + value.slice(0, 10));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const validationSuccess = validateForm();  // Add this line to validate the form
        if (!validationSuccess) {
            // If validation fails, do not submit the form
            setErrors(errors);  // Ensure errors are set to show on the form
            return;
        }
        const token = localStorage.getItem("remember_token");
    
        
    
        // Prepare the form data
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
            blood,
            aadhar,
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
            technology_name,
            duration,
            selectedModules,
            intern_experience,
            experince,
            characteristics_describe,
            applicant_name,
            place,
            refrance,
            refereance_name,
            conatct_number,
            buttom_applicant_name,
            buttom_place,
        };
    

        
        try {
            const response = await fetch("https://api.sumagotraining.in/public/api/intern-joining/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`, // Include token for authentication
                },
                body: JSON.stringify(newData),
            });
    
            // Parse the response JSON
            const responseData = await response.json();
    
            if (response.ok) {
                // If submission is successful
                alert("Data submitted successfully!");
                console.log("Response Data:", responseData);
            } else {
                // Handle validation errors or other issues from the server
                if (responseData.errors) {
                    const errorMessages = Object.values(responseData.errors)
                        .flat()
                        .join("\n");
                    alert(`Failed to submit data:\n${errorMessages}`);
                } else {
                    alert("Failed to submit data. Please try again.");
                }
                console.error("Error Response:", responseData);
            }
        } catch (error) {
            // Handle unexpected errors
            alert("An error occurred while submitting data.");
            console.error("Error:", error);
        }
    };

  
    return (
        <>
            <div className="container backimg">
                <div>
                    <img src={corner} className="corner_img" alt="Responsive Corner" />
                </div>
                <div className='logo-container'>
                    {/* <img src={logo1} class="img-fluid logo1" alt="..." /> */}
                    <img src={logo2} class="img-fluid logo2" alt="..." />
                </div>
                <Container>
                    <div className="text-center title-container">
                        <b className="title-text">INTERNS JOINING <span className="highlight">FORM</span></b>
                    </div>
                </Container>
                <Container className='position-relative text-center homepara'>
                    <p>SCOPE , where we believe in empowering individuals through education and
                        skill development. Established with a vision to foster excellence and innovation in
                        learning, Scope is dedicated to providing high-quality training programs tailored
                        to meet the diverse needs of our students.</p>
                </Container>

                <Container className='position-relative text-center welcommsg'>
                    <p><b>Welcome</b> To <b>Sumago Center of Practical Experience!!</b></p>
                </Container>

                <Container className='position-relative text-center para2'>
                    <p style={{ textAlign: 'justify' }}>We’re glad to have you on board as part of our intern team. Get ready to dive
                        into hands-on learning, sharpen your skills, and make meaningful contributions.
                        Let’s make this journey both rewarding and memorable!</p>
                </Container>
                <div style={{ margin: '40px' }}></div>

                {/* Form Personal Details */}
                <Form onSubmit={handleSubmit}>
                    <Container fluid>
                        {/* <Card className="transparent-card">
                            <Card.Header className="cardpersonal_details">
                                <div className="position-absolute" style={{ backgroundColor: 'black', width: '20px', height: '30px' }}>
                                    <div className="personal-card-heading position-relative">
                                        <b>PERSONAL DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header> */}
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">PERSONAL DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>

                                    <Row>
                                        {/* First name */}
                                        <Col lg={4}><b style={{ fontFamily: 'Century gothic' }} className='d-none d-md-block'>First Name </b></Col>
                                        <Col lg={2} className='d-none d-md-block'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={fname} 
                                                    // onChange={handleChange}
                                                    onChange={(e) => setfname(e.target.value)}
                                                />

                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.fname ? (
                                                    <span className="error text-danger">{errors.fname}</span>
                                                ) : (
                                                    'First Name'
                                                )}
                                            </Form.Label>

                                            {/* {errors.fname && <span className="error text-danger">{errors.fname}</span>} */}

                                        </Col>
                                        <Col lg={2} className='d-none d-md-block'>
                                            <Form.Group  className="mname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter mother name"
                                                    className='FormStyeling transparent-input'
                                                    value={mname}
                                                    // onChange={handleChange}
                                                     onChange={(e) => setmname(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center" >
                                                {errors.mname ? (
                                                    <span className="error text-danger">{errors.mname}</span>
                                                ) : (
                                                    'Mother Name'
                                                )}
                                            </Form.Label>
                                        </Col>
                                        <Col lg={2} className='d-none d-md-block'>
                                            <Form.Group  className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter father name"
                                                    className='FormStyeling transparent-input'
                                                    value={fathername}
                                                    // onChange={handleChange}
                                                     onChange={(e) => setfathername(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.fathername ? (
                                                    <span className="error text-danger">{errors.fathername}</span>
                                                ) : (
                                                    'Father Name'
                                                )}
                                            </Form.Label>
                                        </Col>
                                        <Col lg={2} className='d-none d-md-block'>
                                            <Form.Group className="lname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter last name"
                                                    className='FormStyeling transparent-input'
                                                    value={lname} 
                                                    // onChange={handleChange}
                                                    onChange={(e) => setlname(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.lname ? (
                                                    <span className="error text-danger">{errors.lname}</span>
                                                ) : (
                                                    'Last Name'
                                                )}
                                            </Form.Label>
                                        </Col>
                                    </Row>
                                    <Row className='d-block d-md-none'>
                                        <Col lg={4} className='pt-4'><b style={{ fontFamily: 'Century gothic' }} >First Name</b></Col>
                                        <Col lg={8} >
                                            <Form.Group  className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={fname} 
                                                    // onChange={handleChange}
                                                    onChange={(e) => setfname(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.fname && <span className="error text-danger">{errors.fname}</span>}
                                        </Col>
                                        <Col lg={4} className='pt-4'><b style={{ fontFamily: 'Century gothic' }} >Mother Name</b></Col>
                                        <Col lg={8} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={mname} onChange={(e) => setmname(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.mname && <span className="error text-danger">{errors.mname}</span>}
                                        </Col>
                                        <Col lg={4} className='pt-4'><b style={{ fontFamily: 'Century gothic' }} >Father Name</b></Col>
                                        <Col lg={8} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={fathername} onChange={(e) => setfathername(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.fathername && <span className="error text-danger">{errors.fathername}</span>}
                                        </Col>
                                        <Col lg={4} className='pt-4'><b style={{ fontFamily: 'Century gothic' }} >last Name</b></Col>
                                        <Col lg={8} className='mb-3' >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={lname} onChange={(e) => setlname(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.lname && <span className="error text-danger">{errors.lname}</span>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/* email */}
                                        <Col lg={4}><b style={{ fontFamily: 'Century gothic' }}>Email Id</b></Col>
                                        <Col lg={8} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={email} onChange={(e) => setemail(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.email && <span className="error text-danger">{errors.email}</span>}
                                        </Col>
                                        <Col lg={4}><b style={{ fontFamily: 'Century gothic' }} >Permanent Address</b></Col>
                                        <Col lg={8} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={parmanenat_address} onChange={(e) => setparmanenat_address(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.parmanenat_address && <span className="error text-danger">{errors.parmanenat_address}</span>}
                                        </Col>
                                        <Col lg={4} ><b style={{ fontFamily: 'Century gothic' }} >Current Address</b></Col>
                                        <Col lg={8} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"

                                                    className='FormStyeling transparent-input'
                                                    value={current_address} onChange={(e) => setcurrent_address(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.current_address && <span className="error text-danger">{errors.current_address}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Contact Details</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    placeholder="+91"
                                                    className='FormStyeling transparent-input'
                                                    value={contact_details} onChange={handlePhoneChange}
                                                />
                                            </Form.Group>
                                            {errors.contact_details && <span className="error text-danger">{errors.contact_details}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Whatsapp No:</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    placeholder="+91"
                                                    value={whatsappno} onChange={handleWhatsappChange}
                                                />
                                            </Form.Group>
                                            {errors.whatsappno && <span className="error text-danger">{errors.whatsappno}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Date Of Birth</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3' >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="date"
                                                    // placeholder="enter first name"
                                                    placeholder="+91"
                                                    className='FormStyeling transparent-input'
                                                    value={dob} onChange={(e) => setdob(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.dob && <span className="error text-danger">{errors.dob}</span>}
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className='m-0'><b style={{ fontFamily: 'Century gothic' }} >Age : </b></Col>
                                        <Col lg={4} md={4} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling'

                                                    value={age}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Blood Group</b></Col>
                                        <Col lg={5} md={5} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Select aria-label="Default select example" className='FormStyeling transparent-input' value={blood} onChange={(e) => setblood(e.target.value)}>
                                                    <option>select Blood Group</option>
                                                    <option value="A+">A+</option>
                                                    <option value="A-">A-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="B-">B-</option>
                                                    <option value="AB+">AB+</option>
                                                    <option value="AB-">AB-</option>
                                                    <option value="O+">O+</option>
                                                    <option value="O-">O-</option>
                                                </Form.Select>
                                            </Form.Group>
                                            {errors.blood && <span className="error text-danger">{errors.blood}</span>}
                                        </Col>
                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Aadhar Card no</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={aadhar} onChange={handleAadharChange}
                                                />
                                            </Form.Group>
                                            {errors.aadhar && <span className="error text-danger">{errors.aadhar}</span>}
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
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">Social MEDIA ADDRESS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                        {/* email */}
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }}>LinkedIn Address</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={linkdin} onChange={(e) => setlinkdin(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.linkdin && <span className="error text-danger">{errors.linkdin}</span>}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >Facebook Address</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={facebook} onChange={(e) => setfacebook(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.facebook && <span className="error text-danger">{errors.facebook}</span>}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >YouTube Address</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={youtube} onChange={(e) => setyoutube(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.youtube && <span className="error text-danger">{errors.youtube}</span>}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >Any Other Address</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={anyother_add} onChange={(e) => setanyother_add(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.anyother_add && <span className="error text-danger">{errors.anyother_add}</span>}
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
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">EDUCATIONAL DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>

                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }}>School Name</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter school name" className='FormStyeling transparent-input' value={school_name} onChange={(e) => setschool_name(e.target.value)} />
                                            </Form.Group>
                                            {errors.school_name && <span className="error text-danger">{errors.school_name}</span>}

                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >10<sup>th</sup> Percentage</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter 10th percentage" className='FormStyeling transparent-input' value={tenth_per} onChange={(e) => settenth_per(e.target.value)} />
                                            </Form.Group>
                                            {errors.tenth_per && <span className="error text-danger">{errors.tenth_per}</span>}

                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >12<sup>th</sup>/Diploma Percentage</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter 12th/Diploma percentage" className='FormStyeling transparent-input' value={twelve_diploma_per} onChange={(e) => settwelve_diploma_per(e.target.value)} />
                                            </Form.Group>
                                            {errors.twelve_diploma_per && <span className="error text-danger">{errors.twelve_diploma_per}</span>}
                                        </Col>
                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Graduation Details</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation details" className='FormStyeling transparent-input' value={graduation_details} onChange={(e) => setgraduation_details(e.target.value)} />
                                            </Form.Group>
                                            {errors.graduation_details && <span className="error text-danger">{errors.graduation_details}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Graduation Percentage:</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation percentage" className='FormStyeling transparent-input' value={graduation_per} onChange={(e) => setgraduation_per(e.target.value)} />
                                            </Form.Group>
                                            {errors.graduation_per && <span className="error text-danger">{errors.graduation_per}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Post Graduation Details</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation details" className='FormStyeling transparent-input' value={post_graduation_details} onChange={(e) => setPostGraduationDetails(e.target.value)} />
                                            </Form.Group>
                                            {errors.post_graduation_details && <span className="error text-danger">{errors.post_graduation_details}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Post Graduation Percentage:</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation percentage" className='FormStyeling transparent-input' value={post_graduation_per} onChange={(e) => setPostGraduationPer(e.target.value)} />
                                            </Form.Group>
                                            {errors.post_graduation_per && <span className="error text-danger">{errors.post_graduation_per}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Branch</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            {/* <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="text"
                                                className="FormStyeling transparent-input"
                                                placeholder="Enter text"
                                            />
                                        </Form.Group> */}
                                        <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                                         <Form.Check
                                                    type="radio"
                                                    label="Computer"
                                                    name="selected_branches"
                                                    value="Computer"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === 'Computer'}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="IT"
                                                    name="selected_branches"
                                                    value="IT"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === 'IT'}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Mechanical"
                                                    name="selected_branches"
                                                    value="Mechanical"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === 'Mechanical'}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="AIDS"
                                                    name="selected_branches"
                                                    value="AIDS"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === 'AIDS'}
                                                />
                                                 <Form.Check
                                                    type="radio"
                                                    label="AIML"
                                                    name="selected_branches"
                                                    value="AIML"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === 'AIML'}
                                                />

                                                <Form.Check
                                                    type="radio"
                                                    label="Other"
                                                    name="selected_branches"
                                                    value="Other"
                                                    onChange={(e) => setselected_branches(e.target.value)}
                                                    checked={selected_branches === 'Other'}
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
                                            {errors.other_branch && <span className="error text-danger">{errors.other_branch}</span>}
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


                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Any Other Cirtification</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" className='FormStyeling transparent-input' value={anyother_cirt} onChange={(e) => setanyother_cirt(e.target.value)} />
                                            </Form.Group>
                                            {errors.anyother_cirt && <span className="error text-danger">{errors.anyother_cirt}</span>}

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
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">PARENTS / GAUARDIANDETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Father Name</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter fathername" className='FormStyeling transparent-input' value={father_name} onChange={(e) => setfather_name(e.target.value)} />
                                            </Form.Group>
                                            {errors.father_name && <span className="error text-danger">{errors.father_name}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Father Occupation</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter father occupation" className='FormStyeling transparent-input' value={fatherOccupation} onChange={(e) => setfatherOccupation(e.target.value)} />
                                            </Form.Group>
                                            {errors.fatherOccupation && <span className="error text-danger">{errors.fatherOccupation}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Father Contact Details</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={father_contactdetails} onChange={handle_fatherPhoneChange} />
                                            </Form.Group>
                                            {errors.father_contactdetails && <span className="error text-danger">{errors.father_contactdetails}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Father Aadhar card no</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Father Aadhar card no" className='FormStyeling transparent-input' value={father_aadharno} onChange={handle_fatherAadharChange}></Form.Control>
                                            </Form.Group>
                                            {errors.father_aadharno && <span className="error text-danger">{errors.father_aadharno}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Mother Name</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter fathername" className='FormStyeling transparent-input' value={mother_name} onChange={(e) => setmother_name(e.target.value)} />
                                            </Form.Group>
                                            {errors.mother_name && <span className="error text-danger">{errors.mother_name}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Mother Occupation</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter father occupation" className='FormStyeling transparent-input' value={motherOccupation} onChange={(e) => setmotherOccupation(e.target.value)} />
                                            </Form.Group>
                                            {errors.motherOccupation && <span className="error text-danger">{errors.motherOccupation}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Mother Contact Details</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={mother_contactdetails} onChange={handle_motherPhoneChange} />
                                            </Form.Group>
                                            {errors.mother_contactdetails && <span className="error text-danger">{errors.mother_contactdetails}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Mother Aadhar card no</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter mother Aadhar card no" className='FormStyeling transparent-input' value={mother_aadharno} onChange={handlemotherAadharChange}></Form.Control>
                                            </Form.Group>
                                            {errors.mother_aadharno && <span className="error text-danger">{errors.mother_aadharno}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Married</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Yes"
                                                    name="maritalStatus"
                                                    value="Yes"
                                                    onChange={(e) => setMarriedStatus(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="No"
                                                    name="maritalStatus"
                                                    value="No"
                                                    onChange={(e) => {
                                                        setMarriedStatus(e.target.value);
                                                        setHusbandDetails({
                                                            name: '',
                                                            occupation: '',
                                                            contact: '',
                                                            aadhar: '',
                                                        });
                                                        setHusbandErrors({});
                                                    }}
                                                />
                                            </div>
                                            {error && <span className="text-danger">{error}</span>}

                                        </Col>
                                        <bt />
                                        {marriedStatus === 'Yes' && (
                                            <>
                                                <Row>
                                                    <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} className='p-0 m-0' >Husband Name</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="Enter fathername" className='FormStyeling transparent-input' value={husbandDetails.name}
                                                                onChange={(e) => handleHusbandDetailsChange('name', e.target.value)} />
                                                        </Form.Group>
                                                        {husbandErrors.name && (
                                                            <span className="text-danger">{husbandErrors.name}</span>
                                                        )}
                                                    </Col>
                                                    <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Husband Occupation</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="Enter father occupation" className='FormStyeling transparent-input' value={husbandDetails.occupation}
                                                                onChange={(e) =>
                                                                    handleHusbandDetailsChange('occupation', e.target.value)
                                                                } />
                                                        </Form.Group>
                                                        {husbandErrors.occupation && (
                                                            <span className="text-danger">{husbandErrors.occupation}</span>
                                                        )}
                                                    </Col>

                                                    <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Husband Contact Details</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={husbandDetails.contact}
                                                                onChange={(e) => handleHusbandDetailsChange('contact', e.target.value)} />
                                                        </Form.Group>
                                                        {husbandErrors.contact && (
                                                            <span className="text-danger">{husbandErrors.contact}</span>
                                                        )}
                                                    </Col>
                                                    <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Husband Aadhar No</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="Enter Father Aadhar card no" className='FormStyeling transparent-input' value={husbandDetails.aadhar}
                                                                onChange={(e) => handleHusbandDetailsChange('aadhar', e.target.value)}></Form.Control>
                                                        </Form.Group>
                                                        {husbandErrors.aadhar && (
                                                            <span className="text-danger">{husbandErrors.aadhar}</span>
                                                        )}
                                                    </Col>
                                                </Row>


                                            </>
                                        )}
                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Guardian Name</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Guardian Name" className='FormStyeling transparent-input' value={guardian_name} onChange={(e) => setguardian_name(e.target.value)} />
                                            </Form.Group>
                                            {errors.guardian_name && <span className="error text-danger">{errors.guardian_name}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Guardian Occupation</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Guardian Occupation" className='FormStyeling transparent-input' alue={GuardianOccupation} onChange={(e) => setGuardianOccupation(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            {errors.GuardianOccupation && <span className="error text-danger">{errors.GuardianOccupation}</span>}
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Guardian Contact Details</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={Guardian_contactdetails} onChange={handle_GuardianPhoneChange} />
                                            </Form.Group>
                                            {errors.Guardian_contactdetails && <span className="error text-danger">{errors.Guardian_contactdetails}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Guardian Aadhar card no</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Guardian Aadhar card no" className='FormStyeling transparent-input' value={Guardian_aadharno} onChange={handle_GuardianAadharChange}></Form.Control>
                                            </Form.Group>
                                            {errors.Guardian_aadharno && <span className="error text-danger">{errors.Guardian_aadharno}</span>}
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
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">INTERNSHIP DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>

                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                        <Col lg={4}><b style={{ fontFamily: 'Century gothic' }} >Technology Name</b></Col>
                                        <Col lg={8} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={technology_name} onChange={(e) => settechnology_name(e.target.value)}
                                                />

                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.technology_name ? (
                                                    <span className="error text-danger">{errors.technology_name}</span>
                                                ) : (
                                                    'You have choosen'
                                                )}
                                            </Form.Label>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >Duration</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="45 Days"
                                                    name="duretion"
                                                    value="45 Days"
                                                    onChange={(e) => setduration(e.target.value)}

                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="3 months"
                                                    name="duretion"
                                                    value="3 months"
                                                    onChange={(e) => setduration(e.target.value)}

                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="6 months"
                                                    name="duretion"
                                                    value="6 months"
                                                    onChange={(e) => setduration(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="9 months"
                                                    name="duretion"
                                                    value="9 months"
                                                    onChange={(e) => setduration(e.target.value)}

                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="12 months"
                                                    name="duretion"
                                                    value="12 months"
                                                    onChange={(e) => setduration(e.target.value)}

                                                />
                                            </div>
                                            {errors.duration && (
                                                <div className="text-danger">{errors.duration}</div>
                                            )}
                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >Module</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                        <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
                                        <Form.Check
                                                    type="radio"
                                                    label="Secure Employment"
                                                    name="selectedModules"
                                                    value="Secure Employment"
                                                    onChange={(e) => setSelectedModules(e.target.value)}
                                                    checked={selectedModules === 'Secure Employment'}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Pro Career Assurance"
                                                    name="selectedModules"
                                                    value="Pro Career Assurance"
                                                    onChange={(e) => setSelectedModules(e.target.value)}
                                                    checked={selectedModules === 'Pro Career Assurance'}
                                                />
                                                  <Form.Check
                                                    type="radio"
                                                    label="Pay After Placement"
                                                    name="selectedModules"
                                                    value="Pay After Placement"
                                                    onChange={(e) => setSelectedModules(e.target.value)}
                                                    checked={selectedModules === 'Pay After Placement'}
                                                />
                                                 </div>
                                                 {errors.selectedModules && (
                                                <div className="text-danger">{errors.selectedModules}</div>
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
                                        <Col lg={12} md={12} sm={12}><b style={{ fontFamily: 'Century gothic' }} >Do you have Previous Work , internship or Volunteer Experience ?</b></Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Yes"
                                                    name="intern"
                                                    value="Yes"
                                                    onChange={(e) => setintern_experience(e.target.value)}
                                                    checked={intern_experience === 'Yes'}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="No"
                                                    name="intern"
                                                    value="No"
                                                    onChange={(e) => setintern_experience(e.target.value)}
                                                    checked={intern_experience === 'No'}
                                                />
                                            </div>
                                            {errors.intern_experience && (
                                                <div className="text-danger">{errors.intern_experience}</div>
                                            )}
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className='mb-5'>
                                            {intern_experience === 'Yes' && (
                                                <div>
                                                    <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                        <Form.Control type="text" placeholder="Enter experince" className='FormStyeling transparent-input' value={experince}
                                                            onChange={(e) => setexprience(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    {/* {errors.experince && <span className="error text-danger">{errors.experince}</span>} */}
                                                    <Form.Label className="w-100 text-center">
                                                        {errors.experince ? (
                                                            <span className="error text-danger">{errors.experince}</span>
                                                        ) : (
                                                            'Please Mention Your Experinace'
                                                        )}
                                                    </Form.Label>
                                                </div>
                                            )}

                                        </Col>

                                        <b style={{ fontFamily: 'Century gothic' }}  >Which characteristics best describe you?</b>
                                        <Form.Group className="fname mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="text" className='FormStyeling transparent-input' as="textarea" rows={4} value={characteristics_describe} onChange={(e) => setcharacteristics_describe(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        {errors.characteristics_describe && (
                                            <div className="text-danger">{errors.characteristics_describe}</div>
                                        )}

                                        <b style={{ fontFamily: 'Century gothic' }} className='mb-3'>Note: You have an 8-day period to change your choosen technology. If you wish to make a change,
                                            please do so within 8-days of timeframe.</b>

                                        <Col lg={4} md={4} sm={12}>
                                            <div class="box">
                                            </div>
                                            <Form.Label className="w-100 text-center">
                                                Applicant Signature
                                            </Form.Label>

                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <Form.Group className="fname1 mb-2" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" className=' FormStyeling transparent-input' as="textarea" rows={4} value={applicant_name} onChange={(e) => setapplicant_name(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.applicant_name ? (
                                                    <span className="error text-danger">{errors.applicant_name}</span>
                                                ) : (
                                                    'Please Mention Applicant name'
                                                )}
                                            </Form.Label>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <Form.Group className="fname1 mb-2" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" className='FormStyeling transparent-input' as="textarea" rows={4} value={place} onChange={(e) => setplace(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                                {errors.place ? (
                                                    <span className="error text-danger">{errors.place}</span>
                                                ) : (
                                                    'Please Mention place'
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





                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">REFERENCE</b>
                                    </div>
                                </div>
                            </Card.Header>

                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                             type="checkbox"
                                             label="Social Media"
                                             value="Social Media"
                                             checked={refrance.includes('Social Media')}
                                             onChange={handleCheckboxChange}


                                              
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />

                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">

                                            </Form.Label>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="checkbox"
                                                label="Friend"
                                                name="refrance"
                                                value="Friend"
                                                checked={refrance.includes('Friend')}
                                                onChange={handleCheckboxChange}
                                              
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="checkbox"
                                                label="Family"
                                                name="refrance"
                                                 value="Family"
                                                checked={refrance.includes('Family')}
                                                onChange={handleCheckboxChange}
                                               
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="checkbox"
                                                label="Relatives"
                                                 value="Relatives"
                                                name="refrance"
                                                checked={refrance.includes('Relatives')}
                                                onChange={handleCheckboxChange}
                                               
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="checkbox"
                                                label="Other"
                                                 value="Other"
                                                name="refrance"
                                                checked={refrance.includes('Other')}
                                                onChange={handleCheckboxChange}
                                             
                                            />
                                        </b></Col>
                                        {errors.refrance && (
                                                <div className="text-danger">{errors.refrance}</div>
                                            )}
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>

                                        <Col lg={5} md={5} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Would you like to give reference about Scope / Sumago ? : </b></Col>
                                        <Col lg={1} md={1} sm={12} className='mb-5' >
                                            <Form.Check
                                                type="radio"
                                                label="Yes"
                                                name="refrance"
                                            />
                                        </Col>
                                        <Col lg={1} md={2} sm={12} >
                                            <Form.Check
                                                type="radio"
                                                label="no"
                                                name="refrance"
                                            />
                                        </Col>
                                        <bt />
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: 'Century gothic' }}>Reference name : </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={refereance_name}
                                                    onChange={(e) => setrefereance_name(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                            {errors.refereance_name && <span className="error text-danger">{errors.refereance_name}</span>}
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={refereance_name}
                                                    onChange={(e) => setrefereance_name(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                            {errors.refereance_name && <span className="error text-danger">{errors.refereance_name}</span>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: 'Century gothic' }}>Contact number : </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    placeholder='+91'
                                                    value={conatct_number}
                                                    onChange={handlePconatactnumberChange}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                            {errors.conatct_number && <span className="error text-danger">{errors.conatct_number}</span>}
                                        </Col>
                                        <Col lg={5} md={5} sm={12} className='mb-5'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    placeholder='+91'
                                                    // value={conatct_number}
                                                    // onChange={handlePconatactnumberChange}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                            {errors.conatct_number && <span className="error text-danger">{errors.conatct_number}</span>}
                                        </Col>

                                        <b className='mb-5'
                                            style={{
                                                fontFamily: 'Century Gothic',
                                                textAlign: 'justify',
                                            }}
                                        >
                                            I certify that the information I have provided above is true to the best of my
                                            knowledge and belief, without any malice or intention to commit acts of
                                            misrepresentation. I am aware that any false, misleading, or deceptive
                                            information provided may lead to withdrawal, exclusion, or disciplinary
                                            action, which may be dealt with by the company or relevant authorities.
                                        </b>

                                        <Col lg={2} md={2} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Name of Applicant : </b></Col>
                                        <Col lg={5} md={5} sm={12} className='mb-5'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter applicant name" className='FormStyeling transparent-input' value={buttom_applicant_name} onChange={(e) => setbuttonapplicantname(e.target.value)} />
                                            </Form.Group>
                                            {errors.buttom_applicant_name && <span className="error text-danger">{errors.buttom_applicant_name}</span>}
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className="m-0">
                                            <b className="single-line" style={{ fontFamily: 'Century Gothic' }}>Place:</b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter place"
                                                    className="FormStyeling transparent-input"
                                                    value={buttom_place}
                                                    onChange={(e) => setbuttom_place(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.buttom_place && (
                                                <span className="error text-danger">{errors.buttom_place}</span>
                                            )}
                                        </Col>


                                        <Col lg={2} md={2} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Name of Applicant : </b></Col>
                                        <Col lg={4} md={4} sm={12} className='mb-3'>
                                            <Form.Group className="fname mb-2" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="date" className='FormStyeling transparent-input' as="textarea" rows={4} value={applicant_name} onChange={(e) => setapplicant_name(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            {/* <Form.Control
                                                    type="date"
                                                    placeholder="Enter date"
                                                    className=' transparent-input'  rows={4}
                                                    
                                                /> */}
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
                                            <b style={{ fontFamily: 'Century Gothic' }}>Aplicant Signature:</b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <div className="box"></div>
                                        </Col>







                                    </Row>
                                    <div className="button-container">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={{ backgroundColor: "#28a745", borderColor: "#28a745", marginRight: "10px" }} // Change to your desired color
                                        >
                                            Submit
                                        </Button>

                                        <Button
                                            variant="primary"
                                            onClick={handlePrint}
                                            style={{ backgroundColor: "#17a2b8", borderColor: "#17a2b8" }} // Change to your desired color
                                        >
                                            Print
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
    )
}

export default InterJoining
