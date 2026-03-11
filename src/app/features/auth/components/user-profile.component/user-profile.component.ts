import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileFormModel } from '@/features/auth/models/user-profile.model';
import { UserApi } from '@/internal-shared/services/user.api';
import { toast } from 'ngx-sonner';
import { NAME_REGEX } from '@/features/auth/domain/name.rules';
import { TabBarComponent } from '@/internal-shared/components/tab-bar.component/tab-bar.component';
import { TabLink } from '@/internal-shared/models/tabLink.model';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, TabBarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private _fb = inject(NonNullableFormBuilder);
  private _userApi = inject(UserApi);

  tabLinks: TabLink[] = [
    { name: 'Profil', icon: 'person' },
    { name: 'Sécurité', icon: 'home' },
    { name: 'Mon vétérinaire', icon: 'home' },
  ];

  activeTab = signal<string>(this.tabLinks[0].name);

  userProfileForm: FormGroup<UserProfileFormModel> = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    firstname: this._fb.control('', [Validators.required, Validators.pattern(NAME_REGEX)]),
    address: this._fb.control(''),
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

    try {
      await this._userApi.updateUserProfile(payload);
      toast.success('Modification effectuée.');
      this.userProfileForm.markAsPristine();
      this.userProfileForm.markAsUntouched();
    } catch (error) {
      console.error('Modification échouée.', error);
      toast.error('Modification échouée.');
    }
  }
}
