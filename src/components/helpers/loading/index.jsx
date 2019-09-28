import React from 'react'
//-------------
import {Loader} from 'semantic-ui-react'
import './loaderStyle.css'
//-------------
const LoaderBlock = () => (
    <div className="loadingBlock">
        <Loader active inline='centered' size='massive'/>
    </div>
)

export default LoaderBlock