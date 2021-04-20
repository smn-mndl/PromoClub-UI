import React, { useState } from "react";
import "./PhotoViewerRightSection.scss";
import { Radio } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import LoginModal from "../../components/app-level/modals/LoginCustomModal";
import { addToCartAction } from "../../actions/UserDetailsActions";
import { isEmpty } from "lodash";

const radioStyle = {
  display: "flex",
  height: "30px",
  lineHeight: "30px",
  alignItems: "center",
  marginBottom: "20px",
  color: "#f2efef",
};
const getPhotoDetails = (photoDtls) => {
  const imageDtls =
      photoDtls && photoDtls.attributes && photoDtls.attributes.details,
    collName = imageDtls && imageDtls.collection_name,
    location = imageDtls && imageDtls.location,
    date = imageDtls && imageDtls.date;

  return (
    <>
      <div>
        <span>Collection: </span>
        <span>{collName}</span>
      </div>
      <div>
        <span>Location: </span>
        <span>{location}</span>
      </div>
      <div>
        <span>Upload date: </span>
        <span>{date && date.split(" ")[0]}</span>
      </div>
    </>
  );
};

const getRadioGroupHTML = (onChange, value) => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio style={radioStyle} value={1}>
        <span>&#8377; 200 for this image</span>
      </Radio>
      <Radio style={radioStyle} value={2}>
        <div>
          <span>&#8377; 100 for monthly subscription</span>
        </div>
      </Radio>
    </Radio.Group>
  );
};

const PhotoViwerRightSection = (props) => {
  const photoDtls = props.selectedPhotoDetails,
    loginStatus = props.isLoggedIn,
    dispatch = props.dispatch,
    setImageSize = props.setImageSize,
    imageSize = props.imageSize,
    profile = props.profile;

  let sizes = photoDtls && photoDtls.attributes && photoDtls.attributes.sizes;
  const [value, setValue] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState({
    status: false,
    msg: "",
  });

  const [viewSizeDropdown, setViewSizeDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const getImageSizeHTML = () => {
    let HTMLContent = [];
    HTMLContent = Object.keys(sizes).map((each) => {
      let disp_name = sizes[each].display_name,
        width = sizes[each].width,
        height = sizes[each].height,
        width_in_cm = sizes[each].width_cm,
        height_in_cm = sizes[each].height_cm,
        dpi = sizes[each].dpi,
        format = sizes[each].format,
        cssSelectedCls = each === imageSize ? "selected-image-size" : "";
      return (
        <>
          <div
            className={cssSelectedCls}
            onClick={() => {
              setImageSize(each);
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

  const addToCartClickHandler = () => {
    if (loginStatus) {
      if (!isEmpty(photoDtls)) {
        //add to cart and show it to notification
        setIsAddingToCart({ status: true, msg: "", code: null });
        addToCartAction({
          dispatch,
          photoDtls,
          cart: props.cart,
          imageSize,
          email: profile.email,
          setIsAddingToCart,
        });
      }
    } else {
      //show modal to login/register
      setShowLoginModal(true);
    }
  };

  return (
    <div className="photoviewer-right-section">
      <div className="phtoviwr-rght-sctn-img-size">
        <div className="phtoviwr-rght-sctn-img-size-header">
          Select Image Size
        </div>
        <div
          className="phtoviwr-rght-sctn-img-size-content"
          onClick={() => setViewSizeDropdown(!viewSizeDropdown)}
        >
          <div>{sizes && sizes[imageSize]["display_name"]}</div>
          <div className="phtoviwr-rght-sctn-img-size-arrow">
            {viewSizeDropdown ? <UpOutlined /> : <DownOutlined />}
          </div>
          {viewSizeDropdown && (
            <>
              <div className="phtoviwr-rght-sctn-img-size-dropdown">
                {getImageSizeHTML()}
              </div>
              <div
                className="phtoviwr-rght-sctn-img-size-dropdown-mask"
                onClick={() => setViewSizeDropdown(false)}
              ></div>
            </>
          )}
        </div>
      </div>
      <div className="photoviewer-right-section-header">Purchase License</div>
      <div className="photoviewer-right-section-radio-grp">
        {getRadioGroupHTML(onChange, value)}
        <div style={{ marginLeft: "25px", marginTop: "-20px" }}>
          10 images per month
        </div>
      </div>
      <div
        className="photoviewer-right-section-add-to-cart"
        onClick={() => addToCartClickHandler()}
      >
        Add to Cart
        {isAddingToCart.status ? <div className="btn-loader"></div> : null}
      </div>
      <div className="photoviewer-right-section-photo-details">
        <div className="photo-details-title">Photo Details</div>
        <div className="photo-details-content">
          {getPhotoDetails(photoDtls)}
        </div>
      </div>
      {showLoginModal && (
        <LoginModal history={props.history} closeModal={setShowLoginModal} />
      )}
    </div>
  );
};

export default PhotoViwerRightSection;
