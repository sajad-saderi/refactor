import React from "react";
import { jsPDF } from "jspdf";

import irans from "../../../public/fonts/ttf/IRANSansWeb_Medium.ttf";
import iransans_b from "../../../public/fonts/ttf/IRANSansWeb_Bold.ttf";

const GeneratePdf = ({ html }) => {
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.addFont(irans, "iransans", "normal");
    doc.addFont(iransans_b, "iransans_b", "normal");
    doc.setFont("iransans");
    doc.setFont("iransans_b");
    doc.setTextColor("#3300ff");
    doc.setFontSize(14);
    doc.html(html.current, {
      x: 20,
      y: 0,
      callback: function(documnet) {
        documnet.save();
      },
    });
  };
  return (
    <div className="button-container">
      <button onClick={generatePdf}>دانلود قرارداد</button>
    </div>
  );
};

export default GeneratePdf;
