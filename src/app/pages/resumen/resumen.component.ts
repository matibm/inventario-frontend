import { FacturaModalService } from './../../components/factura-modal/factura-modal.service';
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
  fSinPagar
  desde = 0;
  masVendidos
  hoy: Date
  diaDesde: number
  mesDesde
  yearDesde
  productosVendidos
  semanaDesde: Date
  diaHasta
  hasta
  mesHasta
  yearHasta
  dateDesde: Date
  dateHasta: Date = new Date();
  constructor(
    public _editarProductoModalService: EditarProductoModalService,
    public _productosService: ProductoService,
    public _facturaService: FacturaService,
    public _facturaModalService: FacturaModalService
  ) {
  }
  ngOnInit() {
    this.setFechas()
    this.cargarFaltantes()
    this.cargarMasVendidos()
    this.cargarFacturasSinPagar();
    this.cargarProductosVendidos(this.dateDesde.valueOf(), this.dateHasta.valueOf());

  }

  setFechas() {
    this.dateDesde = new Date()
    this.hoy = new Date()
    
    this.semanaDesde = new Date(this.dateDesde.setFullYear(this.dateDesde.getFullYear(), this.dateDesde.getMonth(), this.dateDesde.getDate().valueOf() - 7))
    this.dateDesde = this.semanaDesde
    
    this.dateDesde.setHours(0, 0, 0);
    this.dateHasta.setHours(23, 59, 0);

    this.diaDesde = this.dateDesde.getDate();
    this.mesDesde = this.dateDesde.getUTCMonth() + 1;
    this.yearDesde = this.dateDesde.getFullYear();

    this.diaHasta = this.hoy.getDate();
    this.mesHasta = this.hoy.getMonth() + 1;
    this.yearHasta = this.hoy.getFullYear();
  }

  cargarFacturasSinPagar(){
    this._facturaService.getFacturasSinPagar().subscribe((resp : any)=>{
      this.fSinPagar = resp.facturas
    })
  }
  cargarFaltantes() {
    this._productosService.getProductosFaltantes(this.desde).subscribe((resp: any) => {
      this.faltantes = resp.productos
    })
  }

  filtrar() {
    let date = new Date();
    let desde = new Date(date.setUTCFullYear(this.yearDesde, this.mesDesde - 1, this.diaDesde));
    desde.setHours(0, 0, 0)

    date = new Date();
    let hasta = new Date(date.setUTCFullYear(this.yearHasta, this.mesHasta - 1, this.diaHasta));
    hasta.setHours(23, 59, 0)
    
    this.cargarProductosVendidos(desde.valueOf(), hasta.valueOf());

  }

  cargarMasVendidos(desde?, hasta?){
    this._facturaService.getProductosMasVendidos(2, 2).subscribe((resp:any) =>{
      this.masVendidos = resp.facturas;
    })
  }
  cargarProductosVendidos(desde?, hasta?){
    this._facturaService.getProductosVendidosEnFecha(desde, hasta).subscribe((resp:any) =>{
      console.log(resp);
      
      this.productosVendidos = resp.productos;
    })
  }
  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura)
  }

}
