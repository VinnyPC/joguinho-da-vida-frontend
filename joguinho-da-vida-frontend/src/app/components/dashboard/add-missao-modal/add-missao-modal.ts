import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-missao-modal',
  imports: [ReactiveFormsModule,
    MatDialogModule,   
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, MatSelectModule],
  templateUrl: './add-missao-modal.html',
  styleUrl: './add-missao-modal.css'
})
export class AddMissaoModal {
  missaoForm: FormGroup;
  dificuldades: string[] = ['Super fácil', 'Fácil', 'Médio', 'Difícil', 'Épico', 'Pesadelo'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddMissaoModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.missaoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      dificuldade: ['', Validators.required],
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.missaoForm.valid) {
      console.log('Missão criada:', this.missaoForm.value);
      this.dialogRef.close(this.missaoForm.value);
    }
  }

}
