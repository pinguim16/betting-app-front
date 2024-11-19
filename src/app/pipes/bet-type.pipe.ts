// src/app/pipes/bet-type.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'betType',
  standalone: true, // Torna o pipe standalone
})
export class BetTypePipe implements PipeTransform {

  private typeMapping: { [key: string]: string } = {
    'S': 'Simples',
    'M': 'Múltipla',
    // Adicione outros mapeamentos aqui se necessário
  };

  transform(value: string): string {
    return this.typeMapping[value] || value;
  }
}
