
import './ToggleCss.css';


const ToggleSwitch = (props) =>{

   return  <label className="toggle">
        <input className="toggle-input" type="checkbox" onChange={props.onClick} />
        <span className="toggle-label" data-off={props.offlevel} data-on={props.onlevel}></span>
        <span className="toggle-handle"></span>
    </label>
}

export default ToggleSwitch;