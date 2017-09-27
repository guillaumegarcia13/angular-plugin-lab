import { Component, OnInit } from '@angular/core';
import { Compiler, SystemJsNgModuleLoader, ComponentFactoryResolver, NgModuleFactory, Injector } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(
        private viewref: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private loader: SystemJsNgModuleLoader,
        private compiler: Compiler,
        private injector: Injector)  {}

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
            // this.loader.load('./src/assets/plugins/dummy.module#DummyModule')
            this.loader.load('../assets/test.module#TestModule')
                .then((moduleFactory: NgModuleFactory<any>) => {
                    console.log(moduleFactory);

                    const entryComponent = (<any> moduleFactory.moduleType).entry;
                    const moduleRef = moduleFactory.create(this.injector);

                    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
                    this.container.createComponent(compFactory);
                });
        }
    }
