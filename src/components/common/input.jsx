import React from 'react';

const Input = ({name, label, value,error , onChange}) => {
    return ( 
        <div className="form-group">
            {error && <div className="alert alert-danger">{error}</div>}
            <label htmlFor={name}>{label}</label>
            <input value={value} onChange={onChange} name={name} id={name} type="text" className="form-control"/>
        </div>
     );
}
 
export default Input;