import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashComponent } from './header-dash.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('HeaderDashComponent', () => {
  let component: HeaderDashComponent;
  let fixture: ComponentFixture<HeaderDashComponent>;
  let mockActivatedRoute = {
    snapshot: {
        params: {},
        queryParams: {},
        data: {},
    },
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderDashComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    });
    fixture = TestBed.createComponent(HeaderDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
