import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";
import styles from "./nextJsImage.module.scss";

export default function NextJsImage({
  photo,
  imageProps: { alt, title, className, sizes, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div
      className={styles.wrapper}
      style={{ ...wrapperStyle, position: "relative" }}
    >
      <Image
        fill
        src={photo}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        {...{ alt, title, sizes, className }}
        priority
      />
      <div className={styles.overlay} onClick={onClick}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
            viewBox="0 0 390.704 390.704"
            className={styles.magnifyingGlass}
          >
            <g>
              <g>
                <path
                  fill="currentColor"
                  d="M379.711,326.556L265.343,212.188c30.826-54.189,23.166-124.495-23.001-170.663c-55.367-55.366-145.453-55.366-200.818,0
			c-55.365,55.366-55.366,145.452,0,200.818c46.167,46.167,116.474,53.827,170.663,23.001l114.367,114.369
			c14.655,14.655,38.503,14.654,53.157,0C394.367,365.059,394.368,341.212,379.711,326.556z M214.057,214.059
			c-39.77,39.771-104.479,39.771-144.25,0c-39.77-39.77-39.77-104.48,0-144.25c39.771-39.77,104.48-39.77,144.25,0
			C253.828,109.579,253.827,174.29,214.057,214.059z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
