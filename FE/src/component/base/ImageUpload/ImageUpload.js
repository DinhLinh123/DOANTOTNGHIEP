import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import "./imageUpload.scss";
import {
  RetweetOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

ImageUpload.propTypes = {
  maxImage: PropTypes.number,
  images: PropTypes.array,
  setImages: PropTypes.func,
};

ImageUpload.defaultProps = {
  maxImage: 1,
  images: [],
  setImages: () => {},
};

function ImageUpload(props) {
  const { maxImage, images, setImages } = props;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);
  };

  const [showOption, setShowOption] = useState({ show: false, index: -1 });

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxImage}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
          {imageList.map((image, index) => (
            <div
              key={index}
              className="image-item"
              onMouseEnter={() => setShowOption({ show: true, index: index })}
              onMouseLeave={() => setShowOption({ show: false, index: -1 })}
            >
              <div className="image-item__img">
                <img src={image["data_url"]} alt="" />
              </div>
              {showOption.show && showOption.index === index && (
                <div className="image-item__btn-wrapper">
                  <div className="image-item__btn-wrapper-update">
                    <Tooltip title={"Sửa ảnh"}>
                      <RetweetOutlined
                        onClick={() => onImageUpdate(index)}
                        style={{
                          color: "#ecf0f1",
                          zIndex: "1",
                          fontSize: "18px",
                          fontWeight: "bold"
                        }}
                      />
                    </Tooltip>
                  </div>
                  <div className="image-item__btn-wrapper-delete">
                    <Tooltip title={"Xóa ảnh"}>
                      <DeleteOutlined
                        onClick={() => onImageRemove(index)}
                        style={{
                          color: "#ecf0f1",
                          zIndex: "1",
                          fontSize: "18px",
                          fontWeight: "bold"
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>
          ))}
          {images?.length === maxImage ? (
            ""
          ) : (
            <div
              className="add-image"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className="add-image-icon">
                <div>
                  <UploadOutlined />
                </div>
                <div>Tải ảnh lên</div>
              </div>
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
}
export default ImageUpload;
