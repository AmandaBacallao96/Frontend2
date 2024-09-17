import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFacturaComponent } from './download-factura.component';

describe('DownloadFacturaComponent', () => {
  let component: DownloadFacturaComponent;
  let fixture: ComponentFixture<DownloadFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
