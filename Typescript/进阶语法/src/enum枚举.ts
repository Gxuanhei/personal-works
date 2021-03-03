enum Status {
    OFFLINE,
    ONLINE,
    DELETED
}

enum StatusSecond {
    OFFLINE,
    ONLINE =4,
    DELETED
}

// const Status = {
//     OFFLINE: 0,
//     ONLINE: 1,
//     DELETED: 2
// }

function getResult(status: number) {
    if (status === Status.OFFLINE) {
        return 'offline'
    } else if (status === Status.ONLINE) {
        return 'online'
    } else if (status === Status.DELETED) {
    }
    return 'error'
}

getResult(Status.OFFLINE)
