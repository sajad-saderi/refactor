import React from "react";
import { jsPDF } from "jspdf";
import irans from "../../../public/fonts/ttf/IRANSansWeb_Medium.ttf";
import irans_bold from "../../../public/fonts/ttf/IRANSansWeb_Bold.ttf";
import dana from "../../../public/fonts/dana/ttf/Dana-FaNum-Medium.ttf";

const GeneratePdf = ({ html }) => {
  const generateImage = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [297, 210],
      lineHeight: 2,
    });

    doc.addFont(dana, "dana", "normal");
    doc.addFont(irans, "iransans", "normal");
    doc.addFont(irans_bold, "iransans_bold", "normal");
    doc.setFont("dana");
    doc.setFontSize(14);
    doc.text(document.querySelector(".content > h1").innerHTML, 105, 15, {
      align: "center",
    });
    doc.setFontSize(11);
    doc.text(document.querySelector(".content > h2").innerHTML, 105, 23, {
      align: "center",
    });
    doc.text(document.getElementById("contract_date").innerText, 9, 35, {
      align: "left",
    });
    doc.text(document.getElementById("contract_number").innerText, 9, 43, {
      align: "left",
    });
    doc.setFont("iransans");
    let split = doc.splitTextToSize(
      document.getElementById("page_1").innerText,
      210
    );
    doc.text(split, 200, 55, { align: "right" });
    doc.setFont("iransans_bold");
    doc.text(
      document.getElementById("signature_1_renter").innerText,
      180,
      280,
      {
        align: "right",
      }
    );
    doc.text(document.getElementById("signature_1_owner").innerText, 50, 280, {
      align: "left",
    });

    // page 2
    doc.addPage();
    doc.setFont("iransans");
    let second_page_content = doc.splitTextToSize(
      document.getElementById("page_2").innerText,
      210
    );
    doc.text(second_page_content, 200, 15, { align: "right" });
    doc.setFont("iransans_bold");
    doc.text(
      document.getElementById("signature_2_renter").innerText,
      180,
      280,
      {
        align: "right",
      }
    );
    doc.text(document.getElementById("signature_2_owner").innerText, 50, 280, {
      align: "left",
    });

    // page 3
    doc.addPage();
    doc.setFont("iransans");
    let third_page_content = doc.splitTextToSize(
      document.getElementById("page_3").innerText,
      210
    );
    doc.text(third_page_content, 200, 15, { align: "right" });
    doc.setFont("iransans_bold");
    doc.text(
      document.getElementById("signature_3_renter").innerText,
      180,
      280,
      {
        align: "right",
      }
    );
    doc.text(document.getElementById("signature_3_owner").innerText, 50, 280, {
      align: "left",
    });

    // page 4
    doc.addPage();
    doc.setFont("iransans");
    let fourth_page_content = doc.splitTextToSize(
      document.getElementById("page_4").innerText,
      210
    );
    doc.text(fourth_page_content, 200, 15, { align: "right" });
    doc.setFont("iransans_bold");
    doc.text(
      document.getElementById("signature_4_renter").innerText,
      180,
      210,
      {
        align: "right",
      }
    );
    doc.text(document.getElementById("signature_4_owner").innerText, 50, 210, {
      align: "left",
    });
    doc.text(document.getElementById("witness_1").innerText, 180, 250, {
      align: "right",
    });
    doc.text(document.getElementById("witness_2").innerText, 50, 250, {
      align: "left",
    });

    doc.save("Sepris Contract.pdf");
  };
  return (
    <div className='button-container'>
      <button onClick={generateImage}>دانلود قرارداد</button>
    </div>
  );
};

export default GeneratePdf;
