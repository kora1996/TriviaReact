import './css/style.css';
import React from 'react';
import Start from './components/StartMenu';
import GetStart from './components/GetStarted_next_test02';
// import GetStart from './components/GetStarted_JP';

export default function App(){

  // * < for mouse effect  マウスエフェクト--------------------------------------
  window.addEventListener("mousemove", function (e) {

    // to cut out the oldest set
    const to_append = document.getElementsByClassName('loader-container')[0];
  
    const parent_div = document.createElement('div');
    parent_div.className = "loader-container";
    const inner_div = document.createElement('div');
    inner_div.className = "loader";
    parent_div.appendChild(inner_div)
     document.body.appendChild(parent_div);
  
    parent_div.style.left = (e.pageX - 15)+'px';
    parent_div.style.top = (e.pageY - 15)+'px';
  
    if(document.getElementsByClassName('loader-container').length > 50) {
      document.body.removeChild(to_append)
    }
  });
  // * > for mouse effect --------------------------------------

    const [start, setStart] = React.useState(false)
    // const [isJapanese, setIsJapanese] = React.useState(false)

    // const [category, setCategory] = React.useState('')
    // const [difficulty, setDifficulty] = React.useState('')

    const [formData, setFormData] = React.useState(
      {
        // * to send to libreTranslate
        language:null,
        
        // * to send to triviaDB
        category:''
      }
    )


    // * for changing formData at StartMenu.js フォームデータ編集用-----------------
    const handleChange = (e)=>{
      const {name, value} = e.target

      if(value==='en'){

       setFormData(prevState=>{
        return{ 
          ...prevState,
          language:null
         }
       })
       return
      }

      setFormData(prevState=>{
        return {
          ...prevState,
          [name]:value
        }
      })

    }

    // * for switching component render. コンポーネントのレンダーを変えるため-----------
  const getStarted = ()=>{
    setStart(true)
  }

  const restart = ()=>{
    setStart(false)
  }



    return(
        <div className="app">
            {start?
            <GetStart formData={formData} restart={restart} />
            :<Start getStarted={getStarted} handleChange={handleChange} formData={formData} />}
        </div>
    )
}
