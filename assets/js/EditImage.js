import React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'

const EditImage = props => (
  <Svg width={32} height={32} {...props}>
    <G data-name="Ellipse 61" fill="#fff" stroke="#a3a1c9">
      <Circle cx={16} cy={16} r={16} stroke="none" />
      <Circle cx={16} cy={16} r={15.5} fill="none" />
    </G>
    <G data-name="edit (1)" fill="#a3a1c9">
      <Path
        data-name="Path 678"
        d="M9.935 19.227l8.8-8.8 2.833 2.841-8.8 8.8zm0 0"
      />
      <Path data-name="Path 679" d="M8.5 23.499l3.135-.868-2.267-2.267zm0 0" />
      <Path
        data-name="Path 680"
        d="M22.357 8.94a1.508 1.508 0 00-2.13 0l-.639.639 2.837 2.837.632-.639a1.507 1.507 0 000-2.13zm0 0"
      />
    </G>
  </Svg>
)

export default EditImage
