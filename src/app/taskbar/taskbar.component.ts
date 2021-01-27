import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {

  @Output() public taskbarEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  fireEventSearchDone(message){
    this.taskbarEvent.emit(message)
  }

}
