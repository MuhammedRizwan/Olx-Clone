import React, { useContext, useState } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../Store/FirebaseContext";
import { useNavigate } from "react-router-dom";
import {
  usernameValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  truncate,
} from "../../Validation/validation";
import swal from "sweetalert";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameError = usernameValidation(username);
    const emailError = emailValidation(email);
    const phoneError = phoneValidation(phone);
    const passwordError = passwordValidation(password);
    if (usernameError || emailError || phoneError || passwordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        phone: phoneError,
        password: passwordError,
      });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        swal(`${err.code}!`, `${err.message}!`, "error");
      })
      .then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              username: username,
              phone: phone,
              email: email,
            })
            .then(() => {
              swal("success!", "user registered successfully!", "success");
              navigate("/login");
            });
        });
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="250px" height="250px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({
                ...errors,
                username: usernameValidation(e.target.value),
              });
            }}
            value={username}
            style={{
              borderBottomColor: errors.username ? "red" : "black",
            }}
          />
          {errors.username && (
            <p className="errorMessage">{truncate(errors.username)}</p>
          )}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({
                ...errors,
                email: emailValidation(e.target.value),
              });
            }}
            style={{
              borderBottomColor: errors.email ? "red" : "black",
            }}
          />
          {errors.email && (
            <p className="errorMessage">{truncate(errors.email)}</p>
          )}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors({ ...errors, phone: phoneValidation(e.target.value) });
            }}
            style={{
              borderBottomColor: errors.phone ? "red" : "black",
            }}
          />
          {errors.phone && (
            <p className="errorMessage">{truncate(errors.phone)}</p>
          )}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({
                ...errors,
                password: passwordValidation(e.target.value),
              });
            }}
            style={{
              borderBottomColor: errors.password ? "red" : "black",
            }}
          />
          {errors.password && (
            <p className="errorMessage">{truncate(errors.password)}</p>
          )}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
}
