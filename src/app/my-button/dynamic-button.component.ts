import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OnMount } from 'ng-dynamic';

@Component({
    selector: 'app-dyn-button',
    template: `
        <button (click)="onClick()" #innerContent>
        </button>
        <div *ngIf="false">
            Inside button: condition *ngIf false
        </div>
        <div *ngIf="true">
            Inside button: condition *ngIf true
        </div>
    `
})
export class DynamicButtonComponent implements OnMount, OnInit {
    @ViewChild('innerContent') innerContent: ElementRef;

    constructor() { }

    dynamicOnMount(attr: Map<string, string>, content: string) {
        this.innerContent.nativeElement.innerHTML = `Click Me, I'm dynamic`;
        console.log('[DynamicButtonComponent] Mounted during the OnMount lifecycle hook at ' + new Date());
    }

    ngOnInit() {
        console.log('[DynamicButtonComponent] Inited at ' + new Date());
    }

    onClick() {
        console.log('[DynamicButtonComponent] Button clicked: ' + new Date());
    }

}
