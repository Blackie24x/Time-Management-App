import React from "react";
import styles from "./note-creator.module.scss";
import uuid from "react-uuid";
const colors = [
  // "#F08080",
  // "#DC143C",
  "#111",
  "#444",
  "#777",
  "#FF4500",
  "#FF8C00",
  // "#9ACD32",
  // "#00FA9A",
  "#3CB371",
  "#20B2AA",
  "#6495ED",
  // "#00BFFF",
  "#1E90FF",
  "#0000CD",
  "#8A2BE2",
  // "#8B008B",
  "#FF1493",
  // "#FF69B4",
  // "#F5DEB3",
  // "#BC8F8F",
  // "#708090",
  // "#B0C4DE",
];

const Palette = ({ palette, setPalette, fontColor, setFontColor }) => {
  return (
    <div
      className={`${styles.creator__paletteWrap} ${
        palette ? styles["creator__paletteWrap--active"] : ""
      }`}
    >
      <div className={styles.creator__palette}>
        {colors.map((color) => (
          <div
            key={uuid()}
            onClick={() => {
              // setPalette(false);
              setFontColor(color);
            }}
            style={{
              background: color,

              transform: fontColor === color ? `scale(1.25)` : "",
            }}
            className={styles.creator__paletteColor}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Palette;
