import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Table, Pagination, Tooltip } from "antd";
import "./table.scss";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import commonFunction from "../common/commonFunction";
import { SORT_TYPE } from "../common/commonConstant";

TableBase.propTypes = {
  total: PropTypes.number,
  loading: PropTypes.bool,
  onChangePagination: PropTypes.func,
  columns: PropTypes.array,
  data: PropTypes.array,
  hasMoreOption: PropTypes.bool,
  option: PropTypes.array,
  setObjectSort: PropTypes.func,
  setCheckAll: PropTypes.func,
  setListObjectSelected: PropTypes.func,
  onClickRow: PropTypes.func,
  onDoubleClickRow: PropTypes.func,
  isPaging: PropTypes.bool,
  onContextMenu:PropTypes.func
};

TableBase.defaultProps = {
  loading: false,
  onChangePagination: () => { },
  setObjectSort: () => { },
  columns: [],
  data: [],
  option: [],
  setCheckAll: () => { },
  setListObjectSelected: () => { },
  isPaging: true
};

function TableBase(props) {
  const {
    total,
    loading,
    onChangePagination,
    columns,
    data,
    hasMoreOption,
    option,
    setObjectSort,
    setCheckAll,
    setListObjectSelected,
    onClickRow,
    isPaging,
    onDoubleClickRow,
    onContextMenu
  } = props;

  const [indexShowMenu, setIndexShowMenu] = useState(-1);
  const [showMenuItem, setShowMenuItem] = useState(false);

  const wrapperRef = useRef(null);
  const onClickClose = () => {
    setIndexShowMenu(-1);
    setShowMenuItem(false);
  };
  commonFunction.useOutsideAlerter(wrapperRef, onClickClose);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

    },
    onSelect: (record, selected, selectedRows) => {
      setListObjectSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setCheckAll(selected);
    },
  };

  const onChange = (pagination, filters, sorter) => {
    setObjectSort(sorter.field, sorter.order);
  };

  function onShowMenuOption(col, event) {
    let _key = col.key;
    setIndexShowMenu(_key);
    setShowMenuItem(true);
  }

  const renderMoreOption = (col) => {
    return (
      <div className="table-more-option">
        <div
          className="table-more-option__button"
          onClick={(event) => {
            onShowMenuOption(col, event);
          }}
        >
          <Tooltip title={"xem thêm"}>
            <EllipsisOutlined />
          </Tooltip>
        </div>
        {indexShowMenu == col.key && showMenuItem && (
          <ul className="table-more-option__menu" ref={wrapperRef}>
            {option.map((item) => {
              return (
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onSelect && item.onSelect(col);
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  function getColumn() {
    const columnOption = {
      // title: '',
      // render: (_, col) => {
      //     renderMoreOption(col)
      // },
      title: "",
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, col) => renderMoreOption(col),
    };

    const columnsList = [...columns].map((col) => {
      return {
        ...col,
        defaultSortOrder:
          col.defaultSortOrder === SORT_TYPE.DESC
            ? "descend"
            : col.defaultSortOrder === SORT_TYPE.ASC
              ? "ascend"
              : "",
      };
    });
    if (hasMoreOption) {
      columnsList.push(columnOption);
    }
    return columnsList;
  }
  useEffect(()=>{
    console.log(data)
  },[data])


  return (
    <div className="table-container">
      <div className="table-container__table">
        <Table
          columns={getColumn()}
          dataSource={data}
          // rowSelection={{ ...rowSelection }}
          pagination={false}
          scroll={{ x: "calc(700px + 50%)", y: '100%' }}
          onChange={onChange}
          loading={loading}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { onClickRow(record, rowIndex, event) }, // click row
              onDoubleClick: event => { onDoubleClickRow(record, rowIndex, event) }, // double click row
              onContextMenu: event => {onContextMenu(record, rowIndex, event) }, // right button click row
              onMouseEnter: event => { }, // mouse enter row
              onMouseLeave: event => { }, // mouse leave row
            };
          }}
        />
      </div>
      {isPaging && <div className="table-container__paging">
        <Pagination
          total={total}
          showTotal={(total, range) => {
            return(
              <div>
                 Tổng <strong>{total}</strong> bản ghi
              </div>
            )
          }}
          defaultPageSize={20}
          defaultCurrent={1}
          onChange={(page, pageSize) => {
            onChangePagination(page, pageSize);
          }}
        />
      </div>
      }

    </div>
  );
}

export default TableBase;
