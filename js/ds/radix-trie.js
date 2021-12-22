/**
 * a space-optimized trie, each node that is the only child is merged with its parent.
 * the result is that the number of children of every internal node is at most the radix r of the radix tree.
 * r is a positive integer and a power x of 2, when the r is 2, the radix trie is binary.
 * when r >= 4, the radix trie is an r-ary trie
 * sparseness vs trie depth
 *
 * applications: associative array, IP routing
 */
class Edge {
  constructor(node, str) {
    this.targetNode = node;
    this.label = str;
  }
}
class Node {
  constructor() {
    this.edges = [];
  }
  isLeaf() {
    return this.edges.length === 0;
  }
}

function insert(node, str) {
  let traverseNode = node;
  //find common prefix
  let prefix = "";
  while (traverseNode !== null && !traverseNode.isLeaf()) {
    traverseNode.edges.forEach((e) => {
      let idx = commonPrefixIdx(e.label, str);
      if (idx !== -1) {
        prefix += e.label.slice(0, idx + 1);
        traverseNode = e.targetNode;
      }
    });
  }
  if (prefix === "") {
    let leafNode = new Node();
    let newEdge = new Edge(leafNode, str);
    node.edges.push(newEdge);
  } else {
    let remain_str = str.slice(prefix.length, str.length);
    let leafNode = new Node();
    let newEdge = new Edge(leafNode, remain_str);
    traverseNode.edges.push(newEdge);
  }
}

function commonPrefixIdx(str1, str2) {
  let idx = -1;
  while (idx < Math.min(str1.length, str2.length) - 1) {
    if (str1[idx + 1] === str2[idx + 1]) {
      idx++;
    } else {
      break;
    }
  }
  return idx;
}

function lookup(node, str) {
  let traverseNode = node;
  let elementsLen = 0;
  while (
    traverseNode !== null &&
    !traverseNode.isLeaf() &&
    elementsLen < str.length
  ) {
    let edge = traverseNode.edges.find((e) => str.includes(e.label));
    if (edge) {
      traverseNode = edge.targetNode;
      elementsLen += edge.label.length;
    } else {
      traverseNode = null;
    }
  }
  return (
    traverseNode !== null && traverseNode.isLeaf() && str.length === str.length
  );
}

function print(node, char = "") {
  let traverseNode = node;
  while (traverseNode !== null && !traverseNode.isLeaf()) {
    traverseNode.edges.forEach((e) => {
      print(e.targetNode, char + e.label);
    });
  }
}

let root = new Node();
function test() {
  let list = ["tree", "map", "try", "mouse", "apple"];
  list.forEach((l) => {
    insert(root, l);
  });
}

test();
