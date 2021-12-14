/**
 * max heap: for any given node C, if P is the parent, then P >= C
 * min heap: for any given node C, is P is the parent, then P <= C
 * priority queues are often refered to as heaps
 * operations:
 * find max/min(the root node), insert, delete-min, extract-max, replace
 * create-heap, heapify, merge, melt
 * size, is-empty
 * sift-up, sift-down, delete random node, increase-key or decrease-key
 * heaps are usually implemented with an array
 * for a binary heap, given a node at index i, its children are at index 2i+1 and 2i+2, its parent at index (i-1)/2
 * applications: heapsort, selections algorithms, graph algorithms, priority queues, k-way merge, order statistics.
 */
class BH {
  constructor() {
    this.maxHeaps = [];
  }
  findMax() {
    return this.maxHeaps[0];
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.maxHeaps.length;
  }
  insert(key) {
    this.maxHeaps.push(key);
    let index = this.size() - 1;
    let pIndex = this.getParent(index);
    while (index > 0 && this.maxHeaps[pIndex] < this.maxHeaps[index]) {
      //vialation
      this.swap(index, pIndex);
      index = pIndex;
      pIndex = this.getParent(index);
    }
  }
  removeMax() {
    if (this.isEmpty()) return null;
    let max = this.maxHeaps[0];
    this.maxHeaps.splice(0, 1, this.maxHeaps[this.size() - 1]);
    this.maxHeaps.length--;
    let index = 0;
    while (index < this.size()) {
      let cIndex = this.getChildren(index);
      let c0 = cIndex[0];
      let c1 = cIndex[1];
      let c_max = this.maxHeaps[c0] || 0;
      let c_max_idx = c0;
      if (c1 < this.size()) {
        if (this.maxHeaps[c1] > c_max) {
          c_max = this.maxHeaps[c1];
          c_max_idx = c1;
        }
      }
      this.swap(index, c_max_idx);
      index = c_max_idx;
    }
    return max;
  }
  swap(index, pIndex) {
    if (index >= this.size() || pIndex >= this.size()) return;
    let temp = this.maxHeaps[index];
    this.maxHeaps[index] = this.maxHeaps[pIndex];
    this.maxHeaps[pIndex] = temp;
  }
  heapify(list) {
    list.forEach((l) => {
      this.insert(l);
    });
    return this.maxHeaps;
  }
  getChildren(i) {
    return [2 * i + 1, 2 * i + 2];
  }
  getParent(i) {
    return Math.max(Math.floor((i - 1) / 2), 0);
  }
}

const heap = new BH();
const list = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36];
const maxHeaps = heap.heapify(list);
console.log(maxHeaps);
print(maxHeaps);
console.log("==============");
let max = heap.removeMax();
console.log(max, maxHeaps);
print(maxHeaps);

function print(list) {
  const length = list.length;
  let height = Math.ceil(Math.log2(length + 1));
  let maxLeaves = Math.pow(2, height - 1);
  let i = 0;
  while (i < height) {
    let leavesNum = Math.pow(2, i);
    let totalBefore = leavesNum - 1;
    let sublist = [];
    for (let j = totalBefore; j < leavesNum + totalBefore; j++) {
      sublist.push(list[j]);
    }
    const r = Math.round(length / (i + 1));
    console.log(" ".repeat(r), sublist.join(" ".repeat(r)));
    i++;
  }
}
