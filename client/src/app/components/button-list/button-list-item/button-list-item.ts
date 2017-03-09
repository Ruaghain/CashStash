export class Button {
  protected innerHtml: string;

  constructor(public name: string, public html?: string, public recordId?: string, public link?: string) {

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
