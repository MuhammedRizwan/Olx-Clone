import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../Store/FirebaseContext";
import { useNavigate } from "react-router-dom";
import {
  productNameAndCategoryValidation,
  truncate,
} from "../../Validation/validation";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const date = new Date();
  const navigate = useNavigate();
  const handleSubmit = () => {
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection("products").add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toString(),
          });
          navigate("/");
        });
      });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => {
              setName(e.target.value);
              setErrors({
                ...errors,
                name: productNameAndCategoryValidation(e.target.value)
              });
            }}
            style={{ borderBottomColor: errors.name ? "red" : "black" }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
