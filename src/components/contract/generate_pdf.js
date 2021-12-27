import React, { useState } from "react";
import { jsPDF } from "jspdf";

import irans from "../../../public/fonts/ttf/IRANSansWeb_Medium.ttf";
import iransans_b from "../../../public/fonts/ttf/IRANSansWeb_Bold.ttf";
import Button from "../form/Button";

const GeneratePdf = ({ html, width, contractNumber }) => {
  const [loading, set_loading] = useState(false);
  const generatePdf = () => {
    set_loading(true);
    const doc = new jsPDF();
    doc.addFont(irans, "iransans", "normal");
    doc.addFont(iransans_b, "iransans_b", "normal");
    doc.setFont("iransans");
    doc.setFont("iransans_b");
    doc.setTextColor("#3300ff");
    doc.setFontSize(14);
    doc.html(html.current, {
      x: width > 720 ? 0 : 20,
      y: 0,
      callback: function(documnet) {
        documnet.save(`SeprisContract${contractNumber}.pdf`);
        set_loading(false);
      },
    });
  };
  return (
    <div className="button-container">
      <Button
        class="Blue_BTN download_contract"
        value="دانلود قرارداد"
        loading={loading}
        click={generatePdf}
      />
    </div>
  );
};

export default GeneratePdf;
