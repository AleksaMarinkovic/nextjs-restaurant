import React from "react";
import styles from "./loadingSpinner.module.scss";

const LoadingSpinner = ({size, color, padding}) => {
  return (
    <div className={styles.spinnerContainer} style={{height:size, padding:padding}}>
      <div className={styles.loadingSpinner} style={{height:size, width:size, borderTop: `5px solid ${color}`, borderBottom: `5px solid ${color}`}}></div>
    </div>
  );
};

export default LoadingSpinner;
