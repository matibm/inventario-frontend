import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit {

  constructor() { }
  usuario
  ngOnInit() {
  }
  @Input() usuarios 
  @Output() complete = new EventEmitter()
}
