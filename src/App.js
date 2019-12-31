import React from 'react';
import './App.css';
import cookie from 'react-cookies';
//this.state.disabled
class App extends React.Component{

  constructor(){
    super();
    this.state={
      text: "",
      translation: "",
      loading: false,
      translation_list: "",
      disabled: true
    };
  }

  handleSpecialChar=(event)=>{
    var words=event.target.value.split(" ");
      //console.log(words);
      //console.log(words[words.length-2]);
      words[words.length-2]=this.state.translation;
      //console.log(this.state.translation);
      //console.log(words.join(" "));
      this.setState({
        text: words.join(" ")
      });
      document.getElementById("textarea").value=words.join(" ");//+" "
  }

  componentWillMount(){
    cookie.save('translateWebsite', JSON.stringify({
      "lang": "hindi"
    }));
  }

  /*keyRedirect=()=>{
     this.changeText()
  }*/

  langChange=(event)=>{
    console.log(event.target.value);
    cookie.save('translateWebsite', JSON.stringify({
      "lang": event.target.value
    }));
  }

  translateWordChange=(event)=>{
    //console.log(event);
    //console.log(event.target.value);
    this.setState({
      translation: event.target.value
    });
    var words=this.state.text.split(" ");
    //console.log(words);
    //console.log(words[words.length-2]);
    words[words.length-1]=event.target.value;
    //console.log(this.state.translation);
    //console.log(words.join(" "));
    this.setState({
      text: words.join(" ")
    });
    document.getElementById("textarea").value=words.join(" ")+" ";//+" " 
    document.getElementById("textarea").focus();
  }

  changeText=(event)=>{
    //console.log(document.getElementById("textarea").value);
    event.target.value=document.getElementById("textarea").value;
    this.setState({
      text: event.target.value
    });
    if(event.keyCode===8)
     {
       console.log("Backspace");
       console.log(event.key);
       return;
     }
    if(!this.state.disabled)
     {
       return;
     }
    var lastWord=event.target.value.split(" ").slice(-1)[0];
    var lastChar=lastWord.slice(-1);
    /*if(lastChar===',' || lastChar===',' || lastChar==='?' || lastChar==='!')
     {
      this.handleSpecialChar(event);
      return;
     }*/
    //console.log(event.target.value.split(" ").slice(-1)[0].slice(-1));
    //console.log(event.target.value.split(" ").slice(-1)[0]);
    /*if(event.target.value)
     {

     }*/
    //console.log(event.target.value.split(" "));
    //console.log("lastChar: "+lastChar);
    if(lastWord!=='')//  && lastChar!==',' && lastChar!=='.' && lastChar!=='?' && lastChar!=='!'// && lastChar===',' && lastChar===',' && lastChar==='?' && lastChar==='!'
     {
       //console.log(lastWord);
       /*if(lastChar===',' || lastChar==='.' || lastChar==='?' || lastChar==='!')
        {
          console.log("Kuch to karna padega!");
          console.log(event.target.value.split(lastChar));
        }*/
       this.setState({
        loading: true,
        disabled: false
      });
      console.log("Sending Request!");
       fetch(`http://146.148.85.67/processWordJSON?inString=${lastWord}&lang=${cookie.load('translateWebsite').lang}`,{
        //fetch('https://xlit.quillpad.in/quillpad_backend2/processWordJSON?lang=tamil&inString=namast',{
          method: "get",
          /*headers: {
              //"Access-Control-Allow-Origin": "*",
              //'Content-type':'text/html;charset=utf-8'
          }*/
      })
      .then((resp)=>{
        if(resp.status===200)
        {
          this.setState({
            loading: false,
            disabled: true
          });
          document.getElementById("textarea").focus();
        }
        return resp;
      })
      .then(response => response.json())
      .then(data=>{
        console.log(data);
        this.setState({
          translation: data.itrans
        });
        this.setState({
          translation_list: data.twords[0].options
        });
        //console.log(data.twords[0].optmap);
        document.getElementById("textarea").value=this.state.text;//+" "
      }).catch((err)=>{
        console.log(err);
      });
     }
    else{
      /*if(lastChar==="") 
       {
        console.log("Last Space: "+lastChar);   
       }
      else{
        console.log("Last Char: "+lastChar);
      }*/
      //document.getElementById("textarea").value=this.state.text;//+" "
      var words=event.target.value.split(" ");
      //console.log(words);
      //console.log(words[words.length-2]);
      words[words.length-2]=this.state.translation;
      //console.log(this.state.translation);
      //console.log(words.join(" "));
      this.setState({
        text: words.join(" ")
      });
      document.getElementById("textarea").value=words.join(" ");//+" " 
      /*if(lastChar!==" " && lastChar!=="")
       {
          console.log(words.join(" "));
          document.getElementById("textarea").value=words.join(" ");//+" " 
       }
      else
       {
          document.getElementById("textarea").value=words.join(" ");//+" " 
       }*/
    }
    //console.log("Last Word:"+event.target.value.split(" ")[-1]);
  }

  render(){
    return (
      <div className="main-container"><div>
            <div className="langOption-container">
                <button type="button" className="btn-lang" onClick={this.langChange} value="hindi">Hindi</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="tamil">Tamil</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="telugu">Telugu</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="bengali">Bengali</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="gujarati">Gujarati</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="marathi">Marathi</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="kannada">Kannada</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="malayalam">Malayalam</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="punjabi">Punjabi</button>
                <button type="button" className="btn-lang" onClick={this.langChange} value="nepali">Nepali</button>
            </div>
            <div className="textbox-container">
                <textarea className="textbox" id="textarea" disabled={false} rows="10" cols="60" onKeyUp={(event)=>{
                  this.changeText(event);
                }} autoFocus></textarea>
                {/*Namastey Duniyaa!*/}
            </div>
            <div className="translation-container">
              <div>
                {
                  this.state.loading
                  ?<div>
                    <p><button type="button" className="btn-translation">Loading...</button></p>
                  </div>
                  :<div>
                      {/*<p>Namastey Duniyaa!</p>*/}
                      <p>{this.state.translations}</p>
                      {
                        this.state.translation_list!==""?this.state.translation_list.map((data)=>{
                          //console.log(data);
                          return(
                            <button type="button" id={data} className="btn-translation" value={data} onClick={this.translateWordChange}>{data}</button>
                          );
                        })
                        :<div></div>
                      }
                   </div>
                }
              </div>
            </div>
          </div>
          
      </div>
    );
  }
}

export default App;
/*<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>*/