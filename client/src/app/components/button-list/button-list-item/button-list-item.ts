import { ButtonItemLabel } from "./button-item-label";

export class ButtonListItem {
  private itemLabels: ButtonItemLabel[] = [];

  //TODO: Investigate if I can expose a dynamic class name allowing the consumer to override it setting the colour. ngClass?
  constructor(public associatedObject?: any) {
  }

  public addLabel(name: string, colour?: string) {
    this.itemLabels.push(new ButtonItemLabel(name, colour));
  }

  public getItemLabels() {
    return this.itemLabels;
  }
}
