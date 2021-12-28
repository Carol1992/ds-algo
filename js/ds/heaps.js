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
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
class BH {
  constructor(comparator = (a,   b) => b   -   a) {
    /**
     * (a,b) => a-b  //ascend min-heap
     * (a,b) => b-a  //descend max-heap
     */
    this.heaps = [];
    this.comparator = comparator;
  }
  find(key) {
    return this.heaps.find(i => i.key == key);
  }
  findTop() {
    return this.heaps[0];
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.heaps.length;
  }
  insert(key, value) {
    let n = new Node(key, value);
    this.heaps.push(n);
    let index = this.size() - 1;
    let pIndex = this.getParent(index);
    while (index > 0 && this.comparator(this.heaps[index].value, this.heaps[pIndex].value) < 0) {
      //vialation
      this.swap(index, pIndex);
      index = pIndex;
      pIndex = this.getParent(index);
    }
  }
  removeTop() {
    if (this.isEmpty()) return null;
    let top = this.heaps[0];
    this.heaps.splice(0, 1, this.heaps[this.size() - 1]);
    this.heaps.length--;
    let index = 0;
    while (index < this.size()) {
      let cIndex = this.getChildren(index);
      let c0 = cIndex[0];
      let c1 = cIndex[1];
      let c_top_idx = c0;
      if (c1 < this.size()) {
        if (this.comparator(this.heaps[c0].value, this.heaps[c1].value) > 0) {
          c_top_idx = c1;
        }
      }
      this.swap(index, c_top_idx);
      index = c_top_idx;
    }
    return top;
  }
  swap(index, pIndex) {
    if (index >= this.size() || pIndex >= this.size()) return;
    let temp = this.heaps[index];
    this.heaps[index] = this.heaps[pIndex];
    this.heaps[pIndex] = temp;
  }
  heapify(list) {
    list.forEach((i, idx) => {
      if(i.hasOwnProperty('key') && i.hasOwnProperty('value')) {
        this.insert(i.key, i.value);
      } else {
        this.insert(idx, i);
      }
    });
    return this.heaps;
  }
  getChildren(i) {
    return [2 * i + 1, 2 * i + 2];
  }
  getParent(i) {
    return Math.max(Math.floor((i - 1) / 2), 0);
  }
}

// const heap = new BH((a,b) => a-b);
// const list = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36];
// const heaps = heap.heapify(list);
// console.log(heaps);
// print(heaps);
// console.log("==============");
// let max = heap.removeTop();
// console.log(max, heaps);
// print(heaps);

// function print(list) {
//   const length = list.length;
//   let height = Math.ceil(Math.log2(length + 1));
//   let maxLeaves = Math.pow(2, height - 1);
//   let i = 0;
//   while (i < height) {
//     let leavesNum = Math.pow(2, i);
//     let totalBefore = leavesNum - 1;
//     let sublist = [];
//     for (let j = totalBefore; j < leavesNum + totalBefore; j++) {
//       list[j] !== undefined && sublist.push(list[j].value);
//     }
//     const r = Math.round(length / (i + 1));
//     console.log(" ".repeat(r), sublist.join(" ".repeat(r)));
//     i++;
//   }
// }
module.exports = BH;
