import React from 'react';
import axios from 'axios';


const Translator = async(item)=>{
         const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: item,
            source: "en",
            target: "ja",
            format: "text",
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    return res.json()
}

        const TranslatorCorrectAns = (targetItem, objectName, setStatus)=>
        Translator(targetItem.map(result=>result[objectName]))
            .then((res) => {
                res = res.translatedText.map(item=>item)
            setStatus(res)
        })
        .catch((e) => {
            console.log(e.message)
        })

        const TranslatorPlane = async(targetItem)=>{
            const res = await Translator(targetItem.map(result=>result))
            // console.log(res)
                return res.translatedText.map(item=>item)
    }


export { TranslatorCorrectAns, Translator , TranslatorPlane} 