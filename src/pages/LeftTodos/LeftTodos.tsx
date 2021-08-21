import SingleList from "../../components/SingleList/SingleList"
import  Style  from "../Todo.module.css"
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
function LeftTodos(props:todoProps){
    const List = props.List
    const nowList = List
    const renderList = nowList.map((item:any , index:number) => {
        return(
            
            <li className={Style.undone} key = {index}>
                <SingleList 
                    Eidt={(e:todo,id:number) =>props.Eidt(e, id)}
                    Change= {() =>props.Change(item.id)}
                    Delete= {() =>props.Delete(item.id)}
                    status ={item.status}
                    id = {item.id}
                    Content = {item.content}
                    />
            </li>
        )
    
    })
    return (
        <div>
            {renderList}
        </div>
    )
}

export default LeftTodos