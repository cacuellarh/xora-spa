import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfoComponent } from '../../components/info/info.component'; 

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule, InfoComponent],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css'],
})
export class GaleryComponent {
  public albums: Array<any> = [];
  public selected: number | null = null; // índice de la imagen abierta

  constructor() {
    // Configuración de las imágenes de la galerías
    for (let i = 1; i <= 45; i++) {
      const src = `assets/images/galery/${i}.JPG`;
      const caption = `Imagen ${i}`;
      const thumb = `assets/images/galery/${i}.JPG`;
      const album = { src, caption, thumb };
      this.albums.push(album);
    }
  }

  open(index: number): void {
    this.selected = index;
  }

  close(): void {
    this.selected = null;
  }

  next(): void {
    if (this.selected !== null) {
      this.selected = (this.selected + 1) % this.albums.length;
    }
  }

  prev(): void {
    if (this.selected !== null) {
      this.selected = (this.selected - 1 + this.albums.length) % this.albums.length;
    }
  }
}