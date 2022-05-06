import { Search, PersonAddOutlined, ChatOutlined, NotificationsOutlined, ArrowDropDownOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './topbar.css'

const Topbar = ({ user, currentuser }) => {

    const [popUpMenu, setpopUpMenu] = useState(false)
    const [search, setsearch] = useState("")

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/accounts/login')
        // setUser({})
    }

    function PopUpMenu() {
        return (
            <ul className="drop">
                <li>
                    <Link to="/accounts/login" className='link' onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        );
    }

    const searchUser = async () => {
        navigate(`/profile/${search}`)
    }

    return (
        <>
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/" className="link">
                        <span className="logo">MemeBook</span>
                    </Link>
                </div>
                <div className="topbarCenter">
                    <div className="searchbar">
                        <input type="text" name="" id="" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search for friend , post or video" className="searchInput" />
                        <Search className="searchIcon" onClick={searchUser} />
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <PersonAddOutlined />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <ChatOutlined />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItem">
                            <NotificationsOutlined />
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <Link to={`/profile/${currentuser.username}`} className="link"><img src={currentuser.profilePicture || "/assets/person/11.webp"} alt="" className="topbarImg" /></Link>
                    <span className={!popUpMenu ? "username" : "onPopUpusername"}>{currentuser.username}</span>
                    <span className={!popUpMenu ? "dropIcon" : "onPopUpdropIcon"} onClick={() => setpopUpMenu(!popUpMenu)} ><ArrowDropDownOutlined /></span>
                    {popUpMenu && PopUpMenu()}
                </div>
            </div>
        </>
    )
}

export default Topbar
