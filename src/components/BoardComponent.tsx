import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function clickCell(cell: Cell) {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      updateBoard()
    } else {
      if(cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    hlCells();
  }, [selectedCell])

  function hlCells() { // подсветка доступных шагов
    board.hlCells(selectedCell);
    updateBoard();
  }

  function updateBoard() { // обновление состояния доски
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  const style = {
    color: 'red',
  }

    return (
        <div>
          <h3>Current player is <b style={style}>{currentPlayer?.color}</b></h3>
          <div className={'board'}>
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                  {
                    row.map(cell => <CellComponent
                        click={clickCell}
                        cell={cell}
                        key={cell.id}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                    />)
                  }
                </React.Fragment>
            )}

          </div>
        </div>
    );
};

export default BoardComponent;