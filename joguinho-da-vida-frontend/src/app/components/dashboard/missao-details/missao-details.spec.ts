import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissaoDetails } from './missao-details';

describe('MissaoDetails', () => {
  let component: MissaoDetails;
  let fixture: ComponentFixture<MissaoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissaoDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissaoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
