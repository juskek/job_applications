/**
 * Template button
 * @param {*} props 
 * @returns 
 */
const Button = (props) => {
    return <button type='button' className={props.className} onClick={props.onClick} style={{backgroundColor:props.color}}>{props.text}</button>
}

export default Button