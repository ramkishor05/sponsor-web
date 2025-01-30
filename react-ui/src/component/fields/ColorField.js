import { ColorPicker } from "react-color-palette";

import { getValue, setValue } from "../utils/CommanUtil";

export default function ColorField(props) {
    const {field, data, errorMessage, isError,setData, checkValidation }=props;

    return (
        <ColorPicker
          hideInput
          color={getValue(data,field.name, 'color')}
          onChange={(event)=> setValue(event.target.value, field.name, field, data, this.setData, this.checkValidation)} hideHSV= {true} dark >
          </ColorPicker>
    )
};