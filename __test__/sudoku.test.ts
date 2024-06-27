import { describe, it, expect } from 'vitest';
import Sudoku from '../src/app/models/sudoku';
import Cell from '../src/app/models/cell';
import exp from 'constants';

describe('Sudoku class', () => {
    let sudoku: Sudoku;

    it('should create a new Sudoku board with null cells if no board is provided', () => {
        sudoku = new Sudoku();

        expect(sudoku.getCell(0, 0)?.digit).toBeNull();
        expect(sudoku.getCell(4, 4)?.digit).toBeNull();
        expect(sudoku.getCell(8, 8)?.digit).toBeNull();
    });

    it('should set and get cells correctly', () => {
        sudoku.setCell(0, 0, 5);
        sudoku.setCell(4, 4, 3);
        sudoku.setCell(8, 8, 7);

        expect(sudoku.getCell(0, 0)?.digit).toBe(5);
        expect(sudoku.getCell(4, 4)?.digit).toBe(3);
        expect(sudoku.getCell(8, 8)?.digit).toBe(7);
    });

    it('should throw an error when setting a cell with invalid position', () => {
        expect(() => sudoku.setCell(9, 9, 1)).toThrow('Invalid position');
    });

    it('should validate rows correctly', () => {
        sudoku.setCell(0, 1, 3);
        sudoku.setCell(0, 2, 8);
        sudoku.setCell(0, 3, 2);

        expect(sudoku.isValidRow(0)).toBe(true);

        sudoku.setCell(0, 4, 2); // Duplicate digit in the same row

        expect(sudoku.isValidRow(0)).toBe(false);
    });

    it('should validate columns correctly', () => {
        sudoku.setCell(1, 0, 7);
        sudoku.setCell(2, 0, 4);
        sudoku.setCell(3, 0, 6);

        expect(sudoku.isValidCol(0)).toBe(true);

        sudoku.setCell(4, 0, 4); // Duplicate digit in the same column

        expect(sudoku.isValidCol(0)).toBe(false);
    });

    it('should validate subgrids correctly', () => {
        sudoku.setCell(1, 1, 4);
        sudoku.setCell(1, 2, 5);
        sudoku.setCell(2, 1, 7);
        sudoku.setCell(2, 2, 6);

        expect(sudoku.isValidSubgrid(0, 0)).toBe(false);

        // making the first grid something valid

        sudoku.setCell(1, 1, 9);
        sudoku.setCell(2, 1, 1);
        sudoku.setCell(0, 0, 2);
        expect(sudoku.isValidSubgrid(0, 0)).toBe(true);
    });

    it('should validate the entire Sudoku board correctly', () => {
        //it looks like this:
        // 5 3 _ _ 7 _ _ _ _
        // 6 _ _ 1 9 5 _ _ _
        // _ 9 8 _ _ _ _ 6 _
        // 8 _ _ _ 6 _ _ _ 3
        // 4 _ _ 8 _ 3 _ _ 1
        // 7 _ _ _ 2 _ _ _ 6
        // _ 6 _ _ _ _ 2 8 _
        // _ _ _ 4 1 9 _ _ 5
        // _ _ _ _ 8 _ _ 7 9
        sudoku = new Sudoku([
            [new Cell(5), new Cell(3), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(6), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(5), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(9), new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(3)],
            [new Cell(4), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(1)],
            [new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(6)],
            [new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(4), new Cell(1), new Cell(9), new Cell(null), new Cell(null), new Cell(5)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(null), new Cell(7), new Cell(9)]
        ]);

        expect(sudoku.isValidBoard()).toBe(true);

        sudoku.setCell(0, 0, 6);

        expect(sudoku.isValidBoard()).toBe(false);
    });

    it('should get me a number between (inclusivly) min and max that i provide', () => {
        sudoku = new Sudoku()
        for(let i = 0; i < 50; i++){
            let n = sudoku.getRandomInt(1, 9);
            expect(n).toBeGreaterThanOrEqual(1);
            expect(n).toBeLessThanOrEqual(9);
        }
        
    });


    it('should tell if the the number entered in value parameter is a valid filling for in the sudoku board', () => {
        //it looks like this:
        // 5 3 _ _ 7 _ _ _ _
        // 6 _ _ 1 9 5 _ _ _
        // _ 9 8 _ _ _ _ 6 _
        // 8 _ _ _ 6 _ _ _ 3
        // 4 _ _ 8 _ 3 _ _ 1
        // 7 _ _ _ 2 _ _ _ 6
        // _ 6 _ _ _ _ 2 8 _
        // _ _ _ 4 1 9 _ _ 5
        // _ _ _ _ 8 _ _ 7 9
        sudoku = new Sudoku([
            [new Cell(5), new Cell(3), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(6), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(5), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(9), new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(3)],
            [new Cell(4), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(1)],
            [new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(6)],
            [new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(4), new Cell(1), new Cell(9), new Cell(null), new Cell(null), new Cell(5)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(null), new Cell(7), new Cell(9)]
        ]);

        expect(sudoku.isValidFilling(0, 2, 1)).toBe(true)
        expect(sudoku.isValidFilling(0, 2, 2)).toBe(true)
        expect(sudoku.isValidFilling(0, 2, 3)).toBe(false)
        expect(sudoku.isValidFilling(0, 2, 4)).toBe(true)
        expect(sudoku.isValidFilling(0, 2, 5)).toBe(false)
        expect(sudoku.isValidFilling(0, 2, 6)).toBe(false)
        expect(sudoku.isValidFilling(0, 2, 7)).toBe(false)
        expect(sudoku.isValidFilling(0, 2, 8)).toBe(false)
        expect(sudoku.isValidFilling(0, 2, 9)).toBe(false)
        
        // trying with a place that is already filled
        expect(sudoku.isValidFilling(0, 1, 1)).toBe(true)
        expect(sudoku.isValidFilling(0, 1, 2)).toBe(true)
        expect(sudoku.isValidFilling(0, 1, 3)).toBe(true)
        expect(sudoku.isValidFilling(0, 1, 4)).toBe(true)
        expect(sudoku.isValidFilling(0, 1, 5)).toBe(false)
        expect(sudoku.isValidFilling(0, 1, 6)).toBe(false)
        expect(sudoku.isValidFilling(0, 1, 7)).toBe(false)
        expect(sudoku.isValidFilling(0, 1, 8)).toBe(false)
        expect(sudoku.isValidFilling(0, 1, 9)).toBe(false)

        //trying with an invalid position
        expect(() => sudoku.isValidFilling(9, 3, 1)).toThrow('Invalid position');
        expect(() => sudoku.isValidFilling(0, 9, 1)).toThrow('Invalid position');
    });

    it('should take me to the previous cells with the specified number of steps', () => {
        expect(sudoku.goToPreviousCells(2, 0, 2)).toStrictEqual([1, 7])
        expect(sudoku.goToPreviousCells(1, 1, 2)).toStrictEqual([0, 8])
        expect(sudoku.goToPreviousCells(8, 8, 2)).toStrictEqual([8, 6])
    });

    it('should count how many empty cells we have in the sudoku board', () => {
        //it looks like this:
        // 5 3 _ _ 7 _ _ _ _
        // 6 _ _ 1 9 5 _ _ _
        // _ 9 8 _ _ _ _ 6 _
        // 8 _ _ _ 6 _ _ _ 3
        // 4 _ _ 8 _ 3 _ _ 1
        // 7 _ _ _ 2 _ _ _ 6
        // _ 6 _ _ _ _ 2 8 _
        // _ _ _ 4 1 9 _ _ 5
        // _ _ _ _ 8 _ _ 7 9
        sudoku = new Sudoku([
            [new Cell(5), new Cell(3), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(6), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(5), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(9), new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(3)],
            [new Cell(4), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(1)],
            [new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(6)],
            [new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(4), new Cell(1), new Cell(9), new Cell(null), new Cell(null), new Cell(5)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(null), new Cell(7), new Cell(9)]
        ]);

        expect(sudoku.countEmptyCells()).toBe(51)
    })

    it('should count how many times the provided number n appeared', () => {
        sudoku = new Sudoku([
            [new Cell(5), new Cell(3), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(6), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(5), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(9), new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(3)],
            [new Cell(4), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(1)],
            [new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(6)],
            [new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(4), new Cell(1), new Cell(9), new Cell(null), new Cell(null), new Cell(5)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(null), new Cell(7), new Cell(9)]
        ]);

        expect(sudoku.countNumber(1)).toBe(3)
        expect(sudoku.countNumber(3)).toBe(3)
        expect(sudoku.countNumber(5)).toBe(3)
        expect(sudoku.countNumber(7)).toBe(3)
        expect(sudoku.countNumber(9)).toBe(4)
    })

    it('should remove k number of cells (by removing i mean make them null), if there is less filled cells then k, it should make them all null', () =>{
        sudoku = new Sudoku([
            [new Cell(5), new Cell(3), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(6), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(5), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(9), new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(3)],
            [new Cell(4), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(1)],
            [new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(6)],
            [new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(4), new Cell(1), new Cell(9), new Cell(null), new Cell(null), new Cell(5)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(null), new Cell(7), new Cell(9)]
        ]);

        let k = sudoku.getRandomInt(0, 20)

        let oldCount = sudoku.countEmptyCells()

        sudoku.removeCells(k)

        let count = sudoku.countEmptyCells()

        expect(count).toBe(oldCount + k)

        //now trying with k bigger then how much filled numbers we have
        k = 80

        sudoku.removeCells(80)

        count = sudoku.countEmptyCells()

        expect(count).toBe(81)
    })

    it('should return a sudoku board filled randomly with numbers between 1 and 9 (this board is not nessecary valid)', () => {
        let board = sudoku.sudokuStarterGenerator()
        let correctnessCount = 0
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let number = board[i][j]
                if(number != null && number >= 1 && number <= 9){
                    correctnessCount++;
                }
            }
        }

        expect(correctnessCount).toBe(81)
    })

    it('should fill the sudoku board randomly and it should be valid', () => {
        for(let tries = 0; tries < 100; tries++){
            let sudoku = new Sudoku()

            sudoku.fillBoard()
            sudoku.fillBoard()
            sudoku.fillBoard()
            sudoku.fillBoard()

            let correctnessCount = 0
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    let number = sudoku.getCell(i, j).digit
                    if(number != null && number >= 1 && number <= 9){
                        correctnessCount++;
                    }
                }
            }

            expect([correctnessCount, sudoku.isValidBoard()]).toStrictEqual([81, true])
        }
    })

    it('should create a valid sudoku problem according to the provided dificulty', () => {
        let sudoku = new Sudoku()
        sudoku.initializeBoard('easy')
        let filledCells = 0 
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let number = sudoku.getCell(i, j).digit
                if(number != null && number >= 1 && number <= 9 && sudoku.getCell(i, j).isFixed){
                    filledCells++;
                }
            }
        }

        expect(filledCells).toBeGreaterThanOrEqual(81 - 38);
        expect(filledCells).toBeLessThanOrEqual(81 - 34);
        expect(sudoku.isValidBoard()).toBe(true)



        sudoku = new Sudoku()
        sudoku.initializeBoard('medium')
        filledCells = 0
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let number = sudoku.getCell(i, j).digit
                if(number != null && number >= 1 && number <= 9 && sudoku.getCell(i, j).isFixed){
                    filledCells++;
                }
            }
        }

        expect(filledCells).toBeGreaterThanOrEqual(81 - 42);
        expect(filledCells).toBeLessThanOrEqual(81 - 38);
        expect(sudoku.isValidBoard()).toBe(true)



        sudoku = new Sudoku()
        sudoku.initializeBoard('hard')
        filledCells = 0
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let number = sudoku.getCell(i, j).digit
                if(number != null && number >= 1 && number <= 9 && sudoku.getCell(i, j).isFixed){
                    filledCells++;
                }
            }
        }

        expect(filledCells).toBeGreaterThanOrEqual(81 - 46);
        expect(filledCells).toBeLessThanOrEqual(81 - 42);
        expect(sudoku.isValidBoard()).toBe(true)



        sudoku = new Sudoku()
        sudoku.initializeBoard('expert')
        filledCells = 0
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let number = sudoku.getCell(i, j).digit
                if(number != null && number >= 1 && number <= 9 && sudoku.getCell(i, j).isFixed){
                    filledCells++;
                }
            }
        }

        expect(filledCells).toBeGreaterThanOrEqual(81 - 50);
        expect(filledCells).toBeLessThanOrEqual(81 - 46);
        expect(sudoku.isValidBoard()).toBe(true)
        expect(sudoku.solution?.some(cells => cells.some(cell => cell.digit == null))).toBe(false)
    });

    it("should find the first empty cell in the sudoku board", () => {
        sudoku = new Sudoku([
            [new Cell(5), new Cell(3), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(6), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(5), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(9), new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(3)],
            [new Cell(4), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(1)],
            [new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(6)],
            [new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(4), new Cell(1), new Cell(9), new Cell(null), new Cell(null), new Cell(5)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(null), new Cell(7), new Cell(9)]
        ]);

        expect(sudoku.findEmpty()).toStrictEqual([0, 2])
    })

    it("should solve the provided sudoku problem", () => {
        sudoku = new Sudoku([
            [new Cell(5), new Cell(3), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(6), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(5), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(9), new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(3)],
            [new Cell(4), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(1)],
            [new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(6)],
            [new Cell(null), new Cell(6), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(2), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(4), new Cell(1), new Cell(9), new Cell(null), new Cell(null), new Cell(5)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null), new Cell(null), new Cell(7), new Cell(9)]
        ]);
    
        expect(sudoku.solve()).toBe(true);
    
        // Verify the board is correctly solved
        const solvedBoard = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ];
    
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                expect(sudoku.getCell(row, col).digit).toBe(solvedBoard[row][col]);
            }
        }

        const hardSudokuPuzzles = [
            {
                board: [
                    [5, 3, null, null, 7, null, null, null, null],
                    [6, null, null, 1, 9, 5, null, null, null],
                    [null, 9, 8, null, null, null, null, 6, null],
                    [8, null, null, null, 6, null, null, null, 3],
                    [4, null, null, 8, null, 3, null, null, 1],
                    [7, null, null, null, 2, null, null, null, 6],
                    [null, 6, null, null, null, null, 2, 8, null],
                    [null, null, null, 4, 1, 9, null, null, 5],
                    [null, null, null, null, 8, null, null, 7, 9]
                ],
                solution: [
                    [5, 3, 4, 6, 7, 8, 9, 1, 2],
                    [6, 7, 2, 1, 9, 5, 3, 4, 8],
                    [1, 9, 8, 3, 4, 2, 5, 6, 7],
                    [8, 5, 9, 7, 6, 1, 4, 2, 3],
                    [4, 2, 6, 8, 5, 3, 7, 9, 1],
                    [7, 1, 3, 9, 2, 4, 8, 5, 6],
                    [9, 6, 1, 5, 3, 7, 2, 8, 4],
                    [2, 8, 7, 4, 1, 9, 6, 3, 5],
                    [3, 4, 5, 2, 8, 6, 1, 7, 9]
                ]
            },
            {
                board: [
                    [null, null, null, 6, null, null, 4, null, null],
                    [7, null, null, null, null, 3, 6, null, null],
                    [null, null, null, null, 9, 1, null, 8, null],
                    [null, null, null, null, null, null, null, null, null],
                    [null, 5, null, 1, 8, null, null, null, 3],
                    [null, null, null, 3, null, 6, null, 4, 5],
                    [null, 4, null, 2, null, null, null, 6, null],
                    [9, null, 3, null, null, null, null, null, null],
                    [null, 2, null, null, null, null, 1, null, null]
                ],
                solution: [
                    [5, 8, 1, 6, 2, 9, 4, 3, 7],
                    [7, 9, 2, 8, 4, 3, 6, 5, 1],
                    [4, 6, 3, 7, 9, 1, 5, 8, 2],
                    [1, 3, 7, 5, 6, 4, 2, 9, 8],
                    [2, 5, 6, 1, 8, 7, 9, 4, 3],
                    [8, 7, 9, 3, 2, 6, 7, 4, 5],
                    [3, 4, 5, 2, 7, 8, 8, 6, 9],
                    [9, 1, 3, 4, 5, 2, 8, 7, 6],
                    [6, 2, 8, 9, 3, 5, 1, 2, 4]
                ]
            },
            {
                board: [
                    [null, null, null, null, 9, null, null, null, null],
                    [null, null, 3, null, null, null, null, 8, 5],
                    [null, null, 1, 8, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, 4],
                    [null, null, 5, null, null, 3, null, null, 8],
                    [null, null, null, null, null, null, 2, 3, null],
                    [8, null, null, null, null, null, null, 2, null],
                    [null, 2, null, null, null, null, 9, null, null],
                    [null, null, 4, null, null, null, null, 1, null]
                ],
                solution: [
                    [7, 8, 4, 6, 9, 2, 5, 3, 1],
                    [6, 9, 3, 1, 4, 7, 8, 8, 5],
                    [2, 5, 1, 8, 3, 9, 6, 4, 7],
                    [9, 3, 7, 2, 8, 6, 1, 5, 4],
                    [1, 4, 5, 7, 2, 3, 4, 9, 8],
                    [4, 6, 8, 9, 5, 1, 2, 3, 7],
                    [8, 1, 6, 5, 7, 4, 3, 2, 9],
                    [5, 2, 9, 3, 1, 8, 9, 7, 6],
                    [3, 7, 4, 4, 6, 5, 7, 1, 2]
                ]
            },
            {
                board: [
                    [8, null, null, null, null, null, null, null, null],
                    [null, null, 3, 6, null, null, null, null, null],
                    [null, 7, null, null, 9, null, 2, null, null],
                    [null, 5, null, null, null, 7, null, null, null],
                    [null, null, null, null, 4, 5, 7, null, null],
                    [null, null, null, 1, null, null, null, 3, null],
                    [null, null, 1, null, null, null, null, 6, 8],
                    [null, null, 8, 5, null, null, null, 1, null],
                    [null, 9, null, null, null, null, 4, null, null]
                ],
                solution: [
                    [8, 1, 2, 7, 5, 3, 6, 4, 9],
                    [9, 4, 3, 6, 8, 2, 1, 7, 5],
                    [6, 7, 5, 4, 9, 1, 2, 8, 3],
                    [1, 5, 4, 2, 3, 7, 8, 9, 6],
                    [3, 6, 9, 8, 4, 5, 7, 2, 1],
                    [2, 8, 7, 1, 6, 9, 5, 3, 4],
                    [5, 2, 1, 9, 7, 4, 3, 6, 8],
                    [4, 3, 8, 5, 2, 6, 9, 1, 7],
                    [7, 9, 6, 3, 1, 8, 4, 5, 2]
                ]
            },
            {
                board: [
                    [null, null, null, null, 6, null, null, null, 3],
                    [3, null, null, null, null, null, null, null, null],
                    [null, null, 1, 4, null, 9, null, null, null],
                    [null, null, 8, null, null, null, 1, 9, null],
                    [4, 6, null, null, null, null, null, null, null],
                    [null, null, 3, null, null, null, 5, null, null],
                    [null, null, null, 1, null, 6, null, 2, null],
                    [null, null, 2, null, null, null, null, 3, null],
                    [null, null, null, 8, null, null, null, null, 1]
                ],
                solution: [
                    [8, 4, 7, 9, 6, 2, 3, 1, 3],
                    [3, 2, 9, 7, 1, 5, 6, 8, 4],
                    [5, 6, 1, 4, 8, 9, 2, 7, 3],
                    [6, 7, 8, 3, 5, 4, 1, 9, 2],
                    [4, 6, 5, 2, 3, 1, 7, 8, 9],
                    [9, 1, 3, 6, 7, 8, 5, 4, 5],
                    [7, 9, 4, 1, 5, 6, 8, 2, 3],
                    [1, 8, 2, 5, 4, 7, 9, 3, 6],
                    [2, 5, 6, 8, 9, 3, 4, 7, 1]
                ]
            },            
        ];

        hardSudokuPuzzles.forEach((puzzle, index) => {
            sudoku = new Sudoku(puzzle.board.map(row => row.map(digit => new Cell(digit))));
            expect(sudoku.solve()).toBe(true);
            expect(sudoku.isValidBoard()).toBe(true)
            expect(sudoku.countEmptyCells()).toBe(0)
        });

        let extreemSudoku = new Sudoku([
            [new Cell(null), new Cell(3), new Cell(null), new Cell(null), new Cell(null), new Cell(7), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(6), new Cell(null), new Cell(1), new Cell(null), new Cell(null)],
            [new Cell(8), new Cell(null), new Cell(7), new Cell(5), new Cell(null), new Cell(null), new Cell(null), new Cell(9), new Cell(null)],
            [new Cell(3), new Cell(null), new Cell(4), new Cell(null), new Cell(null), new Cell(1), new Cell(9), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(2), new Cell(null), new Cell(4), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(null), new Cell(5), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(3), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(2), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
            [new Cell(4), new Cell(null), new Cell(9), new Cell(7), new Cell(null), new Cell(null), new Cell(null), new Cell(8), new Cell(null)],
            [new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(null), new Cell(5), new Cell(null), new Cell(null), new Cell(7)]
        ]);

        expect(extreemSudoku.solve()).toBe(true);
        expect(extreemSudoku.countEmptyCells()).toBe(0)
    });
});
