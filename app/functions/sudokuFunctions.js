import { defaultStyles } from "../config";

const getBorder = (row, col, textColor) => {
  const bold = defaultStyles.colors.info;
  let style = {
    // borderColor: textColor,
    // borderWidth: 0.175,
  };
  const boldWidth = 1;
  const regularWidth = 0.175;

  // mini square borders
  if (row % 3 === 0) {
    style.borderTopColor = bold;
    style.borderTopWidth = boldWidth;
  } else {
    style.borderTopColor = textColor;
    style.borderTopWidth = regularWidth;
  }
  if (col % 3 === 0) {
    style.borderLeftColor = bold;
    style.borderLeftWidth = boldWidth;
  } else {
    style.borderLeftWidth = regularWidth;
    style.borderLeftColor = textColor;
  }

  // outside borders
  if (row === 8) {
    style.borderBottomWidth = 1;
    style.borderBottomColor = bold;
  }
  if (col === 8) {
    style.borderRightWidth = 1;
    style.borderRightColor = bold;
  }
  return style;
};

export default {
  getBorder,
};
