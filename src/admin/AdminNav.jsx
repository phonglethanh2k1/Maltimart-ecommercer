import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';
import '../style/admin-nav.css';

const menuAdmin = [
  {
    display: 'Dashboard',
    path: '/admin',
  },
  {
    display: 'All-Products',
    path: '/admin/all-products',
  },
  {
    display: 'Orders',
    path: '/admin/orders',
  },
  {
    display: 'Users',
    path: '/admin/users',
  },
];
const AdminNav = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <header className="admin_header">
        <div className="admin_nav-top">
          <Container>
            <Row>
              <Col>
                <div className="admin_nav-wrapper-top">
                  <div className="logo">
                    <h2>Mutilmart</h2>
                  </div>
                  <div className="search_box">
                    <input type="text" placeholder="Search..." />
                    <span>
                      <i class="ri-search-line"></i>
                    </span>
                  </div>
                  <div className="admin_nav-top-right">
                    <span>
                      <i class="ri-notification-line"></i>
                    </span>
                    <span>
                      <i class="ri-settings-2-line"></i>
                    </span>
                    <img src={currentUser && currentUser.photoURL} alt="" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <section className="admin_menu p-0">
        <Container>
          <Row>
            <div className="admin_navigate">
              <ul className="admin_menu-list">
                {menuAdmin.map((item, index) => (
                  <li className="admin_menu-item" key={index}>
                    <NavLink to={item.path} className={(navClass) => (navClass.isActive ? 'active_admin-menu' : '')}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
