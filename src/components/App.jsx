import React, {useState, useEffect} from 'react';
import Bubble from "./bubble/Bubble";
import ColorPicker from "./colorPicker/ColorPicker";
import {Checkbox} from "chayns-components";
import { mix } from '../utils/mixColor';
import './app.scss';

const App = () => {
    const [backgroundColor, setBackgroundColor] = useState("#476D91");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const colorList = [
        "#666666",
        "#707FAF",
        "#37913C",
        "#AA0000",
        "#5E4883",
        "#FF9800",
        "#0055A4",
        "#9F713A",
        "#828282",
        "#A83D2E",
        "#486D83",
    ];

    return (
        <div style={{ padding: '16px', backgroundColor: `${isDarkMode ? mix(backgroundColor, "#2F2F2F", 20) : mix(backgroundColor, "#FFFFFF", 10)}` }}>
            <Checkbox
                toggleButton
                label="Dark Mode"
                onChange={(value) => {
                    setIsDarkMode(value);
                }}
                checked={isDarkMode}
            />
            <div style={{ marginTop: '20px' }} />
            <ColorPicker color={backgroundColor} setColor={setBackgroundColor} />
            {
                colorList.map((color) => {
                    return (
                        <Bubble backgroundColor={backgroundColor} textColor={color} isDarkMode={isDarkMode} key={color} />
                    );
                })
            }
        </div>
    );
}

export default App;
