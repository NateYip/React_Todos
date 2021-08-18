import  Style  from "../Todo.module.css"
import SigleList from "../../components/SigleList/SigleList"
function AllTodos(props:any) {
    const List = props.List
    const nowList = List
    const rendeList = nowList.map((item:any , index:number) => {
        if(item.status === false) {
            return(
                
                <li className={Style.undone} key = {index}>
                    <SigleList 
                    Change= {() =>props.Change(item.id)}
                    Delete= {() =>props.Delete(item.id)}
                    id = {item.id}
                    Content = {item.content}
                    />
                </li>
            )
        }else {
            return(
                <li className={Style.done} key = {index}>
                    <SigleList 
                    Change= {() =>props.Change(item.id)}
                    onClick= {() =>props.Delete(item.id)}
                    id = {item.id}
                    Content = {item.content}
                    />
                </li>
            )
        }
    })
    return (
        <div>
            {rendeList}
        </div>
    )
}

export default AllTodos;