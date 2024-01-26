export const outcomes = [{ name: "left-top bottom-right", x: 30, y: 20, x1: 250, y1: 130 },
{ name: "right-top bottom-left", x: 230, y: 20, x1: 30, y1: 140 },
{ name: "row-one", x: 22, y: 30, x1: 260, y1: 30 },
{ name: "row-two", x: 22, y: 80, x1: 260, y1: 80 },
{ name: "row-three", x: 22, y: 120, x1: 260, y1: 120 },
{ name: "column-one", x: 50, y: 20, x1: 50, y1: 140 },
{ name: "column-two", x: 150, y: 20, x1: 150, y1: 140 },
{ name: "column-three", x: 250, y: 20, x1: 250, y1: 140 }
];


export const outcomeSet = new Map();
outcomeSet.set(outcomes[0].name, outcomes[0]);
outcomeSet.set(outcomes[1].name, outcomes[1]);
outcomeSet.set(outcomes[2].name, outcomes[2]);
outcomeSet.set(outcomes[3].name, outcomes[3]);
outcomeSet.set(outcomes[4].name, outcomes[4]);
outcomeSet.set(outcomes[5].name, outcomes[5]);
outcomeSet.set(outcomes[6].name, outcomes[6]);
outcomeSet.set(outcomes[7].name, outcomes[7]);