import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { PluginContainer } from './decorators/plugin.decorator';  // My own decorator

// ng-dynamic approach
import { OnMount, DynamicHTMLModule, DynamicComponentModule } from 'ng-dynamic';
import { MyButtonComponent } from './my-button/my-button.component';
import { DynamicButtonComponent } from './my-button/dynamic-button.component';
import { HighlyDynamicButtonComponent } from './my-button/highly-dynamic-button.component';

// Decorators (unrelated to dynamic injection)
// See: https://toddmotto.com/angular-decorators

// -----------------------
//    Dynamic injection
// -----------------------
//  Known:
//    at design time  [X]
//    at runtime      [ ]
//
// See: https://github.com/PacktPublishing/Mastering-Angular-2-Components/blob/master/angular-2-components-chapter-10/lib/plugin/plugin-service.js
//      https://toddmotto.com/lazy-loading-angular-code-splitting-webpack
//      https://github.com/mgechev/angular-seed/issues/1358#issuecomment-248890159
//      https://www.reddit.com/r/Angular2/comments/5zji6j/anyone_know_if_its_possible_to_dynamically_load/

// -----------------------
//    Plugin injection
// -----------------------
//  Known:
//    at design time  [ ]
//    at runtime      [ ]
//
// See: https://stackoverflow.com/questions/40293240/how-to-manually-lazy-load-a-module
//      https://github.com/angular/angular/issues/11738
//      https://github.com/alexzuza/angular-cli-lazy
import { Compiler, SystemJsNgModuleLoader, ComponentFactoryResolver, NgModuleFactory } from '@angular/core';
import { provideRoutes } from '@angular/router';

// Some decorator (UNUSED)
@PluginContainer({
    property: 'value'
})
@NgModule({
    declarations: [
        AppComponent,
        MyButtonComponent,
        DynamicButtonComponent,
        // HighlyDynamicButtonComponent   // necessary for AoT compilation 
    ],
    imports: [
        BrowserModule,

        // Example for dynamic loading of a HTML string which may contain components (which are MOUNTED)
        // Usage      : <dynamic-html [content]="$$DYNAMIC_CONTENT_HERE$$>"> ... </dynamic-html>
        // Limitations: it cannot resolve {{foo}}, *ngIf and any template syntax
        //
        // see: https://github.com/lacolaco/ng-dynamic#dynamichtmlmodule
        DynamicHTMLModule.forRoot({
            components: [
              { component: DynamicButtonComponent, selector: 'dyn-my-button' },
            ]
        }),

        // Example for dynamic loading of a module
        // Interest   : it CAN resolve {{foo}}, *ngIf, ...
        // Limitations: it cannot be compiled using AoT compilation
        //
        // see: https://github.com/lacolaco/ng-dynamic#dynamiccomponentmodule
        DynamicComponentModule.forRoot({
            declarations: [HighlyDynamicButtonComponent],
            imports: [BrowserModule]
            // ,schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
    ],
    providers: [
        SystemJsNgModuleLoader,
        provideRoutes([
           { loadChildren: '../assets/test.module#TestModule' }
        ])
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
