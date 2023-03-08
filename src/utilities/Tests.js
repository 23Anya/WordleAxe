import * as a from './solver.js';

export default function Tests( { wordList }) {
  const possiblesArray = [
    [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  ];
  const musts = [];
  
  let possiblesArraytemp = [];
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry));
  // ["", ], ["", ], ["", ], ["", ], ["", ]
  const reqs1 = [["s", 0], ["t", 0], ["a", 0], ["r", 0], ["e", 0]]; // loyal
  const must1 = a.updateMusts(musts, reqs1);
  const remaining1 = a.updatePossibles(possiblesArray, reqs1);
  const updatedWords1 = a.getRemainingPossibles(remaining1, wordList, must1);
  const reqs2 = [["l", 0], ["u", 0], ["n", 2], ["c", 0], ["h", 0]];
  const must2 = a.updateMusts(must1, reqs2);
  const remaining2 = a.updatePossibles(remaining1, reqs2);
  const updatedWords2 = a.getRemainingPossibles(remaining2, updatedWords1, must2);
  
  /* const reqs3 = [["k", 0], ["m", 1], ["m", 2], ["m", 1], ["a", 1]];
  const must3 = a.updateMusts(must2, reqs3);
  const reqs4 = [["m", 1], ["m", 1], ["m", 1], ["m", 0], ["d", 2]];
  const must4 = a.updateMusts(must3, reqs4);
  const reqs5 = [["", ], ["", ], ["", ], ["", ], ["", ]]; */
  
  return (
    <div>
    <p style={{color: 'darkred'}}>There are {updatedWords1.length} remaining words.</p>
    {updatedWords1.map( word => <span>{word} | </span>)}
    <hr></hr>
    <p style={{color: 'darkred'}}>There are {updatedWords2.length} remaining words.</p>
    {updatedWords2.map( word => <span>{word} | </span>)}
    </div>
  )
}


      /* {newPossibles.map(possible => <span key={possible}>{possible} | </span>)} */
      /* const words = ["windy", "loyal", "myrrh", "axiom", "poppy"];
         const newPossibles = a.getRemainingPossibiles(possiblesArray, wordList, musts); */
      /* {words.map((word, i) =>
        <>
          <p>The test for {word} is {a.isWordPossible(word, possiblesArray, musts) ? "true" : "false"}.</p>
        </>
      )} *//* 
  const arr1 = a.updatePossibles(possiblesArraytemp, reqs1);
  possiblesArraytemp = [];
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry));
  const arr2 = a.updatePossibles(possiblesArraytemp, reqs2);
  possiblesArraytemp = [];
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry));
  const arr3 = a.updatePossibles(possiblesArraytemp, reqs3);
  possiblesArraytemp = [];
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry));
  const arr4 = a.updatePossibles(possiblesArraytemp, reqs4);
  possiblesArraytemp = [];
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry));
  const arr5 = a.updatePossibles(possiblesArraytemp, reqs5);
  possiblesArraytemp = [];
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry)); */