import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import useGetdata from '../customHooks/useGetdata';
import heroImg from '../assets/images/hero-img.png';
import '../style/home.css';
import Services from '../services/Services';
import Clock from '../components/Ui/Clock';
import ProductsList from '../components/Ui/ProductsList';
// import products from '../assets/data/products';
import counterImg from '../assets/images/counter-timer-img.png';

const Home = () => {
  const { data: products, loading } = useGetdata('products');
  const year = new Date().getFullYear();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    const filterdTrendingProducts = products.filter((item) => item.category === 'chair');
    const filterdBestSalesProducts = products.filter((item) => item.category === 'sofa');
    const filterdMobileProducts = products.filter((item) => item.category === 'mobile');
    const filterdWirelessProducts = products.filter((item) => item.category === 'wireless');
    const filterdPopularProducts = products.filter((item) => item.category === 'watch');
    setTrendingProducts(filterdTrendingProducts);
    setBestSalesProducts(filterdBestSalesProducts);
    setMobileProducts(filterdMobileProducts);
    setWirelessProducts(filterdWirelessProducts);
    setPopularProducts(filterdPopularProducts);
  }, [products]);
  return (
    <div>
      <Helmet title={'Home'}>
        <section className="hero_section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero_content">
                  <p className="hero_subtitle">Trending product in {year}</p>
                  <h2 className="">Mark Your Interior More Minimalist & Modern</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat nulla repellat quo eaque alias
                    corporis sunt, facilis nesciunt rem fugit!
                  </p>
                  <motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
                    <Link to="/shop">SHOP NOW</Link>
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero_img">
                  <img src={heroImg} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Services />
        <section className="trending_products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section_title">Trending Products</h2>
              </Col>
              {loading ? <h5 className="fw-bold">Loading...</h5> : <ProductsList data={trendingProducts} />}
            </Row>
          </Container>
        </section>
        <section className="best_sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section_title">Best Sales</h2>
              </Col>
              {loading ? <h5 className="fw-bold">Loading...</h5> : <ProductsList data={bestSalesProducts} />}
            </Row>
          </Container>
        </section>
        <section className="timer_count">
          <Container>
            <Row>
              <Col lg="6" md="12" className="count_down-col">
                <div className="clock_top-content">
                  <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                  <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
                </div>
                <Clock />
                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn stote_btn">
                  <Link to="/shop">Visit Store</Link>
                </motion.button>
              </Col>
              <Col lg="6" md="12" className="text-end couter_img">
                <img src={counterImg} alt="" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="new_arrivals">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section_title">New Arrivals</h2>
              </Col>
              {loading ? <h5 className="fw-bold">Loading...</h5> : <ProductsList data={mobileProducts} />}
              {loading ? <h5 className="fw-blod">Loading</h5> : <ProductsList data={wirelessProducts} />}
            </Row>
          </Container>
        </section>
        <section className="popular_category">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section_title">Popular in Category</h2>
              </Col>
              {loading ? <h5 className="fw-bold">Loading...</h5> : <ProductsList data={popularProducts} />}
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default Home;
