import React, {Component} from 'react'
//-------------
import {Icon, Label} from 'semantic-ui-react'
import './notFoundStyle.css'
//-------------

class PageNotFound extends Component {
    render() {
        return <div className="pageNotFoundBlock">
            <Icon.Group size="massive">
                <Icon loading size='big' name='spinner' color="grey"/>
                <Icon name='frown'/>
            </Icon.Group>
            <Label color='red' size="massive">Page Not Found</Label>
        </div>
    }
}

export default PageNotFound