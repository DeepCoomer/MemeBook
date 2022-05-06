import React, { useEffect, useState } from 'react'
import { MoreVert, FavoriteBorderOutlined, FavoriteOutlined, DeleteOutlined } from "@material-ui/icons";
import { userUsingId, likeAPost, postAComment, getAllComments, deleteAPost } from '../../Services/api';
import { Link } from 'react-router-dom';
import './post.css'

const Post = ({ post, currentuser, reload, setreload }) => {

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setuser] = useState({})
    const [comment, setcomment] = useState("")
    const [comments, setcomments] = useState([])
    const [reloadcomments, setreloadcomments] = useState(false)
    const [profilePicture, setprofilePicture] = useState("")
    const [popUpMenu, setpopUpMenu] = useState(false)

    const getComments = async () => {
        let data = await getAllComments(post._id);
        setcomments(data);
        console.log(comments);
    }

    const shareComment = async () => {
        let data = await postAComment({ name: currentuser.username, profilePicture: profilePicture, userId: currentuser._id, postId: post._id, comment: comment });
        console.log(data);
        setcomment("");
        setreloadcomments(!reloadcomments);
    }

    const likeHandler = async () => {
        await likeAPost(post._id, { "userId": currentuser._id })
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    const getUser = async () => {
        let data = await userUsingId(post.userId);
        setuser(data);
        setprofilePicture(data.profilePicture);
    }

    const currentUserLiked = () => {
        for (let index = 0; index < post.likes.length; index++) {
            const element = post.likes[index];
            if (element === currentuser._id) {
                setIsLiked(true);
            }
        }
    }

    const deletePost = async () => {
        await deleteAPost(post._id, currentuser._id);
        setreload(!reload);
    }

    function deletePopUpMenu() {
        return (
            <ul className="delete-drop-down" onClick={deletePost} >
                <li >
                    <DeleteOutlined /> Delete
                </li>
            </ul>
        );
    }

    useEffect(() => {
        getUser();
        currentUserLiked();
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        getComments();
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        getComments();
        // eslint-disable-next-line 
    }, [reloadcomments])

    return (
        <>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to={`/profile/${user.username}`} className="profilelink" >
                                <img
                                    className="postProfileImg"
                                    src={user.profilePicture || "/assets/person/11.webp"}
                                    alt=""
                                />
                            </Link>
                            <span className="postUsername">
                                {user.username}
                            </span>
                            <span className="postDate">{new Date(post.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="postTopRight">
                            <MoreVert style={{ cursor: 'pointer' }} onClick={() => setpopUpMenu(!popUpMenu)} className={popUpMenu ? 'verticon' : ""} />
                        </div>
                        {currentuser._id === user._id ? popUpMenu && deletePopUpMenu() : ""}
                    </div>
                    <div className="postCenter">
                        <span className="postText">{post.desc}</span>
                        <img className="postImg" src={post.img} alt="" />
                    </div>
                    <div className="postBottom">
                        <div className="postBottomLeft">
                            {
                                !isLiked ? <FavoriteBorderOutlined className="likeIcon" htmlColor='red' onClick={likeHandler} alt="" />
                                    :
                                    <FavoriteOutlined className="likeIcon" htmlColor='red' onClick={likeHandler} alt="" />
                            }
                            <span className="postLikeCounter">{like} people like it</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">{comments.length} comments</span>
                        </div>
                    </div>
                    <div className="CommentSection">
                        <img src={currentuser.profilePicture || "/assets/person/11.webp"} alt="" className="postProfileImg" />
                        <input type="text" name="" id="" placeholder="Write Your Comment" className="commentInput" value={comment} onChange={(e) => setcomment(e.target.value)} />
                        <button className="commentButton" onClick={shareComment} >POST</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post
