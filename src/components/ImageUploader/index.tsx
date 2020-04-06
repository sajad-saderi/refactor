import React, { useCallback, useState, useEffect, useRef } from "react";
import "./ImageUploader.scss";
import jsCookie from "js-cookie";
import { useDropzone } from "react-dropzone";
import { REQUEST_REMOVE_CAR_MEDIA, REQUEST_NEW_CAR_MEDIA } from "../../API";
import { IoIosTrash } from "react-icons/io";
import Spinner from "../Spinner";

const token = jsCookie.get("token");

const ImageUploader = (props: IImageUpload) => {
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [loading, setloading] = useState(false);
  const wrapperRef = useRef(null);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        sendTheImage(file, reader.result);
      };
    });
  }, []);

  useEffect(() => {
    setPicturesPreview(props.default_image);
  }, [props.default_image]);

  const RemoveAnImage = i => {
    REQUEST_REMOVE_CAR_MEDIA({
      token: token,
      id: i
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

  useEffect(() => {
    scrollTo(0, wrapperRef.current.offsetTop);
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
    </div>
  );
};
// id: 940
// id: 941

interface IImageUpload {
  Upload_image: any;
  delete_image: any;
  default_image?: any;
  error_status?: boolean;
}

export default ImageUploader;
