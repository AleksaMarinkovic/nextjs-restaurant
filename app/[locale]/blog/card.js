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
    top: -200,
    left: 0,
    right: 0,
    bottom: -200,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    zIndex: 99,
  },
};

const Card = (params) => {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState();
  const [translations, setTranslations] = useState();
  useEffect(() => {
    ReactModal.setAppElement("body");
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
              className={styles.modal}
            >
              <div className={styles.modalContent}>
                <div className={styles.actionModalContainer}>
                  <button
                    onClick={handleCloseModal}
                    className={styles.actionModal}
                  >
                    {translations.close}
                  </button>
                </div>

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
                    style={{
                      objectFit: "fill",
                    }}
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
