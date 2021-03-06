import { map } from 'rxjs/operators';
import { CierreCajaService } from './../../services/cierre-caja.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaModalService {
  oculto: string = 'oculto';
  monto
  montoFijo
  facturas = []
  egresos = []
  fechaInicio
  montoInicio
  montoCierre
  posibleGanancia
  cerrado = true
  caja
  montoFijoCerrado = '0'
  constructor(
    private _cierreCajaService: CierreCajaService
  ) {

    this.montoFijo = parseInt(localStorage.getItem('montofijo')) || 0
    this.montoFijoCerrado = localStorage.getItem('montofijocerrado') || '0'
    console.log(this.montoFijoCerrado);
    
  }


  ocultarModal() {

    this.oculto = 'oculto';
  }
  calcularPosibleGanancia(caja) {
    let monto = 0;
    for (let i = 0; i < caja.facturas.length; i++) {
      const factura = caja.facturas[i];
      for (let j = 0; j < factura.productos.length; j++) {
        const producto = factura.productos[j];
        if (producto.desc) {
          monto += (producto.descuento * producto.cantidad) - (producto.precioBruto * producto.cantidad);

        } else {
          monto += (producto.precio * producto.cantidad) - (producto.precioBruto * producto.cantidad);

        }
      }
    }
    this.posibleGanancia = monto

  }
  mostrarModal() {
    // let id = localStorage.getItem('idCaja')
    // if (id) {
    //   this._cierreCajaService.getCierreCaja(id).subscribe((resp: any) => {

    //     this.caja = resp.cierreCaja
    //     this.calcularPosibleGanancia(this.caja);
    //     this.fechaInicio = resp.cierreCaja.fechaInicio
    //     this.montoInicio = resp.cierreCaja.montoInicio
    //     this.montoCierre = resp.cierreCaja.montoCierre
    //     this.cerrado = resp.cierreCaja.cerrado

    //   })
    // } else {
    //   //this.cerrado = true;
    // }



    this.oculto = '';
  }


  cerrarCaja() {

    this.montoFijo = 0;
    localStorage.setItem('montofijo', '0');
    this.montoFijoCerrado = '0'
    // this.cerrado = true
    // this.caja.cerrado = true
    // this.caja.fechaCierre = new Date().getTime()
    // this._cierreCajaService.putCierreCaja(this.caja).subscribe(resp => {
    //   this.ocultarModal()
    // }, err => {
    //   if (err) {

    //   }
    // })
  }


}
