import * as React from 'react'
import { IButtonProps } from './IButtonProps';


const Button = (props: IButtonProps) => {
    return (
        <button
            className="pb-button"
            value={props.value}
            onClick={() => props.click(props.value)}
        >{props.value}</button>
    )
}

export default Button;