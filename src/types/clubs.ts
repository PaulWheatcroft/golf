export const clubs = [
    { 
        name: "Wedge", 
        distance: 3, 
        rough: true, 
        sand: false, 
        fairwayPower: [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 1, 1], 
        fairwayAccuracy: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
    },
    { 
        name: "Iron", 
        distance: 4, 
        rough: true, 
        sand: false, 
        fairwayPower: [-4, -4, -3, -2, -1, 0, 0, 0, 1, 1, 1, 1], 
        fairwayAccuracy: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3]
    },
    { 
        name: "Long Iron", 
        distance: 5, 
        rough: false, 
        sand: false, 
        fairwayPower: [-5, -4, -3, -2, -1, 0, 0, 0, 1, 1, 1, 2], 
        fairwayAccuracy: [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3]
    },
    { 
        name: "Driver", 
        distance: 6, 
        rough: false, 
        sand: false, 
        fairwayPower: [-5, -5, -4, -3, -2, -1, 0, 0, 1, 2, 2, 2], 
        fairwayAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]
    },
    {
        name: "Sand", 
        distance: 2, 
        rough: false, 
        sand: true, 
        sandPower: [-2, -2, -1, -1, 0, 0, 0, 0, 1, 1, 1, 2],
        sandAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]
    },
    {
        name: "Putter", 
        distance: 3, 
        rough: false, 
        sand: false,
        putterPower: [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 1, 1],
        putterAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3] 
        
    }
];

export type Club = {
    name: string,
    distance: number,
    rough: boolean,
    sand: boolean,
    fairwayPower: number[],
    fairwayAccuracy: number[]
}
