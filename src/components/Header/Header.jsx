import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { Container, Row } from 'reactstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../../customHooks/useAuth';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
const nav_link = [
  {
    path: 'home',
    display: 'Home',
  },
  {
    path: 'shop',
    display: 'Shop',
  },
  {
    path: 'cart',
    display: 'Cart',
  },
];
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const profileActionRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const menuRef = useRef(null);
  const { currentUser } = useAuth();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });
  const menuToggle = () => {
    return menuRef.current.classList.toggle('active_menu');
  };
  const navigateCart = () => {
    navigate('/cart');
  };
  const toggleProfileActions = () => {
    return profileActionRef.current.classList.toggle('show_profileActions');
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Success logout');
        navigate('/home');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <header className={`header ${scrolled ? 'sticky_header' : ''}`}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_link.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink to={item.path} className={(navClass) => (navClass.isActive ? 'nav_active' : '')}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_icons">
              <span className="fav_icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart_icon" onClick={navigateCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  onClick={toggleProfileActions}
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="user"
                />
                <div className="profile_actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column ">
                      <Link to="/signup">SignUp</Link>
                      <Link to="/login">SignIn</Link>
                      <Link to="/admin">Admin</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
