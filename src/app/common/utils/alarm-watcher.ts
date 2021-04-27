import { config } from "src/app/config";

export abstract class AlarmWatcher {

    public abstract onMessage(alarmInfo: object): void;

    private webSocketClient: WebSocket;

    constructor() {
        if (!this.webSocketClient) {
            this.webSocketClient = new WebSocket(config.global_warning_endpoint);
        }
        this.webSocketClient.onopen = (e) => {
            console.log("报警检测器启动.");
        };
        this.webSocketClient.onmessage = (msg: MessageEvent) => {
            if ("Connection Succeeded" == msg.data) {
                console.log("报警检测器跟服务器成功连接。");
                return;
            }
            // console.log("报警检测器接收到数据=", JSON.parse(msg.data));
            this.onMessage(JSON.parse(msg.data));
        };
    }
}
