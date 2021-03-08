import { trigger, style, transition, animate, state }   from '@angular/animations';

export const DeleteAnimation = trigger(

	'deletedState', [

		state('false', style({

			'height':	'auto',

			'opacity':	1

		})),

		state('true', style({

			'height':		0,

			'margin':		0,

			'min-height':	0,

			'opacity':		0,

			'padding':		0

		})),

		transition('true => false', [

			animate(500)

		]),

		transition('false => true', [

			animate(500)

		])

	]

);