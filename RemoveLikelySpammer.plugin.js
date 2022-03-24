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

  // This will catch all HTML mutations, good for catching new messages
  observer(changes) {
    // Iterate through the added nodes
    for (let x =0;x < changes.addedNodes.length;x++) {
      // Get a node that was added
      let node = changes.addedNodes[x];
      
      // If it contains chat content, that means that it reregistered the chat box, indicating a channel switch
      // otherwise it is just a regular node
      if (node.className?.includes)
        if (node.className?.includes('chatContent'))
          this.expandAll(node.firstChild.firstChild.firstChild.firstChild.children);
        else
          this.expand(node);
    }
  }

  // Expand a node in the chatbox
  expand(node) {
    try {
      // Ignore anything that is not grouped message
      if (!node.className?.includes('groupStart') && !node.className?.includes('messageList')) return;

      // Make sure it's a likely spammer group and not some other sys message
      let desc = node.firstChild?.firstChild?.firstChild?.lastChild;
      if (!desc?.firstChild?.innerText?.includes('likely spammer')) return;

      // Simulate a click to the 'show message' button
      desc.firstChild.lastChild.click();

      // Get all the messages in the group that gets displayed
      let messages = [...node.children].filter(child => child.tagName == 'LI');

      // Get the raw HTML for the messages only (not including the message group part)
      let raw = '';
      for (let x = 0;x < messages.length;x++)
        raw += messages[x].innerHTML;

      // Set the actual node to the 'show messages' content
      // This actually removes the 'show message' group above
      node.innerHTML = raw;
    } catch (ex) {console.error(ex);}
  }

  // Expand all nodes in the chat box
  expandAll(nodes) {
    for (let x = 0;x < nodes.length;x++)
      this.expand(nodes[x]);
  }
}