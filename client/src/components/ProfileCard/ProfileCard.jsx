import React from 'react'
import Cover from '../../img/cover.png'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const ProfilePage = false
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + 'defaultCover.jpg'
          }
          alt="Cover"
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + 'defaultProfile.png'
          }
          alt="ProfilePhoto"
        />
      </div>

      <div className="ProfileData">
        <span>
          {user.firstName} {user.lastName}
        </span>
        <span>{user.worksAt ? user.worksAt : 'FrontEnd Developer'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                <span>Post</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage' ? (
        ''
      ) : (
        <span>
          <Link style={{textDecoration: "none", color: "inherit"}} to={`/profile/${user._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard
