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
        <div className="start">

            {props.newBest?
                <div className='fin-text'>
                    <h1>Congrats! It's a new Best Score!</h1>
                    <h1>Please tell me your name!</h1>
                    <form onSubmit={handleSubmit} className='simple-flex'>
                        <input type="text"
                        className='text-box'
                        value={theName}
                        required
                        placeholder='Type your name here'
                        onChange={(e)=>setTheName(e.target.value)} />
                        <button className='btn'>Register</button>
                    </form>
                </div>:

            <div className='fin-text'>
                    <h1>You scored {props.score} points!</h1>

                    {
                        props.king?<h1>Congrats! You are the KING!</h1>:
                        props.score<5?<h1>I like the way you don't care about the world...</h1>:
                        props.score<10?<h1>Not bad! but either good</h1>:
                        props.score<=15?<h1>You were the smartest kid in a class, weren't you?</h1>:
                        <h1>Please tell me you will use your mega-mind for good.</h1>
                    }
                    <br /> 

                    {props.bestScore?
                    <h1>Current best score on your device is {props.bestScore.score} by {props.bestScore.name} on {props.bestScore.theDay}</h1>
                    :null
                }
                    <br />
                    <button className='btn' onClick={()=>props.restart()}>Re-start</button>
            </div>
        }
        </div>
    )
}