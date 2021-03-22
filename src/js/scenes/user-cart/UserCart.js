import React, { useState, useContext } from "react";
import "./UserCart.scss";
import { Store } from "../../store/Store";
import { useHistory } from "react-router";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import data from "./data.json";
import { each } from "lodash";
import { updateCartImageSizeAction } from "../../actions/CartActions";
import { downloadImage } from "../../api/api-creator";
import Axios from "axios";
const UserCart = () => {
  let {
    dispatch,
    state: {
      selectedPhotoDetails,
      isLoggedIn,
      userDetails: { cart },
    },
  } = useContext(Store);
  cart = data.result.latestPhotos;
  let history = useHistory();
  // const [imageSize, setImageSize] = useState("large_jpg");
  const [imageID, setImageID] = useState(null);
  const [viewSizeDropdown, setViewSizeDropdown] = useState(false);

  const getImageSizeHTML = (sizes, imageSize, photoDtls) => {
    let HTMLContent = [];
    HTMLContent = Object.keys(sizes).map((each) => {
      let disp_name = sizes[each].display_name,
        width = sizes[each].width,
        height = sizes[each].height,
        width_in_cm = sizes[each].width_cm,
        height_in_cm = sizes[each].height_cm,
        dpi = sizes[each].dpi,
        format = sizes[each].format,
        cssSelectedCls =
          each ===
          `${
            imageSize.display_name
              ? `${imageSize.display_name.toLowerCase()}_jpg`
              : imageSize
          }`
            ? "selected-image-size"
            : "";
      return (
        <>
          <div
            className={cssSelectedCls}
            onClick={() => {
              // setImageSize(each);
              // cart.map((each) => {
              //   if (each.photoDtls._id === imageID) {
              //     each.imageSize = each;
              //   }
              // });
              updateCartImageSizeAction(dispatch, imageID, imageSize);
              setViewSizeDropdown(!viewSizeDropdown);
            }}
          >
            <span>
              <b>{disp_name}</b> {<span className="dot-icon"></span>} {width}{" "}
              {<span className="cross-icon"></span>} {height} px
            </span>
            <span>
              {width_in_cm.split(" ")[0]} {<span className="cross-icon"></span>}{" "}
              {height_in_cm} {<span className="dot-icon"></span>} {dpi} dpi{" "}
              {<span className="dot-icon"></span>} {format.toUpperCase()}
            </span>
          </div>
        </>
      );
    });
    return HTMLContent;
  };
  const getImageSizeSelector = (picObj) => {
    let imageSize = picObj.imageSize;
    let picDtls = picObj.photoDtls,
      size =
        picDtls.attributes.sizes[
          `${
            imageSize.display_name
              ? `${imageSize.display_name.toLowerCase()}_jpg`
              : imageSize
          }`
        ],
      title = picDtls.attributes.title,
      desc = picDtls.attributes.description,
      id = picDtls._id;
    let disp_name = size && size.display_name,
      width = size.width,
      height = size.height,
      width_in_cm = size.width_cm,
      height_in_cm = size.height_cm,
      dpi = size.dpi,
      format = size.format,
      cssSelectedCls = "cart-image-size";
    let sizes = picDtls && picDtls.attributes && picDtls.attributes.sizes;
    return (
      <>
        <div
          className={cssSelectedCls}
          onClick={() => {
            // setImageID(id);
            // setViewSizeDropdown(!viewSizeDropdown);
          }}
        >
          <div className="cart-item-header">{title}</div>
          <div className="cart-item-desc">{desc}</div>
        </div>
        <div
          className="cart-item-size"
          onClick={() => {
            cart.map((each) => {
              if (each._id === imageID) {
                each.imageSize = size;
              }
            });
            setImageID(id);

            setViewSizeDropdown(!viewSizeDropdown);
            // updateCartImageSizeAction(dispatch, id, )
          }}
        >
          <span>
            <b>{disp_name}</b> {<span className="dot-icon"></span>} {width}{" "}
            {<span className="cross-icon"></span>} {height} px
          </span>
          <span>
            {width_in_cm.split(" ")[0]} {<span className="cross-icon"></span>}{" "}
            {height_in_cm} {<span className="dot-icon"></span>} {dpi} dpi{" "}
            {<span className="dot-icon"></span>} {format.toUpperCase()}
          </span>
          <div className="img-size-arrow">
            {viewSizeDropdown && id === imageID ? (
              <UpOutlined />
            ) : (
              <DownOutlined />
            )}
          </div>
        </div>
        {viewSizeDropdown && id === imageID && (
          <>
            <div className="phtoviwr-rght-sctn-img-size-dropdown">
              {getImageSizeHTML(sizes, imageSize, picDtls)}
            </div>
            <div
              className="phtoviwr-rght-sctn-img-size-dropdown-mask"
              onClick={() => setViewSizeDropdown(false)}
            ></div>
          </>
        )}
      </>
    );
  };
  const getCart = (imgDtls) => {
    let sizes =
      imgDtls.photoDtls &&
      imgDtls.photoDtls.attributes &&
      imgDtls.photoDtls.attributes.sizes;
    return (
      <>
        <div className="cart">
          <div className="cart-img">
            <img
              alt={"abc"}
              src={imgDtls.photoDtls.attributes.image_src["240p"]}
            ></img>
          </div>
          <div className="cart-item-dtls">
            <div
              className="img-content"
              onClick={() => setViewSizeDropdown(!viewSizeDropdown)}
            >
              {getImageSizeSelector(imgDtls)}
            </div>
          </div>
          <div className="cart-item-price">
            <span>&#8377;</span> 300
          </div>
        </div>
      </>
    );
  };
  const downloadSizeConfig = {
    large_jpg: "1080p",
    medium_jpg: "480p",
    small_jpg: "240p",
  };
  const handleDownload = async (event, cart) => {
    event.preventDefault();
    const urls = cart.map(
      (each) =>
        each["photoDtls"]["attributes"]["image_src"][
          downloadSizeConfig[each.imageSize]
        ]
    );

    const response = await fetch(
      "arn:aws:s3:::latest-photos/DSC_0122_edited.jpg"
    );
    debugger;
    if (response.status === 200) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "image";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
    }
  };
  const cartPriceCalculator = (cart) => {
    return (
      <>
        <div>
          <div className="order-summary">Order Summary</div>
          <div className="order-summary-elems">
            <span>Total Price: </span>{" "}
            <span>
              <span>&#8377;</span>600
            </span>
          </div>
          <div className="order-summary-elems">
            <span>Discount: </span>{" "}
            <span>
              <span>&#8377;</span>600
            </span>
          </div>
          <div className="order-summary-sepertor">
            <span></span>
          </div>
          <div className="order-summary-elems">
            <span>Total Amount: </span>{" "}
            <span>
              <span>&#8377;</span>0
            </span>
          </div>
          <div
            className="download-btn"
            onClick={(e) => handleDownload(e, cart)}
          >
            Download
          </div>
        </div>
        <div className="cart-opaque"></div>
      </>
    );
  };
  const getCartHTML = () => {
    console.log("cart", cart);
    return (
      <>
        <div className="cart-cards">
          <div>{cart.map((each) => getCart(each))}</div>

          <div className="cart-opaque"></div>
        </div>
        <div className="cart-total-price">{cartPriceCalculator(cart)}</div>
      </>
    );
  };
  return (
    <>
      {cart.length > 0 ? (
        <div className="user-cart-container">{getCartHTML()}</div>
      ) : isLoggedIn ? (
        <div className="cart-no-data">
          Nothing's on cart. Please choose some first!
        </div>
      ) : (
        <div className="login-redirection cart-no-data">
          You are not logged in. Please{" "}
          <span onClick={() => history.push("/login")}>Login</span> or
          <span onClick={() => history.push("/signup")}>Register</span> first!
        </div>
      )}
    </>
  );
};

export default UserCart;
