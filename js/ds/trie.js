/**
 * a specific type of tree structure, also called prefix tree or digital tree.
 * all the children of a node have a common prefix of the string associated with that parent node,
 * and the root is associated with the empty string
 * application: dictionary, autocomplete, spell checking, replacement for hashtables, DFSA representation
 */
class Node {
  constructor(char = "") {
    this.children = [];
    this.value = null;
    this.char = char;
    this.isEndOfNode = false;
  }
}
function insert(root, key, value) {
  let node = root;
  for (let char of key) {
    let idx = node.children.findIndex((n) => n.char === char);
    if (idx !== -1) {
      node = node.children[idx];
    } else {
      let nnode = new Node(char);
      node.children.push(nnode);
      node = nnode;
    }
  }

  node.isEndOfNode = true;
  node.value = value;
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

function print(node, chars = []) {
  if (node.isEndOfNode) {
    console.log(chars.join(""), node.value);
  } else {
    node.children.forEach((c) => {
      print(c, chars.concat(c.char));
    });
  }
}

function test() {
  let root = new Node();
  let list = ["tree", "map", "try", "mouse", "apple"];
  let val = [3, 5, 1, 2, 6];
  list.forEach((l, i) => {
    insert(root, list[i], val[i]);
  });
  print(root);
}

test();
