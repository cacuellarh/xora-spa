import { Component, inject } from '@angular/core';
import { GalleryComponent, GalleryImage, PageBannerComponent, SeoService } from '@c-code/c-code-fw/ui';

/** Leyendas de las fotos de assets/images/galery/<n>.webp, en orden. */
const CAPTIONS = [
  'Piscina de hidromasaje iluminada con velas',
  'Piscina de hidromasaje decorada con pétalos',
  'Cabina de masajes',
  'Jacuzzi decorado para celebrar un cumpleaños',
  'Piscina de hidromasaje',
  'Zona húmeda con piscina de hidromasaje',
  'Recepción',
  'Sala de espera',
  'Zona de bebidas',
  'Clienta disfrutando la piscina de hidromasaje',
  'Pareja en la piscina de hidromasaje',
  'Cliente en la piscina de hidromasaje',
  'Masaje de espalda',
  'Piscina de hidromasaje decorada con velas',
  'Chocolaterapia',
  'Masaje relajante',
  'Jacuzzi iluminado y decorado para una celebración',
  'Masaje en pareja',
  'Despedida de soltera en el jacuzzi',
  'Celebración en el jacuzzi con espuma',
  'Relajación en el jacuzzi con espuma',
  'Amigas brindando en el jacuzzi',
  'Chocolaterapia en la espalda',
  'Pareja en el jacuzzi con luces',
  'Jacuzzi con espuma y luces de colores',
  'Amigas en el jacuzzi con espuma',
  'Pareja en el jacuzzi decorado para su celebración',
  'Pareja brindando en el jacuzzi',
  'Amigas brindando en el jacuzzi decorado',
  'Brindis en el jacuzzi con espuma',
  'Pareja en el jacuzzi decorado con globos',
  'Pareja en el jacuzzi con luz violeta',
  'Cócteles de bienvenida',
];

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [GalleryComponent, PageBannerComponent],
  templateUrl: './galery.component.html',
})
export class GaleryComponent {
  private seo = inject(SeoService);

  public images: GalleryImage[] = CAPTIONS.map((caption, i) => ({
    src: `assets/images/galery/${i + 1}.webp`,
    // Miniatura de 600 px para la cuadrícula; la foto completa solo se carga al abrir el visor.
    thumb: `assets/images/galery/thumbs/${i + 1}.webp`,
    caption,
    alt: `${caption} en Ixora Spa Bucaramanga`,
  }));

  ngOnInit(): void {
    this.seo.update({
      title: 'Galería de fotos: hidromasaje, jacuzzi y cabinas de masaje | Ixora Spa Bucaramanga',
      description:
        'Mira las instalaciones de Ixora Spa en Bucaramanga: piscina de hidromasaje, jacuzzi con espuma, cabinas de masaje y decoraciones para celebraciones.',
      path: '/galeria',
    });
  }
}
