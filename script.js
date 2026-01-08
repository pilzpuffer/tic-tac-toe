/*
winning scenarios: 

[x x x] -> 3 in a row, vertical victory

[x null null]   [null x null]   [null null x]                           [1][1][1]
[x null null]   [null x null]   [null null x]  -> vertical victories    [2][2][2]
[x null null]   [null x null]   [null null x]                           [3][3][3]

[x null null]    [null null x]                              [1][2][3]
[null x null]    [null x null]  -> diagonal victories           
[null null x]    [x null null]                              [3][2][1]
*/