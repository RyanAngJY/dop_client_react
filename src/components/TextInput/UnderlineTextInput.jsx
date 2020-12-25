import './index.scss'
import React, { memo } from 'react'

const UnderlineTextInput = props => {
    return (
        <input
            style={{
                width: props.width,
            }}
            className="underline-text-input"
            onChange={e => props.onChange(e.target.value)}
            value={props.value}
            type={props.type}
            placeholder={props.placeholder}
        ></input>
    )
}

UnderlineTextInput.propTypes = {}
UnderlineTextInput.defaultProps = {
    width: '100%',
    placeholder: '',
    type: 'text',
}

export default memo(UnderlineTextInput)
