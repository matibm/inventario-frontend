import { CajaModalService } from './caja-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caja-modal',
  templateUrl: './caja-modal.component.html',
  styleUrls: ['./caja-modal.component.scss']
})
export class CajaModalComponent implements OnInit {

  constructor(
    public _cajaModalService : CajaModalService
  ) { }

  ngOnInit() {
  }

}
