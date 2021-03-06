import { navBarService } from './../../services/navbar.service';
import { FacturaService } from './../../services/factura.service';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  cliente
  clientes
  facturas
  factura
  items
  editCliente = false;
  count = 12
  page = 1
  constructor(
    public _clienteService: ClienteService,
    public _facturaService: FacturaService,
    public _navBarService: navBarService

  ) { }
  getItems(facturas) {
    this.items = facturas.length
  }

  editarCliente(cliente) {
    this.cliente = cliente
    this.editCliente = true;
  }

  ngOnInit() {
    this._navBarService.navBgColor = 'bg-danger'
    this.getClientes(this.page);
    this._clienteService.noficacion.subscribe(() => {
      this.getClientes(this.page);
      this.facturas = null;
      this.factura = null;
      this.items = null;
      this.cliente = null;
    })
    this._facturaService.noficacion.subscribe(() => {
      this.facturas = null;
      this.factura = null;
      this._facturaService.getFacturasPorCliente(this.cliente._id).subscribe((resp: any) => {
        this.facturas = resp.facturas
        this.getItems(this.facturas)

      })
    })
  }

  getClientes(page) {
     
    this._clienteService.getClientes(page).subscribe((resp: any) => {
      console.log(resp);
      this.count = resp.count
      this.clientes = resp.clientes;
    })
  }

  seleccionarCliente(cliente) {
    this.factura = null;
    this.facturas = null;
    this.cliente = cliente;
    this._facturaService.getFacturasPorCliente(cliente._id).subscribe((resp: any) => {
      this.facturas = resp.facturas
      this.getItems(this.facturas)
    })
  }

  seleccionarFactura(item) {
    this.factura = item
  }

  buscarCliente(termino) {
    if (termino) {
      this._clienteService.buscarClientes(termino).subscribe((resp: any) => {
        this.clientes = resp
        // console.log(resp);

      })
    } else {
      this.getClientes(this.page)
    }

  }

  eliminarCliente(cliente) {

    this._clienteService.eliminarCliente(cliente._id).subscribe()
  }
  eliminarFactura(factura) {

    this._facturaService.eliminarFactura(factura).subscribe()
  }

  pagar() {
    this.factura.debiendo = false;
    this.factura.fecha = new Date().getTime();

    this._facturaService.putFactura(this.factura).subscribe()
  }

  pageChanged(event) {
    this.getClientes(event)
  }

}
