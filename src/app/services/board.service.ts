import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckersStatus } from '../CheckersStatus';



@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardUrl = "http://localhost:8080/checkers/"
  // x: number;
  // y: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;

  constructor(private http: HttpClient) { }


  // public getBoard2(): Observable<string[][]> {
  //   return this.http.get<string[][]>(this.boardClickUrl + "click?&y=" + this.y + "&x=" + this.x,
  //     { withCredentials: true });
  // }

  // public getBoard3(): Observable<CheckersStatus> {
  //   return this.http.get<CheckersStatus>(this.boardClickUrl + "move?&y=" + this.startY + "&x=" + this.startX
  //     + "&y=" + this.endY + "&x=" + this.endX, { withCredentials: true });
  // }

  public getBoard(): Observable<string[][]> {
    console.log("(" + this.startY + "," + this.startX + ") (" + this.endY + "," + this.endX + ")");
    return this.http.get<string[][]>(this.boardUrl + "move?&y0=" + this.startY + "&x0=" + this.startX
      + "&y1=" + this.endY + "&x1=" + this.endX, { withCredentials: true });
  }

  public getIsWhiteTurn(): Observable<boolean> {
    return this.http.get<boolean>(this.boardUrl + "isWhiteTurn", { withCredentials: true });
  }

  // public restart2(): Observable<CheckersStatus> {
  //   return this.http.get<CheckersStatus>(this.boardClickUrl + "restart",
  //     { withCredentials: true });
  // }

  public restart(): Observable<string[][]> {
    return this.http.get<string[][]>(this.boardUrl + "restart",
      { withCredentials: true });
  }

}
