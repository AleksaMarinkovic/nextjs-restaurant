import styles from "./menuItem.module.scss";

const MenuItem = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameAndPrice}>
        <h1 className={styles.name}>{props.name}&nbsp;</h1>
        <h1 className={styles.price}>&nbsp;{props.price} rsd</h1>
      </div>
      <h2 className={styles.description}>{props.description}</h2>
      <h1 className={styles.priceMobile}>{props.price} rsd</h1>
    </div>
  );
};

export default MenuItem;
