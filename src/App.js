import React, {useEffect, useState} from 'react';
import './App.css';
import {Configuration, OpenAIApi}  from "openai"

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);

  const showPrediction = () => {
    const response =  openai.createCompletion("text-davinci-002", {
      prompt: `I am the 'What-if' machine.  I answer questions that you might have. It must be a what if question, otherwise the answer will be \"not a what if\".\n\nQ: What if dogs ruled the world instead of humans?\nA: This world would look a lot like ours, except that dogs would be in charge instead of humans.  Dogs would live in houses and go to work, and they would have their own language that humans would not be able to understand.  Dogs would walk and run on their heind legs, and they would have pet humans.\n\nQ: What if I invented the finglonger?\nA: In this world, the finglonger is a device that helps people to type faster and more accurately on their smartphones and other devices.  The invention has made you very rich, and people use your invention every day.\n\nQ: What if superheroes exist, but are only 6 inches tall?\nA: The world would look a lot like ours, but superheroes would only be 6 inches tall.  They would still have powers, but would be very small, making it difficult for them to fight chrime.\n\nQ: What is the square root of banana?\nA: not a what if\n\nQ: \nQ: How many squigs are in a bonk?\nA: not a what if\n\nQ: ${text}?\nA: `,
      temperature: 0.82,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
  })
  .then((res)=> {
    console.log('result=', res.data.choices[0].text)
    setResult([res.data.choices[0].text, ...result])}
    ) ;
  }
  
  const screen = () => {
    if (!result){
     return <span className = 'spinner-loader'></span>
    }
     else {
       return <p className="result">{result[0]}</p>
     }

  }


  return (
    <div className="App">
      <h1>Welcome to Farnsworth's 'What If' Machine!</h1>
      <p>Good news everyone!  Thanks to OpenAi, the What If machine is up and running on the internet!</p>
      <div className="machine">
        <form onSubmit={(e) => {
        e.preventDefault()
        
        showPrediction() }}>

        <input type="text" placeholder="What if..." onChange={(e) => setText(e.target.value)}></input>
        <input disabled={text === ""} type='submit' value ='submit'></input>

        </form>

        <p className="result">{result[0]}</p>
      </div>
      
      {/* <div className='footer'>
            <div className="footer-links">
                
                <a className="footer-link" onClick={() => window.open('https://github.com/HelenEdwards')}><img src="assets/logo_github_icon_143196.png" title="github"/></a>
                <a className="footer-link" onClick={() => window.open("https://www.linkedin.com/in/helen-edwards-96981532/")}><img src="assets/LinkedIn_icon-icons.com_66270.png" title="linkendin" /></a>
                <a className="footer-link" onClick={() => window.open("https://heyimhelen.com")}><img src="assets/resume-icon.png" title="portfolio site"/></a>
                
            </div>
        </div>   */}
          
    </div>

  );
}

export default App;






