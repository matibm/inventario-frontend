import Swal  from 'sweetalert2';
import { CajaModalService } from './../../components/caja-modal/caja-modal.service';
import { CrearProductoModalService } from './../../components/crear-producto-modal/crear-producto-modal.service';
import { EditarProductoModalService } from './../../components/editar-producto-modal/editar-producto-modal.service';
import { CierreCajaService } from './../../services/cierre-caja.service';
import { FacturaService } from './../../services/factura.service';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos
  decremento : any[] = new Array
  items: any[] = new Array
  constructor(private _productoService: ProductoService,
    public _editarProductoModalService: EditarProductoModalService,
    private _cierreCajaService: CierreCajaService,
    private _cierreCajaModalService: CajaModalService,
    public _crearProductoModalService: CrearProductoModalService,
    private _facturaService: FacturaService) { }
  desde
  //cantidad
  total = 0
  vuelto = 0
  factura
  ngOnInit() {
    this.cargarProductos()
    this._editarProductoModalService.notificacion.subscribe(resp => this.cargarProductos())
    this._crearProductoModalService.notificacion.subscribe(resp => this.cargarProductos())
    this._productoService.notificacion.subscribe(resp => {
      this.items = null
      this.factura = null
      this.total = 0
      this.vuelto = 0
      this.decremento = null
      this.cargarProductos();
      
    })

  }

  ingreso(ing) {
    let vueltoAux = 0;
    vueltoAux = ing - this.total
    if (vueltoAux >= 0) {
      this.vuelto = vueltoAux;
    } else {
      this.vuelto = 0;
    }
  }

  cargarProductos() {
    //  this.cargando = true;
    this._productoService.getProductos(this.desde).subscribe((resp: any) => {
      // console.log(resp);
      this.productos = resp.productos.reverse();
      //  this.cargando = false;
    })
  }

  buscarProducto(termino: string) {
    if (termino.length <= 0) {
      this.cargarProductos();
      return;
    }
    this._productoService.buscarProductos(termino).subscribe((productos) => {
      this.productos = productos
    })
  }

  selecctionarItem(producto, cant) {
    producto.cantidad = cant
    this.items.push(producto)
    let obj ={
      id : producto._id,
      cantidad: cant
    }
    this.decremento.push(obj)
    this.total += cant * producto.precio
  }

  // seleccionarCantidad(cantidad) {
  //   this.cantidad = cantidad
  // }

  vender() {
    if (!this._cierreCajaModalService.cerrado) {
      let date = new Date()
      this.factura = {
        productos: this.items,
        fecha: date.getTime(),
        monto: this.total
      }
      let cierrecaja

      let id = localStorage.getItem('idCaja')
      if (id) {
        this._cierreCajaService.getCierreCaja(id).subscribe((resp: any) => {
          console.log(resp);

          cierrecaja = resp.cierreCaja
          cierrecaja.montoCierre += this.total
          cierrecaja.facturas.push(this.factura)
          this._cierreCajaService.putCierreCaja(cierrecaja).subscribe()

          this._facturaService.setFactura(this.factura).subscribe(() =>{
            this._productoService.decrementarProducto(this.decremento).subscribe()
            
          })

        })
      }
    } else{
        Swal.fire({
        icon: 'error',
        title: 'No se pudo vender, abre la caja primero',
        showConfirmButton: true
      });

    }

  }



}
