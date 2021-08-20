import { NavLink, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AllTodos from '../pages/AllTodos/AllTodos'
import LeftTodos from '../pages/LeftTodos/LeftTodos';
import CompletedTodos from '../pages/CompletedTodos/CompletedTodos'
import Style from './Layout.module.css';
import InputTodos from '../components/Input/Input'
import { useState, useEffect, useCallback } from 'react';
interface todo {
    id: number;
    status: boolean;
    content: string;
}
function Layout() {
    const [List, SetList] = useState<todo[]>([]);
    const [Input, SetInput] = useState<string>('');
    const [Active, SetActive] = useState<todo[]>([]);
    const [Completed, SetCompleted] = useState<todo[]>([]);
    const [count, SetCount] = useState<number>(0);

    function ComplateAll() {
        const nowList = List.map((item: any) => {
            const newitem = { status: true, content: item.content, id: item.id };
            return newitem;
        })

        SetActive([]);
        SetCompleted(nowList);
        SetList(nowList);
    }

    function inPutChange(e: any) {
        const nowInput = e.target.value;
        SetInput(nowInput);
    }
    interface HandleEventHook {
        type: string;
        id: number;
    }
    function HandleEvent(e: HandleEventHook) {
        console.log("HandleEvent")
        const newList = List;
        switch (e.type) {
            case 'Change':
                List.forEach((item: any, index: number) => {
                    if (item.id === e.id) {
                        newList[index].status = !item.status;
                    }
                })
                SetList(newList);
                Update();
                break;
            case 'Delete':
                List.forEach((item: any, index: number) => {
                    if (item.id === e.id) {
                        newList.splice(index, 1);
                    }
                })
                SetList(newList);
                Update();
                break;
        }
    }


    function Update() {
        const newActive: todo[] = [];
        const newComplete: todo[] = [];
        List.forEach((e: any) => {
            if (e.status === false) {
                newActive.push(e);
            } else {
                newComplete.push(e);
            }
        });
        if (newActive.length === 0) {
            SetActive([]);
        } else {
            SetActive(newActive);
        }
        if (newComplete.length === 0) {
            SetCompleted([]);
        } else {
            SetCompleted(newComplete);
        }
    }

    function Clear() {
        console.log("Clear")
        const nowList: todo[] = []
        List.forEach((item: any) => {
            if (item.status !== true) {
                nowList.push(item)
            }
        })
        SetList(nowList)
        Update()
        SetCompleted([])
    }

    const handleKeydown = useCallback(
        (e: any) => {
            console.log("handleKeyDown mount!")
            if (e.keyCode === 13 && Input !== '') {
                const newTodo = { status: false, content: Input, id: count };
                const nowList = List.slice();
                const nowActive = Active.slice();
                nowActive.push(newTodo);
                nowList.push(newTodo);
                SetCount(count + 1);
                SetList(nowList);
                SetActive(nowActive);
                SetInput('');
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




    return (
        <div
            className={Style.Layout} >
            <div
                className={Style.Title}>
                todos
            </div>
            <BrowserRouter >
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


            </BrowserRouter >

        </div>
    )
}

export default Layout