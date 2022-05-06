import React, { useState, useEffect } from 'react'
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { createPost, uploadFile } from '../../Services/api';

export default function Share({ currentuser, reload, setreload }) {

    const [file, setfile] = useState("")
    const [url, seturl] = useState("")
    const [postdes, setpostdes] = useState("")

    const cancelShare = () => {
        seturl("")
    }

    const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            const image = await uploadFile(data);

            seturl(image.data);

            // post.picture = image.data
            // setimageurl(image.data)
        }
    }

    const Share = async () => {
        await createPost({ "userId": currentuser._id, "desc": postdes, "img": url });
        seturl("");
        setpostdes("");
        setreload(!reload);
    }

    useEffect(() => {
        getImage();
        // eslint-disable-next-line
    }, [file])

    return (
        <div className={!url ? "share" : "shareWhenImage"}>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={currentuser.profilePicture || "/assets/person/11.webp"} alt="" />
                    <input
                        value={postdes}
                        onChange={(e) => setpostdes(e.target.value)}
                        placeholder="What's in your mind?"
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />
                <img src={url} alt="" className={!url ? "" : "postImage"} />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <label htmlFor="fileInput">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => setfile(e.target.files[0])}
                            />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    {
                        url ?
                            <>
                                <button className="cancelButton" onClick={cancelShare} >Cancel</button>
                                <button className="shareButton" onClick={Share}>Share</button>
                            </>
                            :
                            <button className="shareButton" onClick={Share}>Share</button>
                    }
                </div>
            </div>
        </div>
    );
}
