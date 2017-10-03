import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginComponent } from './plugin.component';

@NgModule({
    imports: [CommonModule],
    exports: [PluginComponent],
    declarations: [PluginComponent],
    entryComponents: [PluginComponent]
})
export class PluginModule {
    static entry = PluginComponent;
}
