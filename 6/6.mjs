import { getInput } from "../utils.mjs";
const input = getInput(6, "input");

const getFirstMarkerPosition = (dataStream, markerSize) => {
  let firstMarkerPosition = null;

  [...dataStream].every((_, i) => {
    let index = 0;
    if (i >= markerSize - 1) index = i - markerSize;

    const possibleMarker = new Set([...input.substring(index, i)]);
    if (possibleMarker.size === markerSize) {
      firstMarkerPosition = i;
      return false;
    }

    return true;
  });

  return firstMarkerPosition;
};

console.log("first marker:", getFirstMarkerPosition(input, 4));
console.log("first message:", getFirstMarkerPosition(input, 14));
