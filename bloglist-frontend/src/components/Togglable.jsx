import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(
  ({ children, buttonLabel = 'show' }, ref) => {
    const [visible, setVisible] = useState(false)
    const showWhenIsVisible = { display: visible ? '' : 'none' }
    const hiddenWhenIsVisible = { display: visible ? 'none' : '' }

    const toggleVisible = () => {
      setVisible(!visible)
    }
    useImperativeHandle(ref, () => ({ toggleVisible }))

    return (
      <div>
        <div style={hiddenWhenIsVisible}>
          <button onClick={toggleVisible}>{buttonLabel}</button>
        </div>
        <div style={showWhenIsVisible}>
          {children}
          <button onClick={toggleVisible}>Cancel</button>
        </div>
      </div>
    )
  }
)
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string,
}

export default Togglable
