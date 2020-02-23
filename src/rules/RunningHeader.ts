import Rule, { RuleOptions } from './Rule';
import { validateRuntimeOptions, RuntimeTypes } from '../runtimeOptionChecker';
import { createEl } from '../dom-utils';
import { Page } from '../book';

// Options:
// selector: String
// render: function (Page) => HTMLElement
// TODO selectorHierarchy: [ String ], ie [ 'h1', 'h2', 'h3.chapter' ]

class RunningHeader extends Rule {
  constructor(options: RuleOptions = {}) {
    super(options);
    validateRuntimeOptions(options, {
      name: 'RunningHeader',
      render: RuntimeTypes.func,
    });
  }
  eachPage(page: Page) {
    if (!page.runningHeader) {
      const elmt = createEl('.running-header');
      page.element.appendChild(elmt);
      page.runningHeader = elmt;
    }
    page.runningHeader.innerHTML = this.render(page);
  }
  render(page: Page) {
    return `${page.number}`;
  }
}

export default RunningHeader;
