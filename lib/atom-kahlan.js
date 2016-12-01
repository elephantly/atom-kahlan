'use babel';

import AtomKahlanView from './atom-kahlan-view';
import { CompositeDisposable } from 'atom';

export default {

  atomKahlanView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomKahlanView = new AtomKahlanView(state.atomKahlanViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomKahlanView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-kahlan:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomKahlanView.destroy();
  },

  serialize() {
    return {
      atomKahlanViewState: this.atomKahlanView.serialize()
    };
  },

  toggle() {
    console.log('AtomKahlan was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
