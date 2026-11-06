import { User } from "./types";

export type PokerOption = number | string;

// Returns null when there is nothing to average, including text decks like T-Shirt Size.
export const getAverageFromResult = (selectedUser: User[]): number | null => {
    const votes = selectedUser.map((user) => user.selectedOption);
    if (votes.length === 0 || votes.some((vote) => typeof vote !== "number")) return null;
    return (votes as number[]).reduce((a, b) => a + b, 0) / votes.length;
};

export const getVoteCounts = (votes: PokerOption[]): Record<string, number> => {
    const counts: Record<string, number> = {};
    votes.forEach((vote) => {
        counts[vote] = (counts[vote] || 0) + 1;
    });
    return counts;
};

// The most picked options in deck order. More than one means a tie.
export const getMajorityFromResult = (selectedUser: User[], options: PokerOption[]): PokerOption[] => {
    const counts = getVoteCounts(selectedUser.map((user) => user.selectedOption));
    const top = Math.max(0, ...Object.values(counts));
    return top === 0 ? [] : options.filter((option) => counts[option] === top);
};

export const isValidRoomName = (roomName: string): boolean => !!(roomName.match("^[a-zA-Z0-9-]*$") != null && roomName.length <= 16);
export const isValidUserName = (userName: string): boolean => !!(userName.match("^[a-zA-Z0-9]*$") != null && userName.length <= 10);
