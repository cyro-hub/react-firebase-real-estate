import React, { useEffect, useState } from 'react'
import img from '../assets/images/pexels-curtis-adams-6510949.jpg'
import { BsCircleFill, BsWhatsapp, BsFillChatSquareFill } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart, AiTwotoneLike } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import { ImLocation } from 'react-icons/im'
import './scss/card.scss'
import { useNavigate } from 'react-router-dom'
import * as firebase from '../Firebase/firebase'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useSelector } from 'react-redux'

const Card = ({ property }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [myLike, setMyLike] = useState(null)

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
    likes,
  } = property

  const addLikes = async () => {
    if (!user) {
      navigate('/login')
    }

    const propertyRef = doc(firebase.db, 'properties', key)

    if (!myLike) {
      return await updateDoc(propertyRef, {
        likes: arrayUnion({ likeBy: user?.uid }),
      })
    }
    return await updateDoc(propertyRef, {
      likes: arrayRemove(myLike),
    })
  }

  useEffect(() => {
    setMyLike(likes[likes.findIndex((like) => like.likeBy === user?.uid)])
  })

  return (
    <div className="card">
      <img src={imagesURL[0] || img} alt="img" loading="lazy" />
      <div
        className="img-cover"
        onClick={() => {
          navigate(`/property/${key}`, { state: property })
        }}
      >
        <div className="badge">
          <AiTwotoneLike size={10} />
          {` ${likes.length}`}
        </div>
      </div>
      <div className="card-info">
        <div className="info-header">
          <div className="header">
            <BsCircleFill size={10} />
            <h3>{property_type}</h3>
          </div>
          <div className="share">
            {myLike ? (
              <AiFillHeart size={25} onClick={addLikes} />
            ) : (
              <AiOutlineHeart size={25} onClick={addLikes} />
            )}
            <BsFillChatSquareFill size={23} />
            <BsWhatsapp size={24} />
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
