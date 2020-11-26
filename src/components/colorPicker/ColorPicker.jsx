import React, {useState} from "react";
import { ChromePicker } from "react-color";
import './colorPicker.scss';

const ColorPicker = ({ color, setColor }) => {

    const handleColorChange = (color) => {
        setColor(color.hex);
    };

    return (
        <div className="color-wrapper">
            <ChromePicker
                color={color}
                onChange={(color) => {
                    handleColorChange(color)
                }}
            />
            {/*<ColorPicker*/}
            {/*    color={color}*/}
            {/*    onChange={() => {*/}
            {/*        handleColorChange(color)*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};

export default ColorPicker;
