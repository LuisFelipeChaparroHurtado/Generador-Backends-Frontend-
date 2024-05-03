import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateServerComponent } from './template-server.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('TemplateServerComponent', () => {
  let component: TemplateServerComponent;
  let fixture: ComponentFixture<TemplateServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateServerComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TemplateServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
