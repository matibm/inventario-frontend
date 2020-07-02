import { FacturaService } from './../../services/factura.service';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(
    public _clienteService: ClienteService,
    public _facturaService: FacturaService
  ) { }
  getItems(facturas) {
    this.items = facturas.length
  }
  ngOnInit() {
    this.getClientes();
    this._clienteService.noficacion.subscribe(() => {
      this.getClientes();
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

  getClientes() {
    this._clienteService.getClientes().subscribe((resp: any) => {
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

    this._clienteService.buscarClientes(termino).subscribe((resp: any) => {
      this.clientes = resp
      console.log(resp);

    })
  }

  eliminarCliente(cliente) {
    
    this._clienteService.eliminarCliente(cliente._id).subscribe()
  }
  eliminarFactura(factura) {

    this._facturaService.eliminarFactura(factura).subscribe()
  }

  pagar() {
    this.factura.debiendo = false;
    this._facturaService.putFactura(this.factura).subscribe()
  }

}
