import './index.scss'
import React, { memo } from 'react'

const DarkButton = props => {
    return (
        <button className="custom-btn dark-btn" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

DarkButton.propTypes = {}

export default memo(DarkButton)
