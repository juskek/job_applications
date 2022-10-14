import NewComment from "./NewComment"
/**
 * Shows comments for a specific post
 * @param {*} props 
 * @returns 
 */
const Comments = (props) => {
    return (
        <div className='container'>
            <h3>Comments</h3>
            {props.post.comments.length === 0 ? <p>There are no comments yet. Leave one below!</p>
            : props.post.comments.map((comment) => {
                return (
                    <div className="comment" key={comment.id}>
                        <div className='details'>{comment.author}</div>
                        <p>{comment.text}</p>
                    </div>
                )
            })}
            <NewComment post={props.post} onCommentClick={props.onCommentClick}/>
        </div>
    )
}

export default Comments