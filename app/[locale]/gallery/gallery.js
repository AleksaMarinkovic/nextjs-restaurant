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
  useEffect(() => {
    async function getPhotos(locale) {
      const query = QueryString.stringify({
        fields: ["description"],
        populate: ["image"],
        locale: [locale],
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
    }
    getPhotos(params.locale);
  }, [params.locale]);
  return (
    <div>
      {loadedPhotos ? (
        <div>
          <PhotoAlbum
            layout="masonry"
            photos={photos}
            renderPhoto={NextJsImage}
            defaultContainerWidth={1200}
            sizes={{ size: "calc(100vw - 240px)" }}
            onClick={({ index }) => setIndex(index)}
          ></PhotoAlbum>
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
        <LoadingSpinner size={70} color='#9e7441' padding='10rem'/>
      )}
    </div>
  );
};

export default Gallery;
