import React from 'react';

export default function FinishPage(props){

    const [theName, setTheName] = React.useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const myDate = new Date(),
        theMon = myDate.getMonth(),
        theDate = myDate.getDate(),
        theYear = myDate.getFullYear()

        const months = ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const theDay = `${theDate}-${months[theMon]}-${theYear}`
        localStorage.setItem('bestScore', JSON.stringify({name:theName, score:props.score, theDay:theDay}))
        props.newBester()
    }


    return(
        <div className="finishPage">

            {props.newBest?
                <div>
                    <h1>Congrats! It's a new Best Score!</h1>
                    <h1>Please tell me your name!</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                        value={theName}
                        required
                        placeholder='Your name'
                        onChange={(e)=>setTheName(e.target.value)} />
                        <button>done</button>
                    </form>
                </div>:

            <div>

            <p>You scored {props.score} points!</p>

            {
                props.king?<h1>Congrats! You are the KING!</h1>:
                props.score<5?<h1>Wow... You don't really know Trivia, don't you?</h1>:
                props.score<10?<h1>Nah, do better next time</h1>:
                <h1>OMG, You are so Awesome!</h1>
            }
            
            <h1>current best score is {props.bestScore.score} by {props.bestScore.name} on {props.bestScore.theDay}</h1>
            <button className='btn result' onClick={()=>props.restart()}>Re-start</button>
            </div>
        }
        </div>
    )
}