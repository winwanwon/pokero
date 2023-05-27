import { User } from "./types";

export const getModeFromResult = (selectedUser: User[]): number => {
    if (selectedUser.length < 1) return -1;
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

    return mostChoosenOption.length === 1 ? parseInt(mostChoosenOption[0]) : -1;
};

export const getAverageFromResult = (selectedUser: User[]): number => {
    return selectedUser.map(user => user.selectedOption).reduce((a, b) => a + b, 0) / selectedUser.length;
};

export const isValidRoomName = (roomName: string): boolean => !!(roomName.match("^[a-zA-Z0-9-]*$") != null && roomName.length <= 16);
export const isValidUserName = (userName: string): boolean => !!(userName.match("^[a-zA-Z0-9]*$") != null && userName.length <= 10);
