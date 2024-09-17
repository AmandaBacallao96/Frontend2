import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoMultipleFormComponent } from './contrato-multiple-form.component';

describe('ContratoMultipleFormComponent', () => {
  let component: ContratoMultipleFormComponent;
  let fixture: ComponentFixture<ContratoMultipleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoMultipleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoMultipleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
