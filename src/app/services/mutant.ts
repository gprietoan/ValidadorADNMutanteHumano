import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MutantService {

  isMutant(dna: string[]): boolean {
    const n = dna.length;
    if (!dna || n < 4) return false;

    let sequenceCount = 0;

    const directions = [
      [0, 1],   // Horizontal ->
      [1, 0],   // Vertical ↓
      [1, 1],   // Diagonal Abajo-Derecha ↘
      [1, -1]   // Diagonal Abajo-Izquierda ↙
    ];

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        const currentChar = dna[row][col].toUpperCase();

        if (!['A', 'T', 'C', 'G'].includes(currentChar)) {
          throw new Error(`Carácter inválido encontrado en [${row},${col}]: ${currentChar}`);
        }

        for (const [dr, dc] of directions) {
          const limitRow = row + dr * 3;
          const limitCol = col + dc * 3;

          if (limitRow >= 0 && limitRow < n && limitCol >= 0 && limitCol < n) {
            if (
              currentChar === dna[row + dr][col + dc].toUpperCase() &&
              currentChar === dna[row + dr * 2][col + dc * 2].toUpperCase() &&
              currentChar === dna[row + dr * 3][col + dc * 3].toUpperCase()
            ) {
              sequenceCount++;
              if (sequenceCount > 1) return true;
            }
          }
        }
      }
    }
    return false;
  }
}