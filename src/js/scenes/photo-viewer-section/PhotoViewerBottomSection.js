import React, { useContext, useEffect, useState } from "react";
import "./PhotoViewerBottomSection.scss";
import { Store } from "../../store/Store";
import { useHistory } from "react-router";
import {
  photoClickAction,
  setSeletedPhotoBlankAction,
} from "../../actions/PhotoDetailsActions";
import PhotoGrid from "../../components/app-level/photo-grid/PhotoGrid";

const imgDtls = [
  {
    _id: "1001",
    attributes: {
      alt: "Landscape of cloudy mountains after sunset",
      aspectRatio: "1.5",
      description:
        "Landscape of cloudy mountains after sunset, taken from Singshore Bridge, Sikkim, India",
      details: {
        collection_name: "Nature",
        location: "Singshore Bridge, Sikkim, India",
        date: "09/01/2019 17:12",
      },
      image_src: {
        large:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Foriginal%2FDSC_0003.JPG?alt=media&token=b7fdb7fa-36d5-4a02-bc4b-884ffbd87923",
        medium:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Fmedium%2FDSC_0003.jpg?alt=media&token=9ac2538c-97b1-43a6-8b3c-cc2cd8866cbc",
        small:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Fsmall%2FDSC_0003.jpg?alt=media&token=a7476b01-648e-40e6-b30b-98f11810547f",
        extra_small:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Fextrasmall%2FDSC_0003.jpg?alt=media&token=217da2ce-53c9-43a2-945a-746b63412ce1",
      },
      keywords: [
        "texture",
        "abstract",
        "mountain",
        "backdrop",
        "background",
        "snow",
        "rock",
        "nature",
        "clouds",
        "singshore bridge",
      ],
      sizes: {
        large_jpg: {
          display_name: "Large",
          dpi: "300",
          format: "jpg",
          height: "4000",
          width: "6000",
          height_inch: "20 inch",
          width_inch: "30 inch",
          height_cm: "50.8 cm",
          width_cm: "76.2 cm",
        },
        medium_jpg: {
          display_name: "Medium",
          dpi: "300",
          format: "jpg",
          height: "800",
          width: "1200",
          height_inch: "4 inch",
          width_inch: "5 inch",
          height_cm: "10.16 cm",
          width_cm: "15.24 cm",
        },
        small_jpg: {
          display_name: "Small",
          dpi: "96",
          format: "jpg",
          height: "533",
          width: "800",
          height_inch: "5.55 inch",
          width_inch: "8.33 inch",
          height_cm: "14.1 cm",
          width_cm: "21.15 cm",
        },
        extra_small_jpg: {
          display_name: "Extra Small",
          dpi: "72",
          format: "jpg",
          height: "333",
          width: "500",
          height_inch: "4.63 inch",
          width_inch: "6.94 inch",
          height_cm: "11.76 cm",
          width_cm: "17.63 cm",
        },
      },
      title: "Mountains and cloud",
    },
    type: "image",
  },
  {
    _id: "1002",
    attributes: {
      alt: "Dawn at the mountains.",
      aspectRatio: "1.5",
      description:
        "Viewed from Tiger Hill observatory, India. Dawn at the mountains.",
      details: {
        collection_name: "Nature",
        location: "Tiger Hill observatory, India",
        date: "07/01/2019 05:39",
      },
      image_src: {
        large:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Foriginal%2FDSC_0207.JPG?alt=media&token=bcd5f892-3056-4115-a081-2fbeb085a510",
        medium:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Fmedium%2FDSC_0207.jpg?alt=media&token=e5eeffd7-8ff9-4ff8-a171-ebae9c810f83",
        small:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Fsmall%2FDSC_0207.jpg?alt=media&token=c679eff7-dbe1-4f5e-a362-4a754fd8745d",
        extra_small:
          "https://firebasestorage.googleapis.com/v0/b/photosbay-464cd.appspot.com/o/Nature%2Fextrasmall%2FDSC_0207.jpg?alt=media&token=3374343c-95ce-47ef-9ee9-6dd319ffc896",
      },
      keywords: [
        "texture",
        "abstract",
        "mountain",
        "backdrop",
        "background",
        "snow",
        "rock",
        "nature",
        "clouds",
        "tiger hill",
      ],
      sizes: {
        large_jpg: {
          display_name: "Large",
          dpi: "300",
          format: "jpg",
          height: "4000",
          width: "6000",
          height_inch: "20 inch",
          width_inch: "30 inch",
          height_cm: "50.8 cm",
          width_cm: "76.2 cm",
        },
        medium_jpg: {
          display_name: "Medium",
          dpi: "300",
          format: "jpg",
          height: "800",
          width: "1200",
          height_inch: "4 inch",
          width_inch: "5 inch",
          height_cm: "10.16 cm",
          width_cm: "15.24 cm",
        },
        small_jpg: {
          display_name: "Small",
          dpi: "96",
          format: "jpg",
          height: "533",
          width: "800",
          height_inch: "5.55 inch",
          width_inch: "8.33 inch",
          height_cm: "14.1 cm",
          width_cm: "21.15 cm",
        },
        extra_small_jpg: {
          display_name: "Extra Small",
          dpi: "72",
          format: "jpg",
          height: "333",
          width: "500",
          height_inch: "4.63 inch",
          width_inch: "6.94 inch",
          height_cm: "11.76 cm",
          width_cm: "17.63 cm",
        },
      },
      title: "Dawn at the mountains of the Himalayas",
    },
    type: "image",
  },
];

const PhotoViewerBottomSection = () => {
  const {
    dispatch,
    state: {
      albums,
      selectedPhotoDetails: { image },
    },
  } = useContext(Store);
  let history = useHistory();
  const collection = image && image["attributes"] && image["attributes"]["details"]["collection_name"];
  const [morePhotos, setMorePhotos] = useState(null);
  useEffect(() => {
    let albumNames = Object.keys(albums["allAlbums"]);
    let morePhotos1 = [];
    if (collection && albumNames.includes(collection.toLowerCase())) {
      morePhotos1 = albums["allAlbums"][`${collection.toLowerCase()}`];
      setMorePhotos(morePhotos1);
    }
  }, morePhotos, collection);

  const photoClickHandler = (clickedPhotoDtls) => {
    // history.push(`/latest-photos/${clickedPhotoDtls.title}`);
    // photoClickAction(dispatch, clickedPhotoDtls);
    let title = clickedPhotoDtls["attributes"]["title"],
      id = clickedPhotoDtls._id;
    history.push(`/photo-viewer/?name=${title}&id=${id}`, { id });
    setSeletedPhotoBlankAction(dispatch);
  };
  const getPhotoCards = () => {
    return morePhotos && morePhotos.map((each) => {
      return (
        <div
          className="latest-photo-cards blog-card spring-fever"
          onClick={() => photoClickHandler(each)}
        >
          <img
            src={each.attributes.image_src.small}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          ></img>
          <div class="title-content">
            <h5>
              <a href="#">{each.title}</a>
            </h5>
          </div>
          <div class="card-info">{each.title}</div>
          <div class="color-overlay"></div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="photoviewer-bottom-section">
        <div className="section-title">More Photos From This Album</div>
        <div className="section-cards">{getPhotoCards()}</div>
        <div className="section-title section-title-similar-photos">
          Similar Photos
        </div>
        {/* <div className="section-cards">{getPhotoCards()}</div> */}
        <PhotoGrid imgDtls={imgDtls} />
      </div>
    </>
  );
};

export default PhotoViewerBottomSection;
