import React, { useState } from "react";
import styles from "./add-space.module.scss";
const colors = [
  "#F08080",
  "#DC143C",
  //   "#800000",
  "#FF4500",
  "#FF8C00",
  //   "#FFFF00",
  "#9ACD32",
  //   "#00FF00",
  //   "#32CD32",
  //   "#6B8E23",
  //   "#228B22",
  "#00FA9A",
  "#3CB371",
  "#20B2AA",
  //   "#48D1CC",
  "#6495ED",
  "#00BFFF",
  "#1E90FF",
  //   "#000080",
  "#0000CD",
  "#8A2BE2",
  //   "#4B0082",
  "#8B008B",
  //   "#BA55D3",
  //   "#FF00FF",
  "#FF1493",
  "#FF69B4",
  "#F5DEB3",
  //   "#D2691E",
  //   "#F4A460",
  "#BC8F8F",
  "#708090",
  "#B0C4DE",
];

const AddSpace = ({
  setSpaces,
  spaces,
  setAddSpaceIsActive,
  setActiveSpace,
  activeSpaceIndex,
  spaceIndex,
}) => {
  const [pickedColor, setPickedColor] = useState("");
  const [pickedName, setPickedName] = useState("");
  const addNewSpace = () => {
    if (pickedColor && pickedName) {
      const space = { name: pickedName, theme: pickedColor };
      setSpaces(spaces.length ? [...spaces, space] : [space]);
      setAddSpaceIsActive(false);
      setActiveSpace(space);
    }
  };
  const countLeftStyle = () => {
    switch (activeSpaceIndex) {
      case 0: {
        return 100 * spaceIndex;
      }
      case 1: {
        return 100 * spaceIndex - 100;
      }
      case 2: {
        return 100 * spaceIndex - 200;
      }
      default:
        return 0;
    }
  };
  const renderColors = () => {
    return colors.map((color) => {
      return (
        <div className={styles.addSpace__colorWrap}>
          <div
            className={styles.addSpace__color}
            style={{ background: color, color: color }}
            onClick={() => {
              setPickedColor(color);
            }}
          ></div>
        </div>
      );
    });
  };
  return (
    <section
      style={{ left: `${countLeftStyle()}%` }}
      className={styles.addSpace}
    >
      <div className={styles.addSpace__wrap}>
        {/* <p className={`${styles.addSpace__title} bigger`}>Add New Space</p> */}
        <div className={styles.addSpace__options}>
          <form action="">
            <input
              style={pickedColor ? { color: pickedColor } : {}}
              type="text"
              value={pickedName}
              onChange={(e) => setPickedName(e.target.value)}
              placeholder="Space Name"
              className={styles.addSpace__spaceName}
            />
          </form>
          <p className={`${styles.addSpace__colorsLabel}`}>Pick Theme Color</p>
          <div className={styles.addSpace__colorsWrap}>{renderColors()}</div>
          <button
            style={
              pickedColor ? { background: pickedColor, color: "white" } : {}
            }
            className={styles.addSpace__addBtn}
            onClick={addNewSpace}
          >
            Add Space
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddSpace;
