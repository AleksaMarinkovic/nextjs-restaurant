"use client";

import { useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import QueryString from "qs";
import NextJsImage from "./nextJsImage";
import settings from "../settings";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import LoadingSpinner from "../loadingSpinner";
import styles from "./gallery.module.scss";

function convertToPhotoAlbumArray(data) {
  const photos = [];
  data.forEach((photo) => {
    photos.push({
      key: photo.id,
      src:
        settings.backendUrl +
        photo.attributes.image.data.attributes.formats.medium.url,
      width: photo.attributes.image.data.attributes.formats.medium.width,
      height: photo.attributes.image.data.attributes.formats.medium.height,
      alt: photo.attributes.description,
      title: photo.attributes.description,
    });
  });
  return photos;
}

const Gallery = (params) => {
  const [photos, setPhotos] = useState([]);
  const [loadedPhotos, setLoadedPhotos] = useState(false);
  const [index, setIndex] = useState(-1);
  const [pageSize, setPageSize] = useState(10);
  const [isEnd, setIsEnd] = useState(false);

  const onLoadMoreClick = () => {
    setPageSize(pageSize + 5);
  };

  useEffect(() => {
    async function getPhotos(locale) {
      const query = QueryString.stringify({
        fields: ["description"],
        populate: ["image"],
        locale: [locale],
        pagination: {
          page: 1,
          pageSize: pageSize,
        },
      });
      const res = await fetch(
        `${settings.backendUrl}/api/restaurant-images?${query}`,
        {
          next: { revalidate: settings.revalidateTime },
        }
      );
      const data = await res.json();
      if (data.data) {
        setPhotos(convertToPhotoAlbumArray(data.data));
        setLoadedPhotos(true);
      }
      if(data.meta.pagination.total === data.data.length){
        setIsEnd(true);
      }
      else{
        setIsEnd(false);
      }
    }
    getPhotos(params.locale);
  }, [params.locale, pageSize]);
  return (
    <div>
      {loadedPhotos ? (
        <div>
          <PhotoAlbum
            layout="masonry"
            photos={photos}
            renderPhoto={NextJsImage}
            sizes={{ size: "calc(100vw - 240px)" }}
            columns={(containerWidth) => {
              if (containerWidth < 700) return 2;
              if (containerWidth < 950) return 3;
              return 4;
            }}
            spacing={(containerWidth) => {
              if (containerWidth < 700) return 5;
              if (containerWidth < 950) return 8;
              return 10;
            }}
            onClick={({ index }) => setIndex(index)}
          ></PhotoAlbum>
          {!isEnd && (
            <div className={styles.buttonContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width={75}
                height={75}
                onClick={onLoadMoreClick}
                className={styles.plus}
              >
                <path
                  fill="currentColor"
                  d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"
                />
              </svg>
            </div>
          )}

          <Lightbox
            slides={photos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </div>
      ) : (
        <LoadingSpinner size={70} color="#9e7441" padding="10rem" />
      )}
    </div>
  );
};

export default Gallery;
