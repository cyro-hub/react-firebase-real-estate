import React, { useEffect, useState } from 'react'
import '@splidejs/react-splide/css'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useParams } from 'react-router-dom'
import './css/property.scss'
import testImage from '../../assets/images/pexels-expect-best-323780.jpg'
import { BsCircleFill, BsWhatsapp, BsFillChatSquareFill } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import { ImLocation } from 'react-icons/im'
import moment from 'moment'
import { onSnapshot } from 'firebase/firestore'
import * as firebase from '../../Firebase/firebase'
import ClipLoader from 'react-spinners/ClipLoader'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import Modal from '../../Components/Comment'
import { useNavigate } from 'react-router-dom'
import Nav from '../../Components/Nav'

const Property = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.user)
  const [myLike, setMyLike] = useState(null)
  const [
    {
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
      key,
      likes,
      comments,
    },
    setProperty,
  ] = useState({})

  const param = useParams()

  const addLikes = async () => {
    if (!user) {
      return navigate('/login')
    }

    const propertyRef = doc(firebase.db, 'properties', param.key)

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
    if (!price) return
    setMyLike(likes[likes.findIndex((like) => like.likeBy === user?.uid)])
  })

  useEffect(() => {
    //perform a fetch request from the firebase db based on the id of the property
    const unsub = onSnapshot(
      doc(firebase.db, 'properties', param.key),
      (doc) => {
        setProperty(doc.data())
      },
    )
  }, [])

  if (!imagesURL)
    return (
      <div className="loader">
        <ClipLoader color={'white'} loading={true} size={150} />
      </div>
    )

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
      <Nav />
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
              cancelable:false,
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
            {myLike ? (
              <AiFillHeart size={25} onClick={addLikes} />
            ) : (
              <AiOutlineHeart size={25} onClick={addLikes} />
            )}
            <BsFillChatSquareFill size={23} onClick={() => setOpen(!open)} />
            <a href="https://wa.me/96555303182" target="_blank">
              <BsWhatsapp size={25} />
            </a>
            <a
              href={`whatsapp://send?text=${window.location}`}
              data-action="share/whatsapp/share"
              target="_blank"
            >
              <FaShare size={25} />
            </a>
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
