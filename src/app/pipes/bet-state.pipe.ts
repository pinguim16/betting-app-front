import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'betState',
  standalone: true,
})
export class BetStatePipe implements PipeTransform {

  private stateMapping: { [key: string]: string } = {
    'W': 'Ganha',
    'P': 'Pendente',
    'L': 'Perdida',
    // Você pode adicionar outros mapeamentos aqui
  };

  transform(value: string): string {
    return this.stateMapping[value] || value;
  }
}
