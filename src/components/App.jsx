import React, {useState, useEffect} from 'react';
import Bubble from "./bubble/Bubble";
import ColorPicker from "./colorPicker/ColorPicker";
import { hexToRgb } from "../utils/hexToRgb";
import { relativeLuminanceW3C } from "../utils/relativeLuminance";
import './app.scss';

const App = () => {
    const [backgroundColor, setBackgroundColor] = useState("#476D91");
    const [data, setData] = useState(null);
    const [contentHeight, setContentHeight] = useState(0);

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

    useEffect(() => {
        setContentHeight(document.querySelector('.tapp').clientHeight);
        chayns.getWindowMetrics().then((windowData) => {
            console.log(windowData.height);
            console.log(document.querySelector('.tapp').clientHeight)
            setData(windowData);
        });
    }, []);

    return (
        <div style={{ padding: '16px', backgroundColor: backgroundColor }}>
            <ColorPicker color={backgroundColor} setColor={setBackgroundColor} />
            {
                colorList.map((color) => {
                    return (
                        <Bubble backgroundColor={backgroundColor} textColor={color} key={color} />
                    );
                })
            }
        </div>
    );
}

export default App;
