/**
 * a red-black tree is similar to a B tree of order 4 (2-3-4 tree); 
 * in such a B tree, each node will contain only one value matching a value in a black node of the red-black tree,
 * with an optional value before and/or after it in the same node, both matching an equalient red node of the red-black tree.
 * the leaf nodes of RB trees do not contain keys or data, they are called NIL leaves(all black)
 * black depth of a node: the number of black nodes from the root to that node.
 * black height of the tree: the number of black nodes in any path from the root to the leaves, which is constant
 * applications: Java8 HashMap, Linux kernel's Completely Fair Scheduler, java.util.TreeMap, java.util.TreeSet, multiset/multimap/map in C++
 * 
 * requirements:
 * 1. every node can be red or black;
 * 2. all NIL nodes are black;
 * 3. a red node doesn't have a red child;
 * 4. the number of black nodes in any path from leaves to root are the same
 * 5. (root is black)
 * 
 * rotations and color flips:
 * the decision to perform a rotation or a color flip is based on the aunt of the current node,
 * if the node has a BLACK aunt, we do a rotation; if the node has a RED aunt, we do a color flip.
 * 
 * why newly inserted nodes are always RED? because it doesn't vialate the depth property(by requirement 4)
 * 
 * https://medium.com/swlh/red-black-tree-rotations-and-color-flips-10e87f72b142
 * https://medium.com/analytics-vidhya/deletion-in-red-black-rb-tree-92301e1474ea
 * 
 */