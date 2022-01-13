import React, { useEffect } from "react";

import { Dimensions, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as path from "svg-path-properties";

const { width } = Dimensions.get("window");
const animation = new Animated.Value(0);
const AnimatedPath = new Animated.createAnimatedComponent(Path);

const size = (width - 32) / 1.7,
  strokeWidth = 25,
  { PI, cos, sin } = Math,
  cx = size / 2,
  cy = size / 2,
  r = (size - strokeWidth) / 2;

const startAngle = PI + PI * 0.2,
  endAngle = 2 * PI - PI * 0.2,
  startX = cx - r * cos(startAngle),
  startY = -r * sin(startAngle) + cy,
  endX = cx - r * cos(endAngle),
  endY = -r * sin(endAngle) + cy;

const d = `M${startX} ${startY} A ${r} ${r} 0 1 0 ${endX} ${endY}`;

const properties = path.svgPathProperties(d);
const length = properties.getTotalLength();

export default function SemiCircleProgressBarCmp({ ratio }) {
  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start();
  });

  return (
    <Svg width={size} height={size}>
      <Path
        stroke={"#000"}
        fill={"transparent"}
        strokeWidth={strokeWidth}
        {...{ strokeWidth, d }}
      />
      <AnimatedPath
        stroke={"#f2b659"}
        fill={"transparent"}
        strokeWidth={strokeWidth}
        strokeDasharray={length}
        strokeDashoffset={length - ratio * length}
        {...{ d }}
      />
    </Svg>
  );
}
