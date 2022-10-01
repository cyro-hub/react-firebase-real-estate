import React, { useEffect, useState } from 'react'
import img from '../assets/images/pexels-curtis-adams-6510949.jpg'
import { BsCircleFill, BsWhatsapp, BsFillChatSquareFill } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { ImLocation } from 'react-icons/im'
import './scss/card.scss'
import { useNavigate } from 'react-router-dom'
import * as firebase from '../Firebase/firebase'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import Modal from '../Components/Comment'

const Card = ({ property }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.user)
  const [myLike, setMyLike] = useState(null)

  const {
    imagesURL,
    key,
    property_type,
    price,
    number_of_rooms,
    number_of_bathroom,
    sqft,
    location,
    location_description,
    likes,
    comments,
  } = property

  const addLikes = async () => {
    if (!user) {
      return navigate('/login')
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
    <>
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          comments={comments}
          uid={key}
          property_type={property_type}
        />
      )}
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
              {myLike ? (
                <AiFillHeart size={25} onClick={addLikes} />
              ) : (
                <AiOutlineHeart size={25} onClick={addLikes} />
              )}
              <BsFillChatSquareFill size={23} onClick={() => setOpen(!open)} />
              <a href="https://wa.me/96555303182" target="_blank">
                <BsWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="price">
          <h2>
            {' ' + price + ' '}
            {'د.ك'}
          </h2>
        </div>
        <div className="dimension">{`${number_of_rooms} bed room, ${number_of_bathroom} bath, ${sqft}sqft`}</div>
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
    </>
  )
}

export default Card
