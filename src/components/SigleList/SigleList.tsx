

function SigleList(props:any){
    return (
        <div
        >
            <button 
            onClick={props.Change}
            type="button">Change Status</button>
           {props.Content}
           <button 
           type="button"
           onClick= {props.Delete}>Delete</button>
        </div>
    )
}

export default SigleList