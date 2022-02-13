import { User } from "./types";

export const getModeFromResult = (selectedUser: User[]): string => {
    if (selectedUser.length < 1) return "-";
    const resultDict: { [key: string]: number } = {};
    selectedUser.forEach((user) => {
        if (!!resultDict[user.selectedOption]) {
            resultDict[user.selectedOption] += 1;
        } else {
            resultDict[user.selectedOption] = 1;
        }
    });

    let mostChoosenOption: string[] = [];
    Object.keys(resultDict).forEach((key: string) => {
        if (mostChoosenOption.length === 0 || resultDict[key] > resultDict[mostChoosenOption[0]]) {
            mostChoosenOption = [key];
        } else if (resultDict[key] === resultDict[mostChoosenOption[0]]){
            mostChoosenOption.push(key);
        }
    });

    return mostChoosenOption.length === 1 ? mostChoosenOption[0] : "-";
};

export const getAverageFromResult = (selectedUser: User[]): number => {
    return selectedUser.map(user => user.selectedOption).reduce((a, b) => a + b, 0) / selectedUser.length;
};
