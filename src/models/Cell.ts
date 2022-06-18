import { Colors } from "./Colors";
import {Figure} from "./figure/Figure";
import {Board} from "./Board";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // Есть ли возможность перемещения
  id: number; // Для ключей реакт

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }
}