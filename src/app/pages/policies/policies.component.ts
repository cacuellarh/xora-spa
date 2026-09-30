import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfoItemComponent, NoticeComponent, PageBannerComponent, SeoService, whatsappUrl } from '@c-code/c-code-fw/ui';
import { CONTACT } from '../../site.config';

/** Índice de la página: id del ancla y título de cada sección. */
const SECTIONS = [
  { id: 'protocolo', title: 'Política y protocolo del spa' },
  { id: 'reservaciones', title: 'Reservaciones' },
  { id: 'bonos', title: 'Bonos Spa' },
  { id: 'factura', title: 'Factura' },
  { id: 'salud', title: 'Estado de salud' },
  { id: 'llegadas-tarde', title: 'Llegadas tarde' },
  { id: 'cancelacion', title: 'Cancelación y reagendamiento' },
  { id: 'devoluciones', title: 'Devoluciones' },
  { id: 'higiene', title: 'Higiene' },
  { id: 'pagos', title: 'Pagos' },
  { id: 'precios', title: 'Precios' },
  { id: 'protocolos', title: 'Protocolos del spa' },
];

@Component({
  selector: 'app-policies',
  imports: [RouterLink, PageBannerComponent, InfoItemComponent, NoticeComponent],
  templateUrl: './policies.component.html',
})
export class PoliciesComponent {
  private seo = inject(SeoService);

  readonly sections = SECTIONS;
  readonly contact = CONTACT;
  readonly whatsapp = (phone: string) => whatsappUrl(phone);

  ngOnInit() {
    this.seo.update({
      title: 'Políticas de reserva, cancelación y pagos | Ixora Spa Bucaramanga',
      description:
        'Políticas de Ixora Spa Bucaramanga: reservas, vigencia del bono spa (30 días), cancelación con 24 horas de anticipación, medios de pago (Bancolombia, Nequi, Daviplata y efectivo) y protocolos.',
      path: '/politicas',
    });
  }
}
