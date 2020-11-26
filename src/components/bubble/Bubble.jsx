import React, {useEffect, useState} from "react";
import { mix } from '../../utils/mixColor';
import {relativeLuminanceW3C} from "../../utils/relativeLuminance";
import {hexToRgb} from "../../utils/hexToRgb";
import './bubble.scss';

const Bubble = ({ backgroundColor, textColor, isDarkMode }) => {

    const [backgroundLuminance, setBackgroundLuminance] = useState(0);
    const [textLuminance, setTextLuminance] = useState(0);
    const [colorContrast, setColorContrast] = useState(0);

    // Calculate new background luminance if dark mode got turned on or off
    useEffect(() => {
        if (isDarkMode) {
            setBackgroundLuminance(relativeLuminanceW3C(hexToRgb(mix(backgroundColor, "#777777", 40))));
        } else {
            setBackgroundLuminance(relativeLuminanceW3C(hexToRgb(mix(backgroundColor, "#E4E4E4", 40))));
        }
    }, [isDarkMode]);

    // Calculate background luminance if background color got changed through the color picker
    useEffect(() => {
        setBackgroundLuminance(relativeLuminanceW3C(hexToRgb(mix(backgroundColor, "#E4E4E4", 40))));
    }, [backgroundColor]);

    useEffect(() => {
        setTextLuminance(relativeLuminanceW3C(hexToRgb(textColor)));
    }, [textColor]);

    // color contrast math form = (L1 + 0,05) / (L2 + 0,05)
    // L1 = lighter luminance, L2 = darker luminance
    useEffect(() => {
        if (textLuminance > backgroundLuminance) {
            setColorContrast((textLuminance + 0.05) / (backgroundLuminance + 0.05));
        } else {
            setColorContrast((backgroundLuminance + 0.05) / (textLuminance + 0.05));
        }
    }, [backgroundLuminance]);

    return (
        <>
            <div className="bubble-flexbox">
                <div className="bubble-wrapper" style={{ backgroundColor: `${isDarkMode ? mix(backgroundColor, "#777777", 40) : mix(backgroundColor, "#E4E4E4", 40)}` }}>
                    <div className="name" style={{ color: `${textColor}`, fontWeight: 'bold' }}>
                        <p>Max Mustermann</p>
                    </div>
                    <div style={ isDarkMode ? {color: 'white'} : {color: 'black'} }>
                        <p>Wir haben Ihre Gesundheitsdaten für Tag 5 Ihrer Quarantäne noch nicht vollständig erhalten, Vielleicht haben Sie eine Frage übersehen oder sind zwischendurch abgelenkt worden. Bitte geben Sie sie uns noch eben schnell durch. Dann ist das vom Tisch. Vielen Dank!</p>
                    </div>
                </div>
                <div className="contrast-wrapper" style={{ backgroundColor: `${mix(backgroundColor, "#E4E4E4", 40)}` }}>
                    <p>{`Contrast: ${colorContrast.toFixed(2)}`}</p>
                </div>
            </div>
        </>
    );
};

export default Bubble;
