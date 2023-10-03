import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Container, Row, Col, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const AddProducts = () => {
  const navigate = useNavigate();
  const [productTitle, setProductTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [productImg, setProductImg] = useState(null);
  // const addProducts = async(e) => {
  //   e.preventDefault();
  //   // const product = {
  //   //   title: productTitle,
  //   //   shortDesc: shortDesc,
  //   //   description: description,
  //   //   category: category,
  //   //   price: price,
  //   //   imgUrl: productImg
  //   // }
  //   try {
  //     const docRef = await collection(db, 'products');
  //     const storageRef = ref(storage, `productImages/${Date.now() + productImg.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, productImg.name);
  //     uploadTask.on(() =>{
  //       toast.error('images not upload');
  //     }, () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
  //         await addDoc(docRef,  {
  //           title: productTitle,
  //           shortDesc: shortDesc,
  //           description: description,
  //           category: category,
  //           price: price,
  //           imgUrl: downloadURL
  //         })
  //       })
  //     })
  //     toast.success("Product successfully add")
  //   } catch (error) {
  //   }
  // }
  const addProducts = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'products'), {
        productName: productTitle,
        shortDesc: shortDesc,
        description: description,
        category: category,
        price: price,
        imgUrl: '',
      });

      const storageRef = ref(storage, `productImages/${Date.now() + productImg.name}`);

      const uploadTask = uploadBytes(storageRef, productImg);

      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateDoc(docRef, {
          imgUrl: downloadURL,
        });
      });
      toast.success('Product successfully added');
      navigate('/admin/all-products');
    } catch (error) {
      toast.error('Product not added');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5">Add Products</h4>
            <Form onSubmit={addProducts}>
              <FormGroup className="form_group">
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Double sofa"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form_group">
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder="Lorem..."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form_group">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>
              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form_group w-50">
                  <span>Price</span>
                  <input type="number" placeholder="$100" value={price} onChange={(e) => setPrice(e.target.value)} />
                </FormGroup>
                <FormGroup className="form_group w-50">
                  <span>Category</span>
                  <select className="w-100 p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Select Category</option>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className="form_group">
                  <span>Product Image</span>
                  <input type="file" required onChange={(e) => setProductImg(e.target.files[0])} />
                </FormGroup>
              </div>
              <button className="buy_btn">Add Product</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
