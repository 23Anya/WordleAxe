import { React, useRef, useState } from 'react';
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

  const [steps, setSteps] = useState([ <WordleSteps reqs={reqs} />]);
  
  const update = () => {
    console.log(`updating: musts: ${JSON.stringify(musts.current)}, reqs: ${JSON.stringify(reqs.current)}`)
    musts.current = solver.updateMusts(musts.current, reqs.current);
    possibles = solver.updatePossibles(possibles, reqs.current);
    setUpdatedWords(solver.getRemainingPossibles(possibles, updatedWords, musts.current));
    setSteps(<WordleSteps reqs={reqs}  />);
  }
  console.log(`reqs in Solve: ${JSON.stringify(reqs.current)}`)
  return ( 
    <div className={styles.container}>
    <h1>Please enter the results of your guesses below</h1>
      {steps}
      <button type="button" className={styles.button} onClick={update}>Update</button>
      <h2 className={styles.h2}>Current List of Possible Words - {updatedWords.length} words</h2>
      <div className={styles.wordsContainer}>
        <div className={styles.border}>
        {updatedWords.map(word => <span className={styles.wordBox} key={word}>{word}</span>)}</div>
      </div>
    </div> 
  );
}

export default Solve;