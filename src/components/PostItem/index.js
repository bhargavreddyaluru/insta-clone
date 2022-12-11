import {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const CommentItem = props => {
  const {details} = props
  return (
    <li className="">
      <p className="comment-item">
        {<span className="commented-user">{details.user_name}</span>}
        {` ${details.comment}`}
      </p>
    </li>
  )
}

const PostItem = props => {
  const {details} = props
  const {
    userId,
    postId,
    userName,
    profilePic,
    postDetails,
    comments,
    likesCount,
    createdAt,
  } = details

  const [likeStatus, setLikeStatus] = useState(true)
  const [likes, setLikes] = useState(likesCount)
  const jwtToken = Cookies.get('jwt_token')

  const onClickLike = async () => {
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const request = {like_status: likeStatus}
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(request),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setLikeStatus(prevState => !prevState)
    if (likeStatus) {
      setLikes(prevState => prevState + 1)
    } else {
      setLikes(prevState => prevState - 1)
    }
  }

  const renderLikeShare = () => (
    <div className="buttons-container">
      {likeStatus ? (
        <button
          type="button"
          className="button like-button"
          onClick={onClickLike}
        >
          <BsHeart />
        </button>
      ) : (
        <button
          type="button"
          className="button dis-like-button"
          onClick={onClickLike}
        >
          <FcLike />
        </button>
      )}
      <button type="button" className="button">
        <FaRegComment />
      </button>
      <button type="button" className="button ">
        <BiShareAlt />
      </button>
    </div>
  )

  const renderLikesCountCaption = () => (
    <div className="likes-caption-container">
      <p className="likes-count">{likes} likes</p>
      <p className="caption">{postDetails.caption}</p>
      <ul className="comments-list">
        {comments.map(item => (
          <CommentItem key={item.user_id} details={item} />
        ))}
      </ul>
      <p className="post-created-at">{createdAt}</p>
    </div>
  )

  return (
    <li className="post-list-item">
      <div className="username-container">
        <div className="user-icon-container">
          <img
            src={profilePic}
            alt="post author profile"
            className="user-icon"
          />
        </div>
        <Link to={`/users/${userId}`} className="username-link-text">
          <p className="post-username">{userName}</p>
        </Link>
      </div>
      <img src={postDetails.image_url} alt="post" className="post-pic" />
      <div className="post-bottom-container">
        {renderLikeShare()}
        {renderLikesCountCaption()}
      </div>
    </li>
  )
}

export default PostItem
