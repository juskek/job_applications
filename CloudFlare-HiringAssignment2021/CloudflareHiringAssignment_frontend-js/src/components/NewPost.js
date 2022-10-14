import {useState} from 'react'
import Button from "./Button"

/**
 * Shows form for adding a new post
 * @param {*} props 
 * @returns 
 */
const NewPost = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    /**
     * Checks if fields are filled, then submits post to Cloudflare KV
     * @returns 
     */
    const onSubmitClick = () => {
        console.log("Submit Post Clicked")
        if (!title) {
            alert('Please enter a post title.')
            return
        }
        if (!author) {
            alert('Please enter your name.')
            return
        }
        if (!text) {
            alert('Please enter text for your post.')
            return
        }

        props.onSubmitClick({author,title,text})
        setTitle('')
        setAuthor('')
        setText('')
    }
    return (
        <form className ='add-form'>
            <div className='form-control'>
                <label>Name</label>
                <input type='text' placeholder='Your Name' value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Post Title</label>
                <input type='text' placeholder='Add Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Post Text</label>
                <input type='text' placeholder='Add Text' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <Button className='btn btn-block' color='black' text='Submit Post' onClick={onSubmitClick}/>
        </form>
    )
}

export default NewPost