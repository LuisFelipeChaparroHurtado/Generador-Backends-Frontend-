import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorComponent } from './generador.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('GeneradorComponent', () => {
  let component: GeneradorComponent;
  let fixture: ComponentFixture<GeneradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneradorComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(GeneradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
