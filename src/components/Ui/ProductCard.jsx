import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../../style/product-card.css';
import { cartActions } from '../../redux/slices/cartSlice';
const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );
    toast.success('Product add success');
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product_item">
        <div className="product_img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </div>
        <div className="py-2 product_info">
          <h3 className="product_name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span className="">{item.category}</span>
        </div>
        <div className="product_card-bottom d-flex align-item-center justify-content-between">
          <span className="price">{item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i class="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
