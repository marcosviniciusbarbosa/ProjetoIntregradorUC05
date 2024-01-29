import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradoresComponent } from './modal-colaboradores.component';

describe('ModalColaboradoresComponent', () => {
  let component: ModalColaboradoresComponent;
  let fixture: ComponentFixture<ModalColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
