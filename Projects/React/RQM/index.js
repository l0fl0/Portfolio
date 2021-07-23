function RandomQuoteMachine() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [color, setColor] = React.useState("#919b91");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const data = await response.json();

      setQuotes(data.quotes);
      let randomIndex = Math.floor(Math.random() * data.quotes.length);
      setRandomQuote(data.quotes[randomIndex]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    const colors = [
      "#092c17",
      "#84a48a",
      "#c8a626",
      "#88190f",
      "#b96342",
      "#720e0b",
      "#ff7f50",
      "#808000",
      "#0d3b26",
      "#919b91",
    ];
    let randomColorIndex = Math.floor(Math.random() * colors.length)
    let randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
    setColor(colors[randomColorIndex])
  };

  return (
      <div style={{backgroundColor:color, height: "100vh"}}>
          <div className='container pt-5' >
      <div className='card' style={{color: color}}>
        <div className='card-body' id="quote-box">
          {randomQuote ? (
            <>
              <p className='card-text' id="text">
                <i className='fa fa-quote-left'></i>
                {"  "}
                {randomQuote.quote} <i className='fa fa-quote-right'></i>
              </p>
              <h6 className='card-subtitle' id="author">
                - {randomQuote.author || "unknown"}
              </h6>
            </>
          ) : (
            <h3>...Loading</h3>
          )}

          <div className='links'>
            <a href="twitter.com/intent/tweet" target='_blank' className=' btn btn-twitter' id="tweet-quote">
              <i className='fa fa-twitter'></i>
            </a>
            <a href='#' target='_blank' className='btn btn-tumblr' id="tumblr-quote">
              <i className='fa fa-tumblr'></i>
            </a>
            <button onClick={getNewQuote} className=' btn btn-warning' id="new-quote">
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
      </div>
    
  );
}

ReactDOM.render(<RandomQuoteMachine />, document.getElementById("app"));
