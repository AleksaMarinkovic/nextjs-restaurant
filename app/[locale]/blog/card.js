"use client";

import { useState, useEffect } from "react";
import styles from "./card.module.scss";
import Image from "next/image";
import ReactModal from "react-modal";
import settings from "../settings";
import { motion } from "framer-motion";

const modalSettings = {
  overlay: {
    position: "fixed",
    top: 0,
    left: -200,
    right: -200,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    zIndex: 99,
  },
  content: {
    position: "absolute",
    top: "10vh",
    left: "25vw",
    right: "25vw",
    bottom: "10vh",
    background: "#f5f5f4",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "0.5rem",
    outline: "none",
    padding: "2rem 5vw 2rem 5vw",
    boxShadow: "0 0 50px 1px #333",
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0 5rem 0 5rem !important",
    zIndex: 99,
  },
};

const Card = (params) => {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState();
  const [translations, setTranslations] = useState();
  useEffect(() => {
    ReactModal.setAppElement('body');
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
        <motion.div
          className={styles.card}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={styles.imageWrapper}>
            <Image
              alt={post.attributes.thumbnail.data.attributes.name}
              src={
                settings.backendUrl +
                post.attributes.thumbnail.data.attributes.url
              }
              onClick={handleOpenModal}
              className={styles.image}
              priority
              width={300}
              height={300}
            ></Image>
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>{post.attributes.title}</h1>
            <p className={styles.desc}>{post.attributes.description}</p>
            <button onClick={handleOpenModal} className={styles.action}>
              {translations.more}
              <span aria-hidden="true">→</span>
            </button>
            <ReactModal
              closeTimeoutMS={500}
              isOpen={showModal}
              style={modalSettings}
              onRequestClose={handleCloseModal}
              shouldCloseOnOverlayClick={true}
              >
              <div className={styles.modalContent}>
                <button
                  onClick={handleCloseModal}
                  className={styles.actionModal}
                >
                  {translations.close}
                </button>
                <h1 className={styles.modalTitle}>{post.attributes.title}</h1>
                <div className={styles.modalImageWrapper}>
                  <Image
                    alt={post.attributes.thumbnail.data.attributes.name}
                    src={
                      settings.backendUrl +
                      post.attributes.thumbnail.data.attributes.url
                    }
                    priority
                    fill
                  ></Image>
                </div>

                <p className={styles.modalDesc}>
                  {post.attributes.description}
                </p>
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
        </motion.div>
      )}
    </div>
  );
};

export default Card;
