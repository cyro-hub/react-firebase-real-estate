import React, { useState, useEffect } from 'react'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { BiUserCircle } from 'react-icons/bi'
import Card from '../../Components/Card'
import { Link, useNavigate } from 'react-router-dom'
import './scss/rents.scss'
import Contact from '../../Components/Contact'
import Footer from '../../Components/Footer'
import { BsSearch } from 'react-icons/bs'
import logo from '../../assets/logo1.png'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../custom hooks/useFetch'
import useFetchFaq from '../../custom hooks/useFetchFaq'
import * as firebase from '../../Firebase/firebase'
import Avatar from '@mui/material/Avatar'
import { signOut } from 'firebase/auth'
import * as typesOfActions from '../../Redux/actionTypes'

const Rents = () => {
  useFetch('rents')
  useFetchFaq()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const newRents = useSelector((state) => state.rents)
  const faq = useSelector((state) => state.faq)
  const [isTyping, setIsTyping] = useState(true)

  const handleLogout = () => {
    signOut(firebase.auth)
      .then(() => {
        dispatch({type:typesOfActions.getUserInfo,payload:null})
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <>
      <div className="nav container">
        <img src={logo} alt="logo" />
        {user ? (
          user?.photoURL ? (
            <Avatar
              onClick={handleLogout}
              alt="Remy Sharp"
              src={user?.photoURL}
            />
          ) : (
            <Avatar onClick={handleLogout}>RS</Avatar>
          )
        ) : (
          <BiUserCircle
            size={30}
            onClick={() => {
              navigate('/login')
            }}
          />
        )}
      </div>
      <div className="welcome-cover">
        <div className="home-nav">
          <Link className="rent" to="/rent">
            RENT
          </Link>
          <Link to="/sale">SALE</Link>
        </div>
        <h2>Discover Your Perfect Home</h2>
        <h3>
          Not only imagination but with the most complete source of homes for
          Rents and Sale near you
        </h3>
        <button className="btn">Discover</button>
      </div>
      <div className="welcome"></div>
      <div className="properties container">
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              name="search"
              onInput={() => setIsTyping(false)}
              onBlur={() => setIsTyping(true)}
            />
            {isTyping && <BsSearch size={20} />}
          </div>
        </div>
        <div className="new-properties">
          {newRents?.map((property) => (
            <Card key={property.key} property={property} />
          ))}
        </div>
        <h2 className="trending_header">
          Trending Areas <TbBrandGoogleAnalytics size={28} />
        </h2>
        <div className="trending-property">
          {/* {properties?.map((key) => (
            <Card key={key} />
          ))} */}
        </div>
      </div>
      <div className="faq container">
        <h2>Frequently asked questions</h2>
        <ul>
          {faq?.map((question) => (
            <li key={question.faq}>{question.faq}</li>
          ))}
        </ul>
      </div>
      <Contact />
      <Footer />
    </>
  )
}

export default Rents
