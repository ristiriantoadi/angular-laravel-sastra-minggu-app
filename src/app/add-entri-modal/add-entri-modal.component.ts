import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-entri-modal',
  templateUrl: './add-entri-modal.component.html',
  styleUrls: ['./add-entri-modal.component.css']
})
export class AddEntriModalComponent implements OnInit {

  // @Input() name;//this is not necessary by the way

  constructor(public activeModal:NgbActiveModal) {}

  ngOnInit(): void {
  }

}
