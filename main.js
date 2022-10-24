//Codecademy project in back-end engineering course. Challenge Project: Mysterious Organism

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//factory function 
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    //method to simulate mutation
    mutate() {
      //arrays to use to randomly mutate this.dna depending on which letter in strand is picked to change
      let ifG = ['A', 'T', 'C'];
      let ifA = ['T', 'C', 'G'];
      let ifT = ['C', 'G', 'A'];
      let ifC = ['G', 'A', 'T'];
      //randomly select a part of dna strand
      let mutatedStrandIndex = Math.floor(Math.random() * this.dna.length);
      //if clause to mutate DNA strand and make sure it becomes a different letter
      if (this.dna[mutatedStrandIndex] === 'G') {
        this.dna[mutatedStrandIndex] = ifG[Math.floor(Math.random() * ifG.length)];
      } else if (this.dna[mutatedStrandIndex] === 'A') {
        this.dna[mutatedStrandIndex] = ifA[Math.floor(Math.random() * ifA.length)];
    } else if (this.dna[mutatedStrandIndex] === 'T') {
      this.dna[mutatedStrandIndex] = ifT[Math.floor(Math.random() * ifT.length)];
  } else {
    this.dna[mutatedStrandIndex] = ifC[Math.floor(Math.random() * ifC.length)];
  }
  return this.dna;
    },

    //method to compare a strand of dna with this.dna and determine how similar they are as a %
    compareDNA(object) {
      //variable to store the number of similar dna strands
      let compared = 0;
      //loop through this.dna and compare it to the object.dna at the same position
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === object.dna[i]) {
          compared++;
        }
      }
      //return as % similar
      return compared;
    },

    //method to determine if dna strand contains 60% of C or G base
    willLikelySurvive() {
      //variables to check how many C and G bases in dna strand
      let dnaC = 0;
      let dnaG = 0;

      //find total instances of C and G in dna strand using a loop
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C') {
          dnaC++;
        } else if (this.dna[i] === 'G') {
          dnaG++;
        } else {continue};
      }
      //checking number of bases is recording properly. Will comment out
      // console.log(`Instances: dnaC = ${dnaC}. dnaG = ${dnaG}`);

      //change dnaC and dnaG to % of dna strand
      dnaC = (dnaC / this.dna.length) * 100;
      dnaG = (dnaG / this.dna.length) * 100;

      //checking % calculation working. Will comment out
      // console.log(`dnaC = ${dnaC} and dnaG = ${dnaG}`);

      //check if either C or G bases are more than 60% of strand
      if (dnaC >= 60 || dnaG >=60) {
        return true;
      } else {
        return false;
      }
    },
    //function to return complementary dna strand
    complementStrand() {
      let complementary = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'A') {
          complementary.push('T');
        } else if (this.dna[i] === 'T') {
          complementary.push('A')
        } else if (this.dna[i] === 'C') {
          complementary.push('G');
        } else if (this.dna[i] === 'G') {
          complementary.push('C')
        } else {
          console.log('Oops, something went wrong!');
        }
      }
      return complementary;
    }
  };
};


//create 30 instances of pAequor that can survive in their environment (dna contains over 60% C or G bases)
//Array to store instances of pAequor that meet criteria
const willSurvive = [];

// for loop to create instances of pAequor until we get to 30 instances that meet criteria
for (let i = 0; willSurvive.length < 30; i++) {
  let specimen = pAequorFactory(i, mockUpStrand());
  if (specimen.willLikelySurvive()) {
    willSurvive.push(specimen);
  }  
}



//function to find the two most related instances of pAequor
const mostRelated = (arr) => {
  //variable to store % similarity
  let similarity = 0;
  //variables to store indexes of dna strands that are most similar
  let iPosition = 0;
  let jPosition = 0;

  //for loop to loop through array
  for (let i = 0; i < arr.length; i++) {
    //internal for loop to compare results of each pair
    for (let j = 0; j < arr.length; j++) {
      //if clause to stop same strands comparing and getting 100% similarity
       if (i != j ) {
        let compare = arr[i].compareDNA(arr[j]);
        //if current comparison greater than what is stored in similarity, update variables to show index of both comparisons as well as % similarity
        if (compare > similarity) {
          similarity = compare;
          iPosition = i;
          jPosition = j;
        }
      }
    }
  }
  return `The greatest similarity is between index ${iPosition} and index ${jPosition} with a similarity of ${similarity}%`;
}





















