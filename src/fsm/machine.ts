
enum InternalActionType {
    OnEnter = '_onEnter',
    OnExit = '_onExit'
}

type InternalAction = InternalActionType.OnEnter | InternalActionType.OnExit;

export class Machine<Context,State,Action> {

    public states: Record<string,object> = {};

    constructor(public context: Context, public state: State) {
    }

    public dispatch(actionName: Action | InternalAction, ...payload: any[]): void {
        const actions = this.states[this.state as keyof object] as any;
        if (!actions) {
            throw Error(`No action "${actionName}" exists on state "${this.state}".`);
        }
        const action = actions[actionName as keyof object] as any;

        if (action) {
            action.apply(this, [this, this.context, ...payload]);
        } else {
            //action is not valid for current state
        }
    }

    public changeState(newState: State): void {
        this.state = newState;
        this.dispatch(InternalActionType.OnEnter, [this, this.context]);
    }

    public transition(newState: State, ...payload: any[]): void {
        this.dispatch(InternalActionType.OnExit, [this, this.context, ...payload]);
        this.changeState(newState);
    }
}
