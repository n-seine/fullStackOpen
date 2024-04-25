import React from 'react'
import propTypes from 'prop-types'

const Toast = ({ content }) => {
  if (content === null) {
    return null
  } else {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: content.style === 'error' ? 'red' : 'lightgreen',
    }
    return <div style={style}>{content.message}</div>
  }
}

Toast.propTypes = {
  content: propTypes.object,
}

export default Toast
