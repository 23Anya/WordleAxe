import { React, useRef, useState, useEffect } from 'react';
import * as solver from "../../utilities/solver";
import styles from './Solve.module.css';
import { answerList } from '../../constants/WordleAnswers';
import { initialPossibles } from '../../constants/letterConstants';
import WordleSteps from '../wordle-steps/WordleSteps';

function Solve(  ) {
  let musts = useRef([]);
  let reqs = useRef([["s", 0],["t", 0],["a", 0],["r", 0],["e", 0]]);
  let possibles = [[],[],[],[],[]];
  initialPossibles.forEach((array, i) => {
    array.forEach(letter => possibles[i].push(letter))
  });  //deep copy
  const [updatedWords, setUpdatedWords] = useState(answerList);
  const [guesses, setGuesses] = useState([]);
  
  
  const update = () => {
    musts.current = solver.updateMusts(musts.current, reqs.current);
    possibles = solver.updatePossibles(possibles, reqs.current);
    setUpdatedWords(solver.getRemainingPossibles(possibles, updatedWords, musts.current));
    const newGuess = [];
    reqs.current.forEach(req => newGuess.push([req[0], req[1]]));
    //reqs.current = [["", 0],["", 0],["", 0],["", 0],["", 0]];
    setGuesses(prevGuesses=> [...prevGuesses, newGuess]);
  };

  function reset() {
    musts.current = [];
    reqs.current = ([["s", 0],["t", 0],["a", 0],["r", 0],["e", 0]]);
    possibles = [[],[],[],[],[]];
    initialPossibles.forEach((array, i) => {
      array.forEach(letter => possibles[i].push(letter))
    });
    setUpdatedWords(answerList);
    setGuesses([]);
  };
  
  return ( 
    <div className={styles.container}>
    <h1>Please enter the results of your guesses below</h1>
      {guesses.length !== 0 && <p>Previous Guesses:</p>}
      {guesses.map((guess, index) => {
        if (index === guesses.length){
          <></>
        } else {
          return (<Guess guess={guess} key={index} />)
        }
      })}
      <WordleSteps reqs={reqs}  />
      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={update}>Update</button>
        <button className={styles.button}  onClick={(e) => console.log(`showing reqs:${JSON.stringify(reqs)}`)}>See Reqs</button>
        <button type="button" className={styles.button} onClick={reset}>Reset</button>
      </div>

      <h2 className={styles.h2}>Current List of Possible Words - {updatedWords.length > 1 ? `${updatedWords.length} words:` : "only 1 word!"}</h2>
      <div className={styles.wordsContainer}>
        <div className={styles.border}>
        {updatedWords.map(word => <span className={styles.wordBox} key={word}>{word}</span>)}</div>
      </div>
    </div> 
  );
}

//guess = [["a", 0],["b", 1],["c", 0],["d", 2],["a", 0]]
function Guess( { guess, key } ) {
  const colors = ["rgb(160, 160, 160)", "orange", "green"];
  return ( 
    <div className={styles.guess}>
      <div className={styles.guessBorder}>
        {guess.map((letter) => <span className={styles.guessLetter} style={{backgroundColor: colors[letter[1]]}}>{letter[0].toUpperCase()}</span>)}
      </div>
    </div>
   );
};

export default Solve;