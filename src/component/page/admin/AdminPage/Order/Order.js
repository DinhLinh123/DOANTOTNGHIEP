import React from "react";
import "./order.scss";
import ud1 from "../../../../../image/ud1.jpg";
import ud2 from "../../../../../image/ud2.jpg";
import ud3 from "../../../../../image/ud3.jpg";
import ud4 from "../../../../../image/ud4.jpg";
import ud5 from "../../../../../image/ud5.jpg";
import ud6 from "../../../../../image/ud6.png";
import logo1 from "../../../../../image/logo1.png";
import InputField from "../../../../base/Input/Input";

function Order(props) {

  let logo =[
    {
        img: logo1,
    }
  ]
  let dataFake =[
         {
            img: ud1,
            title: "Buffet",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          },
        
          {
            img: ud2,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          },
          {
            img: ud3,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          },
          {
            img: ud4,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          },
           {
            img: ud5,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          },
           {
            img: ud6,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          }
          ,
           {
            img: ud6,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          }
          ,
           {
            img: ud6,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          }
          ,
           {
            img: ud6,
            title: "hahahaha",
            content: "hahahahaa hahahahaha hahahhahah ...",
            contentMore: "hihihihihihi hihihihihih hihihihihi",
          }
  ]

  return (
    <div className="order-page-container">
      <div className="order-page-container__food-list">
        <div className="order-page-container__food-list__top">
            <div className="order-page-container__food-list__top__logo">
                {
                    logo.map((item)=>{
                        return(
                            <img src={item.img} />
                        )
                    })
                }
            </div>
            <div className="order-page-container__food-list__top__search">
                <div className="order-page-container__food-list__top__search__textbox">
                    <InputField/>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
        <div className="order-page-container__food-list__list">
            {
                dataFake.map((item)=>{
                    return(<div className="order-page-container__food-list__list-item">
                    <div className="order-page-container__food-list__list-item-img">
                      <img src={item.img} />
                    </div>
                    <div className="order-page-container__food-list__list-item-title">
                      {item.title}
                    </div>
                    <div className="order-page-container__food-list__list-item-more">
                      {item.content}
                    </div>
                  </div>)
                })
            }
        </div>
        <div className="order-page-container__food-list__choose">
            chọn mục
        </div>
      </div>
      <div className="order-page-container__selected-dish">món đã chọn</div>
    </div>
  );
}
export default Order;
