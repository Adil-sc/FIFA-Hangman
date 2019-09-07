
import Hangman,{renderPuzzle} from './hangman';
import getPuzzle from './requests';
 

let game1;

window.addEventListener('keypress',(e) =>{
	const guess = String.fromCharCode(e.charCode);
	//Pass in the keyboard key the user has pressed as the word to guess
	game1.guessPuzzle(guess);

	render();
});
 

const render = () =>{
	
		//Display the number of guessess remaining
	game1.calculateStatus();
		//Show the puzzle string
	renderPuzzle(game1);
	
}
 

const startGame = async () =>{
	const puzzle = await getPuzzle('2');
	game1 = new Hangman(puzzle,5);
	render();
	
	
}

document.querySelector('#reset').addEventListener('click',startGame);

startGame();

