import { Component, computed, input, output } from '@angular/core';

export type UserHeader = {
  firstname: string;
  name: string;
  role?: string;
};

@Component({
  selector: 'app-user-profile-header',
  imports: [],
  templateUrl: './settings-header.component.html',
  styleUrl: './settings-header.component.scss',
})
export class SettingsHeaderComponent {
  user = input.required<UserHeader>();
  readonly editClicked = output<void>();

  protected readonly fullName = computed(() => {
    const u = this.user();
    return `${u.firstname} ${u.name}`.trim();
  });
}
