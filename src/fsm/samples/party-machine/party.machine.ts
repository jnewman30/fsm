import {Machine} from "../../machine";
import {PartyContext} from "./party.context";
import {PartyActionType, PartyStateType} from "./party.types";
import {PartyState} from "./party.state";
import {DrunkState, ReallyDrunkState, SickState, SleepingState, SoberState} from "./states";

export class PartyMachine extends Machine<PartyContext, PartyStateType, PartyActionType> {

    constructor() {
        super(new PartyContext(), PartyState.Sober);
        this.transition(PartyState.Sober);
    }

    public states = {
        Sober: new SoberState(),
        Drunk: new DrunkState(),
        ReallyDrunk: new ReallyDrunkState(),
        Sick: new SickState(),
        Sleeping: new SleepingState()
    }
}