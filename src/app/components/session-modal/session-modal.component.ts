import { SessionModalService } from './session-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.scss']
})
export class SessionModalComponent implements OnInit {

  constructor(
    public _sessionService: SessionModalService
  ) { }

  ngOnInit() {
  }

}
