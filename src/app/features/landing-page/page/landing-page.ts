import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { LandingNavbarComponent } from '@/features/landing-page/components/navbar/landing-navbar.component';
import { LandingHeroComponent } from '@/features/landing-page/components/hero/landing-hero.component';
import { LandingFeaturesComponent } from '@/features/landing-page/components/features/landing-features.component';
import { LandingHowItWorksComponent } from '@/features/landing-page/components/how-it-works/landing-how-it-works.component';
import { LandingCtaFooterComponent } from '@/features/landing-page/components/cta-footer/landing-cta-footer.component';
import { isPlatformBrowser } from '@angular/common';

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    LandingNavbarComponent,
    LandingHeroComponent,
    LandingFeaturesComponent,
    LandingHowItWorksComponent,
    LandingCtaFooterComponent,
  ],
  template: `
    <app-landing-navbar
      [activeSection]="activeSection()"
      [menuOpen]="menuOpen()"
      (menuToggled)="toggleMenu()"
    />

    <main id="main-content">
      <app-landing-hero />
      <app-landing-features [features]="features" />
      <app-landing-how-it-works />
      <app-landing-cta-footer />
    </main>
  `,
})
export default class LandingPageComponent implements OnInit {
  private readonly _platformId = inject(PLATFORM_ID);

  readonly menuOpen = signal(false);
  readonly activeSection = signal('hero');

  readonly features: Feature[] = [
    {
      icon: '🩺',
      title: 'Suivi médical complet',
      description:
        'Consultations, vaccins, traitements - tout centralisé en un seul endroit pour chaque animal.',
      color: 'var(--teal)',
    },
    {
      icon: '🤒',
      title: 'Suivi des symptômes',
      description:
        'Consignez les symptômes de votre animal et recevez des conseils de premiers gestes non-médicaux. Rien ne remplace un vétérinaire, mais vous aurez les bons réflexes.',
      color: 'var(--orange)',
    },
    {
      icon: '📅',
      title: 'Agenda intégré',
      description:
        'Rappels automatiques pour les vaccins, visites et traitements. Ne manquez plus aucun rendez-vous.',
      color: 'var(--navy)',
    },
    {
      icon: '📄',
      title: 'Export PDF & tableur',
      description:
        'Générez des carnets de santé complets à partager avec votre vétérinaire — en PDF ou en tableur — en un clic.',
      color: 'var(--teal)',
    },
    {
      icon: '🔒',
      title: 'Données sécurisées',
      description:
        'Vos données sont hébergées en France, chiffrées et accessibles uniquement par vous.',
      color: 'var(--orange)',
    },
    {
      icon: '📋',
      title: 'Dossiers dynamiques',
      description:
        'Formulaires intelligents adaptés à chaque espèce. Chiens et chats — chaque profil est unique.',
      color: 'var(--navy)',
    },
  ];

  ngOnInit(): void {
    this._initScrollSpy();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  private _initScrollSpy(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
  }
}
