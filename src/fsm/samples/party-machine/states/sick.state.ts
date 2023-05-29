import {PartyContext} from "../party.context";
import {PartyAction} from "../party.action";
import {PartyState} from "../party.state";
import {PartyMachine} from "../party.machine";

export class SickState {
    _onEnter(machine: PartyMachine, context: PartyContext): void {
        console.log('* Enter State:', machine.state);
        context.report();
        console.log(`\tsay "Dang! I spewed chunks!"`);

        machine.dispatch(PartyAction.Sleep);
    }

    Sleep(machine: PartyMachine): void {
        console.log('\tsay "Too tired to party. Time to sleep."');
        machine.transition(PartyState.Sleeping);
    }
}