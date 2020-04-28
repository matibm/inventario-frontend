import { SessionModalService } from './components/session-modal/session-modal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'control-stock';
  constructor(private _sessionModalService: SessionModalService){
    
    // if (localStorage.getItem('logged') != 'true') {
    //   _sessionModalService.mostrarModal()
    // }
  }
}
