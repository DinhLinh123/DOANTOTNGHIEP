import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./tableOrder.scss";
import { Link } from "react-router-dom";
import {
  LeftOutlined
} from "@ant-design/icons";

import banner1 from "../../../../../image/banner1.jpg"
import Draggable from "react-draggable";
import baseApi from "../../../../../api/baseApi";
import { API_AREA, API_TABLE } from "../../../../base/common/endpoint";
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import CheckBox from "../../../../base/CheckBox/CheckBox";
import Button2 from "../../../../base/Button/Button";
import Popup from "../../../../base/Popup/Popup";

TableOrder.propTypes = {};

TableOrder.defaultProps = {};

function TableOrder(props) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [listArea, setlistArea] = useState([]);
  const [list, setList] = useState([])
  const [isMerge, setIsMerge] = useState(false)
  const [listMerge, setListMerge] = useState([])
  const [showPopupWarningChoose, setShowPopupWarningChoose] = useState({ show: false, idBan: -1 });

  useEffect(() => {
    callApiAllGetArea()
  }, [])

  function renderMenuPage() {
    let list = listArea?.map((item, key) => {
      return (
        <div className={`area-order-container__nav-list-item ${index === key ? 'area-order-container__nav-list-active' : ''}`}
          onClick={() => {
            callApiGetAreaById(item.id)
            setIndex(key)
            callApiGetTable(item.id)
          }}
        >
          {item?.name}
        </div>
      );
    });
    return list;
  }

  function callApiGetAreaById(id) {
    dispatch(changeLoadingApp(true))
    baseApi.get(
      (res) => {
        dispatch(changeLoadingApp(false))
      },
      () => {
        dispatch(changeLoadingApp(false))

      },
      null,
      API_AREA.GET_BY_ID + id
    )
  }

  function callApiAllGetArea() {
    dispatch(changeLoadingApp(true))
    baseApi.get(
      (res) => {
        dispatch(changeLoadingApp(false))
        setlistArea(res)
        callApiGetTable(res[0].id)
      },
      () => {
        dispatch(changeLoadingApp(false))

      },
      null,
      API_AREA.GET_ALL
    )
  }

  function callApiGetTable(areaID) {
    let param = {
      "idKhuVuc": areaID
    }
    baseApi.get(
      (res) => {
        setList(res.data)
      },
      (err) => { },
      null,
      API_TABLE.GET_BY_FILTER + encodeURIComponent(JSON.stringify(param)),
      {},
      {}
    )
  }

  function mergeTable(idBan) {
    if (!listMerge?.includes(idBan)) {
      let _listMerge = [...listMerge]
      _listMerge.push(idBan)
      setListMerge(_listMerge)
    }
    else {
      let _listMerge = listMerge?.filter((_item) => { return _item != idBan })
      setListMerge(_listMerge)
    }
    setShowPopupWarningChoose({ show: false, idBan: -1 })
  }

  useEffect(() => {
    console.log(listMerge)
  }, [listMerge])

  return (
    <div className="area-order-container">
      <div
        className={`area-order-container__nav`}
      >
        <div className="area-order-container__nav-logo">
          <div className="area-order-container__nav-logo-text">
            HoH BBQ
          </div>
        </div>
        <div className="area-order-container__nav-title">Khu vực</div>
        <div className="area-order-container__nav-list">{renderMenuPage()}</div>
      </div>
      <div className={`area-order-container__page`}>
        <div className="area-order-container__page-note">
          <div className="area-order-container__page-note-item">
            <div className="area-order-container__page-note-item-back"
              onClick={() => { window.open('/admin/report', '_self') }}
            >
              <LeftOutlined />
            </div>
          </div>
          <div className="area-order-container__page-note-item">
            <div className="area-order-container__page-note-item-status"
              style={{ backgroundColor: '#dcdde1' }}
            >
            </div>
            <div className="area-order-container__page-note-item-text">
              Bàn trống
            </div>
          </div>
          <div className="area-order-container__page-note-item">
            <div className="area-order-container__page-note-item-status"
              style={{ backgroundColor: '#c23616' }}
            >
            </div>
            <div className="area-order-container__page-note-item-text">
              Bàn đang hoạt động
            </div>
          </div>
          <div className="area-order-container__page-note-item">
            <div className="area-order-container__page-note-item-status"
              style={{ backgroundColor: '#fbc531' }}
            >

            </div>
            <div className="area-order-container__page-note-item-text">
              Bàn đã được đặt
            </div>
          </div>
          <div className="area-order-container__page-note-item">
            <div className="area-order-container__page-note-item-status"
              style={{ backgroundColor: '#95a5a6' }}
            >

            </div>
            <div className="area-order-container__page-note-item-text">
              Bàn được chọn để gộp
            </div>
          </div>

          <div className="area-order-container__page-note-many">
            <div className="area-order-container__page-note-many-choose">
              <CheckBox label={"Gộp bàn"} checked={isMerge} onChange={() => setIsMerge(!isMerge)} />
            </div>
          </div>
        </div>

        {isMerge &&
          <div className="area-order-container__page-many-table">
            Đã chọn: {listMerge?.length} bàn
          </div>
        }

        <div className="area-order-container__page-content" style={{ height: '600px', width: '1000px', position: 'relative', marginTop: isMerge ? "0px" : '24px' }}>
          <div className="area-order-container__page-content-drag" style={{ height: '600px', width: '1000px', position: 'absolute', top: '0' }}>
            {list.map((item) => {
              return (
                <Draggable disabled defaultPosition={{ x: item?.left, y: item?.top }} bounds="parent" key={1} className={item?.title}>
                  <div
                    className="area-order-container__page-content-drag-item"
                    style={{
                      borderRadius: item?.kieuDang == 0 ? '50%' : '8px',
                      // backgroundColor: '#fff',
                      backgroundColor: listMerge?.includes(item.id) ? '#95a5a6' : item.trangThai == 0 ? '#dcdde1' : item.trangThai == 1 ? '#c23616' : '#fbc531',
                      color: item.trangThai == 0 ? '#000' : item.trangThai == 1 ? '#fff' : '#fff',
                      position: 'absolute', top: '8px', left: '8px'
                    }}
                    onClick={() => {
                      if (!isMerge) {
                        window.open(`/admin/table/${item.id}/order`, "_self")
                      }
                      else {
                        if (item.trangThai == 1 && !listMerge?.includes(item.id)) {
                          setShowPopupWarningChoose({ show: true, idBan: item.id })
                        }
                        else {
                          mergeTable(item.id)

                        }
                      }
                    }}
                  >
                    {item?.name}
                  </div>
                </Draggable>
              )
            })}
          </div>
        </div>
      </div>
      <Popup
        title={"Cảnh báo"}
        show={showPopupWarningChoose.show}
        onClickClose={() => setShowPopupWarningChoose({ show: false, idBan: -1 })}
        button={[
          <Button2
            name={"Hủy"}
            onClick={() => setShowPopupWarningChoose({ show: false, idBan: -1 })}
          />,
          <Button2
            name={"Gộp bàn"}
            onClick={() => mergeTable(showPopupWarningChoose.idBan)}
          />,
        ]}
        width={600}
        className={"menu-popup-detail"}
        body={
          <div style={{ marginTop: '24px', fontSize: '16px', }}>Lưu ý: Bàn đang hoạt động bạn có chắc muốn gộp bàn không?</div>
        }
      />
    </div>
  );
}

export default TableOrder;
