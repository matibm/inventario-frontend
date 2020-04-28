import { ImprimirFacturaService } from 'src/app/components/imprimir-factura/imprimir-factura.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprimir-factura',
  templateUrl: './imprimir-factura.component.html',
  styleUrls: ['./imprimir-factura.component.scss']
})
export class ImprimirFacturaComponent implements OnInit {

  constructor(
    public _imprimirFacturaService: ImprimirFacturaService
  ) { }

  ngOnInit() {
  }

}
