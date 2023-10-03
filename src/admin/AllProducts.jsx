import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import useGetdata from '../customHooks/useGetdata';
import { toast } from 'react-toastify';
const AllProducts = () => {
  const { data: productsData, loading } = useGetdata('products');
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Delete product success');
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Col lg="12" className="overlay">
                    <Spinner color="primary" />
                  </Col>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt={item.title} />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
