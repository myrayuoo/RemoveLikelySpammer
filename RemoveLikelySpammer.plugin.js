/**
 * @name RemoveLikelySpammer
 * @author verlox
 * @description Remove the annoying '1 hidden message hidden from likely spammer' item in chat
 * @version 0.0.1
 * @invite lith
 * @authorId 921558491255148615
 * @authorLink https://verlox.cc
 * @source https://github.com/verlox/RemoveLikelySpammer
 */

module.exports = class RemoveLikelySpammer {
  getName() { return 'RemoveLikelySpammer'; }
  getShortName() { return this.getName(); }
  getDescription() { return 'Remove the annoying \'1 hidden message hidden from likely spammer\' item in chat'; }
  getVersion() { return '1.0.0'; }
  getAuthor() { return 'verlox'; }

  load() {}
  start() {}
  stop() {}

  observer(changes) {
    // Iterate through the added nodes
    for (let x =0;x < changes.addedNodes.length;x++) {
      let node = changes.addedNodes[x];
      
      if (node.className?.includes('chatContent'))
        this.expandAll(node.firstChild.firstChild.firstChild.firstChild.children);
      else
        this.expand(node);
    }
  }

  expand(node) {
    try {
      // Ignore anything that is not grouped message
      if (!node.className?.includes('groupStart')) return;
  
      // Make sure it's a likely spammer group and not some other sys message
      let desc = node.firstChild?.firstChild?.firstChild?.lastChild;
      if (!desc?.firstChild?.innerText?.includes('likely spammer')) return;
      desc.firstChild.lastChild.click();

      let messages = [...node.children].filter(child => child.tagName == 'LI');

      let raw = '';
      for (let x = 0;x < messages.length;x++)
        raw += messages[x].innerHTML;

      node.innerHTML = raw;
    } catch (ex) {console.error(ex);}
  }

  expandAll(nodes) {
    for (let x = 0;x < nodes.length;x++)
      this.expand(nodes[x]);
  }
}