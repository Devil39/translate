import React from 'react';
import './App1.css';
import cookie from 'react-cookies';
//this.state.disabled
class App extends React.Component{

  constructor(){
    super();
    this.state={
      text: "",
      translation: "",
      loading: false,
      translation_list: [],
      disabled: false,
      lang: "hindi"
    };
  }

  downloadCSV=()=>{
    window.open(`https://obscure-gorge-36873.herokuapp.com/download?lang=${cookie.load('translateWebsite').lang}`);
    // window.open(`http://localhost:8010/download1?lang=${cookie.load('translateWebsite').lang}`);
  }

  replaceAt=(string, index, replacement)=>{
    return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
  }

  // handleSpecialChar=(event)=>{
  //   var words=event.target.value.split(" ");
  //     //console.log(words);
  //     //console.log(words[words.length-2]);
  //     words[words.length-2]=this.state.translation;
  //     //console.log(this.state.translation);
  //     //console.log(words.join(" "));
  //     this.setState({
  //       text: words.join(" ")
  //     });
  //     document.getElementById("textarea").value=words.join(" ");//+" "
  // }

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
    this.setState({
      lang: event.target.value
    });
    document.getElementById("textarea").focus();
  }

  storeInDatabase=(wordToBeSent)=>{
    console.log("<-------------------Yaa here!---------------->");
    console.log(JSON.stringify({
      "input": wordToBeSent,
      "transliteration": this.state.translation_list[0],
      "lang": cookie.load('translateWebsite').lang
    }));
    fetch("https://obscure-gorge-36873.herokuapp.com/insert",{
        //fetch('https://xlit.quillpad.in/quillpad_backend2/processWordJSON?lang=tamil&inString=namast',{
          method: "post",
          headers: {
            'Content-type':'application/json',
            'Accept':'application/json',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          },
          body: JSON.stringify({
            "input": wordToBeSent,
            "transliteration": this.state.translation_list[0],
            "lang": cookie.load('translateWebsite').lang
          })
      })
      .then(res=>res.json())
      .then((data)=>{
        console.log("Data:"+JSON.stringify(data));
        if(data.success)
          {
            console.log("Something!");
            // resolve();
          }
      });
    // $.ajax({
    //   type: 'POST', url: 'http://localhost:3030/api/purchase', data: {
    //     email: "test@email.com"
    //   },
    // }).done(function(res) {
    //   console.log(res);
    // })
  }

  fetchCall=(a, disable)=>{
    //Promise pr((){});
    //console.log("Sending Request For: "+a);
    if(disable)
     {
       this.setState({
         disabled: true
       });
     }
    return new Promise((resolve, reject)=>{
      fetch(`${process.env.REACT_APP_API_URL}?inString=${a}&lang=${cookie.load('translateWebsite').lang}`,{
        //fetch('https://xlit.quillpad.in/quillpad_backend2/processWordJSON?lang=tamil&inString=namast',{
          method: "get",
      })
      .then((resp)=>{
        if(resp.status===200)
        {
          this.setState({
            loading: false
          });
          document.getElementById("textarea").focus();
        }
        return resp;
      })
      .then(response => response.json())
      .then(data=>{
        console.log(data);
        this.setState({
          translation: data.itrans,
          
        });
        this.setState({
          translation_list: data.twords[0].options
        });
        if(disable)
         {
           this.setState({
            disabled: false
           });
           //console.log("As Disabled:"+data.itrans);
         }
        resolve();
        //document.getElementById("textarea").value=this.state.text;//+" "
      })
      // .then(()=>{
      //   if(!disable)
      //    {
      //      resolve();
      //    }
      // })
      .catch((err)=>{
        console.log(err);
        this.setState({
          disabled: false
         });
         document.getElementById("textarea").focus();
         //alert("Error!");
        reject();
      });
    });
  }

  translate = async (event)=>{
    console.log(event.key);
    //console.log(String.fromCharCode(event.keyCode));
    //if((event.key>='a' && event.key<='z') || (event.key>='A' && event.key<='Z'))
    if(this.state.lang==="english")
     {
       return;
     }
    if(event.key==="Enter")
     {
       console.log(document.getElementById("textarea").value+"\n");
     }
    if(event.key.length===1 && ((event.key>='a' && event.key<='z') || (event.key>='A' && event.key<='Z')))
     {
       //console.log(event.key);
       //console.log(this.state.text+event.key);
       this.setState({
        text: this.state.text+event.key
      });
      //var lastWord="";
      var l=document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" ").splice(-1)[0].length;
      console.log(document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" ").splice(-1)[0].length);
      console.log(document.getElementById("textarea").value.length-l);
      console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l));
      console.log("(1)Sending Request for: "+this.state.text+event.key);
      this.fetchCall(this.state.text+event.key);
      /*fetch(`http://146.148.85.67/processWordJSON?inString=${this.state.text+event.key}&lang=${cookie.load('translateWebsite').lang}`,{
        //fetch('https://xlit.quillpad.in/quillpad_backend2/processWordJSON?lang=tamil&inString=namast',{
          method: "get",
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
        //document.getElementById("textarea").value=this.state.text;//+" "
      }).catch((err)=>{
        console.log(err);
      });*/
     }
    else if(event.key===' ' || event.key===',' || event.key==='.' || event.key==='!' || event.key==='?' || event.key==="Enter" || event.key===';')
     {
       var specialChar=event.key;
       console.log("Setting the word");
       this.setState({
         text: "",
         disabled: true
       });
       var something=document.getElementById("textarea").value;
       var textValue=document.getElementById("textarea").value;
       var wordToBeSent;
       var l1=document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" ").splice(-2)[0].length;
       //something[something.lenth-1=" ";
       something=this.replaceAt(something, something.length-1, " ");
       var l=something.split("\n").splice(-1)[0].split(" ").splice(-2)[0].length;
       //console.log(something);
       //textValue=textValue.substr(0, textValue.length-1).split(" ");
       //console.log(textValue.splice(-1));
       //console.log(this.state.translation);
       //console.log(something.split(" "));
       //console.log(something.split(" ").length);
       //console.log(something.split(" ")[something.split(" ").length-2]);
       wordToBeSent=something.split(" ")[something.split(" ").length-2];
       if(/\r|\n/.exec(something))//.split(" ")
        {
          //console.log(something);
          //console.log(something.split("\n")[something.split("\n").length-1].replace(" ", ""));
          //console.log(something.split(" ")[0].split("\n")[1]);//.split("/n")//.splice(-1)[0]
          //console.log(something.split(" ").splice(-1)[0].includes("\n"));
          //console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1));
          //console.log(document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" ").splice(-2)[0]);
          //console.log();
          wordToBeSent=something.split("\n").splice(-1)[0].split(" ").splice(-2)[0];
          //wordToBeSent=something.split("\n")[something.split("\n").length-1].replace(" ", "")//something.split(" ")[0].split("\n")[1]//something.split(" ").splice(-1)[0].includes("\n");
        }
       console.log("(2)Sending Request for: "+wordToBeSent);//something.split(event.key)[something.split(event.key).length-1]
       await this.fetchCall(wordToBeSent, true);
       await this.storeInDatabase(wordToBeSent);
       //await console.log(this.state.translation);
       //something.split(" ")[something.split(" ").length-2]=this.state.translation;
       var a=something.split(" ")[something.split(" ").length-2].length+1;
       //something.slice(-a)="";
       //console.log(something.length-a);//something.slice(-a)
       //console.log(something.length-2);
       //console.log(something.substr(0, something.length-a)+this.state.translation+" ");
       //console.log(specialChar);
       //console.log(/\r|\n/.exec(something));
       //console.log(this.state.translation_list[0]);
      if(specialChar!==" " && specialChar!=="Enter")
       {
         //document.getElementById("textarea").value=something.substr(0, something.length-a)+this.state.translation_list[0]+specialChar+" ";
         //console.log("Here!");
         console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1));
         console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l));
         document.getElementById("textarea").value=document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+" "+this.state.translation_list[0]+specialChar+" ";
       }
      else if(specialChar==="Enter")
       {
          console.log("Enter Pressed!");
          //console.log(something.split("\n"));
          //console.log(something.split("\n").splice(-1)[0].split(" ").splice(-1)[0].length);
          document.getElementById("textarea").value=something.substr(0, something.length-a)+this.state.translation_list[0]+"\n";//document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+this.state.translation_list[0]+"\n"
          //console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+this.state.translation_list[0]+"\n");
       }
      else{
        //console.log(document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" ").splice(-2)[0]);
        //console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+this.state.translation_list[0]+" ");
        document.getElementById("textarea").value=document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+this.state.translation_list[0]+" ";//something.substr(0, something.length-a)+this.state.translation_list[0]+" ";
      }
       /*setTimeout(this.setState({
         disabled: false
       }), 100);*/
       this.setState({
        translation_list: []
      });
      document.getElementById("textarea").focus();
     }
    else if(event.key==="Backspace")
     {
       var textValue=document.getElementById("textarea").value;
       console.log(textValue[textValue.length]);
       if(textValue[textValue.length-1]===" " || textValue[textValue.length-1]==="," || textValue[textValue.length-1]==="." || textValue[textValue.length-1]==="?" || textValue[textValue.length-1]==="!")
        {
          return;
        }
       console.log(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0]));
       if(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0])!==null)
        {
          console.log(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0]));
          if(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0]).length===1)
          {
            //console.log(words);
            //console.log("\n"+words.join(" ")+" ");
            l=document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" ").splice(-2)[0].length;
            console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+"\n"+this.state.translation_list[0]+" ");
            console.log(document.getElementById("textarea").value.split("\n").splice(-1)[0]);
            textValue=document.getElementById("textarea").value.split("\n").splice(-1)[0];
            console.log("(3)Sending Request for: "+textValue);
            this.fetchCall(textValue);
            this.setState({
              text: textValue//document.getElementById("textarea").value//this.state.text.substr(0, this.state.text.length-1)
            });
            return;
            //console.log("(3)Sending Request for: "+textValue);
            //this.fetchCall(textValue);
            //document.getElementById("textarea").value=document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+"\n"+this.state.translation_list[0]+" ";
            /*this.setState({
              text: ""
            });*/
          }
        }
       //console.log("Backing Space");
       //console.log(this.state.text.substr(0, this.state.text.length-1));
       //console.log(document.getElementById("textarea").value);
       this.setState({
         text: document.getElementById("textarea").value//this.state.text.substr(0, this.state.text.length-1)
       });
       //console.log("Sending Request for: "+textValue);
       //console.log(textValue[textValue.length-1]);
       textValue=textValue.substr(0, textValue.length).split(" ").splice(-1);
       //console.log("Splitted Input:"+textValue.substr(0, textValue.length).split(" "));
       //console.log("Sending Request for: "+document.getElementById("textarea").value);
       //this.fetchCall(document.getElementById("textarea").value);
       console.log("(3)Sending Request for: "+textValue);
       this.fetchCall(textValue);
       this.setState({
         text: textValue
       });
       /*fetch(`http://146.148.85.67/processWordJSON?inString=${document.getElementById("textarea").value}&lang=${cookie.load('translateWebsite').lang}`,{
        //fetch('https://xlit.quillpad.in/quillpad_backend2/processWordJSON?lang=tamil&inString=namast',{
          method: "get",
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
        //document.getElementById("textarea").value=this.state.text;//+" "
      }).catch((err)=>{
        console.log(err);
      });*/
     }
  }

  translateWordChange=(event)=>{
    //console.log(event);
    //console.log(event.target.value);
    this.setState({
      translation: event.target.value,
      text: ""
    });
    var words=document.getElementById("textarea").value.split(" ");
    words[words.length-1]=event.target.value;
    this.setState({
      text: words.join(" ")
    });
    var l=document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" ").splice(-2)[0].length;
    console.log(words.join(" "));
    console.log(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0]));
    console.log(document.getElementById("textarea").value.split("\n").splice(-1)[0].split(" "));//.splice(-3)[0]
    console.log(document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+"\n"+this.state.translation_list[0]+" ");
    console.log(document.getElementById("textarea").value.split(" "));
    if(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0])!==null)
     {
      //console.log(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0]));
      if(/\r|\n/.exec(document.getElementById("textarea").value.split(" ").splice(-1)[0]).length===1)
      {
        console.log(words);
        console.log("\n"+words.join(" ")+" ");
        document.getElementById("textarea").value=document.getElementById("textarea").value.substr(0, document.getElementById("textarea").value.length-l-1)+"\n"+this.state.translation_list[0]+" ";
        console.log("Set State 1");
        this.setState({
          text: ""
        });
      }
     }
    else{
      document.getElementById("textarea").value=words.join(" ")+" ";
    }
    document.getElementById("textarea").focus();
    console.log("Set State 2");
    this.setState({
      translation_list: [],
      text: ""
    });
  }

  changeText=(event)=>{
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
    if(lastWord!=='')
     {
       this.setState({
        loading: true,
        disabled: false
      });
      console.log("Sending Request!");
       fetch(`http://146.148.85.67/processWordJSON?inString=${lastWord}&lang=${cookie.load('translateWebsite').lang}`,{
        //fetch('https://xlit.quillpad.in/quillpad_backend2/processWordJSON?lang=tamil&inString=namast',{
          method: "get",
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
        document.getElementById("textarea").value=this.state.text;//+" "
      }).catch((err)=>{
        console.log(err);
      });
     }
    else{
      var words=event.target.value.split(" ");
      words[words.length-2]=this.state.translation;
      this.setState({
        text: words.join(" ")
      });
      document.getElementById("textarea").value=words.join(" ");
    }
  }

  render(){
    return (
      <div className="main-container"><div>
            <div className="currentLangContainer">Current Language: {this.state.lang.toUpperCase()}</div>
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
                <button type="button" className="btn-lang" onClick={this.langChange} value="english">English</button>
            </div>
            {/*<div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary">Left</button>
              <button type="button" class="btn btn-secondary">Middle</button>
              <button type="button" class="btn btn-secondary">Right</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="hindi">Hindi</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="tamil">Tamil</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="telugu">Telugu</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="bengali">Bengali</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="gujarati">Gujarati</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="marathi">Marathi</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="kannada">Kannada</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="malayalam">Malayalam</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="punjabi">Punjabi</button>
              <button type="button" className="btn btn-secondary" onClick={this.langChange} value="nepali">Nepali</button>
              </div>*/}
            <div className="textbox-container">
                <textarea className="textbox" id="textarea" disabled={this.state.disabled} rows="10" cols="60" onKeyUp={(event)=>{
                  //this.changeText(event);
                  this.translate(event);                
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
                  :<div className="btn-wrapper">
                      {/*<p>Namastey Duniyaa!</p>*/}
                      <p>{this.state.translations}</p>
                      {
                        this.state.translation_list.length!==0?this.state.translation_list.map((data)=>{
                          //console.log(data);
                          return(
                            <button type="button" id={data} className="btn-translation" value={data} onClick={this.translateWordChange}>{data}</button>
                          );
                        })
                        :<button type="button" className="btn-translation"></button>
                      }
                   </div>
                }
              </div>
            </div>
            <div className="download-btn-container">
              <button type="button" className="btn-lang" onClick={this.downloadCSV}>Dowload csv for current language</button>
            </div>
          </div>
          
      </div>
    );
  }
}

export default App;
/*<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>*/