import OutOfFlow from './OutOfFlow';
import { validateRuntimeOptions, RuntimeTypes } from '../option-checker';
import { prefixer, createEl } from '../dom-utils';
import { Book } from '../book';
import { RuleOptions } from './Rule';
import { PageMaker } from '../types';

// Options:
// selector: String

class FullBleedSpread extends OutOfFlow {
  rotate!: string;
  continue!: string;

  constructor(options: RuleOptions) {
    options.continue = options.continue || 'same';
    options.rotate = options.rotate || 'none';
    super(options);
    validateRuntimeOptions(options, {
      name: 'FullBleedSpread',
      selector: RuntimeTypes.string,
      continue: RuntimeTypes.enum('next', 'same', 'left', 'right'),
      rotate: RuntimeTypes.enum('none', 'clockwise', 'counterclockwise'),
    });
  }
  createOutOfFlowPages(elmt: HTMLElement, book: Book, makeNewPage: PageMaker) {
    if (!!elmt.parentNode) {
      elmt.parentNode.removeChild(elmt);
    }

    let leftPage;
    if (book.currentPage.isEmpty) {
      leftPage = book.currentPage;
    } else {
      leftPage = makeNewPage();
      book.addPage(leftPage);
    }

    const rightPage = makeNewPage();
    book.addPage(rightPage);

    if (this.rotate !== 'none') {
      [leftPage, rightPage].forEach((page) => {
        const rotateContainer = createEl(`.rotate-container.spread-size-rotated.rotate-spread-${this.rotate}`);
        rotateContainer.appendChild(page.background);
        page.element.appendChild(rotateContainer);
      });
    }

    leftPage.background.appendChild(elmt);
    leftPage.element.classList.add(prefixer('spread'));
    leftPage.setPreference('left');
    leftPage.isOutOfFlow = this.continue === 'same';
    leftPage.avoidReorder = true;
    leftPage.hasOutOfFlowContent = true;

    rightPage.background.appendChild(elmt.cloneNode(true));
    rightPage.element.classList.add(prefixer('spread'));
    rightPage.setPreference('right');
    rightPage.isOutOfFlow = this.continue === 'same';
    rightPage.avoidReorder = true;
    rightPage.hasOutOfFlowContent = true;
  }
}

export default FullBleedSpread;
