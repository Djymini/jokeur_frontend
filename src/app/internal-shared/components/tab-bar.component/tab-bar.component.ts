import { Component, input, OnInit, output, signal } from '@angular/core';
import { TabLink } from '@/internal-shared/models/tabLink.model';

@Component({
  selector: 'app-tab-bar',
  imports: [],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent implements OnInit {
  tabLinks = input.required<TabLink[]>();
  activeTabLink = signal<string>('');
  activeTab = output<string>();

  selectTab(name: string): void {
    this.activeTabLink.set(name);
    this.activeTab.emit(name);
  }

  ngOnInit(): void {
    this.activeTabLink.set(this.tabLinks()[0].name);
  }
}
