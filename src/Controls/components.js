import h from 'hyperscript';
import { cssNumberPattern } from '../utils/convertUnits';

const title = function (...arg) {
  return h('.bindery-title', ...arg);
};

// Structure
const heading = function (...arg) {
  return h('.bindery-heading', ...arg);
};

const row = function (...arg) {
  return h('.bindery-toggle', ...arg);
};

const expandRow = function (...arg) {
  return h(
    '.bindery-expand-row',
    { onclick() {
      this.classList.toggle('selected');
    } },
    ...arg);
};
const expandArea = function (...arg) {
  return h('.bindery-expand-area', ...arg);
};


// Button
const btn = function (...arg) {
  return h('button.bindery-btn', ...arg);
};

const btnMini = function (...arg) {
  return h('button.bindery-btn.bindery-btn-mini', ...arg);
};

const btnMain = function (...arg) {
  return h('button.bindery-btn.bindery-btn-main', ...arg);
};

// Menu
const select = function (...arg) {
  return h('select', ...arg);
};

const option = function (...arg) {
  return h('option', ...arg);
};

// Input
const inputNumberUnits = function (val) {
  return h('input', {
    type: 'text',
    value: val,
    pattern: cssNumberPattern,
  });
};

// Switch
const toggleSwitch = () => h('.bindery-switch', h('.bindery-switch-handle'));

const switchRow = function (...arg) {
  return h('.bindery-toggle', ...arg, toggleSwitch);
};

export {
  title,
  row,
  expandRow,
  expandArea,
  heading,
  btn,
  btnMain,
  btnMini,
  select,
  option,
  switchRow,
  inputNumberUnits,
};