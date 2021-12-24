/**
 * a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together.
 * without any cycles and with the minimum total possible edges weight.
 * there might be several spanning trees possible, a MST would be the one with the lowest total edges weight.
 * properties:
 * If there are n vertices in the graph, then each spanning tree has n − 1 edges.
 * If each edge has a distinct weight then there will be only one, unique minimum spanning tree.
 * If the weights are positive, then a minimum spanning tree is in fact a minimum-cost subgraph connecting all vertices
 * For any cycle C in the graph, if the weight of an edge e of C is larger than the individual weights of
 *  all other edges of C, then this edge cannot belong to an MST
 * For any cut C of the graph, if the weight of an edge e in the cut-set of C is strictly smaller than the
 *  weights of all other edges of the cut-set of C, then this edge belongs to all MSTs of the graph.
 * If the minimum cost edge e of a graph is unique, then this edge is included in any MST.
 * If T is a tree of MST edges, then we can contract T into a single vertex while maintaining the invariant
 *  that the MST of the contracted graph plus T gives the MST for the graph before contraction.
 */
