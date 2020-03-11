import React from 'react'
import Svg, { Path, G } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const LeftCircle = props => (
  <Svg width={45} height={143} {...props}>
    <Path fill="none" id="prefix__canvas_background" d="M-1-1h47v145H-1z" />
    <G>
      <Path
        id="prefix__svg_11"
        d="M45.5 72.1c0 31.5-18.7 58.6-45.5 70.9V1.2c26.8 12.3 45.5 39.4 45.5 70.9z"
        fill="#484393"
      />
    </G>
  </Svg>
)

export default LeftCircle
