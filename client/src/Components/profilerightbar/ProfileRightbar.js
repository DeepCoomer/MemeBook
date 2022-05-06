import React, { useEffect, useState } from 'react'
import './profilerightbar.css'
import { followUser, updateUser } from '../../Services/api'
import { EditOutlined } from '@material-ui/icons'

const ProfileRightbar = ({ user, username, currentuser, following, followers, userPosts, userPostsLength, reload, setreload }) => {

    let online = [1, 2, 3, 4, 5]

    const [isfollowing, setisfollowing] = useState(false)
    const [postsLength, setpostsLength] = useState("")
    const [popUpMenu, setpopUpMenu] = useState(false)
    const [editinfo, seteditinfo] = useState({ userId: currentuser._id, description: user.description, from: user.from, relationship: user.relationship })
    // const [followersLength, setfollowersLength] = useState(followers.length)
    // const [followingLength, setfollowingLength] = useState(following.length)

    const handleFoll = async () => {
        await followUser(user._id, { "userId": currentuser._id });
        setisfollowing(!isfollowing);
        setreload(!reload)

        // setfollowingLength(isfollowing ? followingLength + 1 : followingLength - 1)
        console.log(isfollowing)
    }

    const getIsFollowing = () => {
        for (let index = 0; index < followers.length; index++) {
            const element = followers[index];
            console.log(element)
            console.log(currentuser._id)
            if (element === currentuser._id) {
                setisfollowing(true);
            }
            else {
                setisfollowing(false);
            }
        }
        console.log(isfollowing)
    }

    useEffect(() => {
        setpostsLength(userPosts.length);
        console.log(postsLength)
        getIsFollowing();
        // eslint-disable-next-line
    }, [])

    setTimeout(() => {
        getIsFollowing();
    }, 1000);

    const handleChange = (e) => {
        seteditinfo({ ...editinfo, [e.target.name]: e.target.value });
    }

    const editUser = async () => {
        await updateUser(currentuser._id, editinfo);
        setreload(!reload);
    }

    function PopUpMenu() {
        return (
            <>
                <div className="editForm">
                    <div className="editFormWrapper">
                        <div className="formbar">
                            <input type="text" name="description" id="" placeholder="Enter Your Bio" className="profileInput" value={editinfo.description} onChange={handleChange} />
                        </div>
                        <div className="formbar">
                            <input type="text" name="from" id="" placeholder="Enter Your City" className="profileInput" value={editinfo.from} onChange={handleChange} />
                        </div>
                        <div className="formbar">
                            <input type="text" name="relationship" id="" placeholder="Enter Your Relationship status" className="profileInput" value={editinfo.relationship} onChange={handleChange} />
                        </div>
                        <div className="buttons">
                            <button className='editButton' onClick={editUser} ><EditOutlined /> Edit</button>
                            <button className='canButton' onClick={() => setpopUpMenu(!popUpMenu)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div hidden>{user._id}</div>
            <div className="profilerightbar">
                <div className="profileRightbarWrapper">
                    <div className="Top">
                        <div className="postsinfo">
                            <p>{userPostsLength}</p>
                            <p>Posts</p>
                        </div>
                        <div className="followersinfo">
                            <p>{followers.length}</p>
                            <p>Followers</p>
                        </div>
                        <div className="followinginfo">
                            <p>{following.length}</p>
                            <p>Following</p>
                        </div>
                    </div>
                    {
                        user.username === currentuser.username ? <button className="profileRightbarButton" onClick={() => setpopUpMenu(!popUpMenu)} >Edit Profile</button> :
                            isfollowing === true ? <button className="profileRightbarButton" onClick={handleFoll}>Following</button>
                                :
                                <button className="profileRightbarButton" onClick={handleFoll}>Follow</button>
                    }
                    {popUpMenu && PopUpMenu()}
                    <div className="Center">
                        <div className="bioinfo">
                            <p>From: {user.from}</p>
                            <p>Relationship: {user.relationship}</p>
                        </div>
                    </div>
                    <hr className="profilerightbarHr" />
                    <div className="Bottom">
                        <p className="online">ONLINE FRIENDS</p>
                        <ul className="profileRightbarOnlineList">
                            {
                                online.map((i) => {
                                    return (
                                        <>
                                            <li className="onlineFriend">
                                                <img className="onlineFriendImg" src="/assets/person/2.jpeg" alt="" />
                                                <span className="onlineFriendName">John Albert</span>
                                            </li>
                                            <li className="onlineFriend">
                                                <img className="onlineFriendImg" src="/assets/person/3.jpeg" alt="" />
                                                <span className="onlineFriendName">Ritika sinha</span>
                                            </li>
                                            <li className="onlineFriend">
                                                <img className="onlineFriendImg" src="/assets/person/4.jpeg" alt="" />
                                                <span className="onlineFriendName">Rahul Patil</span>
                                            </li>
                                            <li className="onlineFriend">
                                                <img className="onlineFriendImg" src="/assets/person/5.jpeg" alt="" />
                                                <span className="onlineFriendName">Devanshi Yadav</span>
                                            </li>
                                            <li className="onlineFriend">
                                                <img className="onlineFriendImg" src="/assets/person/6.jpeg" alt="" />
                                                <span className="onlineFriendName">Sourav Harsora</span>
                                            </li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileRightbar
