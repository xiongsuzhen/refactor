import { config } from "src/app/config";

export abstract class AbstractResourceChangedNotify {

    public abstract reloadData(data: string): void;

    public abstract getSubscribeMaterials(): string[];

    private webSocketClient: WebSocket;

    constructor() {
        if (!this.webSocketClient) {
            this.webSocketClient = new WebSocket(config.resource_changed_notify_endpoint);
        }
        this.webSocketClient.onopen = (e) => {
            console.log("数据变化检测器启动成功.");
        };
        this.webSocketClient.onmessage = (msg: MessageEvent) => {
            if ("Connection Succeeded" == msg.data) {
                return;
            }
            console.log("数据变化检测器接收到数据=", JSON.parse(msg.data));
            this.reloadData(msg.data);
        };
    }
}
