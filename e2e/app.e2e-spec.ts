import { AppPage } from './app.po';

describe('showdown-angular4 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('check left nav bar visibility', () => {
    page.navigateTo();

    // Hide left nav bar - failing intermittently - TODO
    page.getToggleLink().click();
    page.sleep(500);
    page.getLeftNavBar().isDisplayed().then( displayed => {
      expect(displayed).toEqual(false);
    });

    // Show left nav bar
    page.getToggleLink().click();
    page.sleep(500);
    page.getLeftNavBar().isDisplayed().then( displayed => {
      expect(displayed).toEqual(true);
    });
  });

  it('show hash modal', () => {
    page.getHashLink().click();
    page.getHashModal().isPresent().then( present => {
      expect(present).toBe(true);
      page.getHashModalCloseButton().click();
    });
  });

  it('check showdown image', () => {
    const expectedValue = 'https://raw.githubusercontent.com/showdownjs/logo/master/dist/logo.readme.png';
    page.getSDImage().getAttribute('src').then( value => {
      expect(value).toEqual(expectedValue);
    });
  });

  it('check showdown heading level 1', () => {
    expect(page.getH3Tag().getText()).toEqual('Installation');
  });

  it('check showdown heading level 2', () => {
    expect(page.getH4Tag().getText()).toEqual('Download tarball');
  });

  it('check showdown code', () => {
    expect(page.getCodeTag().getText()).toEqual('bower install showdown');
  });

  it('change text in editor', () => {
    const text = 'Heading';
    page.enterTextInEditor('#' + text);
    expect(page.getH3Tag().getText()).toEqual(text);
  });

  it('change space before heading option', () => {
    page.getSpaceBeforeHeadingOption().click();
    const text = 'Heading';
    page.enterTextInEditor('# ' + text);
    expect(page.getH3Tag().getText()).toEqual(text);
  });

  it('change header level start value', () => {
    page.setHeaderLevelStartOption(4);
    const text = 'Heading';
    page.enterTextInEditor('# ' + text);
    expect(page.getH4Tag().getText()).toEqual(text);
  });

  it('change version and verify header', () => {
    page.selectVersion('1.6.3');
    expect(page.getVersionLabel().getText()).toContain('1.6.3');
  });
});
