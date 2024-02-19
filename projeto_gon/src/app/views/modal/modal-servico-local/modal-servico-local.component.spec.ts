import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicoLocalComponent } from './modal-servico-local.component';

describe('ModalServicoLocalComponent', () => {
  let component: ModalServicoLocalComponent;
  let fixture: ComponentFixture<ModalServicoLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalServicoLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalServicoLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
