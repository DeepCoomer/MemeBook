import React from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'

const Feed = ({ user, currentuser, posts, reload, setreload }) => {

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {
            user._id !== currentuser._id ? "" :
              <Share currentuser={currentuser} reload={reload} setreload={setreload} />
          }
          {
            posts && posts.map((post) => {
              return (
                <Post key={post._id} post={post} currentuser={currentuser} reload={reload} setreload={setreload} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Feed