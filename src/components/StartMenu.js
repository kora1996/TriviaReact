import React from 'react';

 const Start = (props)=>{


// !< rebuilding select tag -----------------------------------------------------------------
// !> rebuilding select tag -----------------------------------------------------------------

    return(
        <div className="start">

            <h1>Trivia Pond</h1>
            <p>Let's check your Trivia!</p>
            <button className='btn' onClick={props.getStarted}>Start Trivia</button>

            <div >
                <form action="">
                    <label htmlFor="category">
                        <br />
                        <select 
                        name="category" 
                        id="category"
                        value={props.formData.category}
                        onChange={props.handleChange}
                        className="btn selection"
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



                    <label htmlFor="language">
                        <br />
                        <select 
                        name="language" 
                        id="language"
                        value={props.formData.language}
                        onChange={props.handleChange}
                        className='btn selection'
                        >

                            <option value="en">English</option>
                            <option value="ar">Arabic</option>
                            <option value="az">Azerbaijani</option>
                            <option value="zh">Chinese</option>
                            <option value="cs">Czech</option>
                            <option value="da">Danish</option>
                            <option value="nl">Dutch</option>
                            <option value="eo">Esperanto</option>
                            <option value="fi">Finnish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="el">Greek</option>
                            <option value="he">Hebrew</option>
                            <option value="hi">Hindi</option>
                            <option value="hu">Hungarian</option>
                            <option value="id">Indonesian</option>
                            <option value="ga">Irish</option>
                            <option value="it">Italian</option>
                            <option value="ja">Japanese</option>
                            <option value="ko">Korean</option>
                            <option value="fa">Persian</option>
                            <option value="pl">Polish</option>
                            <option value="pt">Portuguese</option>
                            <option value="ru">Russian</option>
                            <option value="sk">Slovak</option>
                            <option value="es">Spanish</option>
                            <option value="sv">Swedish</option>
                            <option value="tr">Turkish</option>
                            <option value="uk">Ukranian</option>

                        </select>
                    </label>

                </form>
            </div>
        </div>
    )
}

export default Start