class Hangman {
	constructor(guessWord,numOfGuessess){
		this.guessWord = guessWord.toLowerCase().split('');
		this.numOfGuessess = numOfGuessess;
		this.guessedLetters = [];
		this.status = 'Playing';
	}
	
	//Calculates the current puzzle including showing chars behind * if they are yet to be guessed
	get puzzle(){
		let puzzle = '';
		this.guessWord.forEach((character,index) =>{
			
			if(this.guessedLetters.includes(character) || character === ' '){
				puzzle += character;
			}else{
				puzzle += '*';
			}
			
		});
		return puzzle;
	}
	
	//Calcualtes the current status of the game
	calculateStatus(){
		const isFail = this.numOfGuessess === 0;
		const isFinished = this.guessWord.every((character) => this.guessedLetters.includes(character) || character === ' ');
		const isPlaying = !isFail && !isFinished;
		
		if(isPlaying){
			this.status = 'Playing';
		}else if (isFinished){
			this.status = 'Finished'
		}else if (isFail){
			this.status = 'Failed';
		}	
		//console.log(this.status);		
	}
	
	//Process the guess logic for the game including recogonizing keyboard input
	guessPuzzle(guess){	
		guess = guess.toLowerCase();
		const isUnique = !this.guessedLetters.includes(guess);
		const isBadGuess = !this.guessWord.includes(guess);
		
		if(this.status !== 'Playing'){
			return
		}
		if(isUnique){
			this.guessedLetters.push(guess);
		}
		if(isUnique && isBadGuess){
			this.numOfGuessess--;
		}
		this.calculateStatus();
	}
	
	get statusMessage(){
		let guessEl = document.querySelector('#guessess-remaining');
		if(this.status === 'Playing'){
			guessEl.innerText = `Guesses left: ${this.numOfGuessess}`;
		}else if (this.status === 'Failed'){
			guessEl.innerText = `Nice try! The word was "${this.guessWord.join('')}"`;
		}else if (this.status === 'Finished'){
			guessEl.innerText = `Great work! You guessed the word`;
		}
	}
}

//Renders the puzzle and the number of guessess remaining on the HTML
let renderPuzzle = function(hangmanGame){
	//document.querySelector('#puzzle').textContent = game1.puzzle;

	let puzzleEl = document.querySelector('#puzzle');
	puzzleEl.innerHTML = '';
	hangmanGame.puzzle.split('').forEach((letter)=>{
		
		const letterEl = document.createElement('span');
		letterEl.textContent = letter;
		puzzleEl.appendChild(letterEl);
		
	})
	
	hangmanGame.statusMessage;
	
	
	
}

export {renderPuzzle, Hangman as default}
