"use client";

import { useState, useEffect } from "react";
import styles from "./card.module.scss";
import Image from "next/image";
import ReactModal from "react-modal";
import settings from "../settings";

const modalSettings = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  content: {
    position: "absolute",
    top: "5vh",
    left: "30vw",
    right: "30vw",
    bottom: "5vh",
    background: "#f5f5f5",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "0.5rem",
    outline: "none",
    padding: "2rem 5rem 2rem 5rem",
    boxShadow: "0 0 50px 1px #333",
  },
};

const Card = (params) => {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState();
  const [translations, setTranslations] = useState();
  ReactModal.setAppElement(document.getElementById("root"));
  useEffect(() => {
    setPost(params.post);
    setTranslations(params.translations);
  }, [params.post, params.translations]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.cardWrapper}>
      {post && translations && (
        <div className={styles.card}>
          <Image
            alt={post.attributes.thumbnail.data.attributes.name}
            src={
              settings.backendUrl +
              post.attributes.thumbnail.data.attributes.url
            }
            className={styles.image}
            priority
            width={300}
            height={300}
          ></Image>
          <div className={styles.content}>
            <h1 className={styles.title}>{post.attributes.title}</h1>
            <p className={styles.desc}>{post.attributes.description}</p>
            <button onClick={handleOpenModal} className={styles.action}>
              {translations.more}
              <span aria-hidden="true">→</span>
            </button>
            <ReactModal
              isOpen={showModal}
              style={modalSettings}
              onRequestClose={handleCloseModal}
              shouldCloseOnOverlayClick={true}
            >
              <div className={styles.modalContent}>
                <Image
                  alt={post.attributes.thumbnail.data.attributes.name}
                  src={
                    settings.backendUrl +
                    post.attributes.thumbnail.data.attributes.url
                  }
                  className={styles.image}
                  priority
                  width={500}
                  height={500}
                ></Image>
                <h1 className={styles.modalTitle}>{post.attributes.title}</h1>
                <p className={styles.modalDesc}>
                  {post.attributes.description}
                </p>
                <button onClick={handleCloseModal} className={styles.action}>
                  {translations.close}
                </button>
              </div>
            </ReactModal>
            <div className={styles.tags}>
              {post.attributes.categories.data.map((category) => {
                return (
                  <div key={category.id}>
                    <a href="#" className={styles.tag}>
                      #{category.attributes.name.replace(/\s/g, "")}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
