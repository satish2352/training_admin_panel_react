////sos
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import ProtectedRoutes from "./api/ProtectedRoutes";
import { id } from "date-fns/locale";

import Login from "./screens/submenus/Login";
import Logout from "./screens/submenus/Logout";
import ForgotPassword from "./screens/submenus/ForgotPassword";
import PersonalDetailsPage from "./screens/submenus/PersonalDetailsPage";
import UpdatePersonalDetails from "./screens/submenus/UpdatePersonalDetails";

import InterJoining from "./screens/submenus/InterJoining";
import ViewInternJoining from "./screens/submenus/ViewInternJoining";
import UpdateInternDetails from "./screens/submenus/UpdateInternDetails";
import InternDetailsPage from "./screens/submenus/InternDetailsPage";
import InternAllDetails from "./screens/submenus/InternAllDetails";
import AllDetailsofIntern from "./screens/submenus/AllDetailsofIntern";
import ViewJoining from "./screens/submenus/ViewJoining";

import CompletionFrom from "./screens/submenus/CompletionFrom";
import ViewCompletionFrom from "./screens/submenus/ViewCompletionFrom";
import UpdateCompletionDetails from "./screens/submenus/UpdateCompletionDetails";
import CompletionAllDetails from "./screens/submenus/CompletionAllDetails";
import LazyCompletionFrom from "./screens/submenus/LazyCompletionFrom";
import CompletionFormSkeleton from "./screens/submenus/CompletionFormSkeleton"; // Skeleton component
import CompletionDetailsPage from "./screens/submenus/CompletionDetailsPage";
import IdCardIssue from "./screens/submenus/IdCardIssue";
import ViewIdCard from "./screens/submenus/ViewIdCard";
import IdCardDetailsPage from "./screens/submenus/IdCardDetailsPage";
import IdCardAllDetails from "./screens/submenus/IdCardAllDetails";
import UpdateIdCardDetails from "./screens/submenus/UpdateIdCardDetails";
import ViewT3Sheet from "./screens/submenus/ViewT3Sheet";
import T3SheetDetails from "./screens/submenus/T3SheetDetails";
import T3SheetAllDetails from "./screens/submenus/T3SheetAllDetails";



import ViewPopupEnquiry from "./screens/submenus/ViewPopupEnquiry";
import ViewImplanttraining from "./screens/submenus/ViewImplanttraining";
import AddSubsubcourse from "./screens/submenus/AddSubsubcourse.jsx";
import UpdateSubcourse from "./screens/submenus/UpdateSubcourse";
import UpdateSubcoursedetails from "./screens/submenus/UpdateSubcoursedetails";

import Coursedetails from "./screens/submenus/Coursedetails";
import AddCourse from "./screens/submenus/AddCourse";
import UpdateCourse from "./screens/submenus/UpdateCourse";

import Subcoursedetails from "./screens/submenus/Subcoursedetails";
import Addsubcourse from "./screens/submenus/AddSubcourse";
import Subsubcoursedetails from "./screens/submenus/Subsubcoursedetails";
import ProgramfeesCategoryDetails from "./screens/submenus/ProgramfeesCategoryDetails.jsx";
import AddProgramFeesCategory from "./screens/submenus/Addprogramfeescategory.jsx";
import Updatefeecategory from "./screens/submenus/Updatefeecategory";

import Updatecoursefees from "./screens/submenus/Updatecoursefees";
import Coursefeesdetails from "./screens/submenus/Coursefeesdetails.jsx";
import Addcoursefees from "./screens/submenus/Addcoursefees.jsx";
import Bannerdetails from "./screens/submenus/Bannerdetails.jsx";
import AddBanner from "./screens/submenus/AddBanner.jsx";
import Alumnidetails from "./screens/submenus/Alumnidetails.jsx";
import AddAlumni from "./screens/submenus/AddAlumni.jsx";
import Hiredetails from "./screens/submenus/Hiredetails.jsx";
import AddHiring from "./screens/submenus/AddHiring.jsx";
import Expertreviewdetails from "./screens/submenus/Expert_reviewdetails.jsx";
import AddExpertReview from "./screens/submenus/AddExpertReview.jsx";
import UpdateBanner from "./screens/submenus/UpdateBanner.jsx";
import UpdateAlumni from "./screens/submenus/UpdateAlumni.jsx";
import UpdateHiring from "./screens/submenus/UpdateHiring.jsx";
import UpdateExpertreview from "./screens/submenus/UpdateExpertreview.jsx";
import Upcomingeventsdetails from "./screens/submenus/Upcomingeventdetails.jsx";
import AddUpcomingevents from "./screens/submenus/AddUpcomingevents.jsx";
import UpdateUpcomingevents from "./screens/submenus/UpdateUpcomingevents.jsx";
import TrainingDashboard from "./screens/submenus/TrainingDashboard.jsx";
import Enquirydetails from "./screens/submenus/EnquiryDetails.jsx";
import Officesdetails from "./screens/submenus/Officesdetails.jsx";
import AddOffice from "./screens/submenus/AddOffice.jsx";
import Googlereviewdetails from "./screens/submenus/GoogleReviewdetails.jsx";
import AddGooglereview from "./screens/submenus/AddGooglereview.jsx";
import Updateoffice from "./screens/submenus/Updateoffice.jsx";
import UpdateGooglereview from "./screens/submenus/UpdateGooglereview.jsx";
import Syllabuspdfinfodetails from "./screens/submenus/Syllabuspdfinfodetails.jsx";
import Syllabuspdfdetails from "./screens/submenus/Syllabuspdfdetails.jsx";
import Addsyllabuspdf from "./screens/submenus/AddSyllabuspdf.jsx";
import UpdateSyllabuspdf from "./screens/submenus/UpdateSyllabuspdf.jsx";
import Moduledetails from "./screens/submenus/Moduledetails.jsx";
import AddModule from "./screens/submenus/AddModule.jsx";
import UpdateModule from "./screens/submenus/UpdateModule.jsx";
import Syllabusdetails from "./screens/submenus/Syllbusdetails.jsx";
import AddSyllabus from "./screens/submenus/AddSyllabus.jsx";
import UpdateSyllabus from "./screens/submenus/UpdateSyllabus.jsx";
import Mentordetails from "./screens/submenus/Mentordetails.jsx";
import AddMentor from "./screens/submenus/AddMentor.jsx";
import UpdateMentor from "./screens/submenus/UpdateMentor.jsx";
import Certificatedetails from "./screens/submenus/Certificatedetails.jsx";
import AddCertificate from "./screens/submenus/AddCertificate.jsx";
import UpdateCetificate from "./screens/submenus/UpdateCertificate.jsx";
import HandsonCategorydetails from "./screens/submenus/HandsonCategorydetails.jsx";
import AddHandsonCategory from "./screens/submenus/AddhandsonCategory.jsx";
import HandsonProjectdetails from "./screens/submenus/HandsonProjectdetails.jsx";
import AddHandsonProject from "./screens/submenus/AddHandsonProject.jsx";
import UpdateHandsonProject from "./screens/submenus/UpdateHandsonProject.jsx";
import LearnerReviewdetails from "./screens/submenus/LearnerReviewdetails.jsx";
import AddLearnerReview from "./screens/submenus/AddLearnerReview.jsx";
import UpdateLearnerReview from "./screens/submenus/UpdateLearnerReview.jsx";
import TopRankdetails from "./screens/submenus/TopRankdetails.jsx";
import AddTopRank from "./screens/submenus/AddTopRank.jsx";
import UpdateTopRank from "./screens/submenus/UpdateTopRank.jsx";
import FunatworkCategorydetails from "./screens/submenus/FunatworkCategorydetails.jsx";
import FunatworkCategory from "./screens/submenus/AddfunatworkCategory.jsx";
import UpdateFunatworkCategory from "./screens/submenus/UpdateFunatworkCategory.jsx";
import Funatworkdetails from "./screens/submenus/Funatworkdetails.jsx";
import AddFunatworkData from "./screens/submenus/AddFunatworkdata.jsx";
import UpdateFunatworkData from "./screens/submenus/UpdateFunatworkData.jsx";
import RecognitionCategorydetails from "./screens/submenus/RecognitionCategoeydetails.jsx";
import AddRecognitionCategory from "./screens/submenus/AddRecognitionCategory.jsx";
import UpdateRecognitionCategory from "./screens/submenus/UpdateRecognitionCategory.jsx";
import Recognitiondetails from "./screens/submenus/Recognitiondetails.jsx";
import AddRecognitiondetails from "./screens/submenus/AddRecognitiondetails.jsx";
import UpdateRecognitiondetails from "./screens/submenus/UpdateRecognitiondetails.jsx";
import MOUCategorydetails from "./screens/submenus/MOUCategorydetails.jsx";
import AddMOUCategory from "./screens/submenus/AddMOUCategory.jsx";
import UpdateMOUCategory from "./screens/submenus/UpdateMOUCategory.jsx";
import MOUdetails from "./screens/submenus/MOUdetails.jsx";
import AddMOUdetails from "./screens/submenus/AddMOUdetails.jsx";
import UpdateMOUdetails from "./screens/submenus/UpdateMOUdetails.jsx";
import Newsdetails from "./screens/submenus/Newsdetails.jsx";
import AddNewsdetails from "./screens/submenus/AddNewsdetails.jsx";
import UpdateNewsdetails from "./screens/submenus/UpdateNewsdetails.jsx";
import NewsLetterdetails from "./screens/submenus/NewsLetterdetails.jsx";
import AddNewsLetterdetails from "./screens/submenus/AddNewsLetterdetails.jsx";
import UpdateNewsLetterdetails from "./screens/submenus/UpdateNewsLetterdetails.jsx";



function App() {
  // REACT_APP_IMAGE_URL= "https://api.sumagotraining.in/";
  const LazyCompletionDetailsPage = lazy(() =>
    import("./screens/submenus/CompletionDetailsPage")
  );
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<BaseLayout />}>
          {/* submenus */}
          <Route
            path="/dashboard"
            element={<ProtectedRoutes Component={Dashboard} />}
          />
          <Route
            path="/PersonalDetailsPage"
            element={<ProtectedRoutes Component={PersonalDetailsPage} />}
          />
          <Route
            path="/update-intern-personal-details/:id"
            element={<ProtectedRoutes Component={UpdatePersonalDetails} />}
          />


          <Route
            path="/interjoining/:id"
            element={<ProtectedRoutes Component={InterJoining} />}
          />
          <Route
            path="/viewinterjoining"
            element={<ProtectedRoutes Component={ViewInternJoining} />}
          />
          <Route
            path="/viewjoining"
            element={<ProtectedRoutes Component={ViewJoining} />}
          />
          <Route
            path="/all-intern-details/:id"
            element={<ProtectedRoutes Component={AllDetailsofIntern} />}
          />
          <Route
            path="/intern-details/:id"
            element={<ProtectedRoutes Component={InternDetailsPage} />}
          />
          <Route
            path="/update-intern-details/:id"
            element={<ProtectedRoutes Component={UpdateInternDetails} />}
          />
          <Route
            path="/intern-all-details/:id"
            element={<ProtectedRoutes Component={InternAllDetails} />}
          />




          <Route
            path="/completion/:id"
            element={<ProtectedRoutes Component={CompletionFrom} />}
          />
          <Route
            path="/completion-details/:id"
            element={
              <Suspense fallback={<CompletionFormSkeleton />}>
                <ProtectedRoutes Component={LazyCompletionDetailsPage} />
              </Suspense>
            }
          />;
          <Route
            path="/completion-details/:id"
            element={<ProtectedRoutes Component={LazyCompletionFrom} />}
          />
          <Route
            path="/completion-all-details/:id"
            element={<ProtectedRoutes Component={CompletionAllDetails} />}
          />
          <Route
            path="/completion-all-details/:id"
            element={
              <Suspense fallback={<CompletionFormSkeleton />}>
                <ProtectedRoutes Component={LazyCompletionDetailsPage} />
              </Suspense>
            }
          />;
          <Route
            path="/update-completion-details/:id"
            element={<ProtectedRoutes Component={UpdateCompletionDetails} />}
          />
          <Route
            path="/viewcompletion"
            element={<ProtectedRoutes Component={ViewCompletionFrom} />}
          />



          <Route
            path="/IdCardIssue/:id"
            element={<ProtectedRoutes Component={IdCardIssue} />}
          />
          <Route
            path="/get-intern-id-card-details/:id"
            element={<ProtectedRoutes Component={IdCardDetailsPage} />}
          />
          <Route
            path="/ViewIdCard"
            element={<ProtectedRoutes Component={ViewIdCard} />}
          />
          <Route
            path="/Id-card-all-details/:id"
            element={<ProtectedRoutes Component={IdCardAllDetails} />}
          />
          <Route
            path="/update-Id-card-details/:id"
            element={<ProtectedRoutes Component={UpdateIdCardDetails} />}
          />



          <Route
            path="/ViewT3Sheet"
            element={<ProtectedRoutes Component={ViewT3Sheet} />}
          />
          <Route
            path="/T3SheetDetails/:id"
            element={<ProtectedRoutes Component={T3SheetDetails} />}
          />
          <Route
            path="/T3SheetAllDetails/:id"
            element={<ProtectedRoutes Component={T3SheetAllDetails} />}
          />


          {/* BDE login routes start here*/}

          <Route
            path="/trainingdashboard"
            element={<ProtectedRoutes Component={TrainingDashboard} />}
          />

          {/*Home routes */}

          <Route
            path="/bannerdetails"
            element={<ProtectedRoutes Component={Bannerdetails} />}
          />
          <Route
            path="/addbanner"
            element={<ProtectedRoutes Component={AddBanner} />}
          />
          <Route
            path="/update-banner/:id"
            element={<ProtectedRoutes Component={UpdateBanner} />}
          />


          <Route
            path="/upcoming-events"
            element={<ProtectedRoutes Component={Upcomingeventsdetails} />}
          />
          <Route
            path="/add-upcoming-events"
            element={<ProtectedRoutes Component={AddUpcomingevents} />}
          />
          <Route
            path="/update-upcoming-events/:id"
            element={<ProtectedRoutes Component={UpdateUpcomingevents} />}
          />



          <Route
            path="/alumnidetails"
            element={<ProtectedRoutes Component={Alumnidetails} />}
          />
          <Route
            path="/addalumni"
            element={<ProtectedRoutes Component={AddAlumni} />}
          />
          <Route
            path="/update-alumni/:id"
            element={<ProtectedRoutes Component={UpdateAlumni} />}
          />



          <Route
            path="/hiredetails"
            element={<ProtectedRoutes Component={Hiredetails} />}
          />
          <Route
            path="/addhire"
            element={<ProtectedRoutes Component={AddHiring} />}
          />
          <Route
            path="/update-hiring/:id"
            element={<ProtectedRoutes Component={UpdateHiring} />}
          />



          <Route
            path="/expertreviewdetails"
            element={<ProtectedRoutes Component={Expertreviewdetails} />}
          />
          <Route
            path="/addexpertreview"
            element={<ProtectedRoutes Component={AddExpertReview} />}
          />
          <Route
            path="/update-expert-review/:id"
            element={<ProtectedRoutes Component={UpdateExpertreview} />}
          />


          {/*Contact routes */}
          <Route
            path="/enquirydetails"
            element={<ProtectedRoutes Component={Enquirydetails} />}
          />
          <Route
            path="/officesdetails"
            element={<ProtectedRoutes Component={Officesdetails} />}
          />
          <Route
            path="/addoffice"
            element={<ProtectedRoutes Component={AddOffice} />}
          />
          <Route
            path="/update-office/:id"
            element={<ProtectedRoutes Component={Updateoffice} />}
          />


          {/*About routes */}

          <Route
            path="/googlereviewdetails"
            element={<ProtectedRoutes Component={Googlereviewdetails} />}
          />
          <Route
            path="/addgooglereview"
            element={<ProtectedRoutes Component={AddGooglereview} />}
          />
          <Route
            path="/update-googlereview/:id"
            element={<ProtectedRoutes Component={UpdateGooglereview} />}
          />





          {/* Our Courses routes */}
          <Route
            path="/coursedetails"
            element={<ProtectedRoutes Component={Coursedetails} />}
          />
          <Route
            path="/addcourse"
            element={<ProtectedRoutes Component={AddCourse} />}
          />
          <Route
            path="/update-course/:id"
            element={<ProtectedRoutes Component={UpdateCourse} />}
          />


          <Route
            path="/subcoursedetails"
            element={<ProtectedRoutes Component={Subcoursedetails} />}
          />
          <Route
            path="/addsubcourse"
            element={<ProtectedRoutes Component={Addsubcourse} />}
          />
          <Route
            path="/update-subcourse/:id"
            element={<ProtectedRoutes Component={UpdateSubcourse} />}
          />


          <Route
            path="/subsubcoursedetails"
            element={<ProtectedRoutes Component={Subsubcoursedetails} />}
          />
          <Route
            path="/addsubsubcourse"
            element={<ProtectedRoutes Component={AddSubsubcourse} />}
          />
          <Route
            path="/update-subcoursedetails/:id"
            element={<ProtectedRoutes Component={UpdateSubcoursedetails} />}
          />



          <Route
            path="/syllbuspdfinfodetails"
            element={<ProtectedRoutes Component={Syllabuspdfinfodetails} />}
          />



          <Route
            path="/syllabuspdfdetails"
            element={<ProtectedRoutes Component={Syllabuspdfdetails} />}
          />
          <Route
            path="/addsyllabuspdf"
            element={<ProtectedRoutes Component={Addsyllabuspdf} />}
          />
          <Route
            path="/update-syllabuspdf/:id"
            element={<ProtectedRoutes Component={UpdateSyllabuspdf} />}
          />


          <Route
            path="/moduledetails"
            element={<ProtectedRoutes Component={Moduledetails} />}
          />
          <Route
            path="/addmodule"
            element={<ProtectedRoutes Component={AddModule} />}
          />
          <Route
            path="/update-module/:id"
            element={<ProtectedRoutes Component={UpdateModule} />}
          />



          <Route
            path="/syllabusdetails"
            element={<ProtectedRoutes Component={Syllabusdetails} />}
          />
          <Route
            path="/addsyllabus"
            element={<ProtectedRoutes Component={AddSyllabus} />}
          />
          <Route
            path="/update-syllabus/:id"
            element={<ProtectedRoutes Component={UpdateSyllabus} />}
          />



          <Route
            path="/mentordetails"
            element={<ProtectedRoutes Component={Mentordetails} />}
          />
          <Route
            path="/addmentor"
            element={<ProtectedRoutes Component={AddMentor} />}
          />
          <Route
            path="/update-mentor/:id"
            element={<ProtectedRoutes Component={UpdateMentor} />}
          />



          <Route
            path="/programfeescategorydetails"
            element={<ProtectedRoutes Component={ProgramfeesCategoryDetails} />}
          />
          <Route
            path="/addprogramfeescategory"
            element={<ProtectedRoutes Component={AddProgramFeesCategory} />}
          />
          <Route
            path="/update-feecategory/:id"
            element={<ProtectedRoutes Component={Updatefeecategory} />}
          />



          <Route
            path="/coursefeesdetails"
            element={<ProtectedRoutes Component={Coursefeesdetails} />}
          />
          <Route
            path="/addcoursefees"
            element={<ProtectedRoutes Component={Addcoursefees} />}
          />
          <Route
            path="/update-coursefees/:id"
            element={<ProtectedRoutes Component={Updatecoursefees} />}
          />

          <Route
            path="/certificatedetails"
            element={<ProtectedRoutes Component={Certificatedetails} />}
          />
          <Route
            path="/addcertificate"
            element={<ProtectedRoutes Component={AddCertificate} />}
          />
          <Route
            path="/update-certificate/:id"
            element={<ProtectedRoutes Component={UpdateCetificate} />}
          />


          <Route
            path="/handsoncategorydetails"
            element={<ProtectedRoutes Component={HandsonCategorydetails} />}
          />
          <Route
            path="/addhandsoncategory"
            element={<ProtectedRoutes Component={AddHandsonCategory} />}
          />


          <Route
            path="/handsonprojectdetails"
            element={<ProtectedRoutes Component={HandsonProjectdetails} />}
          />
          <Route
            path="/addhandsonproject"
            element={<ProtectedRoutes Component={AddHandsonProject} />}
          />
          <Route
            path="/update-handsonproject/:id"
            element={<ProtectedRoutes Component={UpdateHandsonProject} />}
          />



          <Route
            path="/learnerreviewdetails"
            element={<ProtectedRoutes Component={LearnerReviewdetails} />}
          />
          <Route
            path="/addlearnerreview"
            element={<ProtectedRoutes Component={AddLearnerReview} />}
          />
          <Route
            path="/update-learnerreview/:id"
            element={<ProtectedRoutes Component={UpdateLearnerReview} />}
          />



          <Route
            path="/toprankdetails"
            element={<ProtectedRoutes Component={TopRankdetails} />}
          />
          <Route
            path="/addtoprank"
            element={<ProtectedRoutes Component={AddTopRank} />}
          />
          <Route
            path="/update-toprank/:id"
            element={<ProtectedRoutes Component={UpdateTopRank} />}
          />



          {/* Events routes */}
          <Route
            path="/funatworkcategorydetails"
            element={<ProtectedRoutes Component={FunatworkCategorydetails} />}
          />
          <Route
            path="/addfunatworkcategory"
            element={<ProtectedRoutes Component={FunatworkCategory} />}
          />
          <Route
            path="/update-funatworkcategory/:id"
            element={<ProtectedRoutes Component={UpdateFunatworkCategory} />}
          />


          <Route
            path="/funatworkdatadetails"
            element={<ProtectedRoutes Component={Funatworkdetails} />}
          />
          <Route
            path="/addfunatworkdata"
            element={<ProtectedRoutes Component={AddFunatworkData} />}
          />
          <Route
            path="/update-funatworkdata/:id"
            element={<ProtectedRoutes Component={UpdateFunatworkData} />}
          />


          <Route
            path="/recognitioncategorydetails"
            element={<ProtectedRoutes Component={RecognitionCategorydetails} />}
          />
          <Route
            path="/addrecognitioncategory"
            element={<ProtectedRoutes Component={AddRecognitionCategory} />}
          />
          <Route
            path="/update-recognitioncategory/:id"
            element={<ProtectedRoutes Component={UpdateRecognitionCategory} />}
          />


          <Route
            path="/recognitiondetails"
            element={<ProtectedRoutes Component={Recognitiondetails} />}
          />
          <Route
            path="/addrecognitiondetails"
            element={<ProtectedRoutes Component={AddRecognitiondetails} />}
          />
          <Route
            path="/update-recognitiondetails/:id"
            element={<ProtectedRoutes Component={UpdateRecognitiondetails} />}
          />


          <Route
            path="/moucategorydetails"
            element={<ProtectedRoutes Component={MOUCategorydetails} />}
          />
          <Route
            path="/addmoucategory"
            element={<ProtectedRoutes Component={AddMOUCategory} />}
          />
          <Route
            path="/update-moucategory/:id"
            element={<ProtectedRoutes Component={UpdateMOUCategory} />}
          />


          <Route
            path="/moudetails"
            element={<ProtectedRoutes Component={MOUdetails} />}
          />
          <Route
            path="/addmoudetails"
            element={<ProtectedRoutes Component={AddMOUdetails} />}
          />
          <Route
            path="/update-moudetails/:id"
            element={<ProtectedRoutes Component={UpdateMOUdetails} />}
          />



          <Route
            path="/newsdetails"
            element={<ProtectedRoutes Component={Newsdetails} />}
          />
          <Route
            path="/addnewsdetails"
            element={<ProtectedRoutes Component={AddNewsdetails} />}
          />
          <Route
            path="/update-newsdetails/:id"
            element={<ProtectedRoutes Component={UpdateNewsdetails} />}
          />



          <Route
            path="/newsletterdetails"
            element={<ProtectedRoutes Component={NewsLetterdetails} />}
          />
          <Route
            path="/addnewsletterdetails"
            element={<ProtectedRoutes Component={AddNewsLetterdetails} />}
          />
          <Route
            path="/update-newsletterdetails/:id"
            element={<ProtectedRoutes Component={UpdateNewsLetterdetails} />}
          />



























          {/* BDE login routes end here*/}





          <Route
            path="/ViewPopupEnquiry"
            element={<ProtectedRoutes Component={ViewPopupEnquiry} />}
          />
          <Route
            path="/ViewImplanttraining"
            element={<ProtectedRoutes Component={ViewImplanttraining} />}
          />

          <Route
            path="/logout"
            element={<ProtectedRoutes Component={Logout} />}
          />

          <Route
            path="/forgotpassword"
            element={<ProtectedRoutes Component={ForgotPassword} />}
          />
        </Route>


      </Routes>
    </>
  );
}

export default App;
