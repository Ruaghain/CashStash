export class ButtonListItem {
  protected innerHtml: string = '';

  constructor(public name: string) {
  }

  hasInnerHtml = () => {
    return this.innerHtml !== '';
  };

  getInnerHtml = () => {
    return this.innerHtml;
  };

  render = () => {
    return this.name;
  }
}
