import React, { useState } from 'react'
import './scss/contact.scss'

const Contact = () => {
  const [isInputting, setIsInputting] = useState({
    name: true,
    location: true,
    message: true,
  })
  const handleOnFocusInput = (e) => {
    setIsInputting({ ...isInputting, [e.target.name]: false })
  }

  const handleOnBlurInput = (e) => {
    setIsInputting({ ...isInputting, [e.target.name]: true })
  }

  return (
    <div className="contact">
      <form action="">
          <div className="input-container">
              <h2>Contact</h2>
          </div>
        <div className="input-container">
          {isInputting.name && <p>Name</p>}
          <div className="input">
            <input
              type="text"
              name="name"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              placeholder="Name"
            />
          </div>
        </div>
        <div className="input-container">
          {isInputting.location && <p>Location</p>}
          <div className="input">
            <input
              type="text"
              name="location"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              placeholder="location"
            />
          </div>
        </div>
        <div className="input-container">
          {isInputting.message && <p>Message</p>}
          <div className="input">
            <textarea
              type="text"
              name="message"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              placeholder="message"
            />
          </div>
        </div>
        <div className="input-container submit-container">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Contact
