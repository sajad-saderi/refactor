export {}; // import { useRef, useState } from "react";
// import Checkbox from "../../form/Checkbox";
// import Contract_text from "../contract_text";
// import Contract_text_copy from "../contract_text_copy";
// import Generate_pdf from "../generate_pdf";

// const Contract_content = ({ result }: IContract) => {
//   const [show_contract, set_show_contract] = useState(false);
//   const html_ref = useRef(null);

//   return result ? (
//     <div
//       className={[
//         "contract_container",
//         show_contract ? "contract_content" : "",
//       ].join(" ")}
//       style={show_contract ? null : { padding: "10px" }}
//     >
//       <div className="download_section">
//         {!show_contract && (
//           <Generate_pdf
//             html={html_ref}
//             width={window.innerWidth}
//             contractNumber={result.id}
//           />
//         )}
//         <div className="show_contract_checkbox" style={{ marginRight: "20px" }}>
//           <Checkbox
//             initialValue={[show_contract]}
//             data={[
//               {
//                 text: "نمایش متن قرارداد",
//                 value: show_contract,
//               },
//             ]}
//             name="show_contract"
//             clearField={() => set_show_contract(false)}
//             Select={() => set_show_contract(true)}
//           />
//         </div>
//       </div>
//       {!show_contract ? (
//         <Contract_text
//           inline_style={true}
//           html_ref={html_ref}
//           result={result}
//         />
//       ) : (
//         <Contract_text_copy result={result} />
//       )}
//     </div>
//   ) : null;
// };

// interface IContract {
//   result: any;
// }

// export default Contract_content;
