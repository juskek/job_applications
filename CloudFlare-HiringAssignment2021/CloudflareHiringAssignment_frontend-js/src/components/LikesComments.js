import { useState } from "react";
import { postNewPost } from "./Utils";

import IconButton from "./IconButton"
import Comments from "./Comments";
import { MdOutlineThumbUp, MdOutlineComment } from 'react-icons/md'

/**
 * Shows likes and comments for a specific post
 * @param {*} props 
 * @returns 
 */
const LikesComments = (props) => {
    const [showComments, setShowComments] = useState(false)
    const [currentLikes, setLikes] = useState(props.post.likes)
    const [liked, setLiked] = useState(false)

    /**
     * Updates no. of likes shown on UI and updates Cloudflare KV
     * Does not allow user to like more than once per visit
     */
    const handleLikeClick = () => {
        // set liked to true
        setLiked(true)
        // increase likes
        const likes = currentLikes + 1
        setLikes(likes)
        // update KV store
        console.log("Submitting Like: " + JSON.stringify(props.post))
        const newPost = { ...props.post, likes }
        postNewPost(newPost)
    }

    return (
        <div>
            <h2 className='responses'>

                <div>
                    <sub className='postResponses'>{currentLikes}</sub>
                    {liked ? <IconButton color='blue' icon={<MdOutlineThumbUp />} onClick={null} /> 
                    : <IconButton color='black' icon={<MdOutlineThumbUp />} onClick={handleLikeClick} />}
                </div>
                <div>
                    {showComments ? <IconButton color='blue' icon={<MdOutlineComment />} onClick={() => setShowComments(!showComments)} />  
                    : <IconButton color='black' icon={<MdOutlineComment />} onClick={() => setShowComments(!showComments)} /> }
                    
                    <sub className='postResponses'>{props.post.comments.length}</sub>
                    </div>
            </h2>
            <div>{showComments && <Comments onCommentClick={props.onCommentClick} post={props.post}/>}</div>
        </div>

    )
}

export default LikesComments