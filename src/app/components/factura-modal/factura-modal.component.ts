import { FacturaModalService } from './factura-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura-modal',
  templateUrl: './factura-modal.component.html',
  styleUrls: ['./factura-modal.component.scss']
})
export class FacturaModalComponent implements OnInit {

  factura = null
  productos = null
  constructor(public _facturaModalService: FacturaModalService) { }

  ngOnInit() {
    
    this.factura = this._facturaModalService.factura;

 //   this.productos = this.factura.productos
  }

}
