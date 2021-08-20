//eslint-disable-next-line 
import Style  from "./style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , } from '@fortawesome/free-solid-svg-icons'
import { faCircle,faTrashAlt } from '@fortawesome/free-regular-svg-icons'

interface singleListProps {
    id: number;
    status:boolean;
    Content: string;
    Change(): void;
    Delete(): void;
}


function SingleList(props: singleListProps) {
    if(props.status === true) {
        return (
            <div
            className={Style.outer}>
                <button 
                className={Style.btn}
                onClick={props.Change}>
                    <FontAwesomeIcon icon={faCheck}/>
                </button>
                <p className={Style.content}>
                {props.Content}
                </p>
                <button
                    type="button"
                    className={Style.btn}
                    onClick={props.Delete}>
                         <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
            </div>
        )
    } 
   
    return (
        <div
            className={Style.outer}>
                <button 
                className={Style.btn}
                onClick={props.Change}>
                    <FontAwesomeIcon icon={faCircle}/>
                </button>
                <p className={Style.content}>
                {props.Content}
                </p>
                <button
                    type="button"
                    className={Style.btn}
                    onClick={props.Delete}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
            </div>
    )
}

export default SingleList