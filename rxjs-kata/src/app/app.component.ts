import { Component, OnInit } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  display: string = "No connection";
  numberSocket: WebSocketSubject<any>;

  constructor(socket: WebSocketSubject<any> = undefined) {
    if(!socket) {
      this.numberSocket = webSocket('ws://localhost:8081');      
    } else {
      this.numberSocket = socket;
    }
  }

  ngOnInit(): void {
    this.numberSocket.asObservable().subscribe(data => {
      this.display = this.fizzBuzz(data.payload.number);
    })
  }

  fizzBuzz(input: number): string {

    if(input % 15 === 0) {
      return 'FizzBuzz';
    }

    if(input % 3 === 0) {
      return 'Fizz';
    }

    if(input % 5 === 0) {
      return 'Buzz';
    }
    
    return input.toString();
  }
}
