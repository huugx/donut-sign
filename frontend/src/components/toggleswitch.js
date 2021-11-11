import React from "react";
import "./toggleswitch.css";


export const ToggleSwitch = (props) => {
    return(
        <div className="container">
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox" name="optin" id="optin" checked={props.checked} onChange={props.onChange} />
                <label className="label" htmlFor="optin">
                <span className="inner" />
                <span className="switch">{ props.checked === true ? <span>xDai</span> : <span>Ethereum</span>}</span>
                </label>
            </div>
        </div>
    )
}
