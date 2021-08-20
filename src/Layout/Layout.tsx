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
    const [Input, setInput] = useState<string>('');
    const [Active, setActive] = useState<todo[]>([]);
    const [Completed, setCompleted] = useState<todo[]>([]);
    const [count, setCount] = useState<number>(0);
    useEffect(()=>{
        setList(GetStorage('List'))
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


    function inPutChange(e: any) {
        const nowInput = e.target.value;
        setInput(nowInput);
    }


    interface HandleEventParams {
        type: string;
        id: number;
    }
    function HandleEvent(e: HandleEventParams) {
        console.log("HandleEvent")
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
        console.log("Clear")
        const nowList: todo[] = []
        List.forEach((item: todo) => {
            if (item.status !== true) {
                nowList.push(item)
            }
        })
        setList(nowList)
        memoizedUpdate()
        setCompleted([])
    }
    
    //watch Enter-key to add new todo
    const handleKeydown = useCallback(
        (e: any) => {
            console.log("handleKeyDown mount!")
            if (e.keyCode === 13 && Input !== '') {
                const newTodo = { status: false, content: Input, id: count };
                const nowList = List.slice();
                const nowActive = Active.slice();
                nowActive.push(newTodo);
                nowList.push(newTodo);
                setCount(count + 1);
                setList(nowList);
                setActive(nowActive);
                setInput('');
            }
        }
        // eslint-disable-next-line
        , [Input])


    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        }
        //eslint-disable-next-line 
    }, [Input])
    useEffect(() => {
        SetStorage('List',List)
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
                            value={Input}
                            onChange={(e: any) => inPutChange(e)} />
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
                                Change={(e: number) => HandleEvent({ type: 'Change', id: e })}
                                Delete={(e: number) => HandleEvent({ type: 'Delete', id: e })}
                                List={List} />
                        </Route>
                        <Route path={'/Left'} >
                            <LeftTodos
                                Change={(e: number) => HandleEvent({ type: 'Change', id: e })}
                                Delete={(e: number) => HandleEvent({ type: 'Delete', id: e })}
                                List={Active} />
                        </Route>
                        <Route path={'/Completed'}>
                            <CompletedTodos
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