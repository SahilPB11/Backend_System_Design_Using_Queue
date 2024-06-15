import _ from "lodash";

function distributeUsers(users, astrologers) {
    const numAstrologers = astrologers.length;
    const numUsers = users.length;
    const usersPerAstrologer = Math.floor(numUsers / numAstrologers);

    astrologers.forEach((astrologer, index) => {
        const startIndex = index * usersPerAstrologer;
        const assignedUsers = users.slice(startIndex, startIndex + usersPerAstrologer);
        astrologer.users.push(...assignedUsers);
    });

    return astrologers;
}

export default distributeUsers;
