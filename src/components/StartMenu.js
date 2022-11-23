import React from 'react';

 const Start = (props)=>{


    return(
        <div className="start">

            <div className='switcher' onChange={()=>props.langSwitch()}>
                <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
                </label>
            </div>

            <h1>Trivia Pond</h1>
            <p>Let's check your Trivia!</p>
            <button onClick={props.getStarted}>Start Trivia</button>

            <div>
                <form action="">
                    <label htmlFor="category">
                        <br />
                        <select 
                        name="category" 
                        id="category"
                        value={props.formData.category}
                        onChange={props.handleChange}
                        >

                            <option value=''>Mix</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Books</option>
                            <option value="11">Film</option>
                            <option value="12">Music</option>
                            <option value="13">Musical & Theater</option>
                            <option value="14">Television</option>
                            <option value="15">Video Games</option>
                            <option value="16">Board game</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Computer</option>
                            <option value="19">Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrity</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicle</option>
                            <option value="29">Comics</option>
                            <option value="30">Gadget</option>
                            <option value="31">Japanese Anime & Mange</option>
                            <option value="32">Cartoon & Animations</option>
                        </select>
                    </label>



                    {/* <label htmlFor="difficulty">
                        <br />
                        <select 
                        name="difficulty" 
                        id="difficulty"
                        value={props.formData.difficulty}
                        onChange={props.handleChange}
                        >

                            <option value="">Mix</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label> */}

                </form>
            </div>
        </div>
    )
}

export default Start