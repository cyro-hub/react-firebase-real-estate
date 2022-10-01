import React, { useEffect, useState } from 'react'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import Card from '../../Components/Card'
import { Link, useNavigate } from 'react-router-dom'
import './scss/rents.scss'
import Contact from '../../Components/Contact'
import Footer from '../../Components/Footer'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../custom hooks/useFetch'
import useFetchFaq from '../../custom hooks/useFetchFaq'
import Nav from '../../Components/Nav'
import TrendingCard from '../../Components/TrendingCard'
import * as action from '../../Redux/actions/actions'

const Rents = () => {
  useFetch('rents')
  useFetchFaq()
  const navigate = useNavigate()
  const newRents = useSelector((state) => state.rentals)
  const trending = useSelector((state) => state.rentalsTrending)
  const faq = useSelector((state) => state.faq)
  const [isTyping, setIsTyping] = useState(true)
  const [search, setSearch] = useState('')

  // useEffect(() => {
  //   action.getRental(newRents.filter())
  // }, [search])

  return (
    <>
      <Nav />
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

        <button className="btn">
          <a href="#property">Discover</a>
        </button>
      </div>
      <div className="welcome"></div>
      <div className="properties container" id="property">
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              name="search"
              onInput={() => setIsTyping(false)}
              onBlur={() => setIsTyping(true)}
              onChange={(e) => {
                // localStorage.setItem('search', JSON.stringify(e.target.value))
                setSearch(e.target.value)
              }}
              value={search}
              placeholder="property"
              autoComplete="off"
            />
            {isTyping && <BsSearch size={20} />}
          </div>
        </div>
        <div className="new-properties">
          {newRents
            ?.filter((property) =>
              property.property_type
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()),
            )
            .map((property) => (
              <Card key={property.key} property={property} />
            ))}
        </div>
        <h2 className="trending_header">
          Trending Areas <TbBrandGoogleAnalytics size={28} />
        </h2>
        <div className="trending-property">
          {trending?.map((property) => (
            <TrendingCard key={property.key} property={property} />
          ))}
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
