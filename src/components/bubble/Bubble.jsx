import React, {useEffect, useState} from "react";
import { mix } from '../../utils/mixColor';
import {relativeLuminanceW3C} from "../../utils/relativeLuminance";
import {hexToRgb} from "../../utils/hexToRgb";
let convert = require('color-convert');
import './bubble.scss';

const Bubble = ({ backgroundColor, textColor, isDarkMode, improveColors }) => {

    const [backgroundLuminance, setBackgroundLuminance] = useState(0);
    const [textLuminance, setTextLuminance] = useState(0);
    const [colorContrast, setColorContrast] = useState(0);
    const [newTextColor, setNewTextColor] = useState("");

    // Calculate background luminance if background color got changed through the color picker or dark mode got toggled
    useEffect(() => {
        if (isDarkMode) {
            setBackgroundLuminance(relativeLuminanceW3C(hexToRgb(mix(backgroundColor, "#777777", 40))));
        } else {
            setBackgroundLuminance(relativeLuminanceW3C(hexToRgb(mix(backgroundColor, "#E4E4E4", 40))));
        }
    }, [backgroundColor, isDarkMode]);

    // Calculate text luminance for current color
    useEffect(() => {
        if (newTextColor.length > 0) {
            setTextLuminance(relativeLuminanceW3C(hexToRgb(newTextColor)));
        } else {
            setTextLuminance(relativeLuminanceW3C(hexToRgb(textColor)));
        }
    }, [textColor, newTextColor]);

    // Calculate color contrast
    // Formula = (L1 + 0,05) / (L2 + 0,05)
    // L1 = lighter luminance, L2 = darker luminance
    useEffect(() => {
        if (textLuminance > backgroundLuminance) {
            setColorContrast((textLuminance + 0.05) / (backgroundLuminance + 0.05));
        } else {
            setColorContrast((backgroundLuminance + 0.05) / (textLuminance + 0.05));
        }
    }, [backgroundLuminance, textLuminance]);

    // Generate a random text color if contrast ratio is too low
    useEffect(() => {
        if (improveColors) {
            if (colorContrast < 2 && colorContrast > 1) {
                let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                let hexColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'); // Always six digits
                if (randomColor.length < 6) {
                    for (let i = 0; i < 6; i++) {
                        if (!randomColor[i]) {
                            randomColor = randomColor + "0";
                        }
                    }
                }
                setNewTextColor(`#${randomColor}`);
            }
        } else {
            setNewTextColor("");
        }
    }, [improveColors, colorContrast, newTextColor])

    return (
        <>
            <div className="bubble-flexbox">
                <div className="bubble-wrapper" style={{ backgroundColor: `${isDarkMode ? mix(backgroundColor, "#777777", 40) : mix(backgroundColor, "#e4e4e4", 40)}` }}>
                    <div className="name" style={newTextColor.length > 0 ? { color: `${newTextColor}`, fontWeight: 'bold' } : { color: `${textColor}`, fontWeight: 'bold' }}>
                        <p>Max Mustermann</p>
                    </div>
                    <div style={ isDarkMode ? {color: 'white'} : {color: 'black'} }>
                        <p>Wir haben Ihre Gesundheitsdaten für Tag 5 Ihrer Quarantäne noch nicht vollständig erhalten, Vielleicht haben Sie eine Frage übersehen oder sind zwischendurch abgelenkt worden. Bitte geben Sie sie uns noch eben schnell durch. Dann ist das vom Tisch. Vielen Dank!</p>
                    </div>
                </div>
                <div className="contrast-wrapper" style={{ backgroundColor: `${mix(backgroundColor, "#E4E4E4", 40)}` }}>
                    <p>{`Ratio: ${colorContrast.toFixed(2)} ${colorContrast < 2 ? `🙁` : colorContrast < 3.5 ? `🙂` : colorContrast < 7 ? `😀` : `😍`}`}</p>
                </div>
            </div>
        </>
    );
};

export default Bubble;
