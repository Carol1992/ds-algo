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
    let v = this.vertices.find((i) => i.value === x);
    let n_v = new Vertex(x);
    if (!v) {
      this.vertices.push(n_v);
    }
    return n_v;
  }
  remove_vertex(x) {
    this.vertices = this.vertices.filter((i) => i.value === x);
  }
  add_edge(x, y, w) {
    let v1 = this.vertices.find((i) => i.value === x);
    let v2 = this.vertices.find((i) => i.value === y);
    if (v1 && v2) {
      v1.adj.push([y, w]);
      v2.adj.push([x, w]);
    }
  }
  remove_edge(x, y) {
    let v1 = this.vertices.find((i) => i.value === x);
    let v2 = this.vertices.find((i) => i.value === y);
    if (v1 && v2) {
      v1.adj = v1.adj.filter((i) => i[0] !== y);
      v2.adj = v2.adj.filter((i) => i[0] !== x);
    }
  }
  get_vertex_value(x) {
    let v = this.vertices.find((i) => i.value === x);
    if (v) {
      return v.value;
    }
    return null;
  }
  set_vertex_value(x, v) {
    let nv = this.vertices.find((i) => i.value === x);
    nv.value = v;
  }
  get_edge_value(x, y) {
    let v = this.vertices.find((i) => i.value === x);
    let e = v.adj.find((i) => i[0] === y);
    if (e) {
      return e[1];
    }
    return Infinity;
  }
  set_edge_value(x, y, v) {
    let vt = this.vertices.find((i) => i.value === x);
    let e = vt.adj.find((i) => i[0] === y);
    if (e) {
      e[1] = v;
    }
  }
  //tests whether there is an edge from the vertex x to the vertex y;
  adjacent(x, y) {
    let vt = this.vertices.find((i) => i.value === x);
    let e = vt.adj.find((i) => i[0] === y);
    return e !== undefined;
  }
  //lists all vertices y such that there is an edge from the vertex x to the vertex y;
  neighbors(x) {
    let vt = this.vertices.find((i) => i.value === x);
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
function dijkstra(G) {}
function mst(G) {}
function print(G) {
  G.vertices.forEach((v) => {
    console.log(v.value, v.adj);
  });
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
test();
print(G);
console.log("=======");
dfs(G, "A");
console.log("=======");
bfs(G, "A");
console.log(visited);
console.log("=======");
