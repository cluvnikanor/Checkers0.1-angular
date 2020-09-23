import { Component, OnInit } from '@angular/core';
import { CheckersStatus } from 'src/app/CheckersStatus';
import { BoardService } from 'src/app/services/board.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  checkersStatus: CheckersStatus;
  board: string[][] = new Array(8);
  whiteTurn: boolean;
  startFilled: boolean;
  glow: boolean[][] = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ];

  blackImg = "assets/img/black_circle.png";
  blackKingImg = "assets/img/black_king.png";
  whiteImg = "assets/img/white_circle.png";
  whiteKingImg = "assets/img/white_king.png";
  noneImg = "assets/img/black_square.png";

  constructor(public boardService: BoardService) { }

  ngOnInit() {

    // this.board = [
    //   ["N", "W", "N", "W", "N", "W", "N", "W"],
    //   ["W", "N", "W", "N", "W", "N", "W", "N"],
    //   ["N", "W", "N", "W", "N", "W", "N", "W"],
    //   ["N", "N", "N", "N", "N", "N", "N", "N"],
    //   ["N", "N", "N", "N", "N", "N", "N", "N"],
    //   ["B", "N", "B", "N", "B", "N", "B", "N"],
    //   ["N", "B", "N", "B", "N", "B", "N", "B"],
    //   ["B", "N", "B", "N", "B", "N", "B", "N"]
    // ]
    this.restart();

    this.whiteTurn = true;
    this.startFilled = false;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; i < 8; i++) {
        this.glow[i][j] = false;
      }
    }

    // this.board = this.checkersStatus.board;
    // this.whiteTurn = this.checkersStatus.isWhiteTurn;
  }

  public pieceImg(pieceString: string): string {
    switch (pieceString) {
      case "B": {
        return this.blackImg;
      }
      case "BK": {
        return this.blackKingImg;
      }
      case "W": {
        return this.whiteImg;
      }
      case "WK": {
        return this.whiteKingImg;
      }
      default: {
        return this.noneImg;
      }
    }
  }

  public boardClick(y: number, x: number): void {
    if ((this.whiteTurn && (this.board[y][x] == "W" || this.board[y][x] == "WK")) ||
      (!this.whiteTurn && (this.board[y][x] == "B" || this.board[y][x] == "BK"))) {
      this.boardService.startX = x;
      this.boardService.startY = y;
      this.startFilled = true;
    }
    if (this.board[y][x] == "N" && this.startFilled) {
      this.boardService.endX = x;
      this.boardService.endY = y;
      this.boardService.getBoard().subscribe(c => { this.board = c; },
        err => { console.log(err.message) });
      this.boardService.getIsWhiteTurn().subscribe(c => { this.whiteTurn = c; },
        err => { console.log(err.message) });
      this.startFilled = false;
    }
  }

  public restart() {
    this.boardService.restart().subscribe(c => { this.board = c; },
      err => { console.log(err.message) });
    this.boardService.getIsWhiteTurn().subscribe(c => { this.whiteTurn = c; },
      err => { console.log(err.message) });
  }

  public glowMe(y: number, x: number): void {
    this.glow[y][x] = true;
  }

  // public boardClick3(y: number, x: number): void {
  //   this.boardService.y = y;
  //   this.boardService.x = x;
  //   this.boardService.getBoard2().subscribe(c => { this.board = c; },
  //     err => { console.log(err.message) });
  // }

  // public boardClick2(y: number, x: number): void {
  //   if ((this.whiteTurn && (this.board[y][x] == "W" || this.board[y][x] == "WK")) ||
  //     (!this.whiteTurn && (this.board[y][x] == "B" || this.board[y][x] == "BK"))) {
  //     this.boardService.startX = x;
  //     this.boardService.startY = y;
  //     this.startFilled = true;
  //   }
  //   if (this.board[y][x] == "N" && this.startFilled) {
  //     this.boardService.endX = x;
  //     this.boardService.endY = y;
  //     this.boardService.getBoard().subscribe(c => { this.board = c.board; 
  //       this.whiteTurn = c.isWhiteTurn; 
  //     },
  //       err => { console.log(err.message) });
  //     this.startFilled = false;
  //   }
  // }

}