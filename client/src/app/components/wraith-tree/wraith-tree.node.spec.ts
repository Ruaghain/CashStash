import {WraithTreeNode} from './wraith-tree.node';

describe('WraithTreeNode', () => {
  let robotech : WraithTreeNode;

  beforeEach(() => {
    robotech = new WraithTreeNode('123-456', 'Robotech', false);
  });

  it('returns the correct id', () => {
    expect(robotech.getId()).toEqual('123-456')
  });

  it('returns the correct name', () => {
    expect(robotech.getName()).toEqual('Robotech')
  });

  it('has no children', () => {
    expect(robotech.hasChildren()).toBeFalsy()
  });

  it('is expanded', () => {
    expect(robotech.hasChildren()).toBeFalsy()
  });

  describe('with children', () => {
    beforeEach(() => {
      let scott = new WraithTreeNode('1', 'Scott Bernard', false);
      let rand = new WraithTreeNode('2', 'Rand', false);
      let rook = new WraithTreeNode('3', 'Rook Bartley', false);
      robotech.addChild(scott);
      robotech.addChild(rand);
      robotech.addChild(rook);
    });

    it('has children', () => {
      expect(robotech.hasChildren()).toBeTruthy();
    });

    it('finds the correct node', () => {
      let result = robotech.findNode('2');
      expect(result.getName()).toEqual('Rand');
    });

    it('deletes the correct child', () => {
      let childNode = robotech.findNode('3');
      expect(childNode).toBeDefined();
      robotech.deleteChildNode('3');
      childNode = robotech.findNode('3');
      expect(childNode).toBeNull();
    });

    it('returns the correct parent', () => {
      let childNode = robotech.findNode('3');
      expect(childNode).toBeDefined();
      let parentNode = childNode.getParent();
      expect(parentNode.getName()).toEqual('Robotech');
    })
  });
});
