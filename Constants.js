const API = "https://api.github.com/";
const USER = "users/";
const EVENT = "events";
let currentUser;
let events_list = [];
let timeData = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [10, 0],
    [11, 0],
    [12, 0],
    [13, 0],
    [14, 0],
    [15, 0],
    [16, 0],
    [17, 0],
    [18, 0],
    [19, 0],
    [20, 0],
    [21, 0],
    [22, 0],
    [23, 0]
];

const PUSH_EVENT = "PushEvent";
let pushEventNumber = 0;
let pushEventPercentage = 0.0;
let averageEventTimeHour = 0;

const NOT_FOUND = "Not Found";