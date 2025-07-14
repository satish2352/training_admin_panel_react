// // // ////sir code
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { TitleContext } from "../../../context/TitleContext";
import { ShowContext } from "../../../context/ShowContext";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { addDays } from "date-fns";

import "./AreaTop.scss";

const AreaTop = ({ buttonValue, tableView }) => {
  
  const { openSidebar, activeMenuName } = useContext(SidebarContext);
  const [headerName, setHeader] = useState("");
  const { title, setTitle } = useContext(TitleContext);
  const { toggleShows } = useContext(ShowContext);
  const [buttonText, setButtonText] = useState("View");
  const dateRangeRef = useRef(null);
  const location = useLocation();

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    setTitle(activeMenuName);
  }, [activeMenuName, setTitle]);

  const handleButtonClick = () => {
    toggleShows();
    setButtonText((prevText) => (prevText === "View" ? "Add" : "View"));
  };

  const hiddenPaths = [
    "/subscribe",
    "/carousalform",
    "/requestcallbackform",
    "/uploadcv",
    "/getintouch",
    "/subscribe",
    "/headercontact",
    "/About",
    "/headercontact",
    "/homeslider",
    "/carousal",
     "/exhibition",
     "/v_analysis",
     "/v_measurment",
     "/Further",
     "/Special",
"/productname",
"/productdetails",
"/technicaldata",
"/optionsdata",
"/productdata",
"/productdata2",
 "/materialdata",
 "/blogdetails",
 "/applicationdata",
 "/uploadcv",
 "/subscribe",
 "/getintouch",
 "/apply_now",
 "/contactsalesperson",
 "/events",
 "/News1",
 "/productimages",
 "/social-contact",
 "/News1",
 "/applicationcategory",
 "/pdf",
 "/solution",
 "/implemented",
 "/contactperson",
 "/job",
 "/distributer",
 "/contact_form",
 "/feedback"
  ];
  const isHiddenPath = hiddenPaths.includes(location.pathname);

  useEffect(() => {
    if (window.location.pathname == "/About") {
      setHeader("Vission/Mission");
    }
    else if (window.location.pathname == "/productdata") {
      setHeader("Product Data");
    }
    else if (window.location.pathname == "/productdata2") {
      setHeader("Product Accordion");
    }
    else if (window.location.pathname == "/job") {
      setHeader("Job Data");
    }
    else if (window.location.pathname == "/distributer") {
      setHeader("Distributer Form");
    }
    else if (window.location.pathname == "/distributer_contact") {
      setHeader("Distributor Of India");
    }
    else if (window.location.pathname == "/contact_form") {
      setHeader("Contact Form");
    }
    else if (window.location.pathname == "/feedback") {
      setHeader("Feedback Form");
    }
    else if (window.location.pathname == "/Special") {
      setHeader("Service Special");
    }
    else if (window.location.pathname == "/contactperson") {
      setHeader("Contact Us");
    }
    else if (window.location.pathname == "/implemented") {
      setHeader("Implemented Solution");
    }
    else if (window.location.pathname == "/solution") {
      setHeader("Your Solution");
    }
    else if (window.location.pathname == "/applicationcategory") {
      setHeader("Application Category");
    }
    else if (window.location.pathname == "/headercontact") {
      setHeader("About Us");
    } else if (window.location.pathname == "/homeslider") {
      setHeader("Home Slider");
    } else if (window.location.pathname == "/carousal") {
      setHeader("Home Sliding Media");
    } else if (window.location.pathname == "/exhibition") {
      setHeader("Exhibition Details");
    } else if (window.location.pathname == "/v_measurment") {
      setHeader("Vibration Measurement");
    }
    else if (window.location.pathname == "/Further") {
      setHeader("Further Analysis");
    }
    else if (window.location.pathname == "/v_analysis") {
        setHeader("Vibration Analysis");
      
    } 
    // else if (window.location.pathname == "/distributor") {
    //   setHeader("Distributor");
    // }
    else if (window.location.pathname == "/social-contact") {
      setHeader("Social Contacts");
    } else if (window.location.pathname == "/productname") {
      setHeader("Product Name");
    } else if (window.location.pathname == "/productdetails") {
      setHeader("Product Details");
    } else if (window.location.pathname == "/technicaldata") {
      setHeader("Models");
    } else if (window.location.pathname == "/optionsdata") {
      setHeader("Accessories & Optional");
    } else if (window.location.pathname == "/materialdata") {
      setHeader("Material Data");
    } else if (window.location.pathname == "/blogdetails") {
      setHeader("Blog Details");
    } else if (window.location.pathname == "/News1") {
      setHeader("News Details");
    } else if (window.location.pathname == "/events") {
      setHeader("Events");
    } else if (window.location.pathname == "/contactsalesperson") {
      setHeader("Contact Sales Person");
    } else if (window.location.pathname == "/office") {
      setHeader("Our Offices");
    } else if (window.location.pathname == "/carousalform") {
      setHeader("User Data List");
    } else if (window.location.pathname == "/requestcallbackform") {
      setHeader("Request Callback Form");
    } else if (window.location.pathname == "/apply_now") {
      setHeader("Internship Data");
    } else if (window.location.pathname == "/getintouch") {
      setHeader("Get In Touch");
    } else if (window.location.pathname == "/subscribe") {
      setHeader("Subscriber List");
    } else if (window.location.pathname == "/uploadcv") {
      setHeader("Cv List");
    } else if (window.location.pathname == "/applicationdata") {
      setHeader("Application Data");
    }else if (window.location.pathname == "/productimages") {
    setHeader("Application Details");
  } else if (window.location.pathname == "/News1") {
    setHeader("News");
  } else if (window.location.pathname == "/pdf") {
    setHeader("Brouchure Data");
  }
    
  }, [window.location.pathname]);
  return (
    <section className="content-area-top bg-white p-3 mb-3">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>


        asfshkfdfjkdjksjk
      </div>

    </section>
  );
};

export default AreaTop;