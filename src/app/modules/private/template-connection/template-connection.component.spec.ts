import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateConnectionComponent } from './template-connection.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('TemplateConnectionComponent', () => {
  let component: TemplateConnectionComponent;
  let fixture: ComponentFixture<TemplateConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateConnectionComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TemplateConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
