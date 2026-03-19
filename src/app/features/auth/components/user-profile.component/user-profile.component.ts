import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileFormModel } from '@/features/auth/models/user-profile.model';
import { UserApi } from '@/internal-shared/services/user.api';
import { toast } from 'ngx-sonner';
import { NAME_REGEX } from '@/features/auth/domain/name.rules';
import { TabBarComponent } from '@/internal-shared/components/tab-bar.component/tab-bar.component';
import { TabLink } from '@/internal-shared/models/tabLink.model';
import {
  UserHeader,
  UserProfileHeaderComponent,
} from '@/features/auth/components/user-profile-header.component/user-profile-header.component';
import { AuthService } from '@/core/services/auth.service';
import { UserModel } from '@/core/models/user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, TabBarComponent, UserProfileHeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private _fb = inject(NonNullableFormBuilder);
  private _userApi = inject(UserApi);
  private _authService: AuthService = inject(AuthService);
  private _router = inject(Router);

  tabLinks: TabLink[] = [
    { name: 'Profil', icon: 'person' },
    { name: 'Sécurité', icon: 'lock' },
    { name: 'Mon vétérinaire', icon: 'medication' },
  ];

  activeTab = signal<string>(this.tabLinks[0].name);

  userHeader = signal<UserHeader | null>(null);

  userProfileForm: FormGroup<UserProfileFormModel> = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    firstname: this._fb.control('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    address: this._fb.control(''),
    role: this._fb.control(''),
  });

  selectTab(name: string): void {
    this.activeTab.set(name);
  }

  ngOnInit(): void {
    this._userApi
      .getMe()
      .then((me) => {
        this.userProfileForm.patchValue({
          name: me.name ?? '',
          firstname: me.firstname ?? '',
          address: me.address ?? '',
        });

        this.userHeader.set({
          firstname: me.firstname ?? '',
          name: me.name ?? '',
          role: me.role ?? '',
        });

        console.log('userHeader set =', this.userHeader());
      })
      .catch((error) => {
        console.error('Le chargement du profil a échoué.', error);
        toast.error('Impossible de charger le profil.');
      });
  }

  async onSubmit(): Promise<void> {
    if (this.userProfileForm.invalid) {
      this.userProfileForm.markAllAsTouched();
      return;
    }

    const { name, firstname, address } = this.userProfileForm.getRawValue();

    const payload = {
      name: name.trim(),
      firstname: firstname.trim(),
      address: (address ?? '').trim(), // permet de vider l'adresse
    };

    const userUpdated: UserModel = {
      ...this._authService.user()!,
      firstName: firstname.trim(),
      name: name.trim(),
    };
    this._authService.updateUser(userUpdated);

    try {
      await this._userApi.updateUserProfile(payload);
      toast.success('Modification effectuée.');
      this.userProfileForm.markAsPristine();
      this.userProfileForm.markAsUntouched();

      const current = this.userHeader();
      if (current) {
        this.userHeader.set({ ...current, name: payload.name, firstname: payload.firstname });
      }
    } catch (error) {
      console.error('Modification échouée.', error);
      toast.error('Modification échouée.');
    }
  }

  async deleteAccount(): Promise<void> {
    const ok = confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
    );
    if (!ok) return;

    try {
      await this._userApi.deleteMe();
      this._authService.logout();
      await this._router.navigate(['/register']);
      toast.success('Compte supprimé.');
    } catch (e) {
      toast.error('Impossible de supprimer le compte.');
    }
  }
}
