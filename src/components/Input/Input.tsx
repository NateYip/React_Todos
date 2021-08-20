import Style from  './Input.module.css'
import{  useEffect } from 'react';

interface inputProps {
    value: string;
    onChange(e:any):void;
}
function InputTodos (props: inputProps) {
    useEffect(()=>{
       
    })
    
    return (
       
        <div >
            
            <input
            className={Style.input}
            placeholder="Input your Todos"
            type='text'
            value={props.value}
            onChange={(e:any)=>props.onChange(e)}>
            </input>
        </div>
        
    )
}
export default InputTodos 