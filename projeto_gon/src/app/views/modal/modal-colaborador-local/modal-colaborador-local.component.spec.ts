import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradorLocalComponent } from './modal-colaborador-local.component';

describe('ModalColaboradorLocalComponent', () => {
  let component: ModalColaboradorLocalComponent;
  let fixture: ComponentFixture<ModalColaboradorLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradorLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalColaboradorLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
