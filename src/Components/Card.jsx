import React from 'react'
import img from '../assets/images/pexels-curtis-adams-6510949.jpg'
import { BsCircleFill, BsChatFill, BsWhatsapp } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import { ImLocation } from 'react-icons/im'
import './scss/card.scss'
import { useNavigate } from 'react-router-dom'

const Card = ({ property }) => {
  const navigate = useNavigate()

  const {
    imagesURL,
    key,
    property_type,
    price,
    number_of_room,
    number_of_bathroom,
    sqft,
    location,
    location_description,
  } = property

  return (
    <div className="card">
      <img src={imagesURL[0] || img} alt="img" loading="lazy" />
      <div
        className="img-cover"
        onClick={() => {
          navigate(`/property/${key}`, { state: property })
        }}
      >
        <div className="badge">new</div>
      </div>
      <div className="card-info">
        <div className="info-header">
          <div className="header">
            <BsCircleFill size={10} />
            <h3>{property_type}</h3>
          </div>
          <div className="share">
            <AiOutlineHeart size={20} />
            <BsWhatsapp size={20} />
            <FaShare size={20} />
          </div>
        </div>
      </div>
      <div className="price">
        <h2>
          {' ' + price + ' '}
          {'د.ك'}
        </h2>
      </div>
      <div className="dimension">{`${number_of_room} bed room, ${number_of_bathroom} bath, ${sqft}sqft`}</div>
      <div className="location">
        <a
          href={`https://www.google.com/maps?q=${location.lat},${location.lon}`}
          target="blank"
        >
          <ImLocation size={18} />
          {location_description}
        </a>
      </div>
    </div>
  )
}

export default Card
