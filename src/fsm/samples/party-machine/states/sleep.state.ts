import {PartyContext} from "../party.context";
import {PartyMachine} from "../party.machine";

export class SleepingState {
    _onEnter(machine: PartyMachine, context: PartyContext): void {
        console.log('* Enter State:', machine.state);
        context.report();
        console.log('\tZzZzzZZZzzZzz...');
    }
}