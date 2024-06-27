
import Cell from "./cell";

type SudokuBoard = (Cell)[][];

export default class Sudoku {

    private _board: SudokuBoard;
    solution: SudokuBoard | null;

    constructor(board?: SudokuBoard) {
        // Initialize the board with a 9x9 grid filled with null Cells if no board is provided
        this._board = board || Array.from({ length: 9 }, () => Array(9).fill(null).map(() => new Cell(null)));
        this.solution = null;
    }

    getCell(row: number, col: number): Cell {
        if (this.isValidPosition(row, col)) {
            return this._board[row][col];
        }
        throw new Error('Invalid position');
    }

    setCell(row: number, col: number, value: number | null, fixed?: boolean): void {
        if (this.isValidPosition(row, col) && !this.getCell(row, col).isFixed) {
            this._board[row][col] = new Cell(value);
        } else {
            if(this.getCell(row, col).isFixed){
                throw new Error('can not change a fixed cell');
            }else{
                throw new Error('Invalid position or value');
            }
            
        }

        if(fixed != null){
            this._board[row][col].isFixed = fixed;
        }
    }

    isValidPosition(row: number, col: number): boolean {
        return row >= 0 && row < 9 && col >= 0 && col < 9;
    }

    isValidFilling(row: number, col: number, value: number): boolean {
        if(value < 1 || value > 9) return false;

        for(let c = 0; c < 9; c++){
            if(c == col) continue
            if(this.getCell(row, c).digit == value) return false;
        }

        for(let r = 0; r < 9; r++){
            if(r == row) continue
            if(this.getCell(r, col).digit == value) return false;
        }

        let subGridRowStart = Math.floor(row/3) * 3, subGridColStart = Math.floor(col/3) * 3;

        for (let r = subGridRowStart; r < subGridRowStart + 3; r++) {
            for (let c = subGridColStart; c < subGridColStart + 3; c++) {
                if(r == row && col == c) continue
                if(this.getCell(r, c).digit == value) return false;
            }
        }


        return true
    }

    isValidRow(row: number): boolean {
        const seen = new Set<number>();
        for (let col = 0; col < 9; col++) {
            const cell = this._board[row][col];
            if (cell && cell.digit !== null) {
                if (seen.has(cell.digit)) return false;
                seen.add(cell.digit);
            }
        }
        return true;
    }

    isValidCol(col: number): boolean {
        const seen = new Set<number>();
        for (let row = 0; row < 9; row++) {
            const cell = this._board[row][col];
            if (cell && cell.digit !== null) {
                if (seen.has(cell.digit)) return false;
                seen.add(cell.digit);
            }
        }
        return true;
    }

    isValidSubgrid(rowStart: number, colStart: number): boolean {
        // Validate starting indices
        if (rowStart % 3 !== 0 || colStart % 3 !== 0 || rowStart < 0 || rowStart >= 9 || colStart < 0 || colStart >= 9) {
            throw new Error('Invalid subgrid starting indices');
        }
    
        const seen = new Set<number>();
        for (let row = rowStart; row < rowStart + 3; row++) {
            for (let col = colStart; col < colStart + 3; col++) {
                const cell = this._board[row][col];
                if (cell && cell.digit !== null) {
                    if (seen.has(cell.digit)) return false;
                    seen.add(cell.digit);
                }
            }
        }
        return true;
    } 

    isValidBoard(): boolean {
        for (let i = 0; i < 9; i++) {
            if (!this.isValidRow(i) || !this.isValidCol(i)) return false;
        }

        for (let row = 0; row < 9; row += 3) {
            for (let col = 0; col < 9; col += 3) {
                if (!this.isValidSubgrid(row, col)) return false;
            }
        }

        return true;
    }

    getRandomInt(min: number, max: number){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initializeBoard(difficulty: 'easy' | 'medium' | 'hard' | 'expert'): void {
        // Start by filling the board with a complete Sudoku solution
        this.fillBoard();

        // Adjust the difficulty by removing cells based on the chosen level
        let k: number;
        switch (difficulty) {
            case 'easy':
                k = this.getRandomInt(34, 38); // Remove 34-38 cells for easy level
                break;
            case 'medium':
                k = this.getRandomInt(38, 42); // Remove 38-42 cells for medium level
                break;
            case 'hard':
                k = this.getRandomInt(42, 46); // Remove 42-46 cells for hard level
                break;
            case 'expert':
                k = this.getRandomInt(46, 50); // Remove 46-50 cells for expert level
                break;
            default:
                throw new Error('Invalid difficulty level');
        }

        //store the solution
        this.solution = this._board.map(row => row.map(cell => new Cell(cell.digit, true)));


        // Randomly remove k cells from the board
        this.removeCells(k);

        //fixing the numbered cells
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let n = this.getCell(i, j).digit;
                if(n != null){
                    this.setCell(i, j, n, true)
                }
            }
        }
    }

    sudokuStarterGenerator(){
        return Array.from({ length: 9 }, () => Array(9).fill(null).map(() => this.getRandomInt(1, 9)))
    }

    goToPreviousCells(row: number, col: number, steps: number){
        if(!this.isValidPosition(row, col)){
            throw Error("this is not a valid position in the sudoku board");
        }

        if(row == 0 && col == 0){
            throw Error("We cannot move further back because we are at position (0, 0)")
        }

        while(steps--){
            col--
            if(col < 0){
                col = 8; row--;
            }
        }

        return [row, col]
    }

    // Functions to fill the board with a complete Sudoku solution
    fillBoard(): void {
        //this line is very important it guarenties that you are not going to create a new sudoku on top of an old one
        // and eventually going throw a lot of weird errors
        this.clear()
        /*let orderedNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // method for shuffeling an array
        const shuffle = (array: number[]) => { 
            return array.sort(() => Math.random() - 0.5); 
        }; 

        orderedNumbers = shuffle(orderedNumbers);

        //start by initializing the three subgrids that forms a diagonal
        for(let rowStart = 0, colStart = 0; rowStart <= 6 && colStart <= 6; rowStart += 3, colStart += 3){
            for (let row = rowStart; row < rowStart + 3; row++) {
                for (let col = colStart; col < colStart + 3; col++) {
                    this.setCell(row, col, orderedNumbers[col + row * 3])
                }
            }
        }

        //now loop throw the whole board and fill the remaining cells
        for(let r = 0; r < 9; r++){

        }*/

        let sudokuStarter: (number)[][] = this.sudokuStarterGenerator();

        //now backtracking according to this generated sudokuStarter
        for(let row =  0; row < 9; row++){
            for(let col = 0; col < 9; col++){
                //try to set a number to the position (row, col)
                let addition = 0
                let cellNumber = this.getCell(row, col).digit
                if(cellNumber != null){

                    addition = cellNumber - sudokuStarter[row][col] - 1
                    if(addition < 0){
                        addition += 9
                    }
                    
                    addition++;
                }
                
                while(addition != 9){
                    if(this.isValidFilling(row, col, ((addition + sudokuStarter[row][col]) % 9) + 1)){
                        this.setCell(row, col, ((addition + sudokuStarter[row][col]) % 9) + 1)
                        break
                    }else{
                        addition++;
                    }
                }
                //if possible (we found a fit before turning back to the number present in sudokuStarter) move on to the next cell
                if(addition != 9){
                    continue
                }

                //if not possible move back to the previous cell and try the next number
                this.setCell(row, col, null)
                //related to the previous step, go back by two cells
                let [newRow, newCol] = this.goToPreviousCells(row, col, 2)

                row = newRow; col = newCol;
            }
        }
    }

    //function to count how many cells are filled
    countEmptyCells(){
        let count = 0
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.getCell(i, j).digit === null){
                    count++
                }
            }
        }

        return count
    }

    countNumber(n: number){
        let count = 0;
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.getCell(i, j).digit == n){
                    count++;
                }
            }
        }

        return count;
    }

    clear(){
        this._board = Array.from({ length: 9 }, () => Array(9).fill(null).map(() => new Cell(null)));
    }

    // Function to remove k cells from the board randomly
    removeCells(k: number): void {
        if(81 - this.countEmptyCells() <= k){
            this.clear()
            return
        }

        let count = k;
        while (count > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (this._board[row][col].digit != null) {
                this._board[row][col] = new Cell(null);
                count--;
            }
        }
    }

    findEmpty(){
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this._board[row][col].digit === null) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    solve(startTime = Date.now()): boolean {
        if(this.solution){
            this._board = this.solution.map(row => row.map(cell => new Cell(cell.digit, true)));
        }
        
        const maxTime = 30000;
        const elapsedTime = Date.now() - startTime;
    
        if (elapsedTime >= maxTime) {
            return false;
        }
    
        const emptyPos = this.findEmpty();
        if (!emptyPos) {
            return true;
        }
    
        const [row, col] = emptyPos;
    
        for (let num = 1; num <= 9; num++) {
            if (this.isValidFilling(row, col, num)) {
                this.setCell(row, col, num);
                if (this.solve(startTime)) {
                    return true;
                }
                
                this.setCell(row, col, null);
            }
        }

        return false;
    }


}
