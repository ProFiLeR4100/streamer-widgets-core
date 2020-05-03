import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleNavigationComponent } from './module-navigation.component';

describe('ModuleNavigationComponent', () => {
  let component: ModuleNavigationComponent;
  let fixture: ComponentFixture<ModuleNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
