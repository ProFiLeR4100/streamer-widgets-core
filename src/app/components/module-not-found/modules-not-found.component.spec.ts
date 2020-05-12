import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModulesNotFoundComponent} from './modules-not-found.component';

describe('ModulesNotFoundComponent', () => {
	let component: ModulesNotFoundComponent;
	let fixture: ComponentFixture<ModulesNotFoundComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModulesNotFoundComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModulesNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
