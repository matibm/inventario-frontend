import { Component, OnInit } from '@angular/core';
import { ClienteModalService } from '../cliente-modal/cliente-modal.service';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.scss']
})
export class CuotasComponent implements OnInit {

  constructor(
    public _clienteModalService: ClienteModalService
  ) { }

  ngOnInit() {
  }

}
