import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorComponent } from './contenedor.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('ContenedorComponent', () => {
  let component: ContenedorComponent;
  let fixture: ComponentFixture<ContenedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
