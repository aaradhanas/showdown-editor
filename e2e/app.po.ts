import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  sleep(time) {
    browser.sleep(time);
  }

  getToggleLink() {
    return element(by.css('app-top-navbar .title-area a'));
  }

  getVersionLabel() {
    return element(by.css('app-top-navbar .title-area .version'));
  }

  getLeftNavBar() {
    return element(by.css('app-left-navbar .lateral-menu'));
  }

  getHashLink() {
    return element(by.css('app-top-navbar .top-bar-section a'));
  }

  getHashModal() {
    return element(by.css('app-top-navbar .modal-wrapper'));
  }

  getHashModalCloseButton() {
    return element(by.css('app-top-navbar .modal-wrapper .modal-close-btn'));
  }

  enterTextInEditor(text) {
    element(by.id('editor')).clear();
    element(by.id('editor')).sendKeys(text);
  }

  getSDImage() {
    return element(by.css('#preview img'));
  }

  getH3Tag() {
    return element(by.css('#preview h3'));
  }

  getH4Tag() {
    return element(by.css('#preview h4'));
  }

  getCodeTag() {
    return element(by.css('#preview code'));
  }

  getSpaceBeforeHeadingOption() {
    return element(by.id('checkOpts-requireSpaceBeforeHeadingText'));
  }

  setHeaderLevelStartOption(value) {
    element(by.id('numOpts-headerLevelStart')).clear();
    element(by.id('numOpts-headerLevelStart')).sendKeys(value);
  }

  selectVersion(value) {
    element(by.cssContainingText('option', value)).click();
  }
}
