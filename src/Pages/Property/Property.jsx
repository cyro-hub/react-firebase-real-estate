import React, { useEffect, useState } from 'react'
import '@splidejs/react-splide/css'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useLocation } from 'react-router-dom'
import './css/property.scss'
import testImage from '../../assets/images/pexels-expect-best-323780.jpg'
import { BsCircleFill, BsChatFill, BsWhatsapp } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import { ImLocation } from 'react-icons/im'
import moment from 'moment'

const Property = () => {
  const location = useLocation()
  const {
    imagesURL,
    timeStamp,
    built_in,
    number_of_room,
    number_of_bathroom,
    sqft,
    property_type,
    price,
    location_description,
    description,
  } = location.state

  useEffect(() => {
    //perform a fetch request from the firebase db based on the id of the property
  }, [])

  return (
    <>
      <div className="property container">
        <div className="property-images-container">
          <Splide
            options={{
              rewind: true,
              perPage: 1,
              gap: '1rem',
              pagination: true,
              arrows: false,
              drag: 'free',
              autoScroll: {
                speed: 1,
              },
            }}
          >
            {imagesURL?.map((photo, index) => (
              <SplideSlide key={index}>
                <img
                  className="property-image"
                  src={photo || testImage}
                  alt="test image"
                />
              </SplideSlide>
            ))}
          </Splide>
          <div className="users-attention">
            <AiOutlineHeart size={25} />
            <BsWhatsapp size={25} />
            <FaShare size={25} />
          </div>
        </div>
        <div className="property-descriptions">
          <div className="header">
            <h3>
              <BsCircleFill size={10} /> {property_type}
            </h3>
            <h2>
              {price} {'د.ك'}
            </h2>
          </div>
          <div className="dimension">
            {number_of_room} bed room, {number_of_bathroom} bath, {sqft}sqft
          </div>
          <a href="#" className="location">
            <ImLocation size={12} /> {location_description}
          </a>
          <div className="more-description">
            {/* <div className="description-property">
              <h3>Installment Payment</h3>
              <p>251 {'د.ك'}</p>
            </div> */}
            <div className="description-property">
              <h3>Price per sqft</h3>
              <p>251 {'د.ك'}</p>
            </div>
            {/* <div className="description-property">
              <h3>Car Garage</h3>
              <p>2</p>
            </div> */}
            <div className="description-property">
              <h3>Built on the year</h3>
              <p>{built_in.split('-')[0]}</p>
            </div>
            <div className="description-property">
              <h3>Near by Environment</h3>
              <p>{description}</p>
            </div>
            <div className="description-property">
              <h3>Posted</h3>
              <p>{moment(timeStamp).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  )
}

export default Property
