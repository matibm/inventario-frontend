import { ClienteModalService } from './cliente-modal.service';
import { ImprimirFacturaService } from 'src/app/components/imprimir-factura/imprimir-factura.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss']
})
export class ClienteModalComponent implements OnInit {

  constructor(
    public _imprimirFacturaService: ImprimirFacturaService,
    public _clienteModalService: ClienteModalService
  ) { }

  ngOnInit() {
  }

}
