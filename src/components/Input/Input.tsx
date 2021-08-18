import Style from  './Input.module.css'
import{  useEffect } from 'react';

function InputTodos (props: any) {
    useEffect(()=>{
       
    })
    
    return (
       
        <div onKeyDown={(e)=>props.onKeyDown(e)}>
            
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