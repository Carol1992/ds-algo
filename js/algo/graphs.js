const util = require("util");
const heap = require("../ds/heaps");
/**
 * starts at the root and explore as far as possile along each branch before backtracking.
 */
class Vertex {
  constructor(value = null) {
    this.value = value;
    this.adj = [];
  }
}
class Graph {
  constructor() {
    this.vertices = [];
  }
  add_vertex(x) {
    let v = this.vertices.find((i) => i.value == x);
    let n_v = new Vertex(x);
    if (!v) {
      this.vertices.push(n_v);
    }
    return n_v;
  }
  remove_vertex(x) {
    this.vertices = this.vertices.filter((i) => i.value == x);
  }
  add_edge(x, y, w) {
    let v1 = this.vertices.find((i) => i.value == x);
    let v2 = this.vertices.find((i) => i.value == y);
    if (v1 && v2) {
      v1.adj.push([y, w]);
      v2.adj.push([x, w]);
    }
  }
  remove_edge(x, y) {
    let v1 = this.vertices.find((i) => i.value == x);
    let v2 = this.vertices.find((i) => i.value == y);
    if (v1 && v2) {
      v1.adj = v1.adj.filter((i) => i[0] !== y);
      v2.adj = v2.adj.filter((i) => i[0] !== x);
    }
  }
  get_vertex_value(x) {
    let v = this.vertices.find((i) => i.value == x);
    if (v) {
      return v.value;
    }
    return null;
  }
  set_vertex_value(x, v) {
    let nv = this.vertices.find((i) => i.value == x);
    nv.value = v;
  }
  get_edge_value(x, y) {
    let v = this.vertices.find((i) => i.value == x);
    let e = v.adj.find((i) => i[0] == y);
    if (e) {
      return e[1];
    }
    return Infinity;
  }
  set_edge_value(x, y, v) {
    let vt = this.vertices.find((i) => i.value == x);
    let e = vt.adj.find((i) => i[0] == y);
    if (e) {
      e[1] = v;
    }
  }
  //tests whether there is an edge from the vertex x to the vertex y;
  adjacent(x, y) {
    let vt = this.vertices.find((i) => i.value == x);
    let e = vt.adj.find((i) => i[0] == y);
    return e !== undefined;
  }
  //lists all vertices y such that there is an edge from the vertex x to the vertex y;
  neighbors(x) {
    let vt = this.vertices.find((i) => i.value == x);
    return vt ? vt.adj : [];
  }
}
let labeled = [];
function dfs(G, v) {
  console.log(v);
  labeled.push(v);
  let adj = G.neighbors(v);
  adj.forEach((i) => {
    let y = i[0];
    if (!labeled.includes(y)) {
      dfs(G, y);
    }
  });
}
let visited = [];
function bfs(G, v) {
  let queue = [];
  visited.push(v);
  queue.push(v);
  while (queue.length) {
    let vt = queue.shift();
    let adj = G.neighbors(vt);
    adj.forEach((i) => {
      let y = i[0];
      if (!visited.includes(y)) {
        visited.push(y);
        queue.push(y);
      }
    });
  }
}
function getDisMin(obj, excludes) {
  let minVal = Infinity;
  let min = null;
  Object.keys(obj).forEach((key) => {
    if (!excludes.includes(key) && obj[key] < minVal) {
      minVal = obj[key];
      min = key;
    }
  });
  return min;
}
function dijkstra(G, v) {
  /**
    1) Create a set sptSet (shortest path tree set) that keeps track of vertices included in the shortest-path tree, 
       i.e., whose minimum distance from the source is calculated and finalized. Initially, this set is empty. 
    2) Assign a distance value to all vertices in the input graph. Initialize all distance values as INFINITE. 
       Assign distance value as 0 for the source vertex so that it is picked first. 
    3) While sptSet doesn’t include all vertices 
    ….a) Pick a vertex u which is not there in sptSet and has a minimum distance value. 
    ….b) Include u to sptSet. 
    ….c) Update distance value of all adjacent vertices of u. 
         To update the distance values, iterate through all adjacent vertices. 
         For every adjacent vertex v, if the sum of distance value of u (from source) and weight of edge u-v, 
         is less than the distance value of v, then update the distance value of v. 
    
    printing paths:
      The idea is to create a separate array parent[]. Value of parent[v] for a vertex v stores parent vertex of v in shortest path tree. 
      Parent of root (or source vertex) is -1. Whenever we find shorter path through a vertex u, we make u as parent of current vertex.
   */
  let sptSet = [];
  let dis = {};
  G.vertices.forEach((i) => (dis[i.value] = Infinity));
  dis[v] = 0;
  let parent = {};
  parent[v] = -1;
  let size = G.vertices.length;
  while (sptSet.length < size) {
    let u = getDisMin(dis, sptSet);
    sptSet.push(u);
    let adj = G.neighbors(u);
    for (let i = 0; i < adj.length; i++) {
      let vtx = adj[i];
      let v = vtx[0];
      let weight = vtx[1];
      let newDis = dis[u] + weight;
      if (newDis < dis[v]) {
        dis[v] = newDis;
        parent[v] = u;
      }
    }
  }
  return { dis, parent };
}
function mst_prims(G) {
  /**
   1) Create a Min Heap of size V where V is the number of vertices in the given graph. 
      Every node of min heap contains vertex number and key value of the vertex. 
   2) Initialize Min Heap with first vertex as root (the key value assigned to first vertex is 0). 
      The key value assigned to all other vertices is INF (infinite). 
   3) While Min Heap is not empty, do following 
  …..a) Extract the min value node from Min Heap. Let the extracted vertex be u. 
  …..b) For every adjacent vertex v of u, check if v is in Min Heap (not yet included in MST). 
        If v is in Min Heap and its key value is more than weight of u-v, then update the key value of v as weight of u-v.
   */
  let minHeap = new heap((a,  b) => a  -  b);
  G.vertices.forEach((v, idx) => {
    minHeap.insert(v.value, idx == 0 ? 0 : Infinity);
  });
  let firstV = minHeap.findTop();
  let parent = {};
  parent[firstV.value] = -1;
  while  (!minHeap.isEmpty()) {
    let top = minHeap.removeTop();
    let u = top.key;
    let adj = G.neighbors(u);
    for (let i = 0; i < adj.length; i++) {
      let vtx = adj[i];
      let v = vtx[0];
      let t = minHeap.find(v);
      if  (t) {
        let weight = vtx[1];
        if (weight < t.value) {
          t.value = weight;
          parent[v] = u;
        }
      }
    }
  }
  return {parent};
}
function mst_kruskal(G) {
  /**
   * 1. Sort all the edges in non-decreasing order of their weight. 
     2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far. 
        If cycle is not formed, include this edge. Else, discard it. 
     3. Repeat step#2 until there are (V-1) edges in the spanning tree.
   */
}
function print(G) {
  G.vertices.forEach((v) => {
    console.log(v.value, v.adj);
  });
}
function printPaths(p) {
  let allPaths = [];
  Object.keys(p).forEach((k) => {
    let paths = [];
    let u = p[k];
    paths.push(k);
    while (u !== -1) {
      paths.push(u);
      u = p[u];
    }
    allPaths.push([k, paths.reverse()]);
  });
  return allPaths;
}

let G = new Graph();
function test() {
  let list = ["A", "B", "C", "D", "E", "F", "G", "P", "Q", "O", "J", "K"];
  list.forEach((l) => {
    G.add_vertex(l);
  });
  G.add_edge("A", "B", 3);
  G.add_edge("A", "D", 4);
  G.add_edge("A", "C", 23);
  G.add_edge("C", "B", 1);
  G.add_edge("C", "E", 33);
  G.add_edge("D", "E", 21);
  G.add_edge("D", "C", 71);
  G.add_edge("A", "E", 121);
  G.add_edge("B", "G", 3);
  G.add_edge("G", "F", 4);
  G.add_edge("F", "P", 23);
  G.add_edge("P", "Q", 1);
  G.add_edge("Q", "O", 33);
  G.add_edge("O", "J", 21);
  G.add_edge("J", "K", 71);
  G.add_edge("K", "E", 121);
  G.add_edge("K", "D", 121);
}
// test();
// print(G);
// console.log("=====");
// dfs(G, "A");
// console.log("=====");
// bfs(G, "A");
// console.log(visited);
// console.log("=====");
// let { dis, parent } = dijkstra(G, "A");
// console.log(dis);
// console.log("=====");
// console.log(parent);
// console.log("=====");
// let allPaths = printPaths(parent);
// console.log("vertex  ", "dis  ", "path");
// console.log("------------------------------");
// allPaths.forEach((p) => {
//   console.log(
//     util.format("%s".padEnd(6), p[0]),
//     util.format("%d".padStart(5), dis[p[0]]),
//     util.format("%s".padStart(6), p[1].join(" --> "))
//   );
// });
function test2() {
  new Array(9).fill(0).forEach((i, idx) => G.add_vertex(idx));
  G.add_edge(0, 1, 4);
  G.add_edge(0, 7, 8);
  G.add_edge(1, 2, 8);
  G.add_edge(1, 7, 11);
  G.add_edge(2, 3, 7);
  G.add_edge(2, 8, 2);
  G.add_edge(2, 5, 4);
  G.add_edge(3, 4, 9);
  G.add_edge(3, 5, 14);
  G.add_edge(4, 5, 10);
  G.add_edge(5, 6, 2);
  G.add_edge(6, 7, 1);
  G.add_edge(6, 8, 6);
  G.add_edge(7, 8, 7);
}
test2();
// print(G);
// console.log("=====");
let { parent } = mst_prims(G);
console.log(parent);
// console.log("=====");
// console.log(parent);
// console.log("=====");
