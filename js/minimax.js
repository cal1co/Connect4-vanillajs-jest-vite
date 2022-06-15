// Future implementation 
const minimax = () => {
    // Scores:
    // Depending on how many chips are aligned for a given player, a score is given. ie "closeness to victory"

    // Decision
    // Algorithm recursively performs a BFS, evaluating the best score attainable by both players depending on the next move(s) made.

    // Optimizations:
    // 1. Alpha-beta pruning: "prunes" away branches that can't possible influence final decision. ie a possiblity worse than a previously evaluated one
    // 2. Transposition Table: If a sequence of moves occurs multiple times, further searching down the tree is unnecessary.
}