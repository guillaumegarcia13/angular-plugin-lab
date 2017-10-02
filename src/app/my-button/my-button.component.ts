import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-my-button',
    template: `
        <button (click)="onClick()">
            {{ buttonText }}
        </button>`
})
export class MyButtonComponent implements OnInit {
    @Input() buttonText: string = 'Click Me';

    constructor() { }

    ngOnInit() {
    }

    onClick() {
        console.log('Button clicked: ' + new Date());
    }

}
