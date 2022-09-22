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
  return (
    <div className="footer">
      <h4>
        We strive give you seamless options to effectively display your property
        fot sale, buy , rent or exchange. Our higly specific technology makes it
        easy and convinient to customize your property search
      </h4>
      <div className="link-container">
        <AiOutlineTwitter size={25} />
        <BsFacebook  size={25}/>
        <BsInstagram  size={25}/>
        <BsWhatsapp  size={25}/>
        <BsTelegram  size={25}/>
        <FaLinkedinIn  size={25}/>
        <BsYoutube  size={25}/>
      </div>
      <h5>c 2015-2022 kuwait associate of REALTOR all right reserved</h5>
    </div>
  )
}

export default Footer
