import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [MenubarModule, RouterModule],
})
export class MenuComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard', // Aponta para a rota '/dashboard'
      },
      {
        label: 'Apostas',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'Listar Apostas', icon: 'pi pi-fw pi-list', routerLink: '/bets' },
          { label: 'Nova Aposta', icon: 'pi pi-fw pi-plus', routerLink: '/bets/create' },
          { label: 'Importar Apostas', icon: 'pi pi-fw pi-upload', routerLink: '/bets/import' }, // Atualizado para '/bets/import'
        ],
      },
      {
        label: 'Tipsters',
        icon: 'pi pi-fw pi-users',
        items: [
          { label: 'Listar Tipsters', icon: 'pi pi-fw pi-list', routerLink: '/tipsters' },
          { label: 'Novo Tipster', icon: 'pi pi-fw pi-user-plus', routerLink: '/tipsters/create' },
        ],
      },

      {
        label: 'Units',
        icon: 'pi pi-fw pi-dollar',
        items: [
          { label: 'Listar Units', icon: 'pi pi-fw pi-list', routerLink: '/units' },
        ],
      },

      {
        label: 'Esportes',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          { label: 'Listar Esportes', icon: 'pi pi-fw pi-list', routerLink: '/sports' },
          { label: 'Novo Esporte', icon: 'pi pi-fw pi-plus', routerLink: '/sports/create' },
        ],
      },

      {
        label: 'Tipos de Aposta',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          { label: 'Listar Tipos', icon: 'pi pi-fw pi-list', routerLink: '/bet-types' },
          { label: 'Novo Tipo', icon: 'pi pi-fw pi-plus', routerLink: '/bet-types/create' },
        ],
      },

      {
        label: 'Casas de Apostas',
        icon: 'pi pi-fw pi-home',
        items: [
          { label: 'Listar Casas', icon: 'pi pi-fw pi-list', routerLink: '/bookmakers' },
          { label: 'Nova Casa', icon: 'pi pi-fw pi-plus', routerLink: '/bookmakers/create' },
        ],
      },

      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-tags',
        items: [
          { label: 'Listar Categorias', icon: 'pi pi-fw pi-list', routerLink: '/categories' },
          { label: 'Nova Categoria', icon: 'pi pi-fw pi-plus', routerLink: '/categories/create' },
        ],
      },

      {
        label: 'Competições',
        icon: 'pi pi-fw pi-flag',
        items: [
          { label: 'Listar Competições', icon: 'pi pi-fw pi-list', routerLink: '/competitions' },
          { label: 'Nova Competição', icon: 'pi pi-fw pi-plus', routerLink: '/competitions/create' },
        ],
      },

      {
        label: 'Bankrolls',
        icon: 'pi pi-fw pi-wallet',
        items: [
          { label: 'Listar Bankrolls', icon: 'pi pi-fw pi-list', routerLink: '/bankrolls' },
          { label: 'Novo Bankroll', icon: 'pi pi-fw pi-plus', routerLink: '/bankrolls/create' },
        ],
      },

      {
        label: 'Tipos',
        icon: 'pi pi-fw pi-list', // Você pode escolher outro ícone que achar mais apropriado
        items: [
          { label: 'Listar Tipos', icon: 'pi pi-fw pi-list', routerLink: '/types' },
          { label: 'Novo Tipo', icon: 'pi pi-fw pi-plus', routerLink: '/types/create' },
        ],
      },

      // Adicione outros itens de menu conforme necessário
    ];
  }
}