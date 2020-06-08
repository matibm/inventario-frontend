import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { EditarProductoModalService } from 'src/app/components/editar-producto-modal/editar-producto-modal.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  seccion = 'faltantes'
  faltantes
  desde = 0;
  constructor(
    public _editarProductoModalService: EditarProductoModalService,
    public _productosService: ProductoService
  ) {
  }
  ngOnInit() {
    this.cargarFaltantes()

  }

  cargarFaltantes() {
    this._productosService.getProductosFaltantes(this.desde).subscribe((resp: any) => {
      this.faltantes = resp.productos
    })
  }

}
