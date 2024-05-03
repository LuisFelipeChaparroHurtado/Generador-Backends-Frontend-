import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorComponent } from './generator.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('GeneratorComponent', () => {
  let component: GeneratorComponent;
  let fixture: ComponentFixture<GeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratorComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(GeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
