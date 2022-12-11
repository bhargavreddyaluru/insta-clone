import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const UserStory = props => {
  const {details, isUser} = props
  return (
    <li className="user-story-item">
      <img
        src={details.image}
        alt={isUser ? 'user story' : 'my story'}
        className="user-profile-story"
      />
    </li>
  )
}

const UserPost = props => {
  const {details, isUser} = props
  return (
    <li className="user-post-item">
      <img
        src={details.image}
        alt={isUser ? 'user post' : 'my post'}
        className="user-post-pic"
      />
    </li>
  )
}

const ProfileComponent = props => {
  const {details, isUser} = props
  const {
    profilePic,
    userName,
    followersCount,
    postsCount,
    followingCount,
    userId,
    userBio,
    stories,
    posts,
  } = details
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profilePic}
          alt={isUser ? 'user profile' : 'my profile'}
          className="profile-pic"
        />
        <div className="profile-details-container">
          <h1 className="profile-heading">{userName}</h1>
          <div className="followers-posts-container">
            <p className="posts-count">{postsCount} posts</p>
            <p className="posts-count">{followersCount} followers</p>
            <p className="posts-count">{followingCount} following</p>
          </div>
          <p className="user-profile-id">{userId}</p>
          <p className="user-profile-bio">{userBio}</p>
        </div>
      </div>
      <ul className="user-stories-list">
        {stories.map(item => (
          <UserStory details={item} key={item.id} isUser={isUser} />
        ))}
      </ul>
      <hr className="profile-line" />
      <div className="user-posts-container">
        <div className="user-posts-header">
          <BsGrid3X3 />
          <h1 className="user-posts-heading">Posts</h1>
        </div>
        {posts.length === 0 ? (
          <div className="no-posts-container">
            <div className="no-posts-img">
              <BiCamera />
            </div>
            <h1 className="no-posts-heading">No Posts Yet</h1>
          </div>
        ) : (
          <ul className="user-posts-list">
            {posts.map(item => (
              <UserPost details={item} key={item.id} isUser={isUser} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProfileComponent
