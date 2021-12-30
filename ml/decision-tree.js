/**
 * 1. find the best attribute and place it on the root node;
 * 2. and then, split the dataset into subsets. each subset should have the same value for an attribute.
 * 3. find leaf nodes in all branches by repeating 1 and 2 on each subsets
 *
 * Gini index ?
 * Information gain ?
 * Entropy ?
 * Accuracy score ?
 * Confusion Matrix ?
 *
 * supervised learning vs unsupervised learning (need labelled dataset or not ?)
 * classification vs regression (discrete or continuous ?)
 *
 *
 */
function test() {
  let a = [
    [Infinity, Infinity],
    [Infinity, Infinity],
  ];
  a[0][0] = 0;
  console.log(a);
}
test();
