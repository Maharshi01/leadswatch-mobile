import React from 'react'
import Svg, { Defs, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

const Edit1 = props => (
  <Svg width={13.132} height={13.062} {...props}>
    <Defs></Defs>
    <Path
      className="prefix__a"
      d="M12.755 7.94a.344.344 0 00-.344.344v3.056a1.034 1.034 0 01-1.033 1.033H1.721A1.034 1.034 0 01.688 11.34V2.371a1.034 1.034 0 011.033-1.033h3.056a.344.344 0 000-.688H1.721A1.723 1.723 0 000 2.371v8.969a1.723 1.723 0 001.721 1.721h9.658A1.723 1.723 0 0013.1 11.34V8.282a.344.344 0 00-.345-.342zm0 0"
    />
    <Path
      className="prefix__a"
      d="M5.382 6.129l5.026-5.026 1.621 1.621L7.003 7.75zm0 0M4.562 8.569l1.791-.5-1.3-1.295zm0 0M12.476.251a.862.862 0 00-1.217 0l-.365.365 1.621 1.621.365-.365a.861.861 0 000-1.217zm0 0"
    />
  </Svg>
)

export default Edit1
