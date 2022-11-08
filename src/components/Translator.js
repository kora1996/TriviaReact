import React from 'react';


const Translator = async()=>{
         const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: " \n\nWho is the king of the Greek gods",
            source: "en",
            target: "ja",
            format: "text",
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    return res.json()
}

export default Translator 