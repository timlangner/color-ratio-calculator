import React, {useState, useEffect} from 'react';
import Bubble from "./bubble/Bubble";
import {Button, Checkbox} from "chayns-components";
import { mix } from '../utils/mixColor';
import ColorChooser from "./colorPicker/ColorChooser";
import './app.scss';

const App = () => {
    const [backgroundColor, setBackgroundColor] = useState("#85E9FF");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [improveColors, setImproveColors] = useState(false);

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

    // Change color theme for site
    // useEffect(() => {
    //     chayns.invokeCall({
    //         action: 101,
    //         value:{site: {colorScheme: {color: "#FFFFFF"}}}
    //     }).then(console.log);
    // }, [backgroundColor]);

    return (
        <div className="content-wrapper" style={{ padding: '16px', backgroundColor: `${isDarkMode ? mix(backgroundColor, "#2F2F2F", 20) : mix(backgroundColor, "#FFFFFF", 10)}` }}>
            <div style={{ display: 'flex' }}>
                <Checkbox
                    toggleButton
                    style={{ marginTop: '1px' }}
                    onChange={(value) => {
                        setIsDarkMode(value);
                    }}
                    checked={isDarkMode}
                />
                <p style={ isDarkMode ? { color: 'white' } : { color: 'black' }}>Dark Mode</p>
                <div style={{ marginRight: '10px' }} />
                <Checkbox
                    toggleButton
                    style={{ marginTop: '1px' }}
                    onChange={(value) => {
                        setImproveColors(value);
                    }}
                    checked={improveColors}
                />
                <p style={ isDarkMode ? { color: 'white' } : { color: 'black' }}>Fix bad color ratio</p>
            </div>
            <div style={{ marginTop: '20px' }} />
            <ColorChooser color={backgroundColor} setColor={setBackgroundColor} />
            {
                colorList.map((color) => {
                    return (
                        <Bubble
                            backgroundColor={backgroundColor}
                            textColor={color} isDarkMode={isDarkMode}
                            improveColors={improveColors}
                            key={color}
                        />
                    );
                })
            }
        </div>
    );
}

export default App;
