import jsPDF from "jspdf";

// Define options for PDF generation
const pdfOptions = {
  image: { type: "jpeg", quality: 0.6 }, // Adjust image quality to reduce size
};

// Function to create a PDF containing flashcard data for all terms
function generatePDF(flashcardInfo) {
  const pdfDocument = new jsPDF(pdfOptions);

  // Set white background for the entire PDF
  pdfDocument.setFillColor(255, 255, 255); // White background color
  pdfDocument.rect(0, 0, 210, 297, "F"); // Full-page rectangle

  // Add group image as a circle if available
  if (flashcardInfo.upload_Image) {
    const imageSize = 40; // Width and height of the group image
    const xCoordinate = 10;
    const yCoordinate = 10;

    pdfDocument.addImage(
      flashcardInfo.upload_Image,
      "JPEG",
      xCoordinate,
      yCoordinate,
      imageSize,
      imageSize
    );
  }

  // Add group name next to the group image
  pdfDocument.setFontSize(40);
  pdfDocument.setTextColor(29, 53, 87); // Red text color
  pdfDocument.setFont("helvetica", "bold");
  pdfDocument.text(flashcardInfo.group_Name, 90, 30);

  // Add group description below group name and image
  pdfDocument.setFontSize(16);
  pdfDocument.setTextColor(64, 61, 57); // Reset text color
  pdfDocument.text(pdfDocument.splitTextToSize(flashcardInfo.group_Des, 200), 10, 65);

  let verticalPosition = 120; // Initial Y position

  flashcardInfo.term.forEach((term, index) => {
    // Dynamically calculate the height of term content
    pdfDocument.setFontSize(12);
    pdfDocument.setFillColor(255, 255, 255); // White background color
    const termDefinitionLines = pdfDocument.splitTextToSize(term.term_Define, 100);
    const termImageHeight = term.term_image ? 60 : 0; // Adjust based on image size
    const totalHeight = Math.max(
      termImageHeight + termDefinitionLines.length * 10,
      70
    );

    // Check if there's enough space for the current term on the current page
    if (verticalPosition + 50 > 290) {
      pdfDocument.addPage(); // Add a new page if space is insufficient
      verticalPosition = 20; // Reset Y position
    }

    // Add serial number and term name
    pdfDocument.setFontSize(15);
    pdfDocument.setTextColor(64, 61, 57); // Text color
    pdfDocument.text(`${index + 1}. ${term.term_Name}`, 10, verticalPosition);

    // Add term image if available
    if (term.term_image) {
      pdfDocument.addImage(term.term_image, "JPEG", 15, verticalPosition + 10, 45, 45);
    }

    // Add term definition
    pdfDocument.setFontSize(12);
    pdfDocument.setTextColor(0, 48, 73); // Text color
    pdfDocument.text(termDefinitionLines, 83, verticalPosition + 10);

    // Update Y position for the next term content
    verticalPosition += totalHeight;
  });

  // Save the PDF containing all terms
  pdfDocument.save("flashcard-details-all-terms.pdf");
}

// Component to handle PDF download button
function PdfDownload({ buttonLabel, flashcardInfo }) {
  const handleDownload = () => {
    generatePDF(flashcardInfo);
  };

  return (
    <div>
      <button onClick={handleDownload}>{buttonLabel}</button>
    </div>
  );
}

export default PdfDownload;
