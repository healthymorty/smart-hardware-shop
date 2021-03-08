import { ComponentFixture, TestBed }				from '@angular/core/testing';

import { RouterTestingModule }	from '@angular/router/testing';

import { NO_ERRORS_SCHEMA }		from '@angular/compiler/src/core';

import { of } 					from 'rxjs';

import { EventsService }		from './services/Events.service';

import { MockGenericClass	}	from './mocks/GenericClass';

import { AppComponent }			from './app.component';

describe('AppComponent', () => {

	let component:	AppComponent;

	let fixture:	ComponentFixture<AppComponent>;

	const MockEventSevice	= new MockGenericClass();

	MockEventSevice.currentMessage 	= of({ isLoggedIn: true });

	MockEventSevice.currentMessage.subscribe	= jest.fn();

	beforeEach(async () => {

		await TestBed.configureTestingModule({

			imports: [ RouterTestingModule ],

			declarations: [ AppComponent ],

			providers:	[

				{

					provide:	EventsService,

					useValue:	MockEventSevice

				}

			],
			
			schemas:	[ NO_ERRORS_SCHEMA ]

		}).compileComponents();

		fixture		= TestBed.createComponent(AppComponent);
	
		component	= fixture.componentInstance;
	
	});

	it('should create the app', () => {
	
		expect(component).toBeTruthy();
	
	});

});