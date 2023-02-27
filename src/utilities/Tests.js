import * as a from './solver.js';

export default function Tests( { wordList }) {
  const possiblesArray = [
    [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  ];
  const musts = [["e", 0, 2], ["i", 1, 0]];

  let possiblesArraytemp = [];
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry));
  // ["", ], ["", ], ["", ], ["", ], ["", ]
  const reqs1 = [["p", 2], ["y", 1], ["p", 2], ["u", 1], ["p", 1]];
  const reqs2 = [["l", 1], ["o", 1], ["y", 1], ["a", 1], ["l", 2]];
  const reqs3 = [["s", 1], ["t", 1], ["a", 0], ["r", 0], ["e", 2]];
  const reqs4 = [["a", 0], ["a", 0], ["a", 0], ["a", 0], ["a", 0]];
  const reqs5 = [["a", 2], ["d", 1], ["d", 1], ["a", 0], ["e", 0]];
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
  possiblesArray.forEach(entry => possiblesArraytemp.push(entry));

  return (
    <div>
      <p>Array 1: <br /> {arr1.map((arr, i) => <span key={i} >{JSON.stringify(arr)}<br/></span>)}</p>
      <hr />
      <p>Array 2: <br /> {arr2.map((arr, i) => <span key={i} >{JSON.stringify(arr)}<br/></span>)}</p>
      <hr />
      <p>Array 3: <br /> {arr3.map((arr, i) => <span key={i} >{JSON.stringify(arr)}<br/></span>)}</p>
      <hr />
      <p>Array 4: <br /> {arr4.map((arr, i) => <span key={i} >{JSON.stringify(arr)}<br/></span>)}</p>
      <hr />
      <p>Array 5: <br /> {arr5.map((arr, i) => <span key={i} >{JSON.stringify(arr)}<br/></span>)}</p>
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
      )} */