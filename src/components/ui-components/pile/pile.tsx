import React, { useState } from "react";
import styles from "./pile.module.css";
export default function Pile(props: {
  value: string;
  onClick: Function;
  index: number;
}) {
  const [visibale, setVisibale] = useState(false);
  return (
    <td
      className={styles.td}
      onClick={(e) => {
        setVisibale(true);
        props.onClick(props.index);
      }}
    >
      <button className={styles.container}>
        <h1 className={` ${visibale ? styles.icon : ``}`}>{props.value}</h1>
      </button>
    </td>
  );
}
