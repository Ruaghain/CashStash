import {WraithTreeComponent} from './wraith-tree.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WraithTreeService} from './wraith-tree.service';
import {WraithTreeNode} from './wraith-tree.node';

describe('WraithTreeComponent', () => {

  let wraithTreeServiceReference: WraithTreeService;
  let component: WraithTreeComponent;
  let fixture: ComponentFixture<WraithTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WraithTreeComponent
      ],
      providers: [
        WraithTreeService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(WraithTreeComponent);
      component = fixture.componentInstance;
      wraithTreeServiceReference = TestBed.get(WraithTreeService);
    });
  }));

  it('is an instance of WraithTreeComponent', () => {
    expect(component instanceof WraithTreeComponent).toBe(true, 'should be of type WraithTreeComponent');
  });

  describe('synchronous processing', () => {
    let rootNode: WraithTreeNode = null;
    let event = {};

    beforeEach(() => {
      rootNode = new WraithTreeNode('-1', 'root', true);
      let robotech = new WraithTreeNode('1', 'Robotech');

      let macross = new WraithTreeNode('1-1', 'Macross');
      macross.addChild(new WraithTreeNode('1-1-1', 'SDF-1'));
      let masters = new WraithTreeNode('1-2', 'Robotech Masters');
      masters.addChild(new WraithTreeNode('1-2-1', 'SDF-2'));
      let generation = new WraithTreeNode('1-3', 'New Generation');
      generation.addChild(new WraithTreeNode('1-3-1', 'SDF-3'));

      robotech.addChild(macross);
      robotech.addChild(masters);
      robotech.addChild(generation);

      rootNode.addChild(robotech);
      event = {
        'dataTransfer': {
          getData: function() {
            return '-1';
          }
        },
        preventDefault: function() {
          return true;
        },
        stopPropagation: function() {
          return true;
        }
      };
    });

    it('displays a given list of nodes', () => {
      component.node = rootNode;

      expect(component.node.hasChildren()).toBeTruthy();
      expect(component.node.getChildren().length).toBe(1);
      expect(component.node.getName()).toBe('root');
      expect(component.node.getId()).toBe('-1');
      expect(component.node.isExpanded()).toBe(true);

      let firstChild = component.node.getChildren()[0];
      expect(firstChild.getName()).toBe('Robotech');
      expect(firstChild.getChildren().length).toBe(3);
    });

    it('node click emits a expanded event', () => {
      spyOn(wraithTreeServiceReference, 'emitNodeExpanded');
      component.node = rootNode;

      component.nodeClick(event);
      expect(wraithTreeServiceReference.emitNodeExpanded).toHaveBeenCalledWith({targetId: '-1'});
    });

    it('on drop emits dropped event', () => {
      spyOn(wraithTreeServiceReference, 'emitNodeDropped');
      component.node = rootNode;

      component.onDrop(event);
      expect(wraithTreeServiceReference.emitNodeDropped).toHaveBeenCalledWith({targetId: '-1', id: '-1'});
    });
    // it('raises the selected event when clicked', () => {
    //   const comp = new DashboardHeroComponent();
    //   const hero: Hero = { id: 42, name: 'Test' };
    //   comp.hero = hero;
    //
    //   comp.selected.subscribe(selectedHero => expect(selectedHero).toBe(hero));
    //   comp.click();
    // });

  })
});
