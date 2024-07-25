function getUserRank(level) {
    if (level >= 50) {
        return "Junior developer";
    } else if (level >= 40) {
        return "Basic developer";
    } else if (level >= 30) {
        return "Assistant developer";
    } else if (level >= 20) {
        return "Apprentice developer";
    } else if (level >= 10) {
        return "Beginner developer";
    } else {
        return "Aspiring developer";
    }
}


export {getUserRank}