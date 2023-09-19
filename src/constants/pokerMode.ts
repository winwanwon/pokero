import { PokerMode } from "../enum";

export const PokerModeOptions = [
    {
        id: PokerMode.Fibonacci,
        name: 'Fibonacci',
        desc: 'Estimate in fibonacci numbers, the most common and popular scale used in planning poker.',
        value: [0, 1, 2, 3, 5, 8, 13]
    },
    {
        id: PokerMode.FibonacciPlus,
        name: 'Fibonacci Plus',
        desc: 'Estimate in fibonacci numbers but with extra 0.5 story point option, useful for tasks that are too small to be estimated using whole numbers',
        value: [0, 0.5, 1, 2, 3, 5, 8, 13]
    },
    {
        id: PokerMode.Linear,
        name: 'Linear',
        desc: 'Estimate using linear scale, useful when the team wants to estimate smaller tasks and doesn\'t need the level of granularity that Fibonacci offers.',
        value: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
        id: PokerMode.TShirt,
        name: 'T-Shirt Size',
        desc: 'Estimate using T-Shirt size scale, useful when the team wants to estimate smaller tasks and doesn\'t need the level of granularity that Fibonacci offers.',
        value: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
];
