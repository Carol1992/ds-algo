/**
 * starts at the root and explore as far as possile along each branch before backtracking.
 */
class Vertex {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.adjacentVertices = [];
  }
}
class Edge {
  constructor(v1, v2, w) {
    this.vertices = [v1, v2];
    this.weight = w;
  }
}
class Graph {
  constructor() {
    this.vertices = [];
    this.edges = [];
  }
  addNode(key, value) {
    let v = new Vertex(key, value);
    this.vertices.push(v);
    return v;
  }
  removeNode(key) {
    this.vertices = this.vertices.filter((v) => v.key !== key);
  }
  addEdge(v1, v2, w) {
    let e = new Edge(v1, v2, w);
    this.edges.push(e);
    let idx1 = this.vertices.findIndex((v) => v.key === v1.key);
    let idx2 = this.vertices.findIndex((v) => v.key === v2.key);
    this.vertices[idx1].adjacentVertices.push(v2);
    this.vertices[idx2].adjacentVertices.push(v1);
  }
  removeEdge(v1, v2) {
    let idx1 = this.vertices.findIndex((v) => v.key === v1.key);
    let idx2 = this.vertices.findIndex((v) => v.key === v2.key);
    this.vertices[idx1].adjacentVertices = this.vertices[
      idx1
    ].adjacentVertices.filter((v) => v.key !== v2.key);
    this.vertices[idx2].adjacentVertices = this.vertices[
      idx2
    ].adjacentVertices.filter((v) => v.key !== v1.key);
  }
}
//tests whether there is an edge from the vertex x to the vertex y;
function adjacent(G, x, y) {
  let v = G.vertices.find((v) => v.key === x.key);
  if (v) {
    let vs = v.adjacentVertices;
    return vs.find((a) => a.key === y.key) !== undefined;
  }
  return false;
}
//lists all vertices y such that there is an edge from the vertex x to the vertex y;
function neighbors(G, x) {
  let v = G.vertices.find((v) => v.key === x.key);
  if (v) {
    return v.adjacentVertices;
  }
  return [];
}
function add_vertex(G, x) {}
function remove_vertex(G, x) {}
function add_edge(G, x, y) {}
function remove_edge(G, x, y) {}
function get_vertex_value(G, x) {}
function set_vertex_value(G, x, v) {}
function get_edge_value(G, x, y) {}
function set_edge_value(G, x, y, v) {}
function dfs(G) {}
function bfs(G) {}

let G = new Graph();
function test() {
  let list = ["A", "B", "C", "D", "E"];
  list.forEach((l) => {
    G.addNode(l);
  });
  G.addEdge("A", "B");
  G.addEdge("A", "D");
  G.addEdge("A", "C");
  G.addEdge("C", "B");
  G.addEdge("C", "E");
  G.addEdge("D", "E");
}
test();
console.log(adjacent(G, "A", "B"));
console.log(adjacent(G, "A", "E"));
