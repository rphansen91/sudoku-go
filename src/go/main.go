package main

import (
	"syscall/js"

	"github.com/rphansen91/sudoku"
)

// Declare a main function, this is the entrypoint into our go module
// That will be run. In our example, we won't need this
func main() {
	c := make(chan struct{}, 0)

	board = sudoku.New(9)
	println("WASM Go Initialized")
	js.Global().Set("createBoard", createWrapper())
	js.Global().Set("solveBoard", solveWrapper())
	js.Global().Set("visualizeBoard", visualizeWrapper())
	js.Global().Set("displayBoard", displayBoardWrapper())
	js.Global().Set("updateBoard", updateBoardWrapper())
	js.Global().Set("checkBoard", checkBoardWrapper())
	println("WASM Sudoku Initialized")

	<-c
}

var board sudoku.Board

func createWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		// board[0] = []int{3, 0, 6, 5, 0, 8, 4, 0, 0}
		// board[1] = []int{5, 2, 0, 0, 0, 0, 0, 0, 0}
		// board[2] = []int{0, 8, 7, 0, 0, 0, 0, 3, 1}
		// board[3] = []int{0, 0, 3, 0, 1, 0, 0, 8, 0}
		// board[4] = []int{9, 0, 0, 8, 6, 3, 0, 0, 5}
		// board[5] = []int{0, 5, 0, 0, 9, 0, 6, 0, 0}
		// board[6] = []int{1, 3, 0, 0, 0, 0, 2, 5, 0}
		// board[7] = []int{0, 0, 0, 0, 0, 0, 0, 7, 4}
		// board[8] = []int{0, 0, 5, 2, 0, 6, 3, 0, 0}
		board = sudoku.Generate(args[0].Int())
		return board.Display()
	})
}

func displayBoardWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return board.Display()
	})
}

func checkBoardWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return board.Check()
	})
}

func updateBoardWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		row := args[0].Int()
		col := args[1].Int()
		value := args[2].Int()
		board[row][col] = value
		return board.Check()
	})
}

func solveWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		board = board.Copy()
		var solutions []sudoku.Board
		// callback := args[len(args)-1:][0]
		sudoku.Solve(board, &solutions, func(r, c, v int) {
			// callback.Invoke(board.Display())
		})
		return solutions[0].Display()
	})
}

func visualizeWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		callback := args[len(args)-1:][0]
		board = board.Copy()
		var solutions []sudoku.Board
		sudoku.Solve(board, &solutions, func(r, c, v int) {
			callback.Invoke(board.Display())
		})
		return solutions[0].Display()
	})
}
