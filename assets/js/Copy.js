import React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const Copy = props => (
  <Svg width={12.489} height={13.624} {...props}>
    <Defs></Defs>
    <Path
      className="prefix__a"
      d="M4.967 11.07a2.416 2.416 0 01-2.413-2.413V2.838h-.993A1.562 1.562 0 000 4.399v7.664a1.562 1.562 0 001.561 1.561h7.1a1.562 1.562 0 001.561-1.561v-.993zm0 0"
      fill="#A9A9A9"
    />
    <Path
      className="prefix__a"
      d="M12.489 1.561A1.561 1.561 0 0010.928 0H4.967a1.561 1.561 0 00-1.561 1.561v7.1a1.561 1.561 0 001.561 1.561h5.961a1.561 1.561 0 001.561-1.561zm0 0"
      fill="#A9A9A9"
    />
  </Svg>
);

export default Copy;
