import { WraithTreeService } from "./wraith-tree.service";

describe('WraithTreeService', () => {

  let wraithTreeService : WraithTreeService;
  let data = {};

  beforeEach(() => {
    wraithTreeService = new WraithTreeService();
    data = {
      'FirstName': 'Rick',
      'LastName': 'Hunter'
    }
  });

  it ('emits a child added event', () => {
    spyOn(wraithTreeService.getNodeDroppedEmitter(), 'emit');

    wraithTreeService.emitNodeDropped(data);
    expect(wraithTreeService.getNodeDroppedEmitter().emit).toHaveBeenCalled();
  });

  it ('emits a node expanded event', () => {
    spyOn(wraithTreeService.getNodeExpandedEmitter(), 'emit');

    wraithTreeService.emitNodeExpanded(data);
    expect(wraithTreeService.getNodeExpandedEmitter().emit).toHaveBeenCalled();
  });
});
