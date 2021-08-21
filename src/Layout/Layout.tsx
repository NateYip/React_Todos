import { NavLink, HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AllTodos from '../pages/AllTodos/AllTodos'
import LeftTodos from '../pages/LeftTodos/LeftTodos';
import CompletedTodos from '../pages/CompletedTodos/CompletedTodos'
import Style from './Layout.module.css';
import InputTodos from '../components/Input/Input'
import { useState, useEffect, useCallback } from 'react';
//eslint-disable-next-line 
import {SetStorage,GetStorage} from '../utils/Storage'



interface todo {
    id: number;
    status: boolean;
    content: string;
}

function Layout() {
    const [List, setList] = useState<todo[]>([]);
    const [Active, setActive] = useState<todo[]>([]);
    const [Completed, setCompleted] = useState<todo[]>([]);
   
    
    useEffect(()=>{
        const List = GetStorage('List')
        const newActive: todo[] = [];
        const newComplete: todo[] = [];
        List.forEach((e: todo) => {
            if (e.status === false) {
                newActive.push(e);
            } else {
                newComplete.push(e);
            }
        });
        if (newActive.length === 0) {
            setActive([]);
        } else {
            setActive(newActive);
        }
        if (newComplete.length === 0) {
            setCompleted([]);
        } else {
            setCompleted(newComplete);
        }
        setList(List)
        SetStorage('List',List)
        //eslint-disable-next-line
    },[])
    

    //update List Active Completed
    const memoizedUpdate = useCallback(() => {
        const newActive: todo[] = [];
        const newComplete: todo[] = [];
        List.forEach((e: todo) => {
            if (e.status === false) {
                newActive.push(e);
            } else {
                newComplete.push(e);
            }
        });
        if (newActive.length === 0) {
            setActive([]);
        } else {
            setActive(newActive);
        }
        if (newComplete.length === 0) {
            setCompleted([]);
        } else {
            setCompleted(newComplete);
        }
        SetStorage('List',List)
    },[List])

    function ComplateAll() {
        const nowList = List.map((item: todo) => {
            const newitem = { status: true, content: item.content, id: item.id };
            return newitem;
        })
        setActive([]);
        setCompleted(nowList);
        setList(nowList);
    }

    const editContent = useCallback((item:todo,id: number) => {
        const newList = List
        newList.forEach((e: todo)=>{
            if(e.id === id){
                e.content = item.content
            }
        })
        setList(newList);
        memoizedUpdate()
        //eslint-disable-next-line
    },[List])

    interface HandleEventParams {
        type: string;
        id: number;
    }
    function HandleEvent(e: HandleEventParams) {
        const newList = List;
        switch (e.type) {
            case 'Change':
                List.forEach((item: todo, index: number) => {
                    if (item.id === e.id) {
                        newList[index].status = !item.status;
                    }
                })
                setList(newList);
                memoizedUpdate();
                break;
            case 'Delete':
                List.forEach((item: todo, index: number) => {
                    if (item.id === e.id) {
                        newList.splice(index, 1);
                    }
                })
                setList(newList);
                memoizedUpdate();
                break;
        }
    }

    function Clear() {
        const nowList: todo[] = [];
        List.forEach((item: todo) => {
            if (item.status !== true) {
                nowList.push(item);
            }
        })
        setList(nowList);
        memoizedUpdate();
        setCompleted([]);
    }
    function AddtoList(e:string){
        const curTime = new Date().getTime();
        const newTodo = { status: false, content: e, id: curTime };
                const nowList = List.slice();
                const nowActive = Active.slice();
                nowActive.push(newTodo);
                nowList.push(newTodo);
                setList(nowList);
                setActive(nowActive);
    }
    

    useEffect(() => {
        SetStorage('List',List);
    },[List])




    return (
        <div
            className={Style.Layout} >
            <div
                className={Style.Title}>
                todos
            </div>
                <div
                    className={Style.Head}>
                    <div
                        className={Style.inputLeft}>
                        <button className={Style.button} onClick={() => ComplateAll()}>All done</button>
                    </div>
                    <div
                        className={Style.inputRight}
                    >
                        <InputTodos
                            AddtoList={(e:string) =>AddtoList(e)}/>
                    </div>
                </div>
            <HashRouter  >

                <div>
                    <div
                        className={Style.switch}>
                        {
                            Active.length === 0 &&
                            <p>
                                no item left
                            </p>
                        }
                        {
                            Active.length === 1 &&
                            <p>
                                1 item left
                            </p>
                        }
                        {
                            Active.length > 1 &&
                            <p>
                                {Active.length} items left
                            </p>
                        }
                        <div className={Style.Link}>
                            <NavLink className={Style.NavLink} to={'/All'}>All</NavLink>
                        </div>
                        <div className={Style.Link}>
                            <NavLink className={Style.NavLink} to={'/Left'}>Active</NavLink>
                        </div>
                        <div className={Style.Link}>
                            <NavLink className={Style.NavLink} to={'/Completed'}>Completed</NavLink>
                        </div>
                        <button
                            onClick={() => Clear()}>Clear</button>
                    </div>
                </div>
                <div
                    className="list-group">
                    <Switch>
                        <Route path={'/'} exact>
                            <Redirect to="/All" />
                        </Route>
                        <Route path={'/All'}>
                            <AllTodos
                                Eidt={(e:todo , id:number)=>editContent(e,id)}
                                Change={(e: number) => HandleEvent({ type: 'Change', id: e })}
                                Delete={(e: number) => HandleEvent({ type: 'Delete', id: e })}
                                List={List} />
                        </Route>
                        <Route path={'/Left'} >
                            <LeftTodos
                                Eidt={(e:todo , id:number)=>editContent(e,id)}
                                Change={(e: number) => HandleEvent({ type: 'Change', id: e })}
                                Delete={(e: number) => HandleEvent({ type: 'Delete', id: e })}
                                List={Active} />
                        </Route>
                        <Route path={'/Completed'}>
                            <CompletedTodos
                                Eidt={(e:todo , id:number)=>editContent(e,id)}
                                Change={(e: number) => HandleEvent({ type: 'Change', id: e })}
                                Delete={(e: number) => HandleEvent({ type: 'Delete', id: e })}
                                List={Completed} />
                        </Route>
                    </Switch>
                </div>


            </HashRouter >

        </div>
    )
}

export default Layout