
export function solve (word) {
  console.log({word});

}

export function getWordsStats(wordArray) {
  
  const letterCount = [
    {'a':0,'b':0,'c':0, 'd':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0},
    {'a':0,'b':0,'c':0, 'd':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0},
    {'a':0,'b':0,'c':0, 'd':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0},
    {'a':0,'b':0,'c':0, 'd':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0},
    {'a':0,'b':0,'c':0, 'd':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0},
    {'a':0,'b':0,'c':0, 'd':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0}
  ];
  
  /* const letterArray = [['a',0],['b',0],['c',0], ['d',0],['e',0],['f',0],['g',0],['h',0],['i',0],['j',0],['k',0],['l',0],['m',0],['n',0],['o',0],['p',0],['q',0],['r',0],['s',0],['t',0],['u',0],['v',0],['w',0],['x',0],['y',0],['z',0]]; */
 
  wordArray.forEach((word) => {
    const letters = word.split('');
    for (let i = 0; i < 5; i++) {
      letterCount[i][letters[i]] = letterCount[i][letters[i]]+1;
      letterCount[5][letters[i]] = letterCount[5][letters[i]]+1;
    };
  })
  
  
  let letterStats = [];
  for (let i = 0; i < letterCount.length; i++) {
    letterStats[i] = rankLetters(letterCount[i]);
  };
  
  return letterStats;
}

/* 
 param letters: {'a':#,'b':#,'c':#, 'd':#,'e':#,'f':#,'g':#,'h':#,'i':#,'j':#,'k':#,'l':#,'m':#,'n':#,'o':#,'p':#,'q':#,'r':#,'s':#,'t':#,'u':#,'v':#,'w':#,'x':#,'y':#,'z':#}
  returns an array of arrays [occurences, letter] with the letters in descending order
*/
function rankLetters (letters) {
  const rankedLetters = [];
  // read the number of occurences values into an array
  let rankedNumbers = Object.values(letters);

  // sort this array high to low
  rankedNumbers.sort((a, b) => {
      if (a > b) return -1;
      else if (a < b) return 1;
      else return 0
  }
  );
  
  // finds the key in an object given a value
  const key = (obj, value) => {
    return (Object.keys(obj).find(key => obj[key] === value))
  };
  
  // Add the key, value pairs back into an object
  // They will be added in descending order
  rankedNumbers.forEach((number) => {
    let letter = key(letters, number);
    rankedLetters.push([letter, number]);
    delete letters[letter];
  });
  return rankedLetters;
}

// given letters, positions and antipositions, 
// return all possible words
// couldBeArray: an array of length 5, each place represents
// that place in a word.  It contains any letter that could be
// in that place
//  wordList - an array of the possible words before execution
export function getRemainingPossibiles(possibleArray, wordList, musts) {
  let possibileWords = [];
  wordList.forEach((word) => {
    if (isWordPossible(word, possibleArray, musts)){
      possibileWords.push(word);
    };
  })
  //console.log(`Possible words length: ${possibileWords.length}`)
  return possibileWords;
}

// given an array of possible letter arrays, update it
// according to new reqs
// param reqs: array of 5, representing the positions
// at each position in array, a pair ["a", 0|1|2], where
// 0 means not in word, 1 means in word in wrong place
// 2 means in word at the place.
// returns updated possible array in line with new reqs

// for a req like 
// [["l", 1], ["o", 1], ["y", 1], ["a", 1], ["l", 0]]
// it removes all occurences of "l", not desired outcome
// desired result is it would remove l from first and last
// places. 
export function updatePossibles(possibleArray, requirements){
  let newPossibles = [];
  possibleArray.forEach(array => {
    newPossibles.push([].concat(array));
  });
  let reqIndices = [0, 1, 2, 3, 4];

  let i = 0;
  while (reqIndices.length > 0) {
    const currentLetter = requirements[i][0];
    // get all indices of reqs with the same letter
    const occurences = getAllIndices(requirements, currentLetter);
    
    // case: only 0's: remove from all positions
    if (occurences.every(occurence => (requirements[occurence][1] === 0))) {
      newPossibles.forEach((array, index) => {
        if (array.length > 1) newPossibles[index] = array.filter(letter => letter !== currentLetter)
      })
      
    // case: 0's and 1's only (covers all 1's): remove only from those positions
    } else if (occurences.every(occurence => 
      (requirements[occurence][1] === 0 || requirements[occurence][1] === 1))) {
      occurences.forEach(spot => {
        if (newPossibles[spot].length > 1) newPossibles[spot] = newPossibles[spot].filter(letter => letter !== currentLetter && (newPossibles[spot].length > 1))});
    
      // case: only 2's: at those places, set that value.
    } else if (occurences.every(occurence => (requirements[occurence][1] === 2))) {
      occurences.forEach(place => {
        newPossibles[place] = [currentLetter]
      });
    
      // case: 0's and 2's only : keep only in 2 positions, remove all others
    } else if (occurences.every(occurence => (requirements[occurence][1] === 0 || requirements[occurence][1] === 2))) {
      newPossibles.forEach((array, index) => {
        if (array.length > 1) { // =1 means value there is known already
          (requirements[index][1] === 2) ? 
          newPossibles[index] = [currentLetter] :
          newPossibles[index] = array.filter(letter => letter !== currentLetter)
        }
      });
    
      // case: 0's, 1's, 2's (covers 1's only): Keep 2 positions, remove from 0 or 1 position
    } else {
      occurences.forEach(place => {
        if (newPossibles[place].length > 1) {requirements[place][1] === 2 ?
        newPossibles[place] = [currentLetter] : 
        newPossibles[place] = newPossibles[place].filter(letter => letter !== currentLetter);}
      })
    }
    //remove visited req indices
    reqIndices = reqIndices.filter(originalIndex => requirements[originalIndex][0] !== currentLetter);
    i++;
  }
  return newPossibles;
}

 
// @param musts: array of objects [{letter: [#1, #2]], {letter: [#1, #2]}] of:
// letter- a letter the word must contain
// #1 - if nonzero, at least that many occurences
// #2 - if nonzero, exactly that many occurences, no more
// @param reqs: array of 5 letter/number arrays that represent 
// the result of a 'guess' in the game. The letter is
// the letter guessed at that position, the number 
// is the "color" result: 0 = no more, 1 = one but not
// in that place, 2 = that letter in that place
// updateMusts takes a current list of musts and updates
// it according to the reqs
// reqs ex: [["l", 2], ["o", 1], ["y", 1], ["a", 1], ["l", 0]]
// musts ex: [{"a": [1, 0]}, {"e": [0, 2]}]
export function updateMusts(musts, reqs) {
  let reqIndices = [0, 1, 2, 3, 4];
  const newMusts = [];
  musts.forEach((must, i) => newMusts[i].concat(must) );

  while (reqIndices.length > 0) {
    const currentLetter = reqs[reqIndices[0]][0];
    // get all indices of reqs with the same letter
    const occurences = getAllIndices(reqs, currentLetter);
    let must = createMust(reqs, currentLetter);
    let mustAlreadyExists = doesMustsContain(musts, currentLetter);
    if (mustAlreadyExists) {
      musts
    }
    
    //remove visited req indices
    reqIndices = reqIndices.filter(originalIndex => requirements[originalIndex][0] !== currentLetter);
  }
  // look at reqs[0], find all occurence of reqs[0][0].
  // Get total, remove them from reqs. Are any reqs[0][1] 
  // 0?  Then you have exact number.
  // look at musts.  If it doesn't contain reqs[0][0], add it.
  return newMusts;
}

function doesMustsContain(musts, letter) {
  if (musts.every(must => must[0] !== letter)) {return false} else {return true};
};

// reqs ex: [["l", 2], ["o", 1], ["y", 1], ["a", 1], ["l", 0]]
// musts ex: [{"a": [1, 0]}, {"e": [0, 2]}]
function createMust (reqs, letter) {
  let must;
  let count = 0;
  let isExact = false;
  reqs.forEach((req, i) => {
    if (req[0] === letter && req[1] > 0) {
      count++;
    } else {
      isExact =  true ;
    };
  });

  must = isExact ? {letter: [0, count]} : {letter: [count, 0]};
  return must;
};


// given a word, determine if it is a possibility
// params: word - the word under question
// possibles: an array of length 5, each place represents
// that place in a word.  It contains any letter that could be
// in that place
// musts: list of letters the word must contain, but position 
// musts: [{"a": [0,1]}, {"b": [1,0]}]
// maybe needs to have elements {"a": [#1, #2]}
// #2 exact number of that char (so exactly 2 a's), 
// positive #1 means at least.
// one of these would be 0
export function isWordPossible(word, possibles, musts) {
  let letters = [...word]; 
  for (let i = 0; i < 5; i++) {
    if (!possibles[i].includes(letters[i])) return false;
  };
  let result = true;
  musts.forEach(must => {
    const occurences = getNumOccurences(letters, must[0]);
    const keys = must.keys();
    //console.log(`${must[keys[0]]} occurs ${occurences} times in ${word}`)
    if (must[keys[0]][0] === 0) {
      if (occurences !== must[keys[0]][1]) result = false;
    } else if (must[keys[0]][1] === 0) {
      if (occurences < must[keys[0]][0]) result = false;
    } else {
      console.log("Error in variable musts in isWordPossible.");
      return;
    }
  });
    return result;
};

//  function to calculate the best guess
//  how to decide. give possibilities a score
// vowels vs consonants
// which is better- 2 letters out of place or one in?

function getNumOccurences(arr, value) {
  let numOccurences = 0;
  arr.forEach((el) => {
    if (el === value) numOccurences++;
  })
  return numOccurences;
};

// get all indices of a given letter in a reqs array
function getAllIndices(arr, value) {
  //console.log(`Array to getallindices: ${JSON.stringify(arr)}, value: ${value}`)
  let indices = [];
  arr.forEach((elem, i) => {
    //console.log(`Elem[${i}]: ${elem[i]} ${JSON.stringify(elem)}`)
    if (elem[0] === value) indices.push(i);
  });
  return indices;
};

// remove the first occurence of a specific value from an array
// uses splice, so changes original array
// params: value - the value to remove from the array- arr
function removeFromArray(arr, value) {
  let i = arr.indexOf(value);
  arr.splice(i,1);
};


/* if (must[1] === 0) {
  if (occurences !== must[2]) result = false;
} else if (must[2] === 0) {
  if (occurences < must[1]) result = false;
} else {
  console.log("Error in variable musts in isWordPossible.");
  return;
} */