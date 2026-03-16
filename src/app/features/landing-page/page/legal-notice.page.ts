import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-legal-notice.page',
  imports: [ZardButtonComponent],
  template: `
    <div class="top-bar">
      <z-button zSize="lg" zType="link" (click)="goBack()">
        <span class="material-icons cursor-pointer">arrow_back</span>
        Retour
      </z-button>
    </div>

    <div class="legal-container">
      <header class="legal-header">
        <span class="material-icons legal-icon">gavel</span>
        <h1>Mentions légales</h1>
        <p class="legal-subtitle">Dernière mise à jour : Mars 2026</p>
      </header>

      <section class="legal-section">
        <h2>1. Éditeur de l'application</h2>
        <p>
          L'application <strong>Jokeur</strong> est éditée et exploitée par l'équipe Jokeur.
          Pour toute question, vous pouvez nous contacter à l'adresse :
          <a href="mailto:contact@jokeur.ashleydev.fr">contact&#64;jokeur.ashleydev.fr</a>
        </p>
      </section>

      <section class="legal-section">
        <h2>2. Hébergement</h2>
        <p>
          L'application est hébergée par :<br />
          <strong>OVH SAS</strong><br />
          2 rue Kellermann — 59100 Roubaix, France<br />
          <a href="https://www.ovh.com" target="_blank" rel="noopener">www.ovh.com</a>
        </p>
      </section>

      <section class="legal-section disclaimer-section">
        <span class="material-icons disclaimer-icon">info</span>
        <div>
          <h2>3. Avertissement médical vétérinaire</h2>
          <p>
            Les informations et conseils disponibles sur <strong>Jokeur</strong> sont fournis à
            titre informatif uniquement. Ils <strong>ne constituent pas un diagnostic
            vétérinaire</strong> et ne sauraient en aucun cas remplacer une consultation auprès
            d'un vétérinaire qualifié.
          </p>
          <p>
            En cas de doute sur la santé de votre animal, consultez immédiatement un
            professionnel de santé animale. Jokeur décline toute responsabilité en cas
            d'utilisation des informations de l'application comme substitut à un avis
            vétérinaire.
          </p>
        </div>
      </section>

      <section class="legal-section">
        <h2>4. Données personnelles</h2>
        <p>
          Jokeur collecte uniquement les données nécessaires au fonctionnement du service :
          informations de compte (adresse e-mail, mot de passe chiffré) et données relatives
          à vos animaux (nom, espèce, suivi de santé). Les données relatives à vos animaux
          ne constituent pas des données personnelles au sens du RGPD.
        </p>
        <p>
          Vos données de compte ne sont jamais cédées à des tiers. Conformément au RGPD,
          vous disposez d'un droit d'accès, de rectification et de suppression depuis votre
          espace personnel ou en nous contactant directement.
        </p>
      </section>

      <section class="legal-section">
        <h2>5. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur Jokeur — textes, visuels, logotype, structure
          de l'application — sont la propriété exclusive de leurs auteurs. Toute reproduction,
          représentation ou diffusion sans autorisation préalable est strictement interdite.
        </p>
      </section>

      <section class="legal-section">
        <h2>6. Limitation de responsabilité</h2>
        <p>
          Jokeur fournit des conseils généraux de bien-être animal à titre non médical.
          Ces informations ne remplacent en aucun cas l'avis d'un vétérinaire et ne doivent
          pas être utilisées comme base de décision médicale. L'équipe Jokeur s'efforce
          de maintenir des contenus fiables et à jour, mais ne saurait être tenue responsable
          des conséquences liées à leur utilisation.
        </p>
      </section>

      <section class="legal-section">
        <h2>7. Contact</h2>
        <p>
          Pour toute question relative aux présentes mentions légales ou à vos données :
          <a href="mailto:contact@jokeur.ashleydev.fr">contact&#64;jokeur.ashleydev.fr</a>
        </p>
      </section>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
    }

    .top-bar {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 720px;
      margin-bottom: 32px;
    }

    .legal-container {
      width: 100%;
      max-width: 720px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .legal-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 8px;
      padding-bottom: 32px;
      border-bottom: 1px solid #e5e7eb;
    }

    .legal-icon {
      font-size: 40px;
      color: #6b7280;
    }

    .legal-header h1 {
      font-size: 28px;
      font-weight: 700;
      margin: 0;
    }

    .legal-subtitle {
      font-size: 14px;
      color: #9ca3af;
      margin: 0;
    }

    .legal-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .legal-section h2 {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary);
      margin: 0;
    }

    .legal-section p {
      font-size: 15px;
      line-height: 1.7;
      color: #374151;
      margin: 0;
    }

    .legal-section a {
      color: inherit;
      text-decoration: underline;
    }

    .disclaimer-section {
      flex-direction: row;
      gap: 16px;
      background: oklch(from var(--secondary) l c h / 0.08);
      border: 1px solid oklch(from var(--secondary) l c h / 0.35);
      border-radius: 12px;
      padding: 20px;
    }

    .disclaimer-icon {
      font-size: 24px;
      color: var(--secondary);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .disclaimer-section h2 {
      color: oklch(from var(--secondary) calc(l - 0.15) c h);
    }

    .disclaimer-section p {
      color: oklch(from var(--secondary) calc(l - 0.2) c h);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LegalNoticePage {
  private readonly router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}
