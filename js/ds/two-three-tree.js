/**
 * every node with children has either 2 children and one data element, or 3 children and two data elements.
 * every internal node is a 2-node or a 3-node
 * all leaves are at the same level
 * all data are kept in sorted order
 * it's a B tree
 * 
 * we say that T is a 2-3 tree if and only if one of the following statement holds:
 * 1. T is empty
 * 2. T is a 2-node with data element a, left child p, right child q
 *  2.1 p < a < q
 *  2.2 p, q are 2-3 trees of the same height
 * 3. T is a 3-node with data elements a and b, left child p, middle child q, right child r
 *  3.1 p < a < q < b < r
 *  3.2 p, q, r are 2-3 trees of the same height
 * 
 * operations: insert, search, delete
 * insert and delete will cause node expansion, split, merge
 * 
 * 2-3-4 tree: every internal node is a 2-node, 3-node or 4-node
 */
class Node {
  constructor(keys, children) {
    this.keys = keys;
    this.children = children;
    this.height = 1;
  }
}
function isVilid(node) {
  if (node === null) return true;
  if (node.keys.length === 1 && node.children.length === 2) {
    let a = node.keys[0];
    let p = node.children[0];
    let q = node.children[1];
    if (a > p && a < q && p.height === q.height) {
      return isVilid(p) && isVilid(q);
    } else {
      return false;
    }
  } else if (node.keys.length === 2 && node.children.length === 3) {
    let a = node.keys[0];
    let b = node.keys[1];
    let p = node.children[0];
    let q = node.children[1];
    let r = node.children[2];
    if (
      a > p &&
      a < q &&
      b > q &&
      b < r &&
      p.height === q.height &&
      q.height === r.height
    ) {
      return isVilid(p) && isVilid(q) && isVilid(r);
    } else {
      return false;
    }
  } else {
    return false;
  }
}
