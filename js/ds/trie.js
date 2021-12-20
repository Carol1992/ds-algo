/**
 * a specific type of tree structure, also called prefix tree or digital tree.
 * all the children of a node have a common prefix of the string associated with that parent node, 
 * and the root is associated with the empty string
 * application: dictionary, autocomplete, spell checking, replacement for hashtables, DFSA representation
 */
class Node {
  constructor() {
    this.children = [];
    this.value = null;
    this.key = "";
  }
}
function insert(node, key, value) {
  if (node === null) {
    return new Node();
  }
  for (let char of key) {
    if (node.children.includes(char)) {
      node = node.children[char];
    } else {
      node.children.push(new Node());
    }
  }
  node.value = value;
  return node;
}
function getVal(node, key) {
  if (node === null) return node;
  for (let char of key) {
    if (node.children.includes(char)) {
      node = node.children[char];
    } else {
      return null;
    }
  }
  return node.value;
}

function print(node) {}

