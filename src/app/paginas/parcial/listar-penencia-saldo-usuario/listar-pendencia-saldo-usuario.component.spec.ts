import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPendenciaSaldoUsuarioComponent } from './listar-pendencia-saldo-usuario.component';

describe('ListarPendenciaSaldoUsuarioComponent', () => {
  let component: ListarPendenciaSaldoUsuarioComponent;
  let fixture: ComponentFixture<ListarPendenciaSaldoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPendenciaSaldoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPendenciaSaldoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
