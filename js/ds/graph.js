/**
 * undirected graph vs directed graph
 * consist of vertices and edges.
 *
 * basic operations:
 * adjacent(G, x, y): tests whether there is an edge from the vertex x to the vertex y;
 * neighbors(G, x): lists all vertices y such that there is an edge from the vertex x to the vertex y;
 * add_vertex(G, x): adds the vertex x, if it is not there;
 * remove_vertex(G, x): removes the vertex x, if it is there;
 * add_edge(G, x, y): adds the edge from the vertex x to the vertex y, if it is not there
 * remove_edge(G, x, y): removes the edge from the vertex x to the vertex y, if it is there;
 * get_vertex_value(G, x): returns the value associated with the vertex x;
 * set_vertex_value(G, x, v): sets the value associated with the vertex x to v.
 * get_edge_value(G, x, y): returns the value associated with the edge (x, y);
 * set_edge_value(G, x, y, v): sets the value associated with the edge (x, y) to v.
 *
 * representation:
 * adjacency list:Vertices are stored as records or objects, and every vertex stores a list of adjacent vertices.
 * adjacency matrix: rows represent source vertices and column represent destination vertices
 * incidence matrix: rows represent the vertices and columns represent the edges
 * 
 * BFS, DFS
 * graph cycle
 * topological sorting
 * minimum spanning tree
 * shortest paths
 * backtracking
 * connectivity
 * maximum flow
 */
