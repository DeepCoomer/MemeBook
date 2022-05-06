import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import Sidebar from '../../Components/sidebar/Sidebar'
import Topbar from '../../Components/topbar/Topbar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'
import { getAllPosts } from '../../Services/api'

const Home = ({ user, getUser, toggle }) => {

    let navigate = useNavigate();

    const [posts, setposts] = useState([]);
    const [reload, setreload] = useState(false);

    useEffect(() => {
        getUser();
        // eslint-disable-next-line 
    }, [])

    const fetchAllPosts = async () => {
        let data = await getAllPosts(user._id);
        setposts(data);
        console.log(posts);
    }

    useEffect(() => {
        fetchAllPosts();
        // eslint-disable-next-line 
    }, [toggle])

    useEffect(() => {
        fetchAllPosts();
        // eslint-disable-next-line 
    }, [reload])


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/accounts/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Topbar currentuser={user} />
            <div className="homeContainer">
                <Sidebar />
                <Feed user={user} currentuser={user} posts={posts} reload={reload} setreload={setreload} />
                <Rightbar />
            </div>
        </>
    )
}

export default Home
