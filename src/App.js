import React, { useState, useEffect } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

const Btn = props => {
  return (
    <a
      className="btn-small col"
      onClick={() => props.handleClick()}
      id={props.idProp || ""}
    >
      {props.title}
    </a>
  );
};
const BtnOut = props => {
  const URL = `https://twitter.com/intent/tweet?hashtags=quotes&text=${props.hrefProp.replace(
    " ",
    "%20"
  )}`;

  return (
    <a
      className="btn-small col"
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
      <div
        className="row d-flex ButtonRow"
        style={{ borderBottom: "1px solid" }}
      >
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
        <div className="flex-grow-1"></div>
        <div className="row Button-Row" style={{ paddingTop: "15px" }}>
          <Btn
            title={"Get random quote!"}
            handleClick={getRandomQuote}
            idProp={"new-quote"}
          />
          <div className="row d-flex">
            <Btn
              title={
                <FontAwesomeIcon
                  icon={["fas", "copy"]}
                  className="fa-2x"
                  style={{ padding: "5px" }}
                />
              }
              handleClick={() => copyToClipboard()}
            />
            <div className="flex-grow-1"></div>
            <BtnOut
              title={
                <FontAwesomeIcon
                  icon={["fab", "twitter"]}
                  className="fa-2x"
                  style={{ padding: "5px" }}
                />
              }
              idProp={"tweet-quote"}
              hrefProp={`${quote} - ${author}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
