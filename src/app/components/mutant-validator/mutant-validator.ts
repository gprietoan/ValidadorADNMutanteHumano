import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MutantService } from '../../services/mutant';

@Component({
  selector: 'app-mutant-validator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mutant-validator.html',
  styleUrls: ['./mutant-validator.css']

  })
export class MutantValidatorComponent {
  // Inicializamos con el ejemplo exacto de la prueba técnica
  rawDnaInput: string = 'ATGCGA\nCAGTGC\nTTATGT\nAGAAGG\nCCCCTA\nTCACTG';
  
  dnaMatrix: string[][] = [];
  isMutantResult: boolean | null = null;
  errorMessage: string | null = null;

  constructor(private mutantService: MutantService) {
    this.updateMatrixView();
  }

  updateMatrixView(): void {
    this.errorMessage = null;
    this.isMutantResult = null;
    
    if (!this.rawDnaInput.trim()) {
      this.dnaMatrix = [];
      return;
    }

    const rows = this.rawDnaInput
      .split(/[\n,]+/)
      .map(row => row.trim().toUpperCase())
      .filter(row => row.length > 0);
      
    const n = rows.length;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].length !== n) {
        this.errorMessage = `La matriz debe ser de NxN. La fila ${i + 1} tiene tamaño ${rows[i].length} en lugar de ${n}.`;
        this.dnaMatrix = [];
        return;
      }
    }

    this.dnaMatrix = rows.map(row => row.split(''));
  }

  validateDna(): void {
    try {
      this.updateMatrixView();
      if (this.errorMessage) return;

      const dnaArray = this.dnaMatrix.map(row => row.join(''));
      if (dnaArray.length === 0) {
        this.errorMessage = 'Por favor, ingrese una secuencia de ADN válida.';
        return;
      }

      this.isMutantResult = this.mutantService.isMutant(dnaArray);
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al procesar el ADN.';
    }
  }
}
