import { useCallback, useState, useContext, useEffect, useRef } from "react";
// import "./ImageUploader.scss";
import jsCookie from "js-cookie";
import carVector from "../../../public/image/car_vector.png";
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
import Spinner from "../Spinner";
import getCroppedImg from "../../../utils/cropImage";
import Cropper from "react-easy-crop";
import ZoomSlider from "./ZoomSlider";
import ErrorHelper from "../../../utils/error_helper";
import toast_context from "../../context/Toast_context";
import net_CTX from "../../context/internetConnectionCTX";
import Icon from "../Icons";
import Image from "next/image";

const ImageUploader = ({
  Upload_image,
  delete_image,
  default_image,
  error_status,
  language,
}: IImageUpload) => {
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [loading, setloading] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const [croptStart, setCroptStart] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const toastCTX = useContext(toast_context);
  const wrapperRef = useRef(null);
  const token = jsCookie.get("token");
  const netCTX = useContext(net_CTX);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log("file", file);
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // showCroppedImage(file, reader.result)
        setCroptStart(true);
        setCurrentImage(URL.createObjectURL(file));
        // sendTheImage(file, reader.result);
      };
    });
  }, []);

  useEffect(() => {
    // give the default images
    if (default_image) {
      setPicturesPreview(default_image);
    }
  }, [default_image]);

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
    delete_image(i);
  };

  const sendTheImage = async (file, result) => {
    setloading(true);
    // get the image by id from API
    try {
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
      Upload_image(image_upload_res.id);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
              errorObj: error.response,
              _400Message: language.COMMON.errorInUploadingImage,
            })
            : error,
          color: "#ed9026",
          time: 0,
          autoClose: false,
        });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    // acceptable formats for upload
    // accept: ".jpeg, .jpg, .png",

    // active Drop and use custom function
    onDrop,
  });

  // useEffect(() => {
  //   if (error_status) {
  //     scrollTo(0, wrapperRef.current.offsetTop);
  //   }
  // }, [error_status]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const image = await getCroppedImg(currentImage, croppedAreaPixels, true);
      sendTheImage(image, URL.createObjectURL(image));
      setCroptStart(false);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  }, [croppedAreaPixels]);

  return (
    <div ref={wrapperRef}>
      <label>{language.ADD_CAR_PAGE.picture}</label>
      <p className="image_upload_under_label">
        {language.ADD_CAR_PAGE.text1}
        {language.ADD_CAR_PAGE.text2}
      </p>
      {croptStart && (
        <div className="crop_container">
          <Cropper
            image={currentImage}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="rect"
          />
          {/* <ZoomSlider zoomChange={setZoom} zoom={zoom} /> */}
          <div className="Crop_BTN_container">
            <span className="Blue_BTN local_class" onClick={showCroppedImage}>
              تایید
            </span>
            <span
              className="Blue_BTN cancel_class"
              onClick={() => {
                setCurrentImage(null);
                setCroptStart(false);
                // if (data.thumbnail_url) {
                //   dispatch({ type: "image", image: data.thumbnail_url });
                // }
                // file_input.current.value = null;
              }}
            >
              لغو
            </span>
          </div>
        </div>
      )}
      <div className="drop_zone" {...getRootProps()}>
        <input {...getInputProps()} multiple={false} />
        <p className="uploadText">{language.ADD_CAR_PAGE.text3}</p>
        {picturesPreview.length > 0 ? (
          <div
            // if the image is uploading the drop-zone will be unreachable
            className={["Image_box", loading ? "loading_class" : null].join(
              " "
            )}
            onClick={(e) => e.preventDefault()}
          >
            {picturesPreview.map((i, index) => {
              return (
                <div
                  className="Each_image"
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    RemoveAnImage(i.id);
                  }}
                >
                  {/* onClick on trash icon the image will deleted for the car and sent the id to parent */}
                  
                <Icon
                name="close"
                  color="#ea2d2d"
                  width='20px'
                  height='20px'
                  
                /> 
                  <img src={i.img} alt={i.id} />
                </div>
              );
            })}
            {loading ? (
              <Spinner display="inline-block" width={20} color="#b5b5b5" />
            ) : null}
          </div>
        ) : loading ? (
          <Spinner display="block" width={20} color="#b5b5b5" />
        ) : (
          <Image
            className="vector_car_upload"
            src={carVector}
            alt="car vector image"
          />
        )}
        <p className="gallery_button">{language.ADD_CAR_PAGE.fromGallery}</p>
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
  language: any;
}

export default ImageUploader;
