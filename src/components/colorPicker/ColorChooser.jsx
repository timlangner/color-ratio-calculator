import React from "react";
import { ChromePicker } from 'react-color';
let convert = require('color-convert');
import './colorPicker.scss';

const ColorChooser = ({ color, setColor }) => {

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
        </div>
    );
};

export default ColorChooser;
