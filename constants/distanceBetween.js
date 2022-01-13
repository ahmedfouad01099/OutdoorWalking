import * as turf from "@turf/turf";

export const distanceBetween = (origin, distance) => {
  var from = turf.point([origin.coords.longitude, origin.coords.latitude]);
  var to = turf.point([distance.coords.longitude, distance.coords.latitude]);
  var options = { units: "meters" };

  var distance = turf.distance(from, to, options);
  return distance;
};
