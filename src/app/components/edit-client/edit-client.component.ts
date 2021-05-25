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
    // this.cliente.fecha_nacimiento = this.date.getTime()
    this.date? this.cliente.fecha_nacimiento = this.date.getTime() : ''
    this._clienteService.editarCliente(this.cliente).subscribe(()=>{
      this.oncomplete.emit()
    })
  }


  
  stringDate
  date:Date 
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



}
