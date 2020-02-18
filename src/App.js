import React, { useState, useEffect } from "react";
import "./App.css";

const Btn = props => {
  

  return (
    <a
      className="btn-small"
      onClick={() => props.handleClick()}
      id={props.idProp || ""}
    >
      {props.title}
    </a>
  );
};
const BtnOut = props => {
  const URL = `https://twitter.com/intent/tweet?hashtags=quotes&text=${props.hrefProp.replace(" ","%20")}`;

  return (
    <a
      className="btn-small"
      onClick={() => props.handleClick()}
      id={props.idProp || ""}
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.title}
    </a>
  );
};

const QuoteBox = props => {
  return (
    <div className="Quote-Box container-fluid" id="quote-box">
      <p id="text">{props.quote || ""}</p>
      <div className="row d-flex ButtonRow" style={{ borderBottom: "1px solid" }}>
        <div className="flex-grow-1"></div>
        <div className="Quote-Author" id="author">
          - {props.author || ""}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => getRandomQuote(), []);

  function getRandomQuote() {
    fetch("https://api.quotable.io/random")
      .then(response => {
        return response.json();
      })
      .then(quote => {
        setQuote(quote.content);
        setAuthor(quote.author);
      })
      .catch(error => console.error(error));
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(`"${quote}" - ${author}`);
  }

  return (
    <div className="App bg container-fluid ">
      <div className="App-Container d-flex " id="quote-box">
        <div className="flex-grow-1"></div>
        <QuoteBox quote={quote} author={author} />
        <div className="row ButtonRow" style={{ paddingTop: "15px" }}>
          <BtnOut
            title={"Tweet it"}
            handleClick={() => console.log("Tweet it")}
            idProp={"tweet-quote"}
            hrefProp={`${quote} - ${author}`}
          />
          <Btn
            title={"Get random quote!"}
            handleClick={getRandomQuote}
            idProp={"new-quote"}
          />
          <Btn
            title={"Copy to Clipboard!"}
            handleClick={() => copyToClipboard()}
          />
        </div>
      </div>
      <p style={{fontSize: "12px", opacity: 0.8}}>By <a href="http://github.com/ll-FP-ll" >llStaraill</a></p>
    </div>
  );
}

export default App;
