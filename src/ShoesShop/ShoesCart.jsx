import React, { Component } from "react";
import { connect } from "react-redux";
import {
  downCartQty,
  removeCartItem,
  upCartQty,
} from "./redux/action/cartAction";
import { CLOSE_CART_MODAL } from "./redux/constant/shoeShopConstants";

class ShoesCart extends Component {
  renderTbody = () => {
    return this.props.cart.map((item, index) => {
      let { id, image, name, price, cartQty } = item;
      return (
        <div
          key={index.toString() + id}
          className="bg-white border-b hover:bg-gray-50 duration-300 flex items-center text-lg"
        >
          <p className="w-1/12 py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
            {index + 1}
          </p>
          <div className="w-2/12 py-4 px-4">
            <img
              src={image}
              alt=""
              style={{ width: `80px` }}
              className="mx-auto"
            />
          </div>
          <p className="w-3/12 py-4 px-4">{name}</p>
          <p className="w-1/12 py-4 px-4">{price}</p>
          <p className="w-2/12 py-4 px-4">
            <i
              className="cursor-pointer fa-regular fa-square-minus text-2xl"
              onClick={() => {
                this.props.handleCartQtyDown(item);
              }}
            ></i>
            <span className="mx-2">{cartQty}</span>
            <i
              className="cursor-pointer fa-regular fa-square-plus text-2xl"
              onClick={() => {
                this.props.handleCartQtyUp(item);
              }}
            ></i>
          </p>
          <p className="w-2/12 py-4 px-4 text-red-500 font-medium text-xl">
            {item.totalPrice()}
          </p>
          <p className="w-1/12 py-4 px-4">
            <i
              className="cursor-pointer fa-regular fa-trash-can text-red-500 text-2xl"
              onClick={() => {
                this.props.handleRemoveCartItem(item);
              }}
            ></i>
          </p>
        </div>
      );
    });
  };
  renderTotalPayment = () => {
    return this.props.cart.reduce((total, item) => {
      return total + item.totalPrice();
    }, 0);
  };
  render() {
    return (
      <>
        <div className="container max-w-screen-lg fixed top-[3vh] left-1/2 -translate-x-2/4 z-10">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="w-full text-left text-gray-500">
              <div className="cart-header text-gray-700 uppercase bg-gray-300">
                <div className="flex items-center text-center font-bold">
                  <p className="w-1/12 py-3 px-4">STT</p>
                  <p className="w-2/12 py-3 px-4">H??nh ???nh</p>
                  <p className="w-3/12 py-3 px-4">T??n</p>
                  <p className="w-1/12 py-3 px-4">Gi??</p>
                  <p className="w-2/12 py-3 px-4">S??? l?????ng</p>
                  <p className="w-2/12 py-3 px-4">T???ng c???ng</p>
                  <p className="w-1/12 py-3 px-4">
                    <i
                      className="fa-solid fa-xmark text-2xl cursor-pointer"
                      onClick={this.props.handleCloseCart}
                    ></i>
                  </p>
                </div>
              </div>
              <div className="cart-body text-center max-h-[76vh] overflow-auto">
                {this.props.cart.length !== 0 ? (
                  this.renderTbody()
                ) : (
                  <p className="bg-white border-b py-4 px-6 text-xl text-center">
                    Gi??? h??ng tr???ng
                  </p>
                )}
              </div>
            </div>
            <p className="bg-white py-4 px-[155px] text-2xl font-medium border-t flex justify-between items-center">
              <span>T???ng c???ng:</span>
              <span className="ml-10 text-red-500">
                $ {this.renderTotalPayment()}
              </span>
            </p>
          </div>
        </div>
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-gray-800/70"
          onClick={this.props.handleCloseCart}
        ></div>
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return { cart: state.cartReducer.cart };
};

let mapDispatchToProps = (dispatch) => {
  return {
    handleCartQtyUp: (shoeDetail) => {
      dispatch(upCartQty(shoeDetail));
    },
    handleCartQtyDown: (shoeDetail) => {
      dispatch(downCartQty(shoeDetail));
    },
    handleRemoveCartItem: (shoeDetail) => {
      dispatch(removeCartItem(shoeDetail));
    },
    handleCloseCart: () => {
      dispatch({
        type: CLOSE_CART_MODAL,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoesCart);
