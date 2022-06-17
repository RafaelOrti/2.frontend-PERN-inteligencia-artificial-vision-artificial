
import React from 'react'
import { connect } from 'react-redux'
import './Footer.css'

const Footer = (props) => {
  return (
    <div
      className='designFooter' style={{
        display: props.hideFooter.isHome ? 'none' : undefined
      }}
    >
      <span>AIFLIX Reserve Rights</span>
    </div>
  )
}

export default connect((state) => ({
  hideFooter: state.hideFooter
}))(Footer)
