import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../style/admin.css';
import useGetData from '../customHooks/useGetdata';
const Admin = () => {
  const { data: products } = useGetData('products');
  const { data: users } = useGetData('users');
  return (
    <section>
      <Container>
        <Row>
          <Col lg="3">
            <div className="revenue_box">
              <h5>Total Sales</h5>
              <span>$7890</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="orders_box">
              <h5>Orders</h5>
              <span>$789</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="products_box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="users_box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Admin;
