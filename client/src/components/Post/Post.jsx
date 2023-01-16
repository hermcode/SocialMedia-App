import React from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import { useState } from 'react'
import NotLike from "../../img/notlike.png";
import { useSelector} from "react-redux";
import { likePost } from "../../api/PostRequest";


const Post = ({ data }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const {user} = useSelector((state)=>state.authReducer.authData)
  const [liked, setLiked]= useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)


  const handleLike = ()=>{
    setLiked((prev)=>!prev)
    likePost(data._id, user._id)
    liked? setLikes((prev)=> prev-1): setLikes((prev) => prev+1)
  }

  return (
    <div className="Post">
      <img src={data.image ? serverPublic+ data.image : ""} alt="PostImage" />
      <div className="postReact">
        <img src={liked? Heart : NotLike} alt="LikeImg" style={{cursor: "pointer"}} onClick={handleLike}/>
        <img src={Comment} alt="CommentImg" />
        <img src={Share} alt="ShareImg" />
      </div>
      <div className="likes">
        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>
      </div>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        &nbsp;
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
