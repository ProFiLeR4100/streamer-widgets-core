import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SwCoreComponent} from './sw-core.component';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				SwCoreComponent
			],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(SwCoreComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'streamer-widgets-core'`, () => {
		const fixture = TestBed.createComponent(SwCoreComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('streamer-widgets-core');
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(SwCoreComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('.content span').textContent).toContain('streamer-widgets-core app is running!');
	});
});
