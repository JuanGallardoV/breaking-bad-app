//? Juan Gallardo 14-03-2022
import React, { useState, useEffect } from 'react';
import Quote from './components/Quote';
import Spinner from './components/Spinner';

const initialQuote = {
  text: '',
  author: ''
}

function App() {

  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);

  const updateQuote = async () => {
    setLoading(true);
    const url = "https://www.breakingbadapi.com/api/quote/random";
    const res = await fetch(url);
    const [newQuote] = await res.json();

    const { quote, author } = newQuote;

    setQuote({
      text: quote,
      author: author
    })
    setLoading(false);
  }
  //! No puede ser async
  useEffect(() => {
    updateQuote();
  }, []);

  return (
    <div className='app'>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo"
      />
      <button onClick={() => updateQuote()}>Get Another</button>
      {
        loading ? <Spinner /> : <Quote quote={quote}/>
      }

    </div>
  );
}

export default App;
