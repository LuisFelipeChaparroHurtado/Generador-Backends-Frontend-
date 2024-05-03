import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDashComponent } from './container-dash.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('ContainerDashComponent', () => {
  let component: ContainerDashComponent;
  let fixture: ComponentFixture<ContainerDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerDashComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ContainerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
