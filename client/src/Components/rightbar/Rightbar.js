import React from 'react'
import './rightbar.css'
import { Add } from '@material-ui/icons'

const Rightbar = () => {

    const followers = [1, 2, 3, 4, 5]

    return (
        <>
            <div className="rightbar">
                <div className="rightbarWrapper">
                    <div className="Wrapper">
                        <p className="stories">STORIES</p>
                        <ul className="storiesList">
                            <li className="storiesFriend">
                                <Add className="addIcon" />
                                <span className="storiesFriendName">Create Your Story</span>
                            </li>
                            <li className="storiesFriend">
                                <img className="storiesFriendImg" src="/assets/person/2.jpeg" alt="" />
                                <span className="storiesFriendName">John Albert</span>
                            </li>
                            <li className="storiesFriend">
                                <img className="storiesFriendImg" src="/assets/person/3.jpeg" alt="" />
                                <span className="storiesFriendName">Ritika sinha</span>
                            </li>
                            <li className="storiesFriend">
                                <img className="storiesFriendImg" src="/assets/person/4.jpeg" alt="" />
                                <span className="storiesFriendName">Rahul Patil</span>
                            </li>
                        </ul>
                    </div>
                    <hr className="rightbarHr" />
                    <div className="Wrapper">
                        <p className="followers">WHO FOLLOWS YOU</p>
                        <ul className="rightbarFollowersList">
                            {
                                followers.map((i) => {
                                    return (
                                        <>
                                            <div key={i}>
                                                <li className="storiesFriend">
                                                    <img className="storiesFriendImg" src="/assets/person/2.jpeg" alt="" />
                                                    <span className="storiesFriendName">John Albert</span>
                                                </li>
                                                <li className="storiesFriend">
                                                    <img className="storiesFriendImg" src="/assets/person/3.jpeg" alt="" />
                                                    <span className="storiesFriendName">Ritika sinha</span>
                                                </li>
                                                <li className="storiesFriend">
                                                    <img className="storiesFriendImg" src="/assets/person/4.jpeg" alt="" />
                                                    <span className="storiesFriendName">Rahul Patil</span>
                                                </li>
                                                <li className="storiesFriend">
                                                    <img className="storiesFriendImg" src="/assets/person/5.jpeg" alt="" />
                                                    <span className="storiesFriendName">Devanshi Yadav</span>
                                                </li>
                                                <li className="storiesFriend">
                                                    <img className="storiesFriendImg" src="/assets/person/6.jpeg" alt="" />
                                                    <span className="storiesFriendName">Sourav Harsora</span>
                                                </li>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            <button className="rightbarButton">Show More</button>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rightbar
