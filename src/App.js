import React, {useState} from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);

  const showPrediction = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.result) {
        setResult([data.result, ...result]);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };
  

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






