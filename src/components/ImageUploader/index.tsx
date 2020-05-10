import React, { useCallback, useState, useEffect, useRef } from "react";
// import "./ImageUploader.scss";
import jsCookie from "js-cookie";
/**
 *
 * react-dropzone
 *
 * Npm
 *  https://www.npmjs.com/package/react-dropzone
 *
 * Git
 *  https://github.com/react-dropzone/react-dropzone
 */
import { useDropzone } from "react-dropzone";
import { REQUEST_REMOVE_CAR_MEDIA, REQUEST_NEW_CAR_MEDIA } from "../../API";
import { IoIosTrash } from "react-icons/io";
import Spinner from "../Spinner";

const token = jsCookie.get("token");

const ImageUploader = (props: IImageUpload) => {
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [loading, setloading] = useState(false);
  const wrapperRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        sendTheImage(file, reader.result);
      };
    });
  }, []);

  useEffect(() => {
    // give the default images
    if (props.default_image) {
      setPicturesPreview(props.default_image);
    }
  }, [props.default_image]);

  const RemoveAnImage = (i) => {
    REQUEST_REMOVE_CAR_MEDIA({
      token: token,
      id: i,
    });
    setPicturesPreview((picturesPreview) =>
      picturesPreview.filter((item, index) => {
        return item.id !== i;
      })
    );
    props.delete_image(i);
  };

  const sendTheImage = async (file, result) => {
    setloading(true);
    // get the image by id from API
    const image_upload_res: any = await REQUEST_NEW_CAR_MEDIA({
      token: token,
      file: file,
    });
    setloading(false);
    // add the given image to preview list
    setPicturesPreview((picturesPreview) =>
      picturesPreview.concat({
        img: result,
        id: image_upload_res.id,
      })
    );
    // sent the image id to parent component
    props.Upload_image(image_upload_res.id);
  };

  const { getRootProps, getInputProps } = useDropzone({
    // acceptable formats for upload
    accept: ".jpeg, .jpg, .png",

    // active Drop and use custom function
    onDrop,
  });

  useEffect(() => {
    if (props.error_status) {
      scrollTo(0, wrapperRef.current.offsetTop);
    }
  }, [props.error_status]);

  return (
    <div ref={wrapperRef}>
      <label>بارگذاری عکس ها</label>
      <div className="drop_zone" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          جهت بارگذاری عکس اینجا کلیک کنید و یا عکس خود را داخل این کادر
          بیاندازید
        </p>
      </div>
      <div
        // if the image is uploading the drop-zone will be unreachable
        className={["Image_box", loading ? "loading_class" : null].join(" ")}
      >
        {loading ? (
          <Spinner display="block" width={20} color="#b5b5b5" />
        ) : (
          picturesPreview.length > 0 &&
          picturesPreview.map((i, index) => {
            return (
              <div className="Each_image" key={index}>
                {/* onClick on trash icon the image will deleted for the car and sent the id to parent */}
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
    </div>
  );
};

interface IImageUpload {
  // Send the id after upload to the parent component
  Upload_image: any;

  // Send the id of the deleted image to parent component
  delete_image: any;

  // receive an array of image ids
  default_image?: any;
  error_status?: boolean;
}

export default ImageUploader;
