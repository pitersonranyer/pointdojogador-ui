import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarJogadorComponent } from './alterar-jogador.component';

describe('AlterarJogadorComponent', () => {
  let component: AlterarJogadorComponent;
  let fixture: ComponentFixture<AlterarJogadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarJogadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarJogadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
