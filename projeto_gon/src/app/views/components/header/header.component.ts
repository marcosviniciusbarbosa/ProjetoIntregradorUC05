import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public currentTheme: string = 'default';
  public logoHeader: string =
    'assets/images/logo/barbearia-blue-transparent-logo.png';

  public themes: any[] = [
    {
      value: 'default',
      name: 'Claro',
    },
    {
      value: 'dark',
      name: 'Escuro',
    },
    {
      value: 'cosmic',
      name: 'Cosmico',
    },
  ];

  constructor(
    private _themeService: NbThemeService,
    private _sidebarService: NbSidebarService
  ) {
    this._themeService.onThemeChange().subscribe((theme: any) => {
      console.log(`Theme changed to ${theme.name}`);
    });
  }

  ngOnInit(): void {}

  toggleSidebar(): boolean {
    this._sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  changeTheme(themeName: string) {
    this._themeService.changeTheme(themeName);
    if (themeName !== 'default') {
      this.logoHeader = 'assets/images/logo/barbearia-white-transparent-logo.png';
    } else {
      this.logoHeader = 'assets/images/logo/barbearia-blue-transparent-logo.png';
    }
  }
}
