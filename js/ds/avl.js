/**
 * AVL tree is a self balancing binary search tree, the heights of the 2 child subtree differ by at most one.
 * the balance factor of any node: {-1, 0, 1}
 * single element operations: searching, traversal, insert, delete, rebalancing
 * set operations: union, intersection and set difference; helper operations: Split and Join
 * retracing: after insertion or deletion, check each of the node's ancestors for consistency with the variants of avl tree.
 */
let root = null;
class Node {
  constructor(key) {
    this.key = key;
    this.left = this.right = null;
    this.leftH = this.rightH = 0;
  }
  bf() {
    return this.rightH - this.leftH;
  }
}
function insert(node, key) {
  if(!node) {
    let node = new Node(key);
    return node;
  } 
  else {
    if(key < node.key) {
      node.left = insert(node.left, key);
      node.leftH++;
    } else if(key > node.key) {
      node.right = insert(node.right, key);
      node.rightH++;
    }
    if(node.bf() > 1 || node.bf() < -1) {
      console.log(node.bf());
      rebalancing(node);
    }
    return node;
  }
}
function deletes(node, key) {
  if(!node) return node;
  if(key === node.key) {
    if(node.left === null) return node.right;
    if(node.right === null) return node.left;
    node.key = getMin(node.right);
    node.right = delete(node.right, node.key);
  } else if(key < node.key) {
    node.left = delete(node.left, key);
  } else {
    node.right = delete(node.right, key);
  }
  return node;
}
function getMin(node) {
  let min = node.key;
  while(node.left !== null) {
    min = node.left.key;
    node = node.left;
  }
  return min;
}
function rebalancing(node) {
  // console.log(node);
}
function test() {
  const list = [19, 44, 55, 3, 22, 67, 12, 7, 8, 9, 1234];
  list.forEach(l => root = insert(root, l));
}
function preorder_print(tree) {
  if (!tree instanceof Node || !tree) return;
  console.log(tree.key);
  preorder_print(tree.left);
  preorder_print(tree.right);
}
test();
// preorder_print(root);

