import React, { useState, useContext } from "react";
import "./UserCart.scss";
import { Store } from "../../store/Store";
import { useHistory } from "react-router";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import data from "./data.json";
import ServiceLoadingPage from "../../components/common/service-loader/ServiceLoader";
import {
  updateCartImageSizeAction,
  downloadImageAction,
  emptyCartAction,
} from "../../actions/CartActions";
import { downloadImage } from "../../api/api-creator";

import { setDataLoadingStatusAction } from "../../actions/ApplevelActions";
const UserCart = () => {
  let {
    dispatch,
    state: {
      isDataLoading,
      isLoggedIn,
      userDetails: {
        profile: { cart, email },
      },
    },
  } = useContext(Store);
  // cart = data.result.latestPhotos;
  let history = useHistory();
  const [imageDownloading, setImageDownloading] = useState(false);
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
              updateCartImageSizeAction({
                dispatch,
                imageID,
                imageSize: each,
                cart,
                email,
              });
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
      attr = picDtls && picDtls.attributes,
      size =
        attr &&
        attr.sizes[
          `${
            imageSize.display_name
              ? `${imageSize.display_name.toLowerCase()}_jpg`
              : imageSize
          }`
        ],
      title = attr && attr.title,
      desc = attr && attr.description,
      id = picDtls._id;
    let disp_name = size && size.display_name,
      width = size && size.width,
      height = size && size.height,
      width_in_cm = size && size.width_cm,
      height_in_cm = size && size.height_cm,
      dpi = size && size.dpi,
      format = size && size.format,
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
            cart &&
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
          <div>
            <span>
              <b>{disp_name}</b> {<span className="dot-icon"></span>} {width}{" "}
              {<span className="cross-icon"></span>} {height} px
            </span>
            <span>
              {width_in_cm && width_in_cm.split(" ")[0]}{" "}
              {<span className="cross-icon"></span>}{" "}
              {height_in_cm ? height_in_cm : ""}{" "}
              {<span className="dot-icon"></span>} {dpi ? dpi : ""} dpi{" "}
              {<span className="dot-icon"></span>}{" "}
              {format && format.toUpperCase()}
            </span>
          </div>

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
  const priceConfig = {
    large_jpg: 300,
    medium_jpg: 200,
    small_jpg: 100,
  };
  const getCart = (imgDtls) => {
    let imgSrc =
      imgDtls.photoDtls &&
      imgDtls.photoDtls.attributes &&
      imgDtls.photoDtls.attributes.image_src;
    const imageSize = imgDtls.imageSize;

    return (
      <>
        <div className="cart">
          <div className="cart-img">
            <img alt={"abc"} src={imgSrc && imgSrc["extra_small"]}></img>
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
            <span>&#8377;</span> {priceConfig[imageSize]}
          </div>
        </div>
      </>
    );
  };
  const downloadSizeConfig = {
    large_jpg: "large",
    medium_jpg: "medium",
    small_jpg: "small",
    extra_small_jpg: "extra_small",
  };
  const handleDownload = async (event, cart) => {
    event.preventDefault();
    const getService = async (eachCartElem, url) => {
      setImageDownloading(true);
      const res = await downloadImage(url);
      setImageDownloading(false);
      let src = "data:image/jpeg;base64,";
      src += res.data;
      const link = document.createElement("a");
      link.href = src;
      link.setAttribute(
        "download",
        `${eachCartElem["photoDtls"]["attributes"]["title"]}.jpg`
      );
      document.body.appendChild(link);
      link.click();
    };
    setImageDownloading(true);
    const urlObj = cart.map((eachCartElem) => {
      let obj = {};
      obj["url"] =
        eachCartElem["photoDtls"]["attributes"]["image_src"][
          downloadSizeConfig["small_jpg"]
        ];
      const res = getService(eachCartElem, obj.url);
    });
    emptyCartAction(dispatch, email);
  };
  const cartPriceCalculator = (cart) => {
    const priceArr = cart.reduce(
      (each, b) => Number(each) + priceConfig[b.imageSize],
      0
    );
    return (
      <>
        <div>
          <div className="order-summary">Order Summary</div>
          <div className="order-summary-elems">
            <span>Total Price: </span>{" "}
            <span>
              <span>&#8377;</span>
              {priceArr}
            </span>
          </div>
          <div className="order-summary-elems">
            <span>Discount: </span>{" "}
            <span>
              <span>&#8377;</span>
              {priceArr}
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
            onClick={(e) => {
              handleDownload(e, cart);
            }}
          >
            Download
          </div>
        </div>
        <div className="cart-opaque"></div>
      </>
    );
  };
  const getCartHTML = () => {
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
      {imageDownloading && <ServiceLoadingPage />}
      {isLoggedIn ? (
        cart && cart.length > 0 ? (
          <div className="user-cart-container">{getCartHTML()}</div>
        ) : (
          <div className="cart-no-data">
            Nothing's on cart. Please choose some first!
          </div>
        )
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
