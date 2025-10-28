
import {   forwardRef  } from 'react';

import './Input.css';

const Input = forwardRef( function Input({ label, textarea, id, ...props }, ref) {

    return (
        <div className="input">
            <label htmlFor={id} >{label}</label>
            {textarea ? <textarea ref={ref} name={id} id={id} {...props}/> : 
            <input ref={ref} name={id} id={id}     {...props}/>}
        </div>
    )
});

export default Input
    