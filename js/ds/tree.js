/**
 * traversal: preorder, inorder, postorder
 * insert, delete,
 * BST, AVL-TREE, B-TREE, RED-BLACK-TREE, 2-3-TREE,
 * node: {
 *  key,
 *  left subtree,
 *  right subtree
 * }
 * application: file systems, DOM, JSON documents, store sorted data, BST easy for search
 *
 * terminology
 * branch node: any node that has child nodes
 * leaf node: any node that does not have child nodes
 * the height of the node: the length of the longest downward path to a leaf from that node
 * the depth of the node: the length of the path to its node
 * degree: the number of children for that node
 * degree of tree: the maximun degree of a node in a tree
 * size of a tree: number of nodes in a tree
 * breadth: the number of leaves
 * width: the number of nodes in a level
 */
/**
 * 1. tree can be empty
 * 2. each node has 0 or 1 parent
 * 3. each node can have 0 or more child nodes
 * 4. Trees with two children or less are called: Binary Tree
 * 5. Binary Search Tree: left < parent < right
 */
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
function deleteNode(node, key) {
  if (node === null) return node;
  if (node.key === key) {
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }
    node.key = minValue(node.right);
    node.right = deleteNode(node.right, node.key);
  } else if (key < node.key) {
    //go left
    node.left = deleteNode(node.left, key);
  } else {
    //go right
    node.right = deleteNode(node.right, key);
  }
  return node;
}
function minValue(node) {
  let minVal = node.key;
  let leftNode = node.left;
  while (leftNode !== null) {
    minVal = leftNode.key;
    leftNode = leftNode.left;
  }
  return minVal;
}
function insertNode(node, key) {
  if (node === null) {
    let newNode = new Node(key);
    return newNode;
  }
  if (key < node.key) {
    //go left
    node.left = insertNode(node.left, key);
  } else if (key > node.key) {
    //go right
    node.right = insertNode(node.right, key);
  }
  return node;
}
function preorder_print(tree) {
  if (!tree instanceof Node || !tree) return;
  console.log(tree.key);
  preorder_print(tree.left);
  preorder_print(tree.right);
}
function inorder_print(tree) {
  if (!tree instanceof Node || !tree) return;
  inorder_print(tree.left);
  console.log(tree.key);
  inorder_print(tree.right);
}
function postorder_print(tree) {
  if (!tree instanceof Node || !tree) return;
  postorder_print(tree.left);
  postorder_print(tree.right);
  console.log(tree.key);
}

function test() {
  let root;
  const list = [1, 44, 55, 3, 22, 67, 12, 7, 8, 9, 1234];

  // list.sort((a, b) => a - b);
  list.forEach((l) => {
    if (!root) {
      root = new Node(l);
    } else {
      insertNode(root, l);
    }
  });

  inorder_print(root);
  console.log("=======");
  preorder_print(root);
  console.log("=======");
  postorder_print(root);
  console.log("=======");
  root = deleteNode(root, 1);
  root = deleteNode(root, 44);
  preorder_print(root);
}

test();
