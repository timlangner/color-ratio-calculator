import React, {useState, useEffect} from "react";
import { ColorPicker } from "chayns-components";
import { ChromePicker } from 'react-color';
let convert = require('color-convert');
import './colorPicker.scss';

const ColorChooser = ({ color, setColor }) => {

    const handleColorChange = (color) => {
        setColor(color.hex);
        // console.log(`#${convert.hsv.hex(`${data.h.toFixed(0)}, ${data.s.toFixed(0)}, ${data.v.toFixed(0)}`)}`);
        // setColor(`#${convert.hsv.hex(`${data.h.toFixed(0)}, ${data.s.toFixed(0)}, ${data.v.toFixed(0)}`)}`);
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
            {/*    color={"#476D91"}*/}
            {/*    onChange={(data) => {*/}
            {/*        handleColorChange(data)*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};

export default ColorChooser;
