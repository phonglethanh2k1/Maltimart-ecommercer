import React from 'react';
import '../style/cart.css';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/Ui/CommonSection';
import { Link } from 'react-router-dom';

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price * item.quantity}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i whileTap={{ scale: 1.7 }} class="ri-delete-bin-line" onClick={deleteProduct}></motion.i>
      </td>
    </tr>
  );
};
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h1>No Cart added to the cart</h1>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <motion.th whileTap={{ scale: 1.2 }}>Delete</motion.th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">taxes and shipping will calculates in checkout</p>
              <div>
                <button className="buy_btn w-100">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
                <button className="buy_btn w-100 mt-3">
                  <Link to="/checkout">Checkout</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
