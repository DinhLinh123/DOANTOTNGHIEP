import React from 'react';
import PropTypes from 'prop-types';
import "./chooseOption.scss"
import Button2 from '../../../../../base/Button/Button';

ChooseOption.propsTypes={
    list: PropTypes.array
}

ChooseOption.defaultProps={

}

function ChooseOption(props) {

    const{list}=props
    return(
        <div className="order-page-container__selected-dish">
        <div className="order-page-container__selected-dish-top">
          <div className="order-page-container__selected-dish-top-title">
            Món đã chọn(15)
          </div>
          <div className="order-page-container__selected-dish-top-table">
            Bàn: 15
          </div>
        </div>
        <div className="order-page-container__selected-dish-content" >
          {list?.map((item) => {
            return (
              <div>{item.title}</div>
            )
          })}
        </div>
        <div className="order-page-container__selected-dish-footer">
          <div className="order-page-container__selected-dish-footer-total">
            <div className="order-page-container__selected-dish-footer-total-title">
              Tổng tiền
            </div>
            <div className="order-page-container__selected-dish-footer-total-money">
              230000
            </div>
          </div>
          <div className="order-page-container__selected-dish-footer-confirm">
            <Button2 name={"Xác nhận"} />
          </div>
        </div>
      </div>
    )
}

export default ChooseOption