import { NavLink, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AllTodos from '../pages/AllTodos/AllTodos'
import LeftTodos from '../pages/LeftTodos/LeftTodos';
import ComplatedTodos from '../pages/ComplatedTodos/ComplatedTodos'
import Style from './Layout.module.css';
import InputTodos from '../components/Input/Input'
import { useState, useEffect } from 'react';

function Layout() {
    const [List, SetList] = useState<any>([]);
    const [Input, SetInput] = useState<string>('')
    // eslint-disable-next-line
    const [Active, SetActive] = useState<any>([]);
    const [Complated, SetComplated] = useState<any>([]);
    const [count, SetCount] = useState<number>(0);

    function ComplateAll() {
        const nowList = List.map((item: any) => {
            let newitem = { status: true, content: item.content, id: item.id }
            return newitem;
        })
        
        SetActive([])
        SetComplated(nowList)
        SetList(nowList)
    }
    function AddtoList(e: String) {
        const newTodo = { status: false, content: e, id: count }
        let nowList = List.slice()
        let nowActive = Active.slice()
        nowActive.push(newTodo)
        nowList.push(newTodo)
        SetCount(count + 1)
        SetList(nowList)
        SetActive(nowActive)
    }
    function handleKeyDown(e: any) {
        if (e.keyCode === 13) {
            AddtoList(Input);
            SetInput('')
        }
    }
    function inPutChange(e: any) {
        SetInput(e.target.value)
    }

    function ChangeStatus(e: number) {
        let newList = List
        List.forEach((item: any, index: number) => {
            if (item.id === e) newList[index].status = !item.status
        })
        SetList(newList)
        let newActive: number[] = []
        let newComplate: number[] = []
        newList.forEach((e: any) => {
            if (e.status === false) {
                newActive.push(e)
            } else {
                newComplate.push(e)
            }
        });
        SetActive(newActive)
        SetComplated(newComplate)
    }

    function Delete(e: number) {
        console.log(e)
        let newList = List
        List.forEach((item: any, index: number) => {
            if (item.id === e) newList.splice(index, 1)
        })
        if (newList.length === 0) SetList([])
        else SetList(newList)
        let newActive: number[] = []
        let newComplate: number[] = []
        newList.forEach((e: any) => {
            if (e.status === false) {
                newActive.push(e)
            } else {
                newComplate.push(e)
            }
        });
        if (newActive.length === 0) SetActive([])
        else SetActive(newActive)
        if (newComplate.length === 0) SetComplated([])
        else SetComplated(newComplate)
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return document.removeEventListener('keydown', handleKeyDown)
    })


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
                        className={Style.inputRight}>
                        <InputTodos
                            value={Input}
                            onKeyDown={(e: any) => handleKeyDown(e)}
                            onChange={(e: any) => inPutChange(e)} />
                    </div>
                </div>
                <div>
                    <div
                        className={Style.switch}>
                        <div className={Style.Link}>
                            <NavLink className={Style.NavLink} to={'/All'}>All</NavLink>
                        </div>
                        <div className={Style.Link}>
                            <NavLink className={Style.NavLink} to={'/Left'}>Active</NavLink>
                        </div>
                        <div className={Style.Link}>
                            <NavLink className={Style.NavLink} to={'/Complated'}>Complated</NavLink>
                        </div>
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
                                Change={(e: any) => ChangeStatus(e)}
                                Delete={(e: any) => { Delete(e) }}
                                List={List} />
                        </Route>
                        <Route path={'/Left'} >
                            <LeftTodos
                                Change={(e: any) => ChangeStatus(e)}
                                Delete={(e: any) => { Delete(e) }}
                                List={Active} />
                        </Route>
                        <Route path={'/Complated'}>
                            <ComplatedTodos
                                Change={(e: any) => ChangeStatus(e)}
                                Delete={(e: any) => { Delete(e) }}
                                List={Complated} />
                        </Route>
                    </Switch>
                </div>


            </BrowserRouter >

        </div>
    )
}

export default Layout