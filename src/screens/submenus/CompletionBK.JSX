import React, { useState } from 'react'
import './completion.css'
import logo1 from '../imgs/SCOPE FINAL LOGO Black.png';
import logo2 from '../imgs/SUMAGO Logo (2) (1).png';
import corner from '../imgs/file (28).png';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
function CompletionFrom() {
    const [name, setname] = useState('');
    const [technology, settechnology] = useState('');
    const [email, setemail] = useState('');
    const [date_of_joining, setSelectedDate] = useState('');
    // const [selectedDate, setSelectedDate] = useState('');
    const [selectedMode, setSelectedMode] = useState('');
    const [current_working, setcurrent_working] = useState('')
    const [project_title, setproject_title] = useState('')
    const [describe_project, setdescribe_project] = useState('')
    const [placed, setplaced] = useState('')
    const [employer_name, setemployer_name] = useState('')
    const [designation_in_current_company, setdesignation_in_current_company] = useState('')
    const [package_in_lpa, setpackage_in_lpa] = useState('')
    const [task_links_1, settask_links_1] = useState('')
    const [task_links_2, settask_links_2] = useState('')
    const [task_links_3, settask_links_3] = useState('')
    const [task_links_4, settasklink4] = useState('')
    const [task_links_5, settasklink5] = useState('')
    const [project_github, setproject_github] = useState('')
    const [final_year_project_link, setfinal_year_project_link] = useState('')

    const [name_contact_of_fifth_candidate, setname_contact_of_fifth_candidate] = useState('')
    const [name_contact_of_second_candidate, setname_contact_of_second_candidate] = useState('')
    const [name_contact_of_third_candidate, setname_contact_of_third_candidate] = useState('')
    const [name_contact_of_fourth_candidate, setname_contact_of_fourth_candidate] = useState('')
    const [name_contact_of_first_candidate, setname_contact_of_first_candidate] = useState('')

    const [blog_on_your_selected_technology, setblog_on_your_selected_technology] = useState('')
    // const [file, setFile] = useState(null);
    // const [video, setVideo] = useState(null);
    // const [pdf, setPdf] = useState(null);

    const [video, setVideo] = useState(null); // Store the selected video file
    const [image, setImage] = useState(null); // Store the selected image file
    const [pdf, setPdf] = useState(null); // Store the selected PDF file
    const [submissionMessage, setSubmissionMessage] = useState(''); // Store submission messages


    const [error, setError] = useState('');

    const [fileName, setFileName] = useState('');


    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!name.trim()) {
            errors.name = 'Name is required.';
            isValid = false;
        }

        if (!technology.trim()) {
            errors.technology = 'Technology is required.';
            isValid = false;
        }

        if (!email.trim()) {
            errors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address.';
            isValid = false;
        }

        if (!date_of_joining.trim()) {
            errors.date_of_joining = 'Date of joining is required.';
            isValid = false;
        }
        if (!current_working.trim()) {
            errors.current_working = 'Current working is required.';
            isValid = false;
        }

        // if (!selectedDate) {
        //     errors.selectedDate = 'Completion date is required.';
        //     isValid = false;
        // } else if (new Date(selectedDate) < new Date()) {
        //     errors.selectedDate = 'Completion date must not be in the past.';
        //     isValid = false;
        // }

        if (!selectedMode) {
            errors.selectedMode = 'Please select a training mode.';
            isValid = false;
        }
        if (!project_title.trim()) {
            errors.project_title = 'project Title is required.';
            isValid = false;
        }
        if (!describe_project.trim()) {
            errors.describe_project = 'Description of project Title is required.';
            isValid = false;
        }
        if (!placed.trim()) {
            errors.placed = 'placed is required.';
            isValid = false;
        }
        if (!employer_name.trim()) {
            errors.employer_name = 'Employer Name Title is required.';
            isValid = false;
        }
        if (!designation_in_current_company.trim()) {
            errors.designation_in_current_company = 'Designation In current company is required.';
            isValid = false;
        }
        if (!package_in_lpa.trim()) {
            errors.package_in_lpa = 'package is required.';
            isValid = false;
        }

        if (!task_links_1.trim()) {
            errors.task_links_1 = 'task links 1 is required.';
            isValid = false;
        }
        if (!task_links_2.trim()) {
            errors.task_links_2 = 'task links 2 is required.';
            isValid = false;
        }
        if (!task_links_3.trim()) {
            errors.task_links_3 = 'task links 3 is required.';
            isValid = false;
        }
        if (!task_links_4.trim()) {
            errors.task_links_4 = 'task links 4 is required.';
            isValid = false;
        }
        if (!task_links_5.trim()) {
            errors.task_links_5 = 'task links 5 is required.';
            isValid = false;
        }
        if (!project_github.trim()) {
            errors.project_github = 'project github link is required.';
            isValid = false;
        }
        if (!final_year_project_link.trim()) {
            errors.final_year_project_link = 'final year project link is required.';
            isValid = false;
        }
        if (!name_contact_of_fifth_candidate.trim()) {
            errors.name_contact_of_fifth_candidate = 'Name Contact of first candidate is required.';
            isValid = false;
        }
        if (!name_contact_of_second_candidate.trim()) {
            errors.name_contact_of_second_candidate = 'Name Contact of second candidate is required.';
            isValid = false;
        }
        if (!name_contact_of_third_candidate.trim()) {
            errors.name_contact_of_third_candidate = 'Name Contact of third candidate is required.';
            isValid = false;
        }
        if (!name_contact_of_fourth_candidate.trim()) {
            errors.name_contact_of_fourth_candidate = 'Name Contact of four candidate is required.';
            isValid = false;
        }
        if (!name_contact_of_first_candidate.trim()) {
            errors.name_contact_of_first_candidate = 'Name Contact of Fifth candidate is required.';
            isValid = false;
        }
        if (!blog_on_your_selected_technology.trim()) {
            errors.blog_on_your_selected_technology = 'Blog on your selected technology is required.';
            isValid = false;
        }
        // if (!video.trim()) {
        //     errors.video = 'Video is required.';
        //     isValid = false;
        // }
        // if (!pdf.trim()) {
        //     errors.pdf = 'pdf is required.';
        //     isValid = false;
        // }

        setErrors(errors);
        return isValid;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("remember_token");
        const id = localStorage.getItem("id");
        console.log(id, "new iddddd");
        
        if (validateForm()) {
            const submittedData = {
                name,
                technology,
                email,
                date_of_joining,
                selected_mode: selectedMode,
                current_working,
                project_title,
                describe_project,
                placed,
                employer_name,
                package_in_lpa,
                designation_in_current_company,
                task_links_1,
                task_links_2,
                task_links_3,
                task_links_4,
                task_links_5,
                project_github,
                final_year_project_link,
                name_contact_of_first_candidate,
                name_contact_of_second_candidate,
                name_contact_of_third_candidate,
                name_contact_of_fourth_candidate,
                name_contact_of_fifth_candidate,
                blog_on_your_selected_technology,
                pdf,
                image,
                video
            };
    
            if (!video || !image || !pdf) {
                setSubmissionMessage('Please select a PDF, video, and image before submitting.');
                console.log('Please select a PDF, video, and image before submitting.');
            } else if (Object.values(errors).some((error) => error)) {
                console.log('There are errors. Please fix them before submitting.');
                setSubmissionMessage('There are errors. Please fix them before submitting.');
            } else {
                // Prepare the form data
                const formData = new FormData();
                formData.append('stude_id', id);
                formData.append('name', name);
                formData.append('technology', technology);
                formData.append('email', email);
                formData.append('date_of_joining', date_of_joining);
                formData.append('selected_mode', selectedMode);
                formData.append('current_working', current_working);
                formData.append('project_title', project_title);
                formData.append('describe_project', describe_project);
                formData.append('placed', placed);
                formData.append('employer_name', employer_name);

                formData.append('package_in_lpa', package_in_lpa);
                formData.append('designation_in_current_company', designation_in_current_company);
                formData.append('task_links_1', task_links_1);
                formData.append('task_links_2', task_links_2);
                formData.append('task_links_3', task_links_3);
                formData.append('task_links_4', task_links_4);
                formData.append('task_links_5', task_links_5);
                formData.append('project_github', project_github);
                formData.append('final_year_project_link', final_year_project_link);
                formData.append('name_contact_of_first_candidate', name_contact_of_first_candidate);
                formData.append('name_contact_of_second_candidate', name_contact_of_second_candidate);
                formData.append('name_contact_of_third_candidate', name_contact_of_third_candidate);
                formData.append('name_contact_of_fourth_candidate', name_contact_of_fourth_candidate);
                formData.append('name_contact_of_fifth_candidate', name_contact_of_fifth_candidate);
                formData.append('blog_on_your_selected_technology', blog_on_your_selected_technology);
        
                // Append files to formData
                formData.append('pdf', pdf);
                formData.append('image', image);
                formData.append('video', video);
    
                console.log(formData, "formDataformDataformDataformData");
                
                // Send data to API using axios
                axios.post('https://api.sumagotraining.in/public/api/intern-completion/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',  // Content type for file uploads
                        'Authorization': `Bearer ${token}`,   // Include token for authentication
                        'Accept': 'application/json'
                    }
                })
                .then((response) => {
                    console.log('Success:', response.data);
                    setSubmissionMessage('Form submitted successfully!');
                    alert('Data submitted successfully!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setSubmissionMessage('There was an error submitting the form.');
                });
            }
    
            console.log('Submitted Data:', submittedData);
        }
    };
    


    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        let isValid = true;
        let errorMessages = {};

        if (type === 'video') {
            // Validate video files
            const validVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'];
            if (file) {
                if (!validVideoTypes.includes(file.type)) {
                    isValid = false;
                    errorMessages.video = 'Only video files (mp4, avi, mov, mkv) are allowed.';
                } else {
                    setVideo(file); // Set the valid video file
                }
            }
        } else if (type === 'image') {
            // Validate image files
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (file) {
                if (!validImageTypes.includes(file.type)) {
                    isValid = false;
                    errorMessages.image = 'Only image files (jpg, jpeg, png) are allowed.';
                } else {
                    setImage(file); // Set the valid image file
                }
            }
        } else if (type === 'pdf') {
            // Validate PDF files
            if (file) {
                if (file.type !== 'application/pdf') {
                    isValid = false;
                    errorMessages.pdf = 'Only PDF files are allowed.';
                } else {
                    setPdf(file); // Set the valid PDF file
                }
            }
        }

        if (isValid) {
            errorMessages[type] = ''; // Clear errors for that type
        }

        setErrors(errorMessages); // Update errors state
    };

    const handlePrint = () => {
        window.print();
      };


    return (
        <>
            <div className="backimg">
                <div>
                    <img src={corner} className="corner_img" alt="Responsive Corner" />
                </div>
                <div className='logo-container'>
                    <img src={logo1} class="img-fluid logo1" alt="..." /> 
                     <img src={logo2} class="img-fluid logo2" alt="..." /> 
                </div>
                <Container>
                    <div className="text-center title-container">
                        <b className="title-text">
                            INTERNS COMPLETION <span className="highlight">FORM</span>
                        </b>
                    </div>
                </Container>

                <Container className="position-relative text-center homepara">
                    <p>
                        SCOPE, where we believe in empowering individuals through education and
                        skill development. Established with a vision to foster excellence and
                        innovation in learning, Scope is dedicated to providing high-quality
                        training programs tailored to meet the diverse needs of our students.
                    </p>
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

                <Form onSubmit={handleSubmit}>
                    <Container fluid>
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
                                        <b className="form-title">INTERNSHIP COMPLETION FORM</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                        <Col lg={2} md={2} sm={12} className='mt-3'>
                                            <b style={{ fontFamily: 'Century gothic' }}>Name : </b>
                                        </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-3">
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    value={name}
                                                    className="FormStyeling transparent-input"
                                                    onChange={(e) => setname(e.target.value)}
                                                    placeholder="Enter your name" /* Optional placeholder */
                                                />
                                            </Form.Group>
                                            {errors.name && <span className="error text-danger">{errors.name}</span>}
                                        </Col>


                                        <Col lg={2} md={2} sm={12} className='mt-3'><b style={{ fontFamily: 'Century gothic' }}>Technology  : </b> </Col>
                                        <Col lg={4} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    value={technology}
                                                    className='FormStyeling transparent-input'
                                                    onChange={(e) => settechnology(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.technology && (
                                                <span className="error text-danger">{errors.technology}</span>
                                            )}
                                        </Col>

                                        <Col lg={1} md={2} sm={12} className='mt-3'><b style={{ fontFamily: 'Century gothic' }}>Email Id  : </b> </Col>
                                        <Col lg={5} md={5} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="email"
                                                    value={email}
                                                    className='FormStyeling transparent-input'
                                                    onChange={(e) => setemail(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.email && <span className="error text-danger">{errors.email}</span>}
                                        </Col>

                                        <Col lg={2} md={2} sm={12} className='mt-3'><b style={{ fontFamily: 'Century gothic' }}>Date of Joining   : </b> </Col>
                                        <Col lg={4} md={4} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="date"
                                                    value={date_of_joining}
                                                    className='FormStyeling transparent-input'
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.date_of_joining && (
                                                <span className="error text-danger">{errors.date_of_joining}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='mt-3'><b style={{ fontFamily: 'Century gothic' }}>Training mode : </b> </Col>
                                        <Col lg={4} md={4} sm={12} className='mb-3 mt-3'>
                                            <div className="d-flex justify-content-start">
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 1"
                                                    label="Online"
                                                    className="me-3"
                                                    name="selected_mode1"
                                                    value="Online"
                                                    onChange={(e) => setSelectedMode(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 2"
                                                    label="Offline"
                                                    name="selected_mode1"
                                                    value="Offline"
                                                    onChange={(e) => setSelectedMode(e.target.value)}
                                                />
                                            </div>
                                            {errors.selectedMode && (
                                                <span className="error text-danger">{errors.selectedMode}</span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12} className='mt-3'><b style={{ fontFamily: 'Century gothic' }}>Current working on : </b> </Col>
                                        <Col lg={10} md={10} sm={12} className="mb-2 mt-3">
                                            <div className="d-flex flex-wrap justify-content-start radio-container">
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 1"
                                                    label="SRS Preparation"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value="SRS Preparation"
                                                    onChange={(e) => setcurrent_working(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 2"
                                                    label="Project Development"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value='Project Development'
                                                    onChange={(e) => setcurrent_working(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 3"
                                                    label="Project Deployment"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value='Project Deployment'
                                                    onChange={(e) => setcurrent_working(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 4"
                                                    label="Placed"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value='Placed'
                                                    onChange={(e) => setcurrent_working(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 5"
                                                    label="Other"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value='Other'
                                                    onChange={(e) => setcurrent_working(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 6"
                                                    label="Live Task Working"
                                                    className="me-3 mb-2"
                                                    name="current_working"
                                                    value='Live Task Working'
                                                    onChange={(e) => setcurrent_working(e.target.value)}
                                                />
                                            </div>
                                            {errors.current_working && (
                                                <span className="error text-danger">{errors.current_working}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='mt-3'><b style={{ fontFamily: 'Century gothic' }}>Project Title   : </b> </Col>
                                        <Col lg={10} md={10} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={project_title}
                                                    onChange={(e) => setproject_title(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.project_title && (
                                                <span className="error text-danger">{errors.project_title}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='mt-2'><b style={{ fontFamily: 'Century gothic' }}>Describe project in 3 to 4 lines  : </b> </Col>
                                        <Col lg={4} md={5} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control as="textarea" rows={3} className='FormStyeling transparent-input' value={describe_project} onChange={(e) => setdescribe_project(e.target.value)} />
                                            </Form.Group>
                                            {errors.describe_project && (
                                                <span className="error text-danger">{errors.describe_project}</span>
                                            )}

                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Placed Anywhere? : </b> </Col>
                                        <Col lg={4} md={3} sm={12} className='mb-3'>

                                            <div className="d-flex justify-content-start">
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 1"
                                                    label="Yes"
                                                    className="me-3"
                                                    name='selected_mode'
                                                    value='Yes'
                                                    onChange={(e) => setplaced(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    aria-label="radio 2"
                                                    label="No"
                                                    name='selected_mode'
                                                    value='No'
                                                    onChange={(e) => setplaced(e.target.value)}
                                                />
                                            </div>
                                            {errors.placed && (
                                                <span className="error text-danger">{errors.placed}</span>
                                            )}

                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Employer Name(If no, Enter NA):</b> </Col>
                                        <Col lg={4} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={employer_name}
                                                    onChange={(e) => setemployer_name(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.employer_name && (
                                                <span className="error text-danger">{errors.employer_name}</span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Designation In current company (If no, Enter NA): </b> </Col>
                                        <Col lg={4} md={3} sm={12} className='mb-3'>

                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={designation_in_current_company}
                                                    onChange={(e) => setdesignation_in_current_company(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.designation_in_current_company && (
                                                <span className="error text-danger">{errors.designation_in_current_company}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Package in LPA(If no, Enter NA): </b> </Col>
                                        <Col lg={4} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={package_in_lpa}
                                                    onChange={(e) => setpackage_in_lpa(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.package_in_lpa && (
                                                <span className="error text-danger">{errors.package_in_lpa}</span>
                                            )}
                                        </Col>

                                        <Col lg={12} md={12} sm={12} className='mb-3'><b style={{ fontFamily: 'Century gothic' }}>Provide minimum 5 task links which you uploaded on linkedin</b> </Col>
                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Link 1 : </b></Col>
                                        <Col lg={10} md={10} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={task_links_1}
                                                    onChange={(e) => settask_links_1(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.task_links_1 && (
                                                <span className="error text-danger">{errors.task_links_1}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Link 2 : </b></Col>
                                        <Col lg={10} md={10} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={task_links_2}
                                                    onChange={(e) => settask_links_2(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.task_links_2 && (
                                                <span className="error text-danger">{errors.task_links_2}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Link 3 : </b></Col>
                                        <Col lg={10} md={10} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={task_links_3}
                                                    onChange={(e) => settask_links_3(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.task_links_3 && (
                                                <span className="error text-danger">{errors.task_links_3}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Link 4 : </b></Col>
                                        <Col lg={10} md={10} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={task_links_4}
                                                    onChange={(e) => settasklink4(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.task_links_4 && (
                                                <span className="error text-danger">{errors.task_links_4}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Link 5 : </b></Col>
                                        <Col lg={10} md={10} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={task_links_5}
                                                    onChange={(e) => settasklink5(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.task_links_5 && (
                                                <span className="error text-danger">{errors.task_links_5}</span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>GitHub link of your final year project Link: </b> </Col>
                                        <Col lg={4} md={2} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={project_github}
                                                    onChange={(e) => setproject_github(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.project_github && (
                                                <span className="error text-danger">{errors.project_github}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Link of final project completion video on linked in Link:  : </b> </Col>
                                        <Col lg={4} md={4} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={final_year_project_link}
                                                    onChange={(e) => setfinal_year_project_link(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.final_year_project_link && (
                                                <span className="error text-danger">{errors.final_year_project_link}</span>
                                            )}
                                        </Col>

                                        <Col lg={12} md={12} sm={12} className='mb-3'><b style={{ fontFamily: 'Century gothic' }}>List of minimum 5 candidates which are refer from your side for company                                     </b> </Col>
                                        <Col lg={2} md={3} sm={12}>
                                            <b className="responsive-text" style={{ fontFamily: 'Century gothic' }}>
                                                Name & Contact of first candidate:
                                            </b>
                                        </Col>

                                        <Col lg={10} md={9} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={name_contact_of_fifth_candidate}
                                                    onChange={(e) => setname_contact_of_fifth_candidate(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_fifth_candidate && (
                                                <span className="error text-danger">{errors.name_contact_of_fifth_candidate}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Name & Contact of second candidate:</b></Col>
                                        <Col lg={10} md={9} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={name_contact_of_second_candidate}
                                                    onChange={(e) => setname_contact_of_second_candidate(e.target.value)}

                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_second_candidate && (
                                                <span className="error text-danger">{errors.name_contact_of_second_candidate}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Name & Contact of third candidate:</b></Col>
                                        <Col lg={10} md={9} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={name_contact_of_third_candidate}
                                                    onChange={(e) => setname_contact_of_third_candidate(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_third_candidate && (
                                                <span className="error text-danger">{errors.name_contact_of_third_candidate}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Name & Contact of fourth candidate:</b></Col>
                                        <Col lg={10} md={9} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={name_contact_of_fourth_candidate}
                                                    onChange={(e) => setname_contact_of_fourth_candidate(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_fourth_candidate && (
                                                <span className="error text-danger">{errors.name_contact_of_fourth_candidate}</span>
                                            )}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Name & Contact of fifth candidate:</b></Col>
                                        <Col lg={10} md={9} sm={12} className='mb-5'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={name_contact_of_first_candidate}
                                                    onChange={(e) => setname_contact_of_first_candidate(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.name_contact_of_first_candidate && (
                                                <span className="error text-danger">{errors.name_contact_of_first_candidate}</span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={3} sm={12}>
                                            <b style={{ fontFamily: 'Century gothic' }}>Upload the screenshots of Google review</b>
                                        </Col>
                                        <Col lg={4} md={3} sm={12} className="mb-5">
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control

                                                    className='FormStyeling transparent-input'
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'image')}
                                                />
                                            </Form.Group>

                                            {errors.image && <p className="text-danger">{errors.image}</p>}
                                            {image && <p>Selected Image: {image.name}</p>}
                                        </Col>
                                        <Col lg={2} md={3} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Write minimum one Blog on your selected technology </b> </Col>
                                        <Col lg={4} md={3} sm={12} className='mb-5'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={blog_on_your_selected_technology}
                                                    onChange={(e) => setblog_on_your_selected_technology(e.target.value)}
                                                />
                                            </Form.Group>
                                            {errors.blog_on_your_selected_technology && (
                                                <span className="error text-danger">{errors.blog_on_your_selected_technology}</span>
                                            )}
                                        </Col>

                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: 'Century gothic' }}>Upload your training video feedback</b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-5">
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control

                                                    className='FormStyeling transparent-input'
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => handleFileChange(e, 'video')}
                                                />
                                            </Form.Group>

                                            {errors.video && <p className="text-danger">{errors.video}</p>}
                                            {video && <p>Selected Video: {video.name}</p>}
                                        </Col>
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: 'Century gothic' }}>Upload your updated Resume</b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-5">
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control

                                                    className='FormStyeling transparent-input'
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => handleFileChange(e, 'pdf')}
                                                />
                                            </Form.Group>

                                            {errors.pdf && <p className="text-danger">{errors.pdf}</p>}
                                            {pdf && <p>Selected PDF: {pdf.name}</p>}

                                        </Col>
                                    </Row>

                                    <div className="button-container">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }} // Change to your desired color
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

                                    {/* <Button variant="primary" type='submit' style={{ position: 'absolute' }}>Submit</Button> */}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Container>

                </Form >



            </div>
        </>

    )
}

export default CompletionFrom
