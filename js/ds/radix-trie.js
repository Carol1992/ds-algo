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
  let traverseEdge = null;
  //find common prefix
  let prefix = "";
  let index = -1;
  while (
    traverseNode !== null &&
    !traverseNode.isLeaf() &&
    prefix.length < str.length
  ) {
    let idx = -1;
    for (let i = 0; i < traverseNode.edges.length; i++) {
      let e = traverseNode.edges[i];
      idx = commonPrefixIdx(e.label, str.slice(prefix.length, str.length));
      if (idx !== -1) {
        prefix += e.label.slice(0, idx + 1);
        traverseNode = e.targetNode;
        traverseEdge = e;
        index = idx;
        break;
      }
    }
    if (idx === -1) {
      break;
    }
  }

  if (prefix.length === 0) {
    let newEdge = new Edge(new Node(), str);
    node.edges.push(newEdge);
  } else if (prefix.length < str.length) {
    let plen = prefix.length;
    let remain_str = str.slice(plen, str.length);
    let old_remain_str = traverseEdge.label.slice(
      index + 1,
      traverseEdge.label.length
    );
    if (remain_str !== "") {
      traverseNode.edges.push(new Edge(new Node(), remain_str));
    }

    if (old_remain_str !== "") {
      traverseNode.edges.push(new Edge(new Node(), old_remain_str));
      traverseEdge.label = traverseEdge.label.slice(0, index + 1);
    }
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
    traverseNode !== null && traverseNode.isLeaf() && elementsLen === str.length
  );
}

function print(node, char = "") {
  let traverseNode = node;
  if (traverseNode.isLeaf()) {
    console.log(char);
  }
  traverseNode.edges.forEach((e) => {
    print(e.targetNode, char + e.label);
  });

}

let root = new Node();
function test() {
  // let list = ["tree", "map", "try", "mouse", "apple"];
  let list = ["apple", "cat", "cup", "application", "concat", "cute"];
  // let list = ["slow", "slower", "slowly", "test", "toaster", "toasting"];
  list.forEach((l) => {
    insert(root, l);
  });
}

test();
// console.log(root);
console.log("===================================");
print(root);
// console.log(root);
// console.log(root.edges[0].targetNode);
// console.log(root.edges[1].targetNode);
// console.log(root.edges[1].targetNode.edges[0].targetNode);
console.log("===================================");
// console.log("has tree: ", lookup(root, "tree"));
// console.log("has map: ", lookup(root, "map"));
// console.log("has try: ", lookup(root, "try"));
// console.log("has mouse: ", lookup(root, "mouse"));
// console.log("has apple: ", lookup(root, "apple"));
// console.log("has to: ", lookup(root, "to"));