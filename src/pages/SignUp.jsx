import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase.config';
import { storage, db } from '../firebase.config';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import '../style/login.css';
const SignUp = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              password,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      navigate('/login');
      toast.success('Account created');
    } catch (error) {
      toast.error('some thing went wrong');
    }
  };
  return (
    <Helmet title="SignUp">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <h5 className="text-center fw-bold">Loading...</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className="auth_form" onSubmit={signUp}>
                  <FormGroup className="form_group">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>
                  <button className="buy_btn auth_btn" type="submit">
                    Create an account
                  </button>
                  <p>
                    Already have an account?
                    <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignUp;
