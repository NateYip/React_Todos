//eslint-disable-next-line 
import Style from "./style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { useState, useRef, useEffect } from 'react';
interface todo {
    id: number;
    status: boolean;
    content: string;
}
interface singleListProps {
    id: number;
    status: boolean;
    Content: string;
    Change(): void;
    Delete(): void;
    Eidt(e: todo, id: number): void;
}


function SingleList(props: singleListProps) {
    const [Input, setInput] = useState<string>(props.Content);
    const [NowContent, setNowContent] = useState<string>(props.Content)
    const [IsEdit, setIsEdit] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);

    function onEdit() {
        setIsEdit(true)
        setNowContent('');
        let { Content } = props;
        setInput(Content);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    const Eidt = props.Eidt;


    function editDone() {
        setIsEdit(false)
        const afterEdit: todo = {
            id: props.id,
            status: props.status,
            content: Input,
        }
        if (inputRef.current) {
            inputRef.current.blur();
        }
        Eidt(afterEdit, props.id)
        setNowContent(Input)
    }

    function inPutChange(e: any) {
        setInput(e.target.value)
    }

    function onEnter(e: any) {
        if (e.keyCode === 13) {
            editDone();
        }
    }
    function onBlur() {
        editDone();
    }

    useEffect(() => {
        if (IsEdit) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [IsEdit])

    if (props.status === true) {
        return (
            <div
                onDoubleClick={onEdit}
                className={Style.outer}>
                <button
                    className={Style.btn}
                    onClick={props.Change}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                    <label
                    className={Style.content}
                    >
                        {NowContent}
                        <input
                            style={{ display: (IsEdit === true) ? "block" : "none" }}
                            type="text"
                            className={Style.edit}
                            value={Input}
                            onChange={inPutChange}
                            onKeyDown={onEnter}
                            onBlur={onBlur}
                            alt='edit'
                            ref={inputRef}
                        />
                    </label>
                <button
                    type="button"
                    className={Style.btn}
                    onClick={props.Delete}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>

            </div >
        )
    }

    return (
        <div
        onDoubleClick={onEdit}
        className={Style.outer}>
        <button
            className={Style.btn}
            onClick={props.Change}>
            <FontAwesomeIcon icon={faCircle} />

        </button>
            <label
            className={Style.content}
            >
                {NowContent}
                <input
                    style={{ display: (IsEdit === true) ? "block" : "none" }}
                    type="text"
                    className={Style.edit}
                    value={Input}
                    onChange={inPutChange}
                    onKeyDown={onEnter}
                    onBlur={onBlur}
                    alt='edit'
                    ref={inputRef}
                />
            </label>
        <button
            type="button"
            className={Style.btn}
            onClick={props.Delete}>
            <FontAwesomeIcon icon={faTrashAlt} />
        </button>

    </div >
    )
}

export default SingleList