import { EditarProductoModalService } from './editar-producto-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-producto-modal',
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.scss']
})
export class EditarProductoModalComponent implements OnInit {
 email
  constructor(public _editarProductoModalService: EditarProductoModalService) { }

  ngOnInit() {
  }


  
}
