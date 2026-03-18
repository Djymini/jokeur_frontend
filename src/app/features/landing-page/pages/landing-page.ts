import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { LandingHeroComponent } from '@/features/landing-page/components/landing-hero/landing-hero.component';
import { LandingFeaturesComponent } from '@/features/landing-page/components/landing-features/landing-features.component';
import { LandingHowItWorksComponent } from '@/features/landing-page/components/landing-how-it-works/landing-how-it-works.component';
import { LandingCtaSectionComponent } from '@/features/landing-page/components/landing-cta-section/landing-cta-section.component';
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
    LandingHeroComponent,
    LandingFeaturesComponent,
    LandingHowItWorksComponent,
    LandingCtaSectionComponent,
  ],
  template: `
    <main id="main-content">
      <app-landing-hero />
      <app-landing-features [features]="features" />
      <app-landing-how-it-works />
      <app-landing-cta-section />
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
        'Notez les symptômes et accédez aux bons gestes pour réagir vite avant la consultation vétérinaire.',
      color: 'var(--orange)',
    },
    {
      icon: '📅',
      title: 'Agenda intégré',
      description:
        'Rappels automatiques pour le vétérinaire et autres professionnels. Ne manquez plus aucune échéance.',
      color: 'var(--navy)',
    },
    {
      icon: '📄',
      title: 'Export PDF & tableur',
      description:
        'Générez des carnets de santé complets à partager avec votre vétérinaire (en PDF ou en tableur) en un clic.',
      color: 'var(--teal)',
    },
    {
      icon: '🔔',
      title: 'Rappels automatiques',
      description: 'Recevez des rappels pour les vaccins et vermifuges de vos animaux.',
      color: 'var(--orange)',
    },
    {
      icon: '📋',
      title: 'Dossiers dynamiques',
      description:
        'Formulaires intelligents adaptés à chaque espèce. Chiens et chats, chaque profil est unique.',
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
