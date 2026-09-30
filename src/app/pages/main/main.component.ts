import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  ButtonComponent,
  FaqComponent,
  FaqItemComponent,
  formatPrice,
  PlanCardComponent,
  PlanCatalogService,
  PlanCategory,
  SectionHeadingComponent,
  SeoService,
  SocialLinksComponent,
} from '@c-code/c-code-fw/ui';
import { CONTACT, SOCIAL_LINKS, WHATSAPP_URL } from '../../site.config';
import { CATEGORY_SLUGS } from '../plans/category-slugs';

interface CategoryCard {
  category: PlanCategory;
  title: string;
  description: string;
  imageSrc: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  { category: PlanCategory.Couple, title: 'Pareja', description: 'Hidromasaje, jacuzzi y rituales para dos.', imageSrc: 'assets/images/plan2.png' },
  { category: PlanCategory.Individual, title: 'Individual', description: 'Un momento solo para ti.', imageSrc: 'assets/images/plan1.png' },
  { category: PlanCategory.Group, title: 'Grupal', description: 'Celebra con amigas, amigos o familia.', imageSrc: 'assets/images/plan3.png' },
];

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    ButtonComponent,
    SectionHeadingComponent,
    PlanCardComponent,
    FaqComponent,
    FaqItemComponent,
    SocialLinksComponent,
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {
  private seo = inject(SeoService);
  private catalog = inject(PlanCatalogService);

  readonly whatsappUrl = WHATSAPP_URL;
  readonly contact = CONTACT;
  readonly socialLinks = SOCIAL_LINKS;
  private readonly plans = toSignal(this.catalog.getPlans(), { initialValue: [] });

  /** Tarjetas de categoría con el precio más bajo y la cantidad de planes, calculados de plans.json. */
  readonly categoryCards = computed(() =>
    CATEGORY_CARDS.map((card) => {
      const plans = this.plans().filter((plan) => plan.category === card.category);
      const minPrice = plans.length ? Math.min(...plans.map((plan) => plan.price)) : null;
      return {
        ...card,
        minPrice,
        meta: plans.length ? `${plans.length} ${plans.length === 1 ? 'plan' : 'planes'} · ${card.description}` : card.description,
        queryParams: { categoria: CATEGORY_SLUGS[card.category] },
      };
    })
  );

  /** Precio más bajo de todos los planes, para el hero. */
  readonly fromPrice = computed(() => {
    const prices = this.plans().map((plan) => plan.price);
    return prices.length ? formatPrice(Math.min(...prices)) : '';
  });

  readonly coupleQuery = { categoria: CATEGORY_SLUGS[PlanCategory.Couple] };

  ngOnInit() {
    this.seo.update({
      title: 'Ixora Spa Bucaramanga | Spa para parejas con hidromasaje y jacuzzi',
      description:
        'Ixora Spa en Bucaramanga: planes para parejas, individuales y grupos con piscina de hidromasaje, jacuzzi con espuma y masajes. Abierto todos los días de 8:00 a. m. a 9:00 p. m. Reserva por WhatsApp.',
      path: '/',
    });
  }
}
