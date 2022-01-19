import React from 'react'
import PropTypes from 'prop-types'

//children is the destructured prop from FeedbackItem. It is the values that are passed in the divs
function Card({children, reverse}) {
  return (
    // conditional class
    // <div className={`card ${reverse && 'reverse'}`}>
    //   {children}
    // </div>

    //conditional style
    <div className="card" style={{
      backgroundColor: reverse ? 'rgba(0, 0, 0, 0.4)' : '#fff',
      color: reverse ? '#fff' : '#000',
    }}>{children}</div>
  )
}

Card.defaultProps = {
  revers: false,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
}

export default Card
