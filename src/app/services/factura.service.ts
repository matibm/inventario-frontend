import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  public noficacion = new EventEmitter<any>();
  constructor(
    private http: HttpClient
  ) { }
  buscarFacturas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/producto/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.productos
    }))
  }
  getFacturasPorCliente(idCliente) {
    let url = URL_SERVICIOS + '/factura/cliente/' + idCliente
    return this.http.get(url)
  }

  getFacturas(desde, hasta) {
    let url = URL_SERVICIOS + '/factura/' + desde + '?hasta=' + hasta;
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp.facturas);

      return resp.facturas
    })
  }
  getFacturasParaCobro() {
    let url = URL_SERVICIOS + '/factura/fecha_cobro';
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp.facturas);

      return resp.facturas
    })
  }
  getProductosMasVendidos(desde, hasta) {
    let url = URL_SERVICIOS + '/factura/masvendidos';
    return this.http.get(url);
  }

  getProductosVendidosEnFecha(desde, hasta) {
    let url = URL_SERVICIOS + '/factura/productosVendidos/' + desde + '?hasta=' + hasta;

    return this.http.get(url).toPromise();
  }

  async setFactura(factura) {
    let date = new Date(factura.fecha);
    let fechaCompleta = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes();
    let original = factura;
    let url = URL_SERVICIOS + '/factura';
    await this.http.post(url, original).toPromise().then((resp: any) => {
       
     return resp.factura

    })
    // for (let i = 0; i < factura.productos.length; i++) {
    //   const prod = factura.productos[i];
    //   let size = prod.marca.length;
    //   console.log(size);
    //   let tam = 26 - size;
    //   if (size < 26) {
    //     for (let j = 0; j < tam; j++) {
    //       prod.marca += ' '
    //     }
    //   }

    //   let value = prod.precio;
    //   if (!value) {
    //     return 0
    //   }
    //   let texto = value.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //   if (value % 1 == 0) {
    //     texto = texto.slice(0, texto.length - 2)
    //   }
    //   prod.precio = texto;

    // }

    // let value = factura.monto;
    // if (!value) {
    //   return 0
    // }
    // let texto = value.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    // if (value % 1 == 0) {
    //   texto = texto.slice(0, texto.length - 2)
    // }
    // factura.monto = texto;

    // let infoFactura = {
    //   tienda: '               MISTICA CELL',
    //   fecha: fechaCompleta,
    //   monto: factura.monto,
    //   costo: factura.costo,
    //   productos: factura.productos,
    //   debiendo: factura.debiendo,

    //   // printerName: 'Microsoft Print to PDF'
    //   printerName: 'EPSON TM-U220 Receipt'
    // }

    // let url2 = 'http://localhost:8080';
    // this.http.post(url2, infoFactura).toPromise().then((resp: any) => {
    //   console.log(resp);

    // })
    // console.log(original);



  }
  putFactura(factura) {

    let url = URL_SERVICIOS + '/factura/' + factura._id;
    return this.http.put(url, factura).pipe(map((resp: any) => {
      console.log(resp);

      return resp.factura
    }))
  }

  getFacturasSinPagar() {
    let url = URL_SERVICIOS + '/factura/debiendo';
    return this.http.get(url);
  }
  eliminarFactura(factura) {
    let url = URL_SERVICIOS + '/factura/' + factura._id;
    return this.http.delete(url).pipe(map((resp: any) => {
      this.noficacion.emit();
      Swal.fire({
        icon: 'success',
        title: 'Factura Eliminada',
        showConfirmButton: false,
        timer: 1500
      })
      return resp.factura
    }))
  }

  getFacturasPorUsuario(idUsuario, desde, hasta) {
    let url = URL_SERVICIOS + '/factura/facturas_por_usuario/' + idUsuario + '/' + desde + '?hasta=' + hasta;
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.facturas;
    })
  }


}
