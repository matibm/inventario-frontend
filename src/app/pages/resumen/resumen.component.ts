import { FacturaService } from './../../services/factura.service';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { EditarProductoModalService } from 'src/app/components/editar-producto-modal/editar-producto-modal.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  seccion = 'masVendidos'
  faltantes
  desde = 0;
  masVendidos
  constructor(
    public _editarProductoModalService: EditarProductoModalService,
    public _productosService: ProductoService,
    public _facturaService: FacturaService
  ) {
  }
  ngOnInit() {
    this.cargarFaltantes()
    this.cargarMasVendidos()
  }

  cargarFaltantes() {
    this._productosService.getProductosFaltantes(this.desde).subscribe((resp: any) => {
      this.faltantes = resp.productos
    })
  }

  // swithcSection(section){
    
  // }

  cargarMasVendidos(){
    this._facturaService.getProductosMasVendidos(2, 2).subscribe((resp:any) =>{
      this.masVendidos = resp.facturas;
    })
  }

}
