export enum SOCKET_STATUS  {
    CONNECTED = "connected",
    READY = "ready",
    ERROR = "error",
}
export let global_vars = {
    socketStatus: "error",
    socketStatusLocal: "error",
    caller: process.env.CALLER ? process.env.CALLER : '',
    is_running: false,
    is_running_nft: false,
    is_running_lp: false,
    is_running_tokens: false,
    is_check_queue: false
};

export let global_event_vars = {
    socketStatus: "error",
    socketStatusLocal: "error",
    caller: process.env.CALLER ? process.env.CALLER : '',
    isScanning: false
};