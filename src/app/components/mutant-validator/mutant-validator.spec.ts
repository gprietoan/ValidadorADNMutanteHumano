import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutantValidator } from './mutant-validator';

describe('MutantValidator', () => {
  let component: MutantValidator;
  let fixture: ComponentFixture<MutantValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutantValidator],
    }).compileComponents();

    fixture = TestBed.createComponent(MutantValidator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
