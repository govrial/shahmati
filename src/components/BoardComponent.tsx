import React, {FC, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Simulate} from "react-dom/test-utils";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function clickCell(cell: Cell) {
    if (cell.figure) {
      setSelectedCell(cell);
    }
  }

  function hlCells() { // подсветка доступных шагов
    board.hlCells(selectedCell);
    updateBoard();
  }

  function updateBoard() { // обновление состояния доски
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }



    return (
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
    );
};

export default BoardComponent;