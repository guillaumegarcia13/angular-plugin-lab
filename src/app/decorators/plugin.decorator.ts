// Decorator
//  see: https://toddmotto.com/angular-decorators
//       https://www.packtpub.com/mapt/book/web_development/9781785884641/10/ch10lvl1sec60/implementing-the-plugin-api
//       https://toddmotto.com/lazy-loading-angular-code-splitting-webpack
export function PluginContainer(config) {
    return (target) => {
      target._pluginContainer = config;
    };
}

// Simple decorator that writes the first parameter onto the constructor of the annotated type
export function PluginConfig(config) {
  return (type) => {
    type._pluginConfig = config;
  };
}

// A class that can be used to configure plugin placements within @Plugin decorations
export class PluginPlacement {
  slot;
  priority;
  component;

  constructor(options) {
    this.slot = options.slot;
    this.priority = options.priority;
    this.component = options.component;
  }
}

// This class combines the instantiated plugin information with a placement object.
// This class is used to inject runtime information into plugin components
export class PluginData {
  plugin;
  placement;

  constructor(plugin, placement) {
    this.plugin = plugin;
    this.placement = placement;
  }
}
