import React, { useEffect, useState } from 'react'
import './profile.css'
import Sidebar from '../../Components/sidebar/Sidebar'
import Topbar from '../../Components/topbar/Topbar'
import { AddAPhotoRounded, EditOutlined, RemoveOutlined } from '@material-ui/icons'
import Feed from '../../Components/feed/Feed'
import ProfileRightbar from '../../Components/profilerightbar/ProfileRightbar'
import { fetchUser, uploadFile, updateUser, getUserPosts } from '../../Services/api'
import { useParams } from 'react-router-dom'

const Profile = ({ username, currentuser, setUser }) => {

    const [popUpMenu, setpopUpMenu] = useState(false)
    const [coverpopUpMenu, setcoverpopUpMenu] = useState(false)
    const [user, setuser] = useState({})
    const [following, setfollowing] = useState([])
    const [followers, setfollowers] = useState([])

    const [file, setfile] = useState("")
    const [coverfile, setcoverfile] = useState("")
    const [profileUrl, setprofileUrl] = useState("")
    const [coverUrl, setcoverUrl] = useState("")
    const [userId, setuserId] = useState("")

    const [userPosts, setuserPosts] = useState([])
    const [toggle, settoggle] = useState(false)

    const [reload, setreload] = useState(false)

    let params = useParams();

    const getUser = async () => {
        let data = await fetchUser(params.username);
        setuser(data);
        setuserId(data._id);
        settoggle(!toggle)
    }

    const getFollowing = async () => {
        let data = await fetchUser(params.username);
        setfollowing(data.following);
    }

    const getFollowers = async () => {
        let data = await fetchUser(params.username);
        setfollowers(data.followers);
    }

    const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            const image = await uploadFile(data);

            await updateUser(user._id, { "profilePicture": image.data, userId: user._id });

            setprofileUrl(image.data);

            // post.picture = image.data
            // setimageurl(image.data)
        }
    }

    const getCoverImage = async () => {
        if (coverfile) {
            const data = new FormData();
            data.append("name", coverfile.name);
            data.append("file", coverfile);

            const image = await uploadFile(data);

            await updateUser(user._id, { "coverPicture": image.data, userId: user._id });

            setcoverUrl(image.data);

            // post.picture = image.data
            // setimageurl(image.data)
        }
    }

    const fetchUserPosts = async () => {
        let data = await getUserPosts(userId);
        setuserPosts(data);
        console.log(userPosts);
    }

    useEffect(() => {
        getUser();
        console.log(params.username)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getImage();
        // eslint-disable-next-line
    }, [file])

    useEffect(() => {
        getCoverImage();
        // eslint-disable-next-line
    }, [coverfile])

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, [reload])

    useEffect(() => {
        getFollowing()
        // eslint-disable-next-line
    }, [userId, reload])

    useEffect(() => {
        getFollowers()
        // eslint-disable-next-line
    }, [userId, reload])

    useEffect(() => {
        fetchUserPosts();
        // eslint-disable-next-line
    }, [toggle])

    // setTimeout(() => {
    //    fetchUserPosts();
    // }, 1000);

    function PopUpMenu() {
        return (
            <ul className="drop-down">
                <li>
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                        <EditOutlined /> Update
                    </label>
                </li>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setfile(e.target.files[0])}
                />
                <li><RemoveOutlined /> Remove</li>
            </ul>
        );
    }

    function CoverPopUpMenu() {
        return (
            <ul className="drop-down-cover">
                <li>
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                        <EditOutlined /> Update
                    </label>
                </li>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setcoverfile(e.target.files[0])}
                />
                <li><RemoveOutlined /> Remove</li>
            </ul>
        );
    }

    return (
        <>
            <Topbar user={user} currentuser={currentuser} />
            <div hidden>{user._id}</div>
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={coverUrl || user.coverPicture || "/assets/post/3.jpeg"}
                                alt=""
                            />
                            {
                                currentuser._id === user._id ?
                                    <AddAPhotoRounded onClick={() => setcoverpopUpMenu(!coverpopUpMenu)} className="addCoverImgIcon" />
                                    : ""
                            }
                            {coverpopUpMenu && CoverPopUpMenu()}
                            <img
                                className="profileUserImg"
                                src={profileUrl || user.profilePicture || "/assets/person/11.webp"}
                                alt=""
                            />
                            {
                                currentuser._id === user._id ?
                                    <AddAPhotoRounded onClick={() => setpopUpMenu(!popUpMenu)} className="addUserImgIcon" /> :
                                    ""
                            }
                            {popUpMenu && PopUpMenu()}
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed user={user} currentuser={currentuser} posts={userPosts} reload={reload} setreload={setreload} />
                        <ProfileRightbar user={user} username={username} currentuser={currentuser} following={following} followers={followers} userPosts={userPosts} userPostsLength={userPosts && userPosts.length} reload={reload} setreload={setreload} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
