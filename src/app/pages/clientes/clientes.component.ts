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
  }

  getClientes() {
    this._clienteService.getClientes().subscribe((resp: any) => {
      this.clientes = resp.clientes;
    })
  }

  seleccionarCliente(cliente) {
    this.cliente = cliente;
    this._facturaService.getFacturasPorCliente(cliente._id).subscribe((resp: any) => {
      this.facturas = resp.facturas
      this.getItems(this.facturas)
    })
  }

  seleccionarFactura(item){
    this.factura = item
  }

  pagar(){
    this.factura.debiendo = false;
    this._facturaService.putFactura(this.factura).subscribe()
  }

}
