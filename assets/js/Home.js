import React from 'react'
import Svg, { Defs, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

const Home = props => (
    <Svg width={25.723} height={23.953} {...props}>
        <Defs></Defs>
        <Path
            className="prefix__a"
            d="M25.291 10.824l-3.9-3.9v-4.5a1.474 1.474 0 00-2.949 0v1.555l-2.9-2.9a3.879 3.879 0 00-5.362 0L.431 10.824a1.475 1.475 0 102.086 2.085l9.747-9.748a.87.87 0 011.193 0l9.748 9.749a1.475 1.475 0 102.086-2.085z"
        />
        <Path
            className="prefix__a"
            d="M13.373 5.96a.724.724 0 00-1.024 0l-8.574 8.572a.726.726 0 00-.212.513V21.3a2.657 2.657 0 002.656 2.656h4.245v-6.574h4.793v6.574h4.245a2.657 2.657 0 002.656-2.656v-6.252a.723.723 0 00-.212-.513z"
        />
    </Svg>
)

export default Home
