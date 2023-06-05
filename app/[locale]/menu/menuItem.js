import style from "./menuItem.module.scss";

const MenuItem = (props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.nameAndPrice}>
        <h1 className={style.name}>{props.name}&nbsp;</h1>
        <h1 className={style.price}>&nbsp;{props.price} rsd</h1>
      </div>
      <h2 className={style.description}>{props.description}</h2>
    </div>
  );
};

export default MenuItem;
