import './index.scss'
import React, { memo } from 'react'

const LightButton = props => {
    return (
        <button className="custom-btn light-btn" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

LightButton.propTypes = {}

export default memo(LightButton)
