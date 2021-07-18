import nats, {Stan} from 'node-nats-streaming';

export class NatsWrapper {
    private _client?: Stan;

    get client() {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }

        return this._client;
    }

    connectNatsListener(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, {url});

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                this.closeNatsListener();
                this.closeNatsClientBeforeAppIsKilled();
                console.log('Connected to NATS');
                resolve();
            });
            this.client.on('error', (err) => {
                reject(err);
            });
        });
    }

    private closeNatsClientBeforeAppIsKilled() {
        process.on('SIGINT', () => this.client.close());
        process.on('SIGTERM', () => this.client.close());
    }

    closeNatsListener() {
        this.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
    }
}


export const natsWrapper = new NatsWrapper();
