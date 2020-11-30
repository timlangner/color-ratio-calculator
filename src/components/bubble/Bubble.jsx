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
    const [lastColorMix, setLastColorMix] = useState({currentColor: convert.hex.hsv(textColor), ratio: 0, brighter: false, saturation: -1});

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

    // Mix a better text color if color contrast is too low
    // Mix brighter color and observe the contrast ratio after change. If it gets better, continue mixing it brighter, if it gets worse, mix it darker
    // TODO: Also change saturation if ratio is still bad
    useEffect(() => {
        if (improveColors) {
            if (colorContrast < 2 && colorContrast > 1) {
                const hsv = lastColorMix.currentColor;
                console.log('currentColor', hsv);
                if (lastColorMix.ratio > colorContrast && lastColorMix.brighter && lastColorMix.saturation === -1) {

                    // Current contrast ratio is worse and the last mix which made it worse was brighter
                    setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1], hsv[2] - 10)}`);
                    setLastColorMix({currentColor: [hsv[0], hsv[1], hsv[2] - 10], ratio: colorContrast, brighter: false, saturation: -1});

                } else if (lastColorMix.ratio < colorContrast && lastColorMix.brighter && lastColorMix.saturation === -1) {

                    // Current contrast ratio is better and the last mix which made it better was brighter
                    setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1], hsv[2] + 10)}`);
                    setLastColorMix({currentColor: [hsv[0], hsv[1], hsv[2] + 10], ratio: colorContrast, brighter: true, saturation: -1});

                } else if (lastColorMix.ratio > colorContrast && !lastColorMix.brighter && lastColorMix.saturation === -1) {

                    // Current contrast ratio is worse and the last mix which made it worse was darker
                    setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1], hsv[2] + 10)}`);
                    setLastColorMix({currentColor: [hsv[0], hsv[1], hsv[2] + 10], ratio: colorContrast, brighter: true, saturation: -1});

                } else if (lastColorMix.ratio < colorContrast && !lastColorMix.brighter && lastColorMix.saturation === -1) {

                    // Current contrast ratio is better and the last mix which made it worse was darker
                    setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1], hsv[2] - 10)}`);
                    setLastColorMix({currentColor: [hsv[0], hsv[1], hsv[2] - 10], ratio: colorContrast, brighter: false, saturation: -1});

                } else {
                    // Change saturation if brightness is already at lowest or highest
                    if (lastColorMix.ratio >  colorContrast &&  lastColorMix.saturation === 1) {

                        // Current contrast ratio is worse and the last mix which made it worse was more saturation
                        setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1] - 10, hsv[2])}`);
                        setLastColorMix({currentColor: [hsv[0], hsv[1] - 10, hsv[2]], ratio: colorContrast, brighter: true, saturation: 0});

                    } else if (lastColorMix.ratio < colorContrast && lastColorMix.saturation === 0) {

                        // Current contrast ratio is better and the last mix which made it better was less saturation
                        setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1] + 10, hsv[2])}`);
                        setLastColorMix({currentColor: [hsv[0], hsv[1] + 10, hsv[2]], ratio: colorContrast, brighter: false, saturation: 1});

                    } else if (lastColorMix.ratio > colorContrast && lastColorMix.saturation === 0) {

                        // Current contrast ratio is worse and the last mix which made it worse was less saturation
                        setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1] + 10, hsv[2])}`);
                        setLastColorMix({currentColor: [hsv[0], hsv[1] + 10, hsv[2]], ratio: colorContrast, brighter: false, saturation: 1});

                    } else if (lastColorMix.ratio < colorContrast && lastColorMix.saturation === 1) {

                        // Current contrast ratio is better and the last mix which made it better was more saturation
                        setNewTextColor(`#${convert.hsv.hex(hsv[0], hsv[1] + 10, hsv[2])}`);
                        setLastColorMix({currentColor: [hsv[0], hsv[1] + 10, hsv[2]], ratio: colorContrast, brighter: false, saturation: 1});

                    }
                }
            }
        } else {
            setNewTextColor("");
            setLastColorMix({currentColor: convert.hex.hsv(textColor), ratio: 0, brighter: false, saturation: -1});
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
