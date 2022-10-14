import { IconContext } from "react-icons";

/**
 * Template icon button
 * @param {*} props 
 * @returns 
 */
const IconButton = (props) => {
    return <button type='button' className="iconButton" onClick={props.onClick}>
        <IconContext.Provider value={{ color: props.color, size: '30px' }}>
            <h1>{props.icon}</h1>
        </IconContext.Provider>
    </button>
}

export default IconButton