import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarResultadoParcialComponent } from './listar-resultado-parcial.component';

describe('ListarResultadoParcialComponent', () => {
  let component: ListarResultadoParcialComponent;
  let fixture: ComponentFixture<ListarResultadoParcialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarResultadoParcialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarResultadoParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
