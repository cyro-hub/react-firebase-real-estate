import React, { useState, useEffect } from "react";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import Card from "../../Components/Card";
import TrendingCard from "../../Components/TrendingCard";
import { Link, useNavigate } from "react-router-dom";
import "./scss/rents.scss";
import Contact from "../../Components/Contact";
import Footer from "../../Components/Footer";
import { BsSearch } from "react-icons/bs";
import useFetch from "../../custom hooks/useFetch";
import useFetchFaq from "../../custom hooks/useFetchFaq";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../../Components/Nav";
import Skeleton from "@mui/material/Skeleton";

const Sales = () => {
  useFetch("sales");
  useFetchFaq();
  const navigate = useNavigate();
  const newSales = useSelector((state) => state.sales);
  const [sales, setSales] = useState(newSales);
  const trending = useSelector((state) => state.salesTrending);
  const faq = useSelector((state) => state.faq);
  const [isTyping, setIsTyping] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setSales(
          newSales?.filter((property) =>
            property.property_type
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
          )
        );
      } else {
        setSales(newSales);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <Nav />
      <div className="welcome-cover">
        <div className="home-nav">
          <Link to="/rent">RENT</Link>
          <Link className="rent" to="/sale">
            SALE
          </Link>
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
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="property"
              autoComplete="off"
            />
            {isTyping && <BsSearch size={20} />}
          </div>
        </div>
        <div className="new-properties">
          {newSales ? (
            <>
              {(sales || newSales)?.map((property) => (
                <Card key={property.key} property={property} />
              ))}
            </>
          ) : (
            <>
              {new Array(4).fill("").map((item) => (
                <Skeleton
                  variant="rounded"
                  width={250}
                  height={300}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    marginInline: "1em",
                  }}
                />
              ))}
            </>
          )}
        </div>
        <h2 className="trending_header">
          Trending Areas <TbBrandGoogleAnalytics size={28} />
        </h2>
        <div className="trending-property">
          {trending ? (
            <>
              {trending?.map((property) => (
                <TrendingCard key={property.key} property={property} />
              ))}
            </>
          ) : (
            <>
              {new Array(4).fill("").map((item) => (
                <Skeleton
                  variant="rounded"
                  width={250}
                  height={300}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    marginInline: "1em",
                  }}
                />
              ))}
            </>
          )}
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
  );
};

export default Sales;
