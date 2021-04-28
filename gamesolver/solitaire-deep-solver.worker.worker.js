/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game-types/deep-solve.ts":
/*!**************************************!*\
  !*** ./src/game-types/deep-solve.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeepSolverMatrix": () => /* binding */ DeepSolverMatrix
/* harmony export */ });
class DeepSolverMatrix {
    constructor(matrix) {
        this.matrix = [];
        this.matrix = matrix;
    }
}


/***/ }),

/***/ "./src/game-types/game-cell.ts":
/*!*************************************!*\
  !*** ./src/game-types/game-cell.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameCell": () => /* binding */ GameCell
/* harmony export */ });
class GameCell {
    constructor() {
        this.highlighted = false;
        this.dirty = true;
        this.ALL_VALUES = [];
        this.value = 0;
    }
    isDirty() {
        return this.dirty;
    }
    setDirtyOff() {
        this.dirty = false;
    }
    /**
     * Get the value of the cell.
     */
    getValue() {
        return this.value;
    }
    getValueAsString() {
        return String(this.value);
    }
    setValue(value) {
        if (this.value !== value)
            this.dirty = true;
        this.value = value;
        return this.value;
    }
    initValue(value) {
        this.value = value;
        this.highlighted = false;
        this.dirty = true;
    }
    highlight(on = true) {
        if (this.highlighted !== on)
            this.dirty = true;
        this.highlighted = on;
        return this.highlighted;
    }
    isHighlighted() {
        return this.highlighted;
    }
    copyFrom(other) {
        this.value = other.value;
        this.highlighted = other.isHighlighted();
    }
}


/***/ }),

/***/ "./src/solitaire/game-cell.ts":
/*!************************************!*\
  !*** ./src/solitaire/game-cell.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameCellSolitaire": () => /* binding */ GameCellSolitaire
/* harmony export */ });
/* harmony import */ var _game_types_game_cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-types/game-cell */ "./src/game-types/game-cell.ts");

class GameCellSolitaire extends _game_types_game_cell__WEBPACK_IMPORTED_MODULE_0__.GameCell {
    solveWithValue(value) {
        this.setValue(value);
    }
    clone() {
        const other = new GameCellSolitaire();
        other.copyFrom(this);
        return other;
    }
    getValueAsString() {
        if (this.value === GameCellSolitaire.PEG_CELL)
            return "O";
        if (this.value === GameCellSolitaire.INVALID_CELL)
            return "X";
        return ' ';
    }
}
GameCellSolitaire.EMPTY_CELL = 0;
GameCellSolitaire.PEG_CELL = 1;
GameCellSolitaire.INVALID_CELL = 9;


/***/ }),

/***/ "./src/solitaire/game-schema-solver.ts":
/*!*********************************************!*\
  !*** ./src/solitaire/game-schema-solver.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameMoveMakerSolitaire": () => /* binding */ GameMoveMakerSolitaire,
/* harmony export */   "DeepSolverMatrixSolitaire": () => /* binding */ DeepSolverMatrixSolitaire
/* harmony export */ });
/* harmony import */ var _game_types_deep_solve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-types/deep-solve */ "./src/game-types/deep-solve.ts");
/* harmony import */ var _game_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-cell */ "./src/solitaire/game-cell.ts");


/*
export class GameSchemaSolverSolitaire extends GameSchemaSolver<GameCellSolitaire, GameSchemaSolitaire> {
    public step(schema: GameSchemaSolitaire): void {
        this.stopped = true;
        this.solving = false;
    }

    
    public findMoves(cellValues:number[][],r:number,c:number):number[][][] {
        const moves:number[][][] = [];
        let value;

        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4

        // 1:
        if(r>=1) {
            value = cellValues[r-1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r>=2) {
                    value = cellValues[r-2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r-1,c],[r-2,c]]);
                    }
                }
            }
        }

        // 2:
        if(c>=1) {
            value = cellValues[r][c-1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c>=2) {
                    value = cellValues[r][c-2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c-1],[r,c-2]]);
                    }
                }
            }
        }

        // 3:
        if(c<=5) {
            value = cellValues[r][c+1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c<=4) {
                    value = cellValues[r][c+2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c+1],[r,c+2]]);
                    }
                }
            }
        }

        // 4:
        if(r<=5) {
            value = cellValues[r+1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r<=4) {
                    value = cellValues[r+2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r+1,c],[r+2,c]]);
                    }
                }
            }
        }

        return moves;
    }

    public findAllMoves(cellValues:number[][]):{pegs:number,moves:number[][][]} {
        let allMoves: number[][][] = [];
        let pegNum = 0;
        for(let r=0;r<7;r++)
            for(let c=0;c<7;c++)
                if(cellValues[r][c] === GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, r,c);
                    if(moves.length>0)
                        allMoves = allMoves.concat(moves);

                }
        return {'pegs': pegNum, 'moves':allMoves};
    }

    public executeMove(cellValues:number[][], move: number[][]) {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.PEG_CELL;


    }

    public undoMove(cellValues:number[][], move: number[][]):void {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.EMPTY_CELL;
    }
    

} */
class GameMoveMakerSolitaire {
    constructor() {
        // findMoves(cellValues:number[][], conditions:any):number[][][];
        // findAllMoves(cellValues:number[][]):number[][][];    
        this.pegs = 0;
    }
    findMoves(cellValues, conditions) {
        const moves = [];
        let value;
        let r = conditions.row;
        let c = conditions.col;
        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4
        // 1:
        if (r >= 1) {
            value = cellValues[r - 1][c];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (r >= 2) {
                    value = cellValues[r - 2][c];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r - 1, c], [r - 2, c]]);
                    }
                }
            }
        }
        // 2:
        if (c >= 1) {
            value = cellValues[r][c - 1];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (c >= 2) {
                    value = cellValues[r][c - 2];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r, c - 1], [r, c - 2]]);
                    }
                }
            }
        }
        // 3:
        if (c <= 5) {
            value = cellValues[r][c + 1];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (c <= 4) {
                    value = cellValues[r][c + 2];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r, c + 1], [r, c + 2]]);
                    }
                }
            }
        }
        // 4:
        if (r <= 5) {
            value = cellValues[r + 1][c];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (r <= 4) {
                    value = cellValues[r + 2][c];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r + 1, c], [r + 2, c]]);
                    }
                }
            }
        }
        return moves;
    }
    getPegs() { return this.pegs; }
    findAllMoves(cellValues) {
        let allMoves = [];
        let pegNum = 0;
        for (let r = 0; r < 7; r++)
            for (let c = 0; c < 7; c++)
                if (cellValues[r][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, { row: r, col: c });
                    if (moves.length > 0)
                        allMoves = allMoves.concat(moves);
                }
        this.pegs = pegNum;
        return allMoves;
    }
    executeMove(cellValues, move) {
        if (move.length === 0)
            return false;
        const from = move[0];
        const middle = move[1];
        const to = move[2];
        if (cellValues[from[0]][from[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
            return false;
        if (cellValues[middle[0]][middle[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
            return false;
        if (cellValues[to[0]][to[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL)
            return false;
        cellValues[from[0]][from[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL;
        return true;
    }
    undoMove(cellValues, move) {
        if (move.length === 0)
            return;
        const from = move[0];
        const middle = move[1];
        const to = move[2];
        if (cellValues[from[0]][from[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL)
            return;
        if (cellValues[middle[0]][middle[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL)
            return;
        if (cellValues[to[0]][to[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
            return;
        cellValues[from[0]][from[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
    }
}
// tslint:disable-next-line: max-classes-per-file
class DeepSolverMatrixSolitaire extends _game_types_deep_solve__WEBPACK_IMPORTED_MODULE_0__.DeepSolverMatrix {
    constructor(matrix, ctx) {
        super(matrix);
        // private solver: GameSchemaSolverSolitaire = new GameSchemaSolverSolitaire();
        this.solvingMoves = [];
        this.step = 0;
        this.moveMaker = new GameMoveMakerSolitaire();
        this.ctx = ctx;
    }
    getSolvingMoves() {
        return this.solvingMoves;
    }
    hasIsolatedPegsB(cellValues) {
        let found = false;
        for (let r = 0; r < cellValues.length && !found; r++)
            for (let c = 0; c < cellValues[r].length && !found; c++)
                if (cellValues[r][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                    let pegs = 0;
                    if (r > 0)
                        if (cellValues[r - 1][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (c > 0)
                        if (cellValues[r][c - 1] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (r < cellValues.length - 1)
                        if (cellValues[r + 1][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (c < cellValues[r].length - 1)
                        if (cellValues[r][c + 1] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (pegs === 0)
                        found = true;
                }
        return found;
    }
    hasIsolatedPegs(cellValues) {
        let ok = true;
        for (let r = 0; r < 7 && ok; r++)
            for (let c = 0; c < 7 && ok; c++)
                if (cellValues[r][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                    if (r > 0)
                        ok = ok && cellValues[r - 1][c] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                    if (c > 0)
                        ok = ok && cellValues[r][c - 1] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                    if (r < 6)
                        ok = ok && cellValues[r + 1][c] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                    if (c < 6)
                        ok = ok && cellValues[r][c + 1] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                }
        return ok;
    }
    deepSolve(level, row, col, ...params) {
        // pruning
        const isolated = this.hasIsolatedPegs(this.matrix);
        const isolatedB = this.hasIsolatedPegsB(this.matrix);
        /*if(isolatedB!==isolated)
            console.log('Bingo!');
        */
        if (isolated)
            return false;
        const moves = this.moveMaker.findAllMoves(this.matrix);
        if (this.moveMaker.getPegs() === 1)
            return true;
        for (let m = 0; m < moves.length; m++) {
            if (this.moveMaker.executeMove(this.matrix, moves[m])) {
                const from = moves[m][0];
                const middle = moves[m][1];
                const to = moves[m][2];
                /*
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
                */
                if (this.deepSolve(level + 1, row, col)) {
                    /*
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
                    */
                    this.solvingMoves.push(moves[m]);
                    return true;
                }
                else {
                    this.moveMaker.undoMove(this.matrix, moves[m]);
                    /*
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.PEG_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.PEG_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    */
                }
            }
            else {
                console.log("'Twas a wrong move!!!");
            }
        }
        return false;
    }
}


/***/ }),

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/solitaire/solitaire-deep-solver.worker.ts":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/solitaire/solitaire-deep-solver.worker.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_schema_solver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-schema-solver */ "./src/solitaire/game-schema-solver.ts");

const ctx = self;
ctx.addEventListener("message", (event) => {
    const matrix = event.data.matrix;
    const solver = new _game_schema_solver__WEBPACK_IMPORTED_MODULE_0__.DeepSolverMatrixSolitaire(matrix, ctx);
    let solutionResult = "Resolution failed.";
    if (solver.deepSolve(0, 1, 3)) {
        solutionResult = "Recursive search succeeded.";
    }
    ctx.postMessage({ 'eventType': 'success',
        'matrix': matrix,
        'solutionResult': solutionResult,
        'solvingMoves': solver.getSolvingMoves() });
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/solitaire/solitaire-deep-solver.worker.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZGVlcC1zb2x2ZS50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZ2FtZS1jZWxsLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvLi9zcmMvc29saXRhaXJlL2dhbWUtY2VsbC50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL3NvbGl0YWlyZS9nYW1lLXNjaGVtYS1zb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zb2xpdGFpcmUvc29saXRhaXJlLWRlZXAtc29sdmVyLndvcmtlci50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFlLGdCQUFnQjtJQUlsQyxZQUFZLE1BQWtCO1FBRnBCLFdBQU0sR0FBZSxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztDQUlKOzs7Ozs7Ozs7Ozs7Ozs7QUNWTSxNQUFlLFFBQVE7SUFTMUI7UUFOVSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixVQUFLLEdBQVMsSUFBSSxDQUFDO1FBRW5CLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFHaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVNLE9B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bGl0YWlyZS1kZWVwLXNvbHZlci53b3JrZXIud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZXBTb2x2ZXJNYXRyaXgge1xyXG5cclxuICAgIHByb3RlY3RlZCBtYXRyaXg6IG51bWJlcltdW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYXRyaXg6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZGVlcFNvbHZlKGxldmVsOm51bWJlciwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCAuLi5wYXJhbXM6YW55W10pOiBib29sZWFuO1xyXG5cclxufSIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHYW1lQ2VsbCB7XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlydHk6Ym9vbGVhbj10cnVlO1xyXG5cclxuICAgIHByb3RlY3RlZCBBTExfVkFMVUVTOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0RpcnR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREaXJ0eU9mZigpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdmFsdWUgb2YgdGhlIGNlbGwuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWYWx1ZUFzU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldFZhbHVlKHZhbHVlOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZSAhPT0gdmFsdWUpXHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGluaXRWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBoaWdobGlnaHQob246IGJvb2xlYW4gPSB0cnVlKTpib29sZWFuIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5oaWdobGlnaHRlZCE9PW9uKVxyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCA9IG9uO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0hpZ2hsaWdodGVkKCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0ZWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbG9uZSgpIDogR2FtZUNlbGw7XHJcblxyXG4gICAgcHVibGljIGNvcHlGcm9tKG90aGVyOiBHYW1lQ2VsbCkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBvdGhlci52YWx1ZTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gb3RoZXIuaXNIaWdobGlnaHRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBzb2x2ZVdpdGhWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyBwdWJsaWMgc2V0TmV3VmFsdWVTZXQobmV3VmFsdWVTZXQ6IG51bWJlcltdLCBvbmx5U2V0czogYm9vbGVhbiA9IGZhbHNlKSB7fVxyXG59XHJcbiIsImltcG9ydCB7IEdhbWVDZWxsIH0gZnJvbSBcIi4uL2dhbWUtdHlwZXMvZ2FtZS1jZWxsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZUNlbGxTb2xpdGFpcmUgZXh0ZW5kcyBHYW1lQ2VsbCB7XHJcblxyXG4gICAgcHVibGljIHNvbHZlV2l0aFZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEVNUFRZX0NFTEwgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBQRUdfQ0VMTCA9IDE7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBJTlZBTElEX0NFTEwgPSA5O1xyXG5cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBHYW1lQ2VsbCB7XHJcbiAgICAgICAgY29uc3Qgb3RoZXI6IEdhbWVDZWxsU29saXRhaXJlID0gbmV3IEdhbWVDZWxsU29saXRhaXJlKCk7XHJcbiAgICAgICAgb3RoZXIuY29weUZyb20odGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIG90aGVyOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWVBc1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWU9PT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuIFwiT1wiO1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWU9PT1HYW1lQ2VsbFNvbGl0YWlyZS5JTlZBTElEX0NFTEwpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlhcIjtcclxuICAgICAgICByZXR1cm4gJyAnO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBEZWVwU29sdmVyTWF0cml4IH0gZnJvbSBcIi4uL2dhbWUtdHlwZXMvZGVlcC1zb2x2ZVwiO1xyXG5pbXBvcnQgeyBHYW1lTW92ZU1ha2VyIH0gZnJvbSBcIi4uL2dhbWUtdHlwZXMvZ2FtZS1tb3ZlLW1ha2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTY2hlbWFTb2x2ZXIgfSBmcm9tIFwiLi4vZ2FtZS10eXBlcy9nYW1lLXNjaGVtYS1zb2x2ZXJcIjtcclxuaW1wb3J0IHsgR2FtZUNlbGxTb2xpdGFpcmUgfSBmcm9tIFwiLi9nYW1lLWNlbGxcIjtcclxuaW1wb3J0IHsgR2FtZVNjaGVtYVNvbGl0YWlyZSB9IGZyb20gXCIuL2dhbWUtc2NoZW1hXCI7XHJcblxyXG4vKlxyXG5leHBvcnQgY2xhc3MgR2FtZVNjaGVtYVNvbHZlclNvbGl0YWlyZSBleHRlbmRzIEdhbWVTY2hlbWFTb2x2ZXI8R2FtZUNlbGxTb2xpdGFpcmUsIEdhbWVTY2hlbWFTb2xpdGFpcmU+IHtcclxuICAgIHB1YmxpYyBzdGVwKHNjaGVtYTogR2FtZVNjaGVtYVNvbGl0YWlyZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zb2x2aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZmluZE1vdmVzKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSxyOm51bWJlcixjOm51bWJlcik6bnVtYmVyW11bXVtdIHtcclxuICAgICAgICBjb25zdCBtb3ZlczpudW1iZXJbXVtdW10gPSBbXTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAvLyBmaW5kIGFsbCB0aGUgbW92ZXMgZnJvbSB4PXIsYzogMiB4IDNcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0XHJcblxyXG4gICAgICAgIC8vIDE6XHJcbiAgICAgICAgaWYocj49MSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbci0xXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPj0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3ItMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3ItMSxjXSxbci0yLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIGlmKGM+PTEpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MtMV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgaWYoYz49Mikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjLTJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW1tyLGNdLFtyLGMtMV0sW3IsYy0yXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMzpcclxuICAgICAgICBpZihjPD01KSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjKzFdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKGM8PTQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcl1bYysyXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbcixjKzFdLFtyLGMrMl1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDQ6XHJcbiAgICAgICAgaWYocjw9NSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcisxXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPD00KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3IrMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3IrMSxjXSxbcisyLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbmRBbGxNb3ZlcyhjZWxsVmFsdWVzOm51bWJlcltdW10pOntwZWdzOm51bWJlcixtb3ZlczpudW1iZXJbXVtdW119IHtcclxuICAgICAgICBsZXQgYWxsTW92ZXM6IG51bWJlcltdW11bXSA9IFtdO1xyXG4gICAgICAgIGxldCBwZWdOdW0gPSAwO1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8NztyKyspXHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0wO2M8NztjKyspXHJcbiAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2NdID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlZ051bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVzID0gdGhpcy5maW5kTW92ZXMoY2VsbFZhbHVlcywgcixjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb3Zlcy5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsTW92ZXMgPSBhbGxNb3Zlcy5jb25jYXQobW92ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4geydwZWdzJzogcGVnTnVtLCAnbW92ZXMnOmFsbE1vdmVzfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZU1vdmUoY2VsbFZhbHVlczpudW1iZXJbXVtdLCBtb3ZlOiBudW1iZXJbXVtdKSB7XHJcblxyXG4gICAgICAgIGlmKG1vdmUubGVuZ3RoPT09MClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmcm9tID0gbW92ZVswXTtcclxuICAgICAgICBjb25zdCBtaWRkbGUgPSBtb3ZlWzFdO1xyXG4gICAgICAgIGNvbnN0IHRvID0gbW92ZVsyXTtcclxuXHJcbiAgICAgICAgY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMO1xyXG4gICAgICAgIGNlbGxWYWx1ZXNbbWlkZGxlWzBdXVttaWRkbGVbMV1dPUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgY2VsbFZhbHVlc1t0b1swXV1bdG9bMV1dPUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuZG9Nb3ZlKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSwgbW92ZTogbnVtYmVyW11bXSk6dm9pZCB7XHJcblxyXG4gICAgICAgIGlmKG1vdmUubGVuZ3RoPT09MClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmcm9tID0gbW92ZVswXTtcclxuICAgICAgICBjb25zdCBtaWRkbGUgPSBtb3ZlWzFdO1xyXG4gICAgICAgIGNvbnN0IHRvID0gbW92ZVsyXTtcclxuXHJcbiAgICAgICAgY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW21pZGRsZVswXV1bbWlkZGxlWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW3RvWzBdXVt0b1sxXV09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgIH1cclxuICAgIFxyXG5cclxufSAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVNb3ZlTWFrZXJTb2xpdGFpcmUgaW1wbGVtZW50cyBHYW1lTW92ZU1ha2VyIHtcclxuXHJcblxyXG4gICAgLy8gZmluZE1vdmVzKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSwgY29uZGl0aW9uczphbnkpOm51bWJlcltdW11bXTtcclxuXHJcbiAgICBwdWJsaWMgZmluZE1vdmVzKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSwgY29uZGl0aW9uczphbnkpOm51bWJlcltdW11bXSB7XHJcbiAgICAgICAgY29uc3QgbW92ZXM6bnVtYmVyW11bXVtdID0gW107XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG5cclxuICAgICAgICBsZXQgciA9IGNvbmRpdGlvbnMucm93O1xyXG4gICAgICAgIGxldCBjID0gY29uZGl0aW9ucy5jb2w7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAvLyBmaW5kIGFsbCB0aGUgbW92ZXMgZnJvbSB4PXIsYzogMiB4IDNcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0XHJcblxyXG4gICAgICAgIC8vIDE6XHJcbiAgICAgICAgaWYocj49MSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbci0xXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPj0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3ItMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3ItMSxjXSxbci0yLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIGlmKGM+PTEpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MtMV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgaWYoYz49Mikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjLTJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW1tyLGNdLFtyLGMtMV0sW3IsYy0yXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMzpcclxuICAgICAgICBpZihjPD01KSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjKzFdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKGM8PTQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcl1bYysyXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbcixjKzFdLFtyLGMrMl1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDQ6XHJcbiAgICAgICAgaWYocjw9NSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcisxXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPD00KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3IrMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3IrMSxjXSxbcisyLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmluZEFsbE1vdmVzKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSk6bnVtYmVyW11bXVtdOyAgICBcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBwZWdzOm51bWJlcj0wO1xyXG4gICAgcHVibGljIGdldFBlZ3MoKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5wZWdzfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kQWxsTW92ZXMoY2VsbFZhbHVlczpudW1iZXJbXVtdKTpudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIGxldCBhbGxNb3ZlczogbnVtYmVyW11bXVtdID0gW107XHJcbiAgICAgICAgbGV0IHBlZ051bSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCByPTA7cjw3O3IrKylcclxuICAgICAgICAgICAgZm9yKGxldCBjPTA7Yzw3O2MrKylcclxuICAgICAgICAgICAgICAgIGlmKGNlbGxWYWx1ZXNbcl1bY10gPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVnTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW92ZXMgPSB0aGlzLmZpbmRNb3ZlcyhjZWxsVmFsdWVzLHtyb3c6ciwgY29sOmN9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb3Zlcy5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsTW92ZXMgPSBhbGxNb3Zlcy5jb25jYXQobW92ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLnBlZ3MgPSBwZWdOdW07XHJcbiAgICAgICAgcmV0dXJuIGFsbE1vdmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlTW92ZShjZWxsVmFsdWVzOm51bWJlcltdW10sIG1vdmU6IG51bWJlcltdW10pOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgaWYobW92ZS5sZW5ndGg9PT0wKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGZyb20gPSBtb3ZlWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pZGRsZSA9IG1vdmVbMV07XHJcbiAgICAgICAgY29uc3QgdG8gPSBtb3ZlWzJdO1xyXG5cclxuXHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXSE9PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKGNlbGxWYWx1ZXNbbWlkZGxlWzBdXVttaWRkbGVbMV1dIT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1t0b1swXV1bdG9bMV1dIT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIGNlbGxWYWx1ZXNbZnJvbVswXV1bZnJvbVsxXV09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW21pZGRsZVswXV1bbWlkZGxlWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMO1xyXG4gICAgICAgIGNlbGxWYWx1ZXNbdG9bMF1dW3RvWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmRvTW92ZShjZWxsVmFsdWVzOm51bWJlcltdW10sIG1vdmU6IG51bWJlcltdW10pOnZvaWQge1xyXG5cclxuICAgICAgICBpZihtb3ZlLmxlbmd0aD09PTApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vdmVbMF07XHJcbiAgICAgICAgY29uc3QgbWlkZGxlID0gbW92ZVsxXTtcclxuICAgICAgICBjb25zdCB0byA9IG1vdmVbMl07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXSE9PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1ttaWRkbGVbMF1dW21pZGRsZVsxXV0hPT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKGNlbGxWYWx1ZXNbdG9bMF1dW3RvWzFdXSE9PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW21pZGRsZVswXV1bbWlkZGxlWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW3RvWzBdXVt0b1sxXV09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgIH0gICAgIFxyXG5cclxuXHJcbn1cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWNsYXNzZXMtcGVyLWZpbGVcclxuZXhwb3J0IGNsYXNzIERlZXBTb2x2ZXJNYXRyaXhTb2xpdGFpcmUgZXh0ZW5kcyBEZWVwU29sdmVyTWF0cml4IHtcclxuXHJcbiAgICAvLyBwcml2YXRlIHNvbHZlcjogR2FtZVNjaGVtYVNvbHZlclNvbGl0YWlyZSA9IG5ldyBHYW1lU2NoZW1hU29sdmVyU29saXRhaXJlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzb2x2aW5nTW92ZXM6bnVtYmVyW11bXVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBjdHg6YW55O1xyXG5cclxuICAgIHByaXZhdGUgc3RlcCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZlTWFrZXIgPSBuZXcgR2FtZU1vdmVNYWtlclNvbGl0YWlyZSgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hdHJpeDogbnVtYmVyW11bXSwgY3R4OmFueSkge1xyXG4gICAgICAgIHN1cGVyKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNvbHZpbmdNb3ZlcygpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvbHZpbmdNb3ZlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBoYXNJc29sYXRlZFBlZ3NCKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8IGNlbGxWYWx1ZXMubGVuZ3RoICAmJiAhZm91bmQ7cisrKVxyXG4gICAgICAgICAgICBmb3IobGV0IGM9MDtjPCBjZWxsVmFsdWVzW3JdLmxlbmd0aCAmJiAhZm91bmQ7YysrKVxyXG4gICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyXVtjXT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZ3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHI+MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyLTFdW2NdPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWdzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYz4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2MtMV09PT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZ3MrKztcclxuICAgICAgICAgICAgICAgICAgICBpZihyPGNlbGxWYWx1ZXMubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxWYWx1ZXNbcisxXVtjXT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVncysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGM8Y2VsbFZhbHVlc1tyXS5sZW5ndGgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyXVtjKzFdPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWdzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGVncz09PTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBoYXNJc29sYXRlZFBlZ3MoY2VsbFZhbHVlczpudW1iZXJbXVtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcclxuICAgICAgICBmb3IobGV0IHI9MDtyPDcgJiYgb2s7cisrKVxyXG4gICAgICAgICAgICBmb3IobGV0IGM9MDtjPDcgJiYgb2s7YysrKVxyXG4gICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyXVtjXT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocj4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbci0xXVtjXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYz4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbcl1bYy0xXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocjw2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbcisxXVtjXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYzw2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbcl1bYysxXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfSAgICBcclxuXHJcblxyXG4gICAgcHVibGljIGRlZXBTb2x2ZShsZXZlbDpudW1iZXIsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgLi4ucGFyYW1zOmFueVtdKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIC8vIHBydW5pbmdcclxuICAgICAgICBjb25zdCBpc29sYXRlZCA9IHRoaXMuaGFzSXNvbGF0ZWRQZWdzKHRoaXMubWF0cml4KTtcclxuICAgICAgICBjb25zdCBpc29sYXRlZEIgPSB0aGlzLmhhc0lzb2xhdGVkUGVnc0IodGhpcy5tYXRyaXgpO1xyXG5cclxuICAgICAgICAvKmlmKGlzb2xhdGVkQiE9PWlzb2xhdGVkKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQmluZ28hJyk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZihpc29sYXRlZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNvbnN0IG1vdmVzID0gdGhpcy5tb3ZlTWFrZXIuZmluZEFsbE1vdmVzKHRoaXMubWF0cml4KTtcclxuICAgICAgICBpZih0aGlzLm1vdmVNYWtlci5nZXRQZWdzKCk9PT0xKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICBmb3IobGV0IG09MDsgbTxtb3Zlcy5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVNYWtlci5leGVjdXRlTW92ZSh0aGlzLm1hdHJpeCwgbW92ZXNbbV0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gbW92ZXNbbV1bMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaWRkbGUgPSBtb3Zlc1ttXVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gbW92ZXNbbV1bMl07XHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd0cnlWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IGZyb21bMF0sICdjb2wnOiBmcm9tWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndHJ5VmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBtaWRkbGVbMF0sICdjb2wnOiBtaWRkbGVbMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwgfX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd0cnlWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IHRvWzBdLCAnY29sJzogdG9bMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRlZXBTb2x2ZShsZXZlbCsxLCByb3csIGNvbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAnc2V0VmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBmcm9tWzBdLCAnY29sJzogZnJvbVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICdzZXRWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IG1pZGRsZVswXSwgJ2NvbCc6IG1pZGRsZVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICdzZXRWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IHRvWzBdLCAnY29sJzogdG9bMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29sdmluZ01vdmVzLnB1c2gobW92ZXNbbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVNYWtlci51bmRvTW92ZSh0aGlzLm1hdHJpeCwgbW92ZXNbbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd1bmRvVmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBmcm9tWzBdLCAnY29sJzogZnJvbVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndW5kb1ZhbHVlJywgZXZlbnREYXRhOnsncm93JzogbWlkZGxlWzBdLCAnY29sJzogbWlkZGxlWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd1bmRvVmFsdWUnLCBldmVudERhdGE6eydyb3cnOiB0b1swXSwgJ2NvbCc6IHRvWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJ1R3YXMgYSB3cm9uZyBtb3ZlISEhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGVlcFNvbHZlck1hdHJpeFNvbGl0YWlyZSB9IGZyb20gXCIuL2dhbWUtc2NoZW1hLXNvbHZlclwiO1xyXG5cclxuY29uc3QgY3R4OiBXb3JrZXIgPSBzZWxmIGFzIGFueTtcclxuXHJcbmN0eC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IG1hdHJpeCA9IGV2ZW50LmRhdGEubWF0cml4O1xyXG4gICAgY29uc3Qgc29sdmVyID0gbmV3IERlZXBTb2x2ZXJNYXRyaXhTb2xpdGFpcmUobWF0cml4LGN0eCk7XHJcbiAgICBsZXQgc29sdXRpb25SZXN1bHQgPSBcIlJlc29sdXRpb24gZmFpbGVkLlwiXHJcbiAgICBpZihzb2x2ZXIuZGVlcFNvbHZlKDAsIDEsIDMpKSB7XHJcbiAgICAgICAgc29sdXRpb25SZXN1bHQgPSBcIlJlY3Vyc2l2ZSBzZWFyY2ggc3VjY2VlZGVkLlwiO1xyXG4gICAgfVxyXG4gICAgY3R4LnBvc3RNZXNzYWdlKHsnZXZlbnRUeXBlJzogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgLCAnbWF0cml4JzptYXRyaXhcclxuICAgICAgICAsICdzb2x1dGlvblJlc3VsdCc6IHNvbHV0aW9uUmVzdWx0XHJcbiAgICAgICAgLCAnc29sdmluZ01vdmVzJzogc29sdmVyLmdldFNvbHZpbmdNb3ZlcygpfSk7XHJcbn0pOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMF0hLi9zcmMvc29saXRhaXJlL3NvbGl0YWlyZS1kZWVwLXNvbHZlci53b3JrZXIudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9