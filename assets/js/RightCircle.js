import React from 'react'
import Svg, { Path, G } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const RightCircle = props => (
  <Svg width={46} height={96} {...props}>
    <Path fill="none" id="prefix__canvas_background" d="M-1-1h48v98H-1z" />
    <G>
      <Path
        id="prefix__svg_12"
        d="M47 1v95.9C21.7 95.6 1.5 74.6 1.5 49S21.7 2.3 47 1z"
        fill="#00b0eb"
      />
    </G>
  </Svg>
)

export default RightCircle
