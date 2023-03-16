import styles from './WordleSteps.module.css';
import { alphabetArray } from '../../constants/letterConstants'
import { useEffect, useState } from 'react';

function WordleSteps( { reqs, setReqs } ) {
  // reqs ex: [["l", 2], ["o", 1], ["y", 1], ["a", 1], ["l", 0]] 
  useEffect(() => {
    reqs.current = [["s", 0],["t", 0],["a", 0],["r", 0],["e", 0]];
  }, [])
  console.log(`reqs after use effect: ${JSON.stringify(reqs)}`)
  return ( 
    <div className={styles.container}>
      <div className={styles.guessContainer}>
        <div className={styles.border}>
          <LetterSelect index={0} reqs={reqs} setReqs={setReqs}/>
          <LetterSelect index={1} reqs={reqs} setReqs={setReqs}/>
          <LetterSelect index={2} reqs={reqs} setReqs={setReqs}/>
          <LetterSelect index={3} reqs={reqs} setReqs={setReqs}/>
          <LetterSelect index={4} reqs={reqs} setReqs={setReqs}/>
        </div>
        <div className={styles.space}></div>
      </div>
    </div>   
  );
};
//reqs = [["a", 0],["a", 0],["a", 0],["a", 0],["a", 0]]
function LetterSelect( {index, reqs, setReqs}) {
  const colors = ["rgb(160, 160, 160)", "orange", "green"];
  const [resultColor, setResultColor] = useState(colors[0]);
  const changeResult = () => {
    const i = colors.indexOf(resultColor);
    const newColor = colors[(i + 1) % 3];
    const newReqs = reqs.map((req, i) => { return (
      i === index ? [req[0], (i + 1) % 3] :
      [req[0], req[1]])
    });
    setReqs(newReqs);
    console.log(`reqs in LetterSelect: ${JSON.stringify(reqs)}`)
    setResultColor(newColor);
  };
  
  return ( 
    <div className={styles.column}>
      <div className={styles.guessBox}
        style={{backgroundColor: resultColor}}>
        <select
          defaultValue={reqs[index][0]}
          onChange={(e) => {
            const newReqs = reqs.map((req, i) => { return (
              i === index ? [e.target.value, req[1]] :
              [req[0], req[1]])
            });
            setReqs(newReqs);
          }}
        >{/* reqs[index][0] = e.target.value */}
          {alphabetArray.map(letter =>
            <option 
              key={letter} 
              value={letter}
            >{letter.toUpperCase()}</option>
          )}
        </select>
      </div>
      <div 
        className={styles.resultBox} 
        style={{backgroundColor: resultColor}}
        onClick={changeResult}
      ></div>
    </div>
   );
}


export default WordleSteps;