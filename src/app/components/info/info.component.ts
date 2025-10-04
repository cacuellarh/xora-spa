import { Component } from '@angular/core';
import { whatsappMsgDefault } from '../../pages/plans/const';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  public msg : string = whatsappMsgDefault
}
