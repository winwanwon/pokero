import { PokerMode } from "../enum";

export const PokerModeOptions = [
    {
        id: PokerMode.Fibonacci,
        name: 'Fibonacci',
        desc: 'The classic planning poker scale. The gaps grow with the numbers, because big tasks are harder to size.',
        value: [0, 1, 2, 3, 5, 8, 13]
    },
    {
        id: PokerMode.FibonacciPlus,
        name: 'Fibonacci Plus',
        desc: 'Fibonacci with an extra 0.5, for tasks that are too small to call a full point.',
        value: [0, 0.5, 1, 2, 3, 5, 8, 13]
    },
    {
        id: PokerMode.Linear,
        name: 'Linear',
        desc: 'Every number from 0 to 8, for teams who want finer steps between estimates.',
        value: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
        id: PokerMode.TShirt,
        name: 'T-Shirt Size',
        desc: 'Rough sizes from XXS to XXL, for early planning when numbers would feel too exact.',
        value: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    },
    {
        id: PokerMode.YesNo,
        name: 'Yes or No',
        desc: 'A quick team check. Can we do this or not?',
        value: ["Yes", "No"],
    },
];

export const DEFAULT_POKER_OPTIONS = PokerModeOptions[0].value;

export const getPokerOptions = (pokerMode: PokerMode): (number | string)[] =>
    PokerModeOptions.find((p) => p.id === pokerMode)?.value || DEFAULT_POKER_OPTIONS;
