import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMissaoModal } from './add-missao-modal';

describe('AddMissaoModal', () => {
  let component: AddMissaoModal;
  let fixture: ComponentFixture<AddMissaoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMissaoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMissaoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
