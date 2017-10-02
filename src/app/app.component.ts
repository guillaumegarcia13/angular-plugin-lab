import { BrowserModule } from '@angular/platform-browser';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Compiler, SystemJsNgModuleLoader, ComponentFactoryResolver, Injector } from '@angular/core';
import { ViewChild, ViewContainerRef, ModuleWithComponentFactories } from '@angular/core';
import { NgModuleFactory, NgModuleFactoryLoader, NgModule, NgModuleRef } from '@angular/core';
// import * as System from 'systemjs';
// import 'systemjs.config.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    initDate;

    showDynamicHTML: boolean;
    showDynamicComponent: boolean;
    showDynamicModule: boolean;

    // Static Example
    title = 'Static Example';

    // DynamicHTMLModule approach
    contentHtml = `
        <article>
            <h1>Dynamic HTML Example</h1>
            <h5>It's OK but one still have to register components at design time (same module)</h5>
            <div>
                <p>bla bla bla</p>
                <div *ngIf="false">
                    Condition *ngIf false
                </div>
                <div *ngIf="true">
                    Condition *ngIf true
                </div>
                <dyn-my-button></dyn-my-button>
            </div>
        </article>
    `;

    // DynamicComponentModule approach
    templateComponent = `
        <article>
            <h1>Dynamic Component Module</h1>
            <div>
                <p>{{text}} {{ initDate | date:'HH:mm:ss:' }}{{ initDate % 1000 }}</p>
                <div *ngIf="false">
                    Condition *ngIf false
                </div>
                <div *ngIf="true">
                    Condition *ngIf true
                </div>
                <app-highly-dyn-button></app-highly-dyn-button>
            </div>
        </article>
    `;

    @ViewChild('container',         { read: ViewContainerRef }) container: ViewContainerRef;
    @ViewChild('compiledContainer', { read: ViewContainerRef }) compiledContainer: ViewContainerRef;

    constructor(
        private viewref: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private loader: NgModuleFactoryLoader, // SystemJsNgModuleLoader,
        private compiler: Compiler,
        private injector: Injector,
        private moduleref: NgModuleRef<any> )  {}

        ngOnInit() {
            this.initDate = new Date();
            console.log('Main app Inited');
            // this.loadPlugin('./assets/plugins/dummy.module.ts');
        }

        // loadPlugin(path: string) {
        //     console.log('Loading plugin: ' + path);
        //     this.loader
        //         .load(path)
        //         .then((moduleFactory) => {
        //             console.log(moduleFactory);
        //         });
        // }

        loadModule() {
            this.loader.load('../assets/plugins/test.module#TestModule')
                .then((moduleFactory: NgModuleFactory<any>) => {
                    console.log(moduleFactory);

                    const entryComponent = (<any> moduleFactory.moduleType).entry;
                    const moduleRef = moduleFactory.create(this.injector);

                    const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
                    this.container.createComponent(componentFactory);
                });
        }

        loadModuleAndCompile() {
            // System.import('../assets/plugins/test.module#TestModule').then((module) => {
            //     this.compiler.compileModuleAndAllComponentsAsync(module.TModule)
            //         .then((compiled) => {
            //             const m = compiled.ngModuleFactory.create(this.injector);
            //             const factory = compiled.componentFactories[0];
            //             const cmp = factory.create(this.injector, [], null, m);
            //         });
            // });

            const template  = `
                <article>
                    <h1>Dynamic Component Module</h1>
                    <div>
                        <p>{{ text }} {{ initDate | date:'HH:mm:ss:' }}{{ initDate % 1000 }}</p>
                        <div *ngIf="false">
                            Condition *ngIf false
                        </div>
                        <div *ngIf="true">
                            Condition *ngIf true
                        </div>
                    </div>
                    <span>generated on the fly by: <strong>{{ name }}</strong></span>
                </article>
            `;
            const tmpCmp    = Component({template: template})(class {});
            const tmpModule = NgModule(
                {
                    declarations: [tmpCmp],
                    imports     : [BrowserModule]
                }
            )(class {});

            this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
                .then((factories) => {
                    const fac = factories.componentFactories[0];
                    const cmpRef = fac.create(this.injector, [], null, this.moduleref);
                    Object.assign(cmpRef.instance, {
                        name    : 'Team Fcom',
                        initDate: new Date()
                    });
                    this.compiledContainer.insert(cmpRef.hostView, 0);
                });
        }

        // Don't forget to clean your mess up!
        ngOnDestroy() {
            for (let i = 0 ; i < this.compiledContainer.length ; i++ ) {
                this.compiledContainer.get(i).destroy();
            }
        }
    }
