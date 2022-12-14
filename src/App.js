import './css/style.css';
import React from 'react';
import Start from './components/StartMenu';
import GetStart from './components/GetStarted_next_test02';
// import GetStart from './components/GetStarted_JP';

export default function App(){

  window.addEventListener("mousemove", function (e) {

    // to cut out the oldest set
    var to_append = document.getElementsByClassName('loader-container')[0];
    // var all = document.getElementsByClassName('loader-container');
    // console.log(e)
  
    var parent_div = document.createElement('div');
    parent_div.className = "loader-container";
    var inner_div = document.createElement('div');
    inner_div.className = "loader";
    parent_div.appendChild(inner_div)
    var d = document.body.appendChild(parent_div);
  
    parent_div.style.left = (e.pageX - 15)+'px';
    parent_div.style.top = (e.pageY - 15)+'px';
  
    if(document.getElementsByClassName('loader-container').length > 50) {
      document.body.removeChild(to_append)
    }
  });

    const [start, setStart] = React.useState(false)
    const [isJapanese, setIsJapanese] = React.useState(false)

    const [category, setCategory] = React.useState('')
    const [difficulty, setDifficulty] = React.useState('')

    const [formData, setFormData] = React.useState(
      {
        language:null,
        category:''
      }
    )

    // const langSwitch = ()=>{
    //   setIsJapanese(prevState=>!prevState)
    // }

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
  const getStarted = ()=>{
    setStart(true)
  }

  const restart = ()=>{
    setStart(false)
    // setIsJapanese(false)
  }



    return(
        <div className="app">
            {/* <header>
                <h2>Trivia Pond</h2>
            </header> */}
            {start?
            <GetStart formData={formData} restart={restart} />
            :<Start getStarted={getStarted} handleChange={handleChange} formData={formData} />}
            {/* {triviaItems} */}

        </div>
    )
}
