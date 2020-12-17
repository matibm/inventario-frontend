import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  cliente
  constructor(
    public _clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.cliente = this.clienteToEdit;
  }

  @Output() oncomplete = new EventEmitter
  @Input() clienteToEdit
  guardar(){
    this._clienteService.editarCliente(this.cliente).subscribe(()=>{
      this.oncomplete.emit()
    })
  }

}
