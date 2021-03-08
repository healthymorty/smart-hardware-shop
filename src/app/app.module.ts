
import { APP_BASE_HREF }		from '@angular/common';

import { BrowserModule }		from '@angular/platform-browser';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule }	from '@angular/core';

import { FormsModule } 			from '@angular/forms';

import { FlexLayoutModule } 	from '@angular/flex-layout';

import { HttpClientModule } 	from '@angular/common/http';

import { MatDialogModule }		from '@angular/material/dialog';

import { MatCarouselModule }	from '@ngbmodule/material-carousel';

import { AppRoutingModule } 	from './app-routing.module';

import { AppComponent }			from './app.component';

/* Atoms */
import { CheckboxComponent }			from '@atoms/checkbox/checkbox.component';
import { InputComponent }				from '@atoms/inputComp/input.component';
import { MoreComponent }				from '@atoms/more/more.component';
import { PagingComponent }				from '@atoms/paging/paging.component';
import { ProductListItemComponent }		from '@atoms/productListItem/product_list_item.component';
import { ProgressBarComponent }			from '@atoms/progressBar/progress_bar.component';
import { RWInputComponent }				from '@atoms/rwInputComp/rw_input.component';
import { SwitchButtonComponent }		from '@atoms/switchButton/switch_button.component';

/* Molecules */
import { OptionsListComponent }			from '@molecules/optionsList/options_list.component';
import { SettingsDialogComponent }		from '@molecules/settingsDialog/settings_dialog.component';
    
/* Organisms */
import { ProductCardComponent }			from '@organisms/productCard/product_card.component';

/* Views */
import { RecommendedsCarouselComponent }	from '@views/recommendedsCarousel/recommendeds_carousel.component';
import { ShoppingCartComponent }			from '@views/shoppingCart/shopping_cart.component';

/* Pages */
import { StoreFrontComponent }			from '@pages/storeFront/store_front.component';

/* Services */
import { EventsService }				from '@services/Events.service';
import { GlobalService }				from '@services/Global.service';
import { LocalStorageService }			from '@services/LocalStorage.service';
import { MaskService }					from '@services/Mask.service';
import { QueryService }					from '@services/Query.service';

/*Animations*/
import { BrowserAnimationsModule }		from '@angular/platform-browser/animations';

@NgModule({
	
	declarations: [
	
		AppComponent,

		/* Pipes */

		/* Atoms */
		CheckboxComponent,
		InputComponent,
		MoreComponent,
		PagingComponent,
		ProductListItemComponent,
		ProgressBarComponent,
		RWInputComponent,
		SwitchButtonComponent,

		/* Molecules */
		OptionsListComponent,
		SettingsDialogComponent,

		/* Organisms */
		ProductCardComponent,
		ShoppingCartComponent,
		
		/* Views */
		RecommendedsCarouselComponent,
		ShoppingCartComponent,

		/* Pages */
		StoreFrontComponent
	
	],

	entryComponents: [ SettingsDialogComponent ],
	
	imports: [
	
		BrowserModule,

		FlexLayoutModule,

		FormsModule,

		HttpClientModule,
	
		AppRoutingModule,
	
		BrowserAnimationsModule,

		MatDialogModule,

		MatCarouselModule.forRoot()
	
	],
	
	providers: [
		
		//{ provide: APP_BASE_HREF, useValue: 'https://localhost/' }

		EventsService,

		GlobalService,

		LocalStorageService,

		MaskService,

		QueryService

	],

	bootstrap: [ AppComponent ],

	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
	
})

export class AppModule { }
