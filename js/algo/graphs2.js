class Graph {
  constructor(V) {
    this.size = V;
    this.matrix = [];
    for (let i = 0; i < V; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < V; j++) {
        this.matrix[i][j] = Infinity;
      }
    }
  }
  add_vertex(x) {
    this.matrix[x][x] = 0;
  }
  remove_vertex(x) {
    this.matrix[x][x] = Infinity;
  }
  add_edge(x, y, w) {
    this.matrix[x][y] = w;
  }
  remove_edge(x, y) {
    this.matrix[x][y] = Infinity;
  }
  get_edge_value(x, y) {
    return this.matrix[x][y];
  }
  set_edge_value(x, y, v) {
    this.matrix[x][y] = v;
  }
  //tests whether there is an edge from the vertex x to the vertex y;
  adjacent(x, y) {
    let e = this.matrix[x][y];
    return e > 0 && e < Infinity;
  }
  //lists all vertices y such that there is an edge from the vertex x to the vertex y;
  neighbors(x) {
    let adj = this.matrix[x];
    let n = [];
    adj.forEach((e, idx) => {
      if (e > 0 && e < Infinity) {
        n.push(idx);
      }
    });
    return n;
  }
}
let labeled = [];
function dfs(G, v) {
  console.log(v);
  labeled.push(v);
  let adj = G.neighbors(v);
  adj.forEach((i) => {
    let y = i;
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
      let y = i;
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
  for (let i = 0; i < G.size; i++) {
    dis[i] = Infinity;
  }
  dis[v] = 0;
  let parent = {};
  parent[v] = -1;
  while (sptSet.length < G.size) {
    let u = getDisMin(dis, sptSet);
    sptSet.push(u);
    let adj = G.neighbors(u);
    for (let i = 0; i < adj.length; i++) {
      let vtx = adj[i];
      let weight = G.matrix[u][vtx];
      let newDis = dis[u] + weight;
      if (newDis < dis[vtx]) {
        dis[vtx] = newDis;
        parent[vtx] = u;
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
  let minHeap = [];
  for (let i = 0; i < G.size; i++) {
    minHeap.push({
      ntxNum: i,
      keyVal: i == 0 ? 0 : Infinity,
    });
  }
  minHeap.sort();
  let firstV = minHeap[0];
  let parent = {};
  parent[firstV.ntxNum] = -1;
  while (minHeap.length) {
    let top = minHeap.shift();
    let u = top.ntxNum;
    let adj = G.neighbors(u);
    for (let i = 0; i < adj.length; i++) {
      let vtx = adj[i];
      let t = minHeap.find((i) => i.ntxNum == vtx);
      if (t) {
        let weight = G.matrix[u][vtx];
        if (weight < t.keyVal) {
          t.keyVal = weight;
          parent[vtx] = u;
        }
      }
    }
  }
  return { parent };
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
  G.matrix.forEach((row) => {
    console.log(row);
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

const V = 5;
let G = new Graph(V);
function test() {
  for (let i = 0; i < V; i++) {
    G.add_vertex(i);
  }
}
G.add_edge(0, 1, 1);
G.add_edge(0, 4, 7);
G.add_edge(0, 3, 5);
G.add_edge(1, 2, 4);
G.add_edge(1, 3, 2);
G.add_edge(1, 4, 3);
G.add_edge(2, 3, 11);
G.add_edge(3, 4, 9);
test();
// print(G);
// let { dis, parent } = dijkstra(G, 0);
// console.log(dis);
// console.log(parent);
// let allPath = printPaths(parent);
// console.log(allPath);
let { parent } = mst_prims(G);
console.log(parent);
