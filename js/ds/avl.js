/**
 * AVL tree is a self balancing binary search tree, the heights of the 2 child subtree differ by at most one.
 * the balance factor of any node: {-1, 0, 1}
 * single element operations: searching, traversal, insert, delete, rebalancing
 * set operations: union, intersection and set difference; helper operations: Split and Join
 * retracing: after insertion or deletion, check each of the node's ancestors for consistency with the variants of avl tree.
 * tree rotations: move the keys only "vertically", so that the in-order sequence of the keys is fully preserved
 * there are 4 possible variants of the vialation: (node Z, balance factor BF, parent X)
    * right right: Z is the right child of X and BF(Z) >= 0
    * left left: Z is the left child of X and BF(Z) < 0
    * left right: Z is the left child of X and BF(Z) > 0
    * right left: Z is the right child of X and BF(Z) < 0
 * with different vialation, we can perform different rotations:
    * right right: simple rotation rotate_Left
    * left left: simple rotation rotate_Right
    * left right: double rotation rotate_LeftRight
    * right left: double rotation rotate_RightLeft
 * pesudo code
 *  if (tree is left heavy) {
      if(tree's subtree is left heavy){
        single right rotation;
      } else {
        single left rotation;
        single right rotation;
      }
    } else if (tree is right heavy) {
      if(tree's subtree is left heavy){
        single right rotation;
        single left rotation;
      } else {
        single left rotation;
      }
    }
 * */
let root = null;
class Node {
  constructor(key, parent) {
    this.key = key;
    this.parent = parent;
    this.left = this.right = null;
    this.leftH = this.rightH = 0;
  }
  bf() {
    return this.rightH - this.leftH;
  }
}
function insert(node, key, parent) {
  if (!node) {
    let node = new Node(key, parent);
    return node;
  } else {
    if (key < node.key) {
      node.left = insert(node.left, key, node);
      node.leftH++;
    } else if (key > node.key) {
      node.right = insert(node.right, key, node);
      node.rightH++;
    }
    if (node.bf() > 1 || node.bf() < -1) {
      node = rebalancing(node);
    }
    return node;
  }
}
function deletes(node, key) {
  if(!node) return node;
  if(key === node.key) {
    if(node.left === null) {
      node.rightH--;
      return node.right;
    }
    if(node.right === null) {
      node.leftH--;
      return node.left;
    }
    node.key = getMin(node.right);
    node.right = delete(node.right, node.key);
    node.rightH--;
  } else if(key < node.key) {
    node.left = delete(node.left, key);
  } else {
    node.right = delete(node.right, key);
  }
  if(node.bf() > 1 || node.bf() < -1) {
    node = rebalancing(node);
  }
  return node;
}
function getMinNode(node) {
  let min = node.key;
  while (node.left !== null) {
    min = node.left.key;
    node = node.left;
  }
  return min;
}
function rebalancing(node) {
  let w = node;
  if (node.bf() < -1) {
    let subtree = node.left;
    if (subtree.bf() < 0) {
      w = rotateRight(node);
    } else {
      /**
       * We first perform the left rotation on the left subtree of node.
       */
      w.left = rotateLeft(subtree);
      // then, rotate right
      w = rotateRight(w);
    }
  } else if (node.bf() > 1) {
    let subtree = node.right;
    if (subtree.bf() < 0) {
      w.right = rotateRight(subtree);
      w = rotateLeft(w);
    } else {
      w = rotateLeft(node);
    }
  }
  return w;
}
function rotateLeft(node) {
  let w = node.right;
  w.parent = node.parent;
  node.parent = w;
  node.right = w.left;
  if (w.left !== null) w.left.parent = node;
  w.left = node;
  node.leftH++;
  node.rightH--;
  return w;
}
function rotateRight(node) {
  let w = node.left;
  w.parent = node.parent;
  node.parent = w;
  node.left = w.right;
  if (w.right !== null) w.right.parent = node;
  w.right = node;
  node.leftH--;
  node.rightH++;
  return w;
}
function test() {
  const list = [19, 44, 55, 3, 22, 67, 12, 7, 8, 9, 1234];
  list.forEach((l) => (root = insert(root, l, root)));
}
function preorder_print(tree) {
  if (!tree instanceof Node || !tree) return;
  console.log(tree.key);
  preorder_print(tree.left);
  preorder_print(tree.right);
}
test();
preorder_print(root);

