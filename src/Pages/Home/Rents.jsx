import React, { useState, useEffect } from 'react'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { BiBuildingHouse, BiUserCircle } from 'react-icons/bi'
import '@splidejs/react-splide/css'
import Card from '../../Components/Card'
import { Link } from 'react-router-dom'
import './scss/rents.scss'
import Contact from '../../Components/Contact'
import Footer from '../../Components/Footer'
import * as firebase from '../../Firebase/firebase'
import {
  collection,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { BsSearch } from 'react-icons/bs'
import logo from '../../assets/logo1.png'
import * as rental from '../../Redux/actions/actions'
import { useSelector } from 'react-redux'

const Rents = () => {
  const newRents = useSelector((state) => state.rentals)
  const faq = useSelector((state) => state.faq)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    // if (newRents?.length > 0) return

    const newSalesRef = query(
      collection(firebase.db, 'properties'),
      where('category', '==', 'rents'),
      orderBy('timeStamp', 'desc'),
      limit(20),
    )
    let propArr = []
    const newRentsUnsubscribe = onSnapshot(newSalesRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        propArr.push(doc.data())
      })
      rental.getRental(propArr)
    })

    return () => newRentsUnsubscribe
  }, [])

  useEffect(() => {
    if (faq?.length > 0) return

    const faqRef = query(collection(firebase.db, 'faq'))
    let propArr = []
    const newFaqUnsubscribe = onSnapshot(faqRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        propArr.push(doc.data())
      })
      rental.getFaq(propArr)
    })

    return () => newFaqUnsubscribe
  }, [])

  return (
    <>
      <div className="nav container">
        <img src={logo} alt="logo" />
        <BiUserCircle size={28} />
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
