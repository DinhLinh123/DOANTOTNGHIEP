import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./tableOrder.scss";
import { Link } from "react-router-dom";
import {
  UnorderedListOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import banner1 from "../../../../../image/banner1.jpg"
import Draggable from "react-draggable";
import baseApi from "../../../../../api/baseApi";
import { API_AREA } from "../../../../base/common/endpoint";
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";

TableOrder.propTypes = {};

TableOrder.defaultProps = {};

function TableOrder(props) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [list, setList] = useState([
    {
      id: '6879a96c-aff7-4a34-13bc-08da7223d6dd',
      name: "Bàn 1",
      soNguoiToiDa: 0,
      loaiBan: "string",
      kieuDang: 0,
      top: 0,
      left: 0,
      status: 0,
    },
    {
      id: '2',
      name: "Bàn 2",
      soNguoiToiDa: 0,
      loaiBan: "string",
      kieuDang: 1,
      top: 0,
      left: 0,
      status: 1,
    },
    {
      id: '3',
      name: "Bàn 3",
      soNguoiToiDa: 0,
      loaiBan: "string",
      kieuDang: 1,
      top: 100,
      left: 0,
      status: 0,
    },
  ])

  let listMenu = [
    {
      id: "1",
      name: "Tầng 1",
      title: "Menu",
    },
    {
      id: "2",
      name: "Tầng 2",
      title: "Menu",
    },
    {
      id: "3",
      name: "Tầng 3",
      title: "Menu",
    },
    {
      id: "4",
      name: "Tầng 4",
      title: "Menu",
    },
    {
      id: "5",
      name: "Tầng 5",
      title: "Menu",
    },
    {
      id: "6",
      name: "Tầng 6",
      title: "Menu",
    },
    {
      id: "7",
      name: "Tầng 7",
      title: "Menu",
    },

  ];

  function renderMenuPage() {
    let list = listMenu?.map((item, key) => {
      return (
        <div className={`area-order-container__nav-list-item ${index === key ? 'area-order-container__nav-list-active' : ''}`}
          onClick={() => {
            callApiGetArea(item.id)
            setIndex(key)
          }}
        >
          {item?.name}
        </div>
      );
    });
    return list;
  }

  function callApiGetArea(id) {
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
            <div className="area-order-container__page-note-item-status"
              style={{backgroundColor: '#dcdde1'}}
            >

            </div>
            <div className="area-order-container__page-note-item-text">
              Bàn trống
            </div>
          </div>
          <div className="area-order-container__page-note-item">
            <div className="area-order-container__page-note-item-status"
              style={{backgroundColor: '#c23616'}}
            >

            </div>
            <div className="area-order-container__page-note-item-text">
              Bàn đang hoạt động
            </div>
          </div>
          <div className="area-order-container__page-note-item">
            <div className="area-order-container__page-note-item-status"
              style={{backgroundColor: '#fbc531'}}
            >

            </div>
            <div className="area-order-container__page-note-item-text">
              Bàn đã được đặt
            </div>
          </div>
        </div>
        <div className="area-order-container__page-content" style={{ height: '600px', width: '1000px', position: 'relative' }}>
          <div className="area-order-container__page-content-drag" style={{ height: '600px', width: '1000px', position: 'absolute', top: '0' }}>
            {list.map((item) => {
              return (
                <Draggable disabled defaultPosition={{ x: item?.left, y: item?.top }} bounds="parent" key={1} className={item?.title}>
                  <div
                    className="area-order-container__page-content-drag-item"
                    style={{
                      borderRadius: item?.kieuDang == 0 ? '50%' : '8px',
                      backgroundColor: item.status == 0 ? '#dcdde1' : item.status == 1 ? '#c23616' : '#fbc531',
                      color: item.status == 0 ? '#000' : item.status == 1 ? '#fff' : '#fff'
                    }}
                    onClick={() => {
                      if (item.status == 0) {
                        window.open(`/admin/table/${item.id}/order`, "_self")
                      }
                      else {
                        return;
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
    </div>
  );
}

export default TableOrder;
