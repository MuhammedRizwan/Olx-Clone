import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/FirebaseContext';


function View() {
  const [userDetials,setUserDetials]=useState()
  const {postDetials}=useContext(PostContext)
  const {firebase}=useContext(FirebaseContext)
  console.log('post:' ,postDetials);
  useEffect(()=>{
    const{userId}=postDetials
    firebase.firestore().collection('users').where('id','==',userId).get().then(res=>{
      res.forEach(doc => {
        setUserDetials(doc.data())
      });
    })
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetials.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetials.price}</p>
          <span>{postDetials.name}</span>
          <p>{postDetials.category}</p>
          <span>{postDetials.createdAt}</span>
        </div>
       {userDetials && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetials.username}</p>
          <p>{userDetials.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
