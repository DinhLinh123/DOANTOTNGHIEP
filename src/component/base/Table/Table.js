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
};

TableBase.defaultProps = {
  total: 0,
  loading: false,
  onChangePagination: () => {},
  setObjectSort: () => {},
  columns: [],
  data: [],
  option: [],
  setCheckAll: () => {},
  setListObjectSelected: () => {},
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
  } = props;

  const [indexShowMenu, setIndexShowMenu] = useState(-1);
  const [showMenuItem, setShowMenuItem] = useState(false);

  const wrapperRef = useRef(null);

  const rowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //     debugger
    //   console.log(
    //     `selectedRowKeys: ${selectedRowKeys}`,
    //     "selectedRows: ",
    //     selectedRows
    //   );
    // },
    onSelect: (record, selected, selectedRows) => {
      setListObjectSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setCheckAll(selected);
    },
  };

  const onClickClose = () => {
    setIndexShowMenu(-1);
    setShowMenuItem(false);
  };

  commonFunction.useOutsideAlerter(wrapperRef, onClickClose);

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
      key: "operation",
      fixed: "right",
      width: 70,
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

  return (
    <div className="table-container">
      <div className="table-container__table">
        <Table
          columns={getColumn()}
          dataSource={data}
          rowSelection={{ ...rowSelection }}
          pagination={false}
          scroll={{ x: "calc(700px + 50%)", y: 240 }}
          onChange={onChange}
          loading={loading}
        />
      </div>
      <div className="table-container__paging">
        <Pagination
          total={total}
          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total}za`}
          defaultPageSize={20}
          defaultCurrent={1}
          onChange={(page, pageSize) => {
            onChangePagination(page, pageSize);
          }}
        />
      </div>
    </div>
  );
}

export default TableBase;
