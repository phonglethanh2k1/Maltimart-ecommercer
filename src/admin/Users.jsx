import React from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import useGetdata from '../customHooks/useGetdata';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const Users = () => {
  const { data: userData, loading } = useGetdata('users');
  const handleDeleteUsers = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    toast.success('Delete users success');
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12 mb-3">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Col lg="12" className="overlay">
                    <Spinner color="primary" />
                  </Col>
                ) : (
                  userData.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt={user.displayName} />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDeleteUsers(user.uid)}>
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

export default Users;
