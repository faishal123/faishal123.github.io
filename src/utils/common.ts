export const getCssPropertyValue = (key: string) => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  return rootStyles.getPropertyValue(key).trim();
};

export const hexToRgba = (hex: string, alpha?: string) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (hex.length === 4) {
    let redString = hex.slice(1, 2);
    let greenString = hex.slice(2, 3);
    let blueString = hex.slice(3, 4);
    redString = `${redString}${redString}`;
    greenString = `${greenString}${greenString}`;
    blueString = `${blueString}${blueString}`;
    r = parseInt(redString, 16);
    g = parseInt(greenString, 16);
    b = parseInt(blueString, 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  if (alpha) {
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgb(${r},${g},${b})`;
};
