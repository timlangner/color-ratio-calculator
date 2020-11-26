import React, {useEffect, useState} from "react";
import { mix } from '../../utils/mixColor';
import {relativeLuminanceW3C} from "../../utils/relativeLuminance";
import {hexToRgb} from "../../utils/hexToRgb";
import './bubble.scss';

const Bubble = ({ backgroundColor, textColor }) => {

    const [backgroundLuminance, setBackgroundLuminance] = useState(0);
    const [textLuminance, setTextLuminance] = useState(0);
    const [colorContrast, setColorContrast] = useState(0);

    useEffect(() => {
        setBackgroundLuminance(relativeLuminanceW3C(hexToRgb(backgroundColor)));
    }, [backgroundColor]);

    useEffect(() => {
        setTextLuminance(relativeLuminanceW3C(hexToRgb(textColor)));
    }, [textColor]);

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
                <div className="bubble-wrapper" style={{ backgroundColor: `${mix(backgroundColor, "#E4E4E4", 40)}` }}>
                    <div className="name" style={{ color: `${textColor}`, fontWeight: 'bold' }}>
                        <p>Max Mustermann</p>
                    </div>
                    <div className="text">
                        <p>Wir haben Ihre Gesundheitsdaten für Tag 5 Ihrer Quarantäne noch nicht vollständig erhalten, Vielleicht haben Sie eine Frage übersehen oder sind zwischendurch abgelenkt worden. Bitte geben Sie sie uns noch eben schnell durch. Dann ist das vom Tisch. Vielen Dank!</p>
                    </div>
                </div>
                <div style={{ marginBottom: '15px', marginLeft: '20px', fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                    <p>{`Contrast: ${colorContrast.toFixed(2)}`}</p>
                </div>
            </div>
        </>
    );
};

export default Bubble;
