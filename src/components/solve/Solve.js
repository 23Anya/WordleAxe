import { React, useEffect, useState } from 'react';
import * as solver from "../../utilities/solver";
import styles from './Solve.module.css';
import { answerList } from '../../constants/WordleAnswers';
import { initialPossibles } from '../../constants/letterConstants';
import WordleSteps from '../wordle-steps/WordleSteps';

function Solve(  ) {
  let musts = [];
  let reqs = [["s", 0],["t", 0],["a", 0],["r", 0],["e", 0]];
  let possibles = [[],[],[],[],[]];
  initialPossibles.forEach((array, i) => {
    array.forEach(letter => possibles[i].push(letter))
  });  //deep copy
  const [updatedWords, setUpdatedWords] = useState(answerList);

  const [steps, setSteps] = useState([ <WordleSteps reqs={reqs} />]);
  
  const update = () => {
    console.log(`updating: musts: ${JSON.stringify(musts)}, reqs: ${JSON.stringify(reqs)}`)
    musts = solver.updateMusts(musts, reqs);
    possibles = solver.updatePossibles(possibles, reqs);
    setUpdatedWords(solver.getRemainingPossibles(possibles, updatedWords, musts));
    setSteps(prevSteps => [prevSteps].concat([ 
    <WordleSteps reqs={reqs}  />
    ]));
  }
  console.log(`reqs in Solve: ${JSON.stringify(reqs)}`)
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