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
    this.height = 1;
  }
  bf() {
    if (this.left && this.right) {
      return this.right.height - this.left.height;
    } else if (this.left) {
      return -this.left.height;
    } else if (this.right) {
      return this.right.height;
    } else {
      return 0;
    }
  }
}
function getH(node) {
  if (!node) return 0;
  return node.height;
}
function insert(node, key, parent) {
  if (!node) {
    let node = new Node(key, parent);
    return node;
  } else {
    if (key < node.key) {
      node.left = insert(node.left, key, node);
    } else if (key > node.key) {
      node.right = insert(node.right, key, node);
    } else {
      return node;
    }
    node.height = Math.max(getH(node.left), getH(node.right)) + 1;
    if (node.bf() > 1 || node.bf() < -1) {
      node = rebalancing(node);
    }
    return node;
  }
}
function deletes(node, key) {
  if(!node) return node;
  if(key === node.key) {
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }
    node.key = getMin(node.right);
    node.right = delete (node.right, node.key);
  } else if(key < node.key) {
    node.left = delete(node.left, key);
  } else {
    node.right = delete(node.right, key);
  }
  node.height = Math.max(getH(node.left), getH(node.right)) + 1;
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
    } else if (subtree.bf() > 0) {
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
    } else if (subtree.bf() > 0) {
      w = rotateLeft(node);
    }
  }
  return w;
}
function rotateLeft(node) {
  if (!node) return node;
  let w = node.right;
  if (!w) return node;
  w.parent = node.parent;
  node.parent = w;
  node.right = w.left;
  if (w.left !== null) w.left.parent = node;
  w.left = node;
  node.height = Math.max(getH(node.left), getH(node.right)) + 1;
  w.height = Math.max(getH(w.left), getH(w.right)) + 1;
  return w;
}
function rotateRight(node) {
  if (!node) return node;
  let w = node.left;
  if (!w) return node;
  w.parent = node.parent;
  node.parent = w;
  node.left = w.right;
  if (w.right !== null) w.right.parent = node;
  w.right = node;
  node.height = Math.max(getH(node.left), getH(node.right)) + 1;
  w.height = Math.max(getH(w.left), getH(w.right)) + 1;
  return w;
}
function test() {
  const list = [5, 7, 14, 1, 3, 6, 43, 8, 10];
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

