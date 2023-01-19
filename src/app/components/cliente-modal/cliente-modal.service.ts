import { ClienteService } from './../../services/cliente.service';
import { ProductoService } from './../../services/producto.service';
import { ImprimirFacturaService } from 'src/app/components/imprimir-factura/imprimir-factura.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteModalService {
  oculto = 'oculto'
  ocultocuotas = 'oculto'
  cliente = {
    ci: '',
    nombre: '',
    _id: '',
    tel: '',
    direccion: ''
  }
  clienteSelected
  clientes = new Array
  tablaBoolean = false;
  factura
  imprimir = false;
  totalMonto = 0
  cantCuotas = 0
  seCreaCuotas = false
  diaVencimiento = ''
  aumentoPorcentaje = 0
  originalTotal = 0
  constructor(
    private _clienteService: ClienteService
  ) {
    this.tablaBoolean = JSON.parse(localStorage.getItem('tablaBoolean')) || false;
  }

  ocultarModal() {
    this.oculto = 'oculto'
  }

  buscarCliente(termino: string) {

    if (termino.length <= 0) {
      // this.cargarProductos();
      return;
    }

    this._clienteService.buscarClientes(termino).subscribe(resp => {
      this.clientes = resp
    })
  }

  mostrarTabla() {
    this.cliente.nombre = ''
    this.cliente.ci = ''
    this.cliente._id = ''
    this.tablaBoolean = true;
    localStorage.setItem('mostarTabla', 'false');
    // console.log("Mostar tabla");

    this._clienteService.getClientes().subscribe((resp: any) => {
      // console.log(resp);

      this.clientes = resp.clientes;
    })
  }


  stringDate
  date: Date
  validarFecha() {

    let d = new Date(this.stringDate);
    d.setUTCHours(5)
    console.log(d);

    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
        this.date = null

      } else {
        // date is valid
        this.date = d
      }
    } else {
      // not a date
      this.date = null

    }
  }


  seleccionarCliente(cliente) {
    console.log(cliente);
    this.clienteSelected = cliente;
    this.ocultarModal()
  }

  agregarCliente() {
    let cliente = {
      nombre: this.cliente.nombre,
      ci: this.cliente.ci,
      tel: this.cliente.tel,
      direccion: this.cliente.direccion,
      fecha_nacimiento: this.date.getTime()
      // ruc: this.cliente.ruc
    }
    this._clienteService.crearCliente(cliente).subscribe((cliente: any) => {
      this.cliente = cliente
    })
    this.ocultarModal()
  }

  ocultarTabla() {

    this.cliente.nombre = ''
    this.cliente.ci = ''
    this.cliente._id = ''

    this.tablaBoolean = false;
    localStorage.setItem('mostarTabla', 'true');
  }

  guardar() {

    // console.log(this.cliente)
    if (this.cliente.ci || this.cliente.nombre) {
      this.imprimir = true;
    }
    this.ocultarModal();

    // this._productosService.oculto = 'oculto';
    // this._imprimiFacturaService.mostrarFactura(this.cliente, this.factura)


  }

  modificarPrecioPorPorcentaje(total, porcentaje) {
    return porcentaje * total / 100
  }

  getExplainCoutas(cantidad, total, fecha) {
    return `Se pagaran ${cantidad} cuotas de ${ Math.round(total / cantidad)} Gs, el ${fecha} de cada mes`
  }
}
