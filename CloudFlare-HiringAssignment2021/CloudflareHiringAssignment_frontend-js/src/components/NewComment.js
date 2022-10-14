import {useState} from 'react'
import Button from "./Button"

/**
 * Shows form for adding new comment 
 * @param {*} props 
 * @returns 
 */
const NewComment = (props) => {
    const [commenting, setCommenting] = useState(false)
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')

    /**
     * Checks if comment fields are filled, and then posts new comment to Cloudflare KV
     * Refreshes the feed after timeout to show new comment
     * @returns 
     */
    const onCommentClick = () => {
        console.log("Add Comment Clicked")
        if (!text) {
            alert('Please enter a commment.')
            return
        }
        if (!author) {
            alert('Please enter your name.')
            return
        }

        props.onCommentClick({author,text}, props.post)
        setText('')
        setAuthor('')
        setCommenting(true)
        setTimeout(() => setCommenting(false), 15000);
    }
    return (
        <div>
            {commenting && <div className='comment'>Commenting...</div>}
            <div className='form-control'>
                <label>Name</label>
                <input type='text' placeholder='Your Name' value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Comment</label>
                <input type='text' placeholder='Your Comment' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <Button className='btn btn-block' color='black' text='Add Comment' onClick={onCommentClick}/>
        </div>
    )
}

export default NewComment