import { useEffect, useState } from 'react';
import { guessList } from './constants/WordleGuesses';
import { answerList } from './constants/WordleAnswers';
import Tests from './utilities/Tests';
import Styles from './App.css';
import { getWordsStats } from './utilities/solver';

function App() {
  let words = answerList;
  let guesses = guessList;
  const [stats, setStats] = useState([]); 

  const showWords = () => {
    console.log(`Showing words: ${JSON.stringify(words)}`)
  }
 
  const showStats = () => {
    setStats(getWordsStats(words));
    console.log(`Showing stats: ${JSON.stringify(stats)}`)
  }

  let positions = ["First", "Second", "Third", "Fourth", "Fifth", "Total"];

  let maxOccurence = 0;
  stats.forEach(stat => {
    return stat.forEach(pair => maxOccurence = Math.max(maxOccurence, pair[1]))
  });

  return (
    <div className="App">
      <h1>Let's solve a wordle!</h1>
      <span>Please enter the word: </span>
      <input></input>
      <p><button onClick={showWords}>Show Me The Words</button></p>
      <p><button onClick={showStats}>Show Me The Stats</button></p>
      <hr />
       
      {words && <Tests wordList={words}/>}
    </div>
  );
}

export default App;

/* {stats && stats.map ((stat, i) => (<>
          <div className="title" key={`position${i}`}>{positions[i]}</div>
          <div className="statBox">
            <div className="stats">
            {stat.map ((letter, index) => {
              const hue = Math.ceil(255 * letter[1]/maxOccurence);
              const color = `rgb(0, ${Math.max(255-(hue), 25)}, ${Math.max(255-(hue/2), 70)})`
              return (
                <div className="inner-group">
                  <div className="single" style={{outline: `2px solid ${color}`}} key={`letter${index}`}>{letter[0]}</div>
                  <div className="single" style={{outline: `2px solid ${color}`}} key={`number${index}`}>{letter[1]}</div>
                </div> 
              )
            })}
            </div>
          </div>
      </>))} */

// stats = 
// [
// [26 instances of ["c", #]],
// [26 instances of ["c", #]],
// [26 instances of ["c", #]],
// [26 instances of ["c", #]],
// [26 instances of ["c", #]]
// ]

// stats[0] = first group of 26. stats[0]-stats[4] = i = stat
// stats[0][0] - stats[0][25] = ['c',#] = letter
// stats[0][0][0] = 'c', stats[0][0][1] = #
