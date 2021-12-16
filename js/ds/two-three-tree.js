/**
 * every node with children has either 2 children and one data element, or 3 children and two data elements.
 * every internal node is a 2-node or a 3-node
 * all leaves are at the same level
 * all data are kept in sorted order
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
