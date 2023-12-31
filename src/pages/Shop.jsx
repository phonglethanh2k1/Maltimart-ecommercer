import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/Ui/CommonSection';
import Helmet from '../components/Helmet/Helmet';
// import products from '../assets/data/products';
import ProductsList from '../components/Ui/ProductsList';
import useGetdata from '../customHooks/useGetdata';
import '../style/shop.css';
const Shop = () => {
  const { data: products } = useGetdata('products');
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === 'sofa') {
      const filterProducts = products.filter((item) => item.category === 'sofa');
      setProductsData(filterProducts);
    }
    if (filterValue === 'mobile') {
      const filterProducts = products.filter((item) => item.category === 'mobile');
      setProductsData(filterProducts);
    }
    if (filterValue === 'chair') {
      const filterProducts = products.filter((item) => item.category === 'chair');
      setProductsData(filterProducts);
    }
    if (filterValue === 'watch') {
      const filterProducts = products.filter((item) => item.category === 'watch');
      setProductsData(filterProducts);
    }
    if (filterValue === 'wireless') {
      const filterProducts = products.filter((item) => item.category === 'wireless');
      setProductsData(filterProducts);
    }
  };
  const handleSearch = (e) => {
    const search = e.target.value;
    const searchProducts = products.filter((item) =>
      item.productName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setProductsData(searchProducts);
  };
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter_widget">
                <select>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search_box">
                <input type="text" placeholder="Search..." onChange={handleSearch} />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>{productsData.length === 0 ? <h1>No product are found!</h1> : <ProductsList data={productsData} />}</Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
