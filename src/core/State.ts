export class State {
    private static instance: State;
    private state: Map<string, any> = new Map();

    private constructor() {}

    public static getInstance(): State {
        if (!State.instance) {
            State.instance = new State();
        }
        return State.instance;
    }

    public set(key: string, value: any): void {
        this.state.set(key, value);
    }

    public get(key: string): any {
        return this.state.get(key);
    }

    public has(key: string): boolean {
        return this.state.has(key);
    }
}
