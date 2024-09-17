import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlhorarioComponent } from './controlhorario.component';

describe('ControlhorarioComponent', () => {
  let component: ControlhorarioComponent;
  let fixture: ComponentFixture<ControlhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlhorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
