import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateStatus',
  standalone: true
})
export class TranslateStatusPipe implements PipeTransform {

  /**
   * Translates status to Portuguese
   * @param status Character status from API
   * @returns Translated status label
   */
  transform(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive': return 'Vivo';
      case 'dead': return 'Morto';
      case 'unknown': return 'Desconhecido';
      default: return 'Status desconhecido';
    }
  }
}
