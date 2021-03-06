import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavModule } from './nav/nav.module';
import { HomeModule } from './home/home.module';
import { AuthInterceptor } from './common/services/authInterceptor.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard } from './common/guards/auth.guard';
import { HttpErrorDialogComponent } from './common/components/http-error-dialog/http-error-dialog.component';
import { appReducer } from './store/app.reducer';
import { appEffects } from './store/app.effects';
import { YesNoDialogComponent } from './common/components/yes-no-dialog/yes-no-dialog.component';
import { MaterialModule } from './common/modules/material.module';

@NgModule({
    declarations: [AppComponent, HttpErrorDialogComponent, YesNoDialogComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NavModule,
        HomeModule,
        MaterialModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot(appEffects),
        StoreDevtoolsModule.instrument({
            maxAge: 10,
            logOnly: environment.production,
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        AuthGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
