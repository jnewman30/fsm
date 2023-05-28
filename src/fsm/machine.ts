export class Machine {

    public state: string;
    public states = {};

    constructor(public initialState: string = 'Uninitialized') {
        this.state = initialState;
    }

    public dispatch(actionName: string, ...payload: any[]): void {
        const actions = this.states[this.state as keyof object] as any;
        if (!actions) {
            throw Error(`No action "${actionName}" exists on state "${this.state}".`);
        }
        const action = actions[actionName as keyof object] as any;

        if (action) {
            action.apply(this, ...payload);
        } else {
            //action is not valid for current state
        }
    }

    public changeState(newState: string): void {
        //validate that newState actually exists
        this.state = newState;
    }

    public transition(newState: string, ...payload: any[]): void {
        this.changeState(newState);
        this.dispatch('_onEnter', ...payload);
    }
}