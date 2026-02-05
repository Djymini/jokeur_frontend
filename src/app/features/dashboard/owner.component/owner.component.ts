import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

export type Notification = {
  hasNew: boolean;
  date: string;
  message: string;
};

export type Reminder = {
  date: string;
  message: string;
};

export type Appointment = {
  date: string;
  title: string;
  status: 'pending' | 'confirmed' | 'completed';
};

export type Animal = {
  name: string;
  type: string;
  nicknames: string[];
};

@Component({
  selector: 'app-owner',
  imports: [NgClass],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss',
})
export default class OwnerComponent {
  // Notifications
  notifications: Notification = {
    date: '28/08/2024',
    message: 'Vous avez une nouvelle notification',
    hasNew: true,
  };

  reminders: Reminder = {
    date: '28/08/2028',
    message: 'Aucun rappel',
  };

  appointments: Appointment = {
    date: '28/08/2024',
    title: 'Rendez-vous chez le toiletteur',
    status: 'confirmed',
  };

  // Animals
  animals: Animal[] = [
    { name: 'Rex', type: 'le chien flic', nicknames: ['Lassie'] },
    { name: 'Beethoven', type: '', nicknames: ['Garfield'] },
    { name: 'Rex', type: 'le chien flic', nicknames: ['Lassie'] },
    { name: 'Beethoven', type: '', nicknames: ['Garfield'] },
  ];

  getAppointmentStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success-light';
      case 'pending':
        return 'text-warning bg-warning-light';
      case 'completed':
        return 'text-info bg-info-light';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  }
}
