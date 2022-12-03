import React from 'react';

 const Start = (props)=>{


// !< rebuilding select tag -----------------------------------------------------------------

    var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;

console.log(x.length)

for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  let hi = x[i].getElementsByTagName("select");
  console.log(hi)
    console.log(selElmnt.options)
  ll = selElmnt.length;
  console.log(ll)
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

// !> rebuilding select tag -----------------------------------------------------------------

    return(
        <div className="start">

            {/* <div className='switcher' onChange={()=>props.langSwitch()}>
                <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
                </label>
            </div> */}

            <h1>Trivia Pond</h1>
            <p>Let's check your Trivia!</p>
            <button onClick={props.getStarted}>Start Trivia</button>

            <div className='custom-select'>
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

                            {/* <option value="medium">Medium</option>
                            <option value="hard">Hard</option> */}
                        </select>
                    </label>

                </form>
            </div>
        </div>
    )
}

export default Start