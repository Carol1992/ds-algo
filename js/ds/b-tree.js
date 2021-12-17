/**
 * the B tree generalizes the BST, allowing for nodes to have more than two nodes
 * the order of B tree is defined as the maximum number of children a node can have
 * properties:
    * 1. all leaves are at the same level
    * 2. the order of B tree depends on disk block size
    * 3. every node except root must contain at least t-1 keys, t is the minimum number of children a node must have
    * 4. all nodes can contain at most 2*t-1 keys.
    * 5. 2*t-1 === the order of B tree
    * 6. node.keys.length + 1 === node.children.length
    * 7. B tree grows and shrinks from the root
    * 8. all keys of a node are sorted in increasing order
    * 9. disk blocks need to read is logb(N): b is the number of entries per block
    *   for example, if we use aux-aux index, if a disk block contains 100 entries, and we have 1 million records,
    *   disk blocks num = log100(1 million) = 3
 * 
 * in B+ Tree, records can only be stored on the leaf nodes while internal nodes can only store the index values.
 * the leaf nodes of a B+ tree are linked together in the form of a singly linked list.
 * the internal nodes of a B+ tree are often called index nodes.
 * the internal nodes of B+ tree are stored in the main memory, while leaf nodes are stored in the secondary memory.
 * 
 */