import React from 'react'
import './scss/footer.scss'
import { AiOutlineTwitter } from 'react-icons/ai'
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsTelegram,
  BsYoutube,
} from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  const yearNow = new Date().getFullYear()
  return (
    <div className="footer">
      <h4>
        We strive to give you seamless options to effectively display your
        property for sale and rent or exchange. Our highly specific technology
        makes it easy and convinient to customize your property search, And we
        bring you multi-choices of properties to the comform of your devices
        through our website. Your convinience our goal
      </h4>
      <div className="link-container">
        <AiOutlineTwitter size={25} />
        <BsFacebook size={25} />
        <BsInstagram size={25} />
        <BsWhatsapp size={25} />
        <BsTelegram size={25} />
        <FaLinkedinIn size={25} />
        <BsYoutube size={25} />
      </div>
      <h5>
        &copy; 2015-{yearNow} kuwait associate of REALTOR all right reserved
        design by <strong>cyliosco.co</strong>
      </h5>
    </div>
  )
}

export default Footer
