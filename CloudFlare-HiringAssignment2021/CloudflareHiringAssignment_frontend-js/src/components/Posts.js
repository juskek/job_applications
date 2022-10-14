import Button from "./Button";
import NewPost from "./NewPost";
import LikesComments from "./LikesComments";
import { getPosts, postNewPost, sortArrayChronologically} from "./Utils";
import React, { useEffect, useState } from "react";

/**
 * Home page of app
 * @returns 
 */
const Posts = () => {
    const [showNewPost, setShowNewPost] = useState(false)
    const [posts, setPosts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    
    const dateFormat = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "GMT",
        timeZoneName: "short"
      }
    /**
     * Gets posts from Cloudflare KV and sets state to refresh feed
     */
    const getSetPosts = async () => {
        const postsResp = await getPosts()
        if (postsResp === "No keys in POSTS_KV" || postsResp === null) {
            setPosts([])
        } else {
            setPosts(sortArrayChronologically(postsResp))
        }
    }

    /**
     * Fetches posts in background from Cloudflare KV when site starts
     */
    useEffect(() => {
        getSetPosts()
    }, []);

    /**
     * Refreshes feed 
     */
    const handleRefreshClick = () => {
        console.log("Refresh Clicked.")
        setRefreshing(true)
        
        setTimeout(() => {
            // fetch posts on clicking refresh
            getSetPosts()
            setRefreshing(false)
            return
        }, 3000);
    }

    /**
     * Submits new post to Cloudflare KV 
     * @param {*} post 
     */
    const handleSubmit = (post) => {
        const id = Math.floor(Math.random() * 100000) + 1
        const published_at = new Date()
        const likes = 0
        const comments = []
        const newPost = { id, ...post, published_at, likes, comments }
        console.log("Submitting Post: " + JSON.stringify(newPost))


        postNewPost(newPost)
        submitRefreshTimeout()
    }

    /**
     * Submits new comment for a specific post to Cloudflare KV
     * @param {*} param0 
     * @param {*} post 
     */
    const handleComment = ({author,text},post) => {
        const id = Math.floor(Math.random() * 1000) + 1
        const comments = [...post.comments,{id,text,author}]
        const newPost = { ...post, comments }
        console.log("Submitting Post: " + JSON.stringify(newPost))

        postNewPost(newPost)
        setTimeout(() => getSetPosts(), 15000);
    }

    /**
     * Timeout to refresh feed since it takes a while for KV to update (eventual consistency)
     */
    const submitRefreshTimeout = () => {
        setSubmitting(true)
        setTimeout(() => {
            getSetPosts()
            setSubmitting(false)
            return
        }, 15000);
    }

    // RENDER
    return (
        <div className="container">
            <header className='header'>
                <h1>Cloudflare Blog</h1>
                <Button className='btn' color={showNewPost ? "red" : "green"} text={showNewPost ? "Cancel" : "New Post"} onClick={() => setShowNewPost(!showNewPost)} />
            </header>

            {showNewPost && <NewPost onSubmitClick={handleSubmit} />}
            {refreshing ? <Button className='btn btn-block' color='orange' text='Refreshing...' onClick={null} /> 
            : <Button className='btn btn-block' color='black' text='Refresh Feed' onClick={handleRefreshClick} />}
            {submitting && <div className='post'><h1>Submitting Post...</h1></div>}
            {posts.length === 0 ? <div className="post" key="0"> <h2>No posts found. Create a new one!</h2>
            </div> : posts.map((post) => {
                post = JSON.parse(post)
                return (
                    <div className="post" key={post.id}>
                        <h2>
                            {post.title}
                        </h2>
                        <p>{post.text}</p>
                        <div className='details'>
                            <div>Posted {(new Date(post.published_at)).toLocaleString("en-GB", dateFormat)}</div> <div>By {post.author}</div>
                            
                        </div>
                        <LikesComments onCommentClick={handleComment} post={post} />
                    </div>
                )
            }
            )}
        </div>
    );
};

export default Posts;