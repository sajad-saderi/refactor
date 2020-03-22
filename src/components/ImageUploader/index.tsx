import React, { useCallback, useState } from "react";
import "./ImageUploader.module.scss";
import jsCookie from "js-cookie";
import { useDropzone } from "react-dropzone";
import { REQUEST_REMOVE_CAR_MEDIA, REQUEST_NEW_CAR_MEDIA } from "../../API";
import { IoIosTrash } from "react-icons/io";
import Spinner from "../Spinner";

const token = jsCookie.get("token");

const ImageUploader = (props: IImageUpload) => {
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [loading, setloading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        sendTheImage(file, reader.result);
      };
    });
  }, []);

  const RemoveAnImage = i => {
    REQUEST_REMOVE_CAR_MEDIA({
      token: token,
      id: "950"
    });
    setPicturesPreview(picturesPreview =>
      picturesPreview.filter((item, index) => {
        return item.id !== i;
      })
    );
    props.delete_image(i);
  };

  const sendTheImage = async (file, result) => {
    setloading(true);
    const image_upload_res: any = await REQUEST_NEW_CAR_MEDIA({
      token: token,
      file: file
    });
    setloading(false);
    setPicturesPreview(picturesPreview =>
      picturesPreview.concat({
        img: result,
        id: image_upload_res.id
      })
    );
    props.Upload_image(image_upload_res.id);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".jpeg, .jpg, .png",
    onDrop
  });

  return (
    <>
      <label>بارگذاری عکس ها</label>
      <div className="drop_zone" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          جهت بارگذاری عکس اینجا کلیک کنید و یا عکس خود را داخل این کادر
          بیاندازید
        </p>
      </div>
      <div
        className={["Image_box", loading ? "loading_class" : null].join(" ")}
      >
        {loading ? (
          <Spinner display="block" width={20} color="#b5b5b5" />
        ) : (
          picturesPreview.length > 0 &&
          picturesPreview.map((i, index) => {
            return (
              <div className="Each_image" key={index}>
                <IoIosTrash
                  size="2rem"
                  onClick={() => RemoveAnImage(i.id)}
                  color="#ea2d2d"
                />
                <img src={i.img} alt={i.id} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
// id: 940
// id: 941

interface IImageUpload {
  Upload_image: any;
  delete_image: any;
}

export default ImageUploader;

// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { REQUEST_newCarMedia } from '../../API';
// import jsCookie from 'js-cookie';
// import { useDropzone } from 'react-dropzone';
// import Dropzone from 'react-dropzone';
// import axios from 'axios';

// const AddCarImageUpload: React.FC<{
//   t: any;
//   picturesID: any;
//   setPicturesID: any;
//   removePictureID: any;
//   DefaultVal:any;
// }> = ({
//   t,
//   picturesID,
//   setPicturesID,
//   DefaultVal,
//   removePictureID,
// }) => {
//   const [picturesPreview, setPicturesPreview] = useState([]);
//   const [loading, loadingHandler] = useState(0);
//

//   const removeimageFunc = (index) =>{
// const DOMAIN = process.env.PRODUCTION_ENDPOINT;
// const       token =  jsCookie.get('token');

//     axios.post(DOMAIN+"/core/rental-car/media/delete",{id : index},
//     {
//       headers: {
//         Authorization: 'Bearer ' +   token

//       }
//     })
//     .then((r)=>{console.log(r)})
//     .catch(e => console.log(e.response))

//   }

//

//   return (
//     <Dropzone
//     // onChange ={acceptedFiles => {
//     //   acceptedFiles.forEach(file => {
//     //     REQUEST_newCarMedia({ file, token: jsCookie.get('token') })
//     //     .then(response => {
//     //       picturesPreview.push(reader.result);

//     //       console.log("picture Uploded successfully")
//     //       setPicturesPreview(picturesPreview);
//     //         picturesID.push(response.data.id);
//     //         console.log("picturesID =>> ",picturesID)
//     //         setPicturesID(picturesID);
//     //     })
//     //     .catch(error => {
//     //       console.error(error);
//     //     });
//     //     const reader = new FileReader();
//     //     reader.readAsDataURL(file);
//     //     reader.onabort = () =>
//     //       // console.log('file reading was aborted');
//     //     reader.onerror = () =>
//     //       // console.log('file reading has failed');
//     //     reader.onload = () => {
//     //       // console.log('file reading was susceed',picturesPreview);

//     //     };
//     //   });
//     // }}
//       accept=".jpeg, .jpg, .png"
//       onDrop={acceptedFiles => {
//         loadingHandler(true)
//             // console.log(picturesPreview)
//         acceptedFiles.forEach(file => {
//           REQUEST_newCarMedia({ file, token: jsCookie.get('token') })
//           .then(response => {
//             loadingHandler(false)

//             picturesPreview.push(reader.result);
//             // console.log(picturesPreview)
//             setPicturesPreview(picturesPreview);
//               picturesID.push(response.data.id);
//               // console.log("picturesID =>> ",picturesID)
//               setPicturesID(picturesID);
//           })
//           .catch(error => {
//             console.error(error);
//           });
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onabort = () =>
//             // console.log('file reading was aborted');
//           reader.onerror = () =>
//             // console.log('file reading has failed');
//           reader.onload = () => {
//             // console.log('file reading was susceed',picturesPreview);
//             picturesPreview.push(reader.result);
//             // console.log(picturesPreview)
//             setPicturesPreview(picturesPreview);
//           };
//         });
//       }}
//     >
//       {({ getRootProps, getInputProps }) => (
//         loading ? <div style ={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           paddingTop:"20px",
//           marginBottom: "24px",
//           borderWidth: "2px",
//           borderRadius: "2px",
//           borderColor: "#eeeeee",
//           borderStyle: "dashed",
//           backgroundColor:"#fafafa",
//           color: "#bdbdbd",
//           outline: "none",
//           transition: "border 0.24s ease-in-out",
//           borderRadius: "0.28571429rem",
//               }}>
//               <Spinner >درحال بارگذاری<div></div><div></div><div></div><div></div></Spinner>
//               </div>

//         :<DropZoneDiv
//           className="container"
//           style={{ padding: 0, }}
//         >
//           <div {...getRootProps({ className: 'dropzone' })}>
//             <input {...getInputProps()} />
//             <span>{"جهت بارگذاری عکس اینجا کلیک کنید و یا عکس خود را داخل این کادر بیاندازید"}</span>
//           </div>
//           <aside>
//             <div className="flexParentCards">
//               {picturesPreview.map(
//                 (image, index) => (
//                   <div className="flexItem">
//                     <Label
//                       onClick={() =>{
//                         removeimageFunc(picturesID[index])
//                         removePicture(index)
//                       }
//                       }
//                       index={index}
//                     >
//                       <Icon name="delete" />
//                     </Label>
//                     <Card raised image={image} />
//                   </div>
//                 )
//               )}
//             </div>
//           </aside>
//         </DropZoneDiv>
//       )}
//     </Dropzone>
//   );
// }
