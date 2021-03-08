import { 
	
	Component,
	
	ElementRef

} from '@angular/core';

import { EventsService } from './services/index';

@Component({

	selector: 'app-root',

	templateUrl: './app.component.html',

	styleUrls: ['./app.component.scss']

})

export class AppComponent {

	public darkMode	= false;

	constructor(

		private _element:		ElementRef,
		
		private _eventsService: EventsService
		
	) {

		this._eventsService.currentMessage.subscribe(data => {

			if (data.message === 'view:mode:dark')

				this._element.nativeElement.className	= (data.event) ? 'dark' : 'light';

		});

	}

}
