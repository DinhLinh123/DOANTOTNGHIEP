import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./popup.scss";
import Button2 from "../Button/Button";
import { Modal } from "antd";
import $ from "jquery";

Popup.propTypes = {
  show: PropTypes.bool,
  button: PropTypes.array,
  body: PropTypes.array,
  onClickClose: PropTypes.func,
  mess: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

Popup.defaultProps = {
  show: false,
  button: [],
  body: [],
  onClickClose: () => { },
  mess: "",
  width: "500px",
  height: "",
  title: "Thông báo",
};

function Popup(props) {
  const {
    show,
    button,
    onClickClose,
    mess,
    width,
    height,
    body,
    title,
    className,
  } = props;
  const [heightBodyPopup, setHeightBodyPopup] = useState();

  let list = button
    ? button?.map((item, index) => {
      return (
        <div key={index} className="item-button">
          {item}
        </div>
      );
    })
    : "";
  // useEffect(() => {
  //   if (show) {
  //     let heightpopup = $(".popup-container ").height();
  //     let heightLap = $(window).height();
  //     if (heightLap < heightpopup + 40) {
  //       let newHeight = heightLap - 40 - 55 - 69 - 49;
  //       $(".ant-modal-body ").height(newHeight);
  //       $(".ant-modal-body ").css("overflow", "auto");
  //     }
  //   }
  // }, [show])
  setTimeout(() => {
    let heightpopup = $(".popup-container ").height();
    let heightLap = $(window).height();
    if (heightLap < heightpopup + 40) {
      let newHeight = heightLap - 40 - 55 - 69 - 49;
      $(".ant-modal-body ").height(newHeight);
      $(".ant-modal-body ").css("overflow", "auto");
    }
  }, 10);

  return (
    <Modal
      visible={show}
      title={title}
      footer={list}
      onCancel={onClickClose}
      width={width}
      className={`popup-container ${className ?? ""}`}
      style={{
        top: 40,
      }}
    >
      {body}
    </Modal>
  );
}
export default Popup;
