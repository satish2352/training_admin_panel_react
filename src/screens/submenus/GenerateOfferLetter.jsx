import { saveAs } from "file-saver";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";




// Function to format the date from "YYYY-MM-DD" to "1st March 2025"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }); // Get month name
  const year = date.getFullYear();

  // Function to get ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Covers 11-20
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

// Example: Converting API date
// const apiDate = "2025-03-01";
// console.log(formatDate(apiDate)); // Output: "1st March 2025"



const GenerateOfferLetter = async (internDetails) => {
  try {
    // Fetch the template document
    const response = await fetch("/templates/Offer_Letter_Template.docx");

    if (!response.ok) {
      throw new Error(`Failed to load template: ${response.status} ${response.statusText}`);
    }

    // Convert ArrayBuffer to Uint8Array
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    console.log("Loaded .docx file with size:", uint8Array.byteLength, "bytes");

    // Load the Word document
    const zip = new PizZip(uint8Array);
    const doc = new Docxtemplater(zip);

    // Replace placeholders with intern data
    doc.setData({
      fname: internDetails.fname,
      lname: internDetails.lname,
      parmanenat_address: internDetails.parmanenat_address,
      date_of_joining: formatDate(internDetails.date_of_joining),
      position: internDetails.technology_name,
    });

    doc.render();

    // Convert document to Blob and trigger download
    const outputBlob = new Blob([doc.getZip().generate({ type: "arraybuffer" })], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(outputBlob, `Offer_Letter_${internDetails.fname}.docx`);
  } catch (error) {
    console.error("Error generating offer letter:", error);
  }
};

export default GenerateOfferLetter;
