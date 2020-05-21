import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualcomComponent } from './virtualcom.component';

describe('VirtualcomComponent', () => {
  let component: VirtualcomComponent;
  let fixture: ComponentFixture<VirtualcomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualcomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
