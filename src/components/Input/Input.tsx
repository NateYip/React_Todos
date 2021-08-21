import Style from  './Input.module.css'
import { useState, useRef,  } from 'react';

interface inputProps {
    AddtoList(e:string):void

}

function InputTodos (props: inputProps) {
    const [IsEdit , setIsEdit] = useState(false)
    const [Input, setInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    function inPutChange(e: any) {
        setIsEdit(true);
        setInput(e.target.value)
    }

    function editDone() {
        setIsEdit(false)
        //call father
        props.AddtoList(Input)
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }

    function onKeyDown(e:any){
        if (e.keyCode === 13 && IsEdit === true) {
            editDone();
        }
    }

    function onBlur(){
        setIsEdit(false)
    }

    return (
       
        <div >
            
            <input
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className={Style.input}
            placeholder="Input your Todos"
            type='text'
            value={Input}
            ref={inputRef}
            onChange={inPutChange}>
            </input>
        </div>
        
    )
}
export default InputTodos 