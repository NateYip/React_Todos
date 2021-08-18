import SigleList from "../../components/SigleList/SigleList"
import  Style  from "../Todo.module.css"

function CompolatedTodos (props:any){
    const List = props.List
    const nowList = List
    const rendeList = nowList.map((item:any , index:number) => {
        return(
            
            <li className={Style.done} key = {index}>
                 <SigleList 
                    Change= {() =>props.Change(item.id)}
                    Delete= {() =>props.Delete(item.id)}
                    id = {item.id}
                    Content = {item.content}
                    />
            </li>
        )
    
    })
    return (
        <div>
            {rendeList}
        </div>
    )
}

export default CompolatedTodos;