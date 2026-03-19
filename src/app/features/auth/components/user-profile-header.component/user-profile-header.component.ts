import { Component, computed, input, output } from '@angular/core';

export type UserHeader = {
  firstname: string;
  name: string;
  role?: string;
};

@Component({
  selector: 'app-user-profile-header',
  imports: [],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.scss',
})
export class UserProfileHeaderComponent {
  user = input.required<UserHeader>();
  readonly editClicked = output<void>();

  protected readonly fullName = computed(() => {
    const u = this.user();
    return `${u.firstname} ${u.name}`.trim();
  });
}
