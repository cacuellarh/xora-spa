import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoComponent } from "./components/info/info.component";
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'xora-spa';
}
