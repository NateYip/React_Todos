import  Style  from "../Todo.module.css"
import SingleList from "../../components/SingleList/SingleList"

interface todo {
    id: number;
    status:boolean;
    content:string;
}
interface todoProps {
    Change(e:number): void;
    Delete(e:number): void;
    List:todo[];
    Eidt(e:todo ,id:number): void;
}

function AllTodos(props:todoProps) {
    const List = props.List
    const nowList = List
    const renderList = nowList.map((item:any , index:number) => {
        if(item.status === false) {
            return(
                
                <li className={Style.undone} key = {index}>
                    <SingleList 
                    Eidt={(e:todo,id:number) =>props.Eidt(e, id)}
                    Change= {() =>props.Change(item.id)}
                    Delete= {() =>props.Delete(item.id)}
                    id = {item.id}
                    status ={item.status}
                    Content = {item.content}
                    />
                </li>
            )
        }else {
            return(
                <li className={Style.done} key = {index}>
                    <SingleList 
                    Eidt={(e:todo,id:number) =>props.Eidt(e, id)}
                    Change= {() =>props.Change(item.id)}
                    Delete= {() =>props.Delete(item.id)}
                    id = {item.id}
                    status ={item.status}
                    Content = {item.content}
                    />
                </li>
            )
        }
    })
    return (
        <div>
            {renderList}
        </div>
    )
}

export default AllTodos;