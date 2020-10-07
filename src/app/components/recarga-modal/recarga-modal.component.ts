import { RecargaModalServiceService } from './recarga-modal-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recarga-modal',
  templateUrl: './recarga-modal.component.html',
  styleUrls: ['./recarga-modal.component.scss']
})
export class RecargaModalComponent implements OnInit {

  constructor(
    public _recargaModalService: RecargaModalServiceService
  ) { }

  ngOnInit() {
  }

}
