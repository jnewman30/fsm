import {PartyContext} from "../party.context";
import {BeverageType} from "../party.types";
import {PartyState} from "../party.state";
import {PartyMachine} from '../party.machine';

export class ReallyDrunkState {
    _onEnter(machine: PartyMachine, context: PartyContext): void {
        console.log('* Enter State:', machine.state);
        context.report();
        console.log(`\tsay "Hey Room, stop spinning!"`);
    }

    Drink(machine: PartyMachine, context: PartyContext, beverage: BeverageType): void {
        if (context.isAlcohol(beverage)) {

            context.spiritsConsumed += 1;
            console.log(`\tsay "${beverage} down the hatch!"`);

            if (context.isSick()) {
                machine.transition(PartyState.Sick);
            }
        } else {
            console.log(`\tsay "That ${beverage} was refreshing!"`);
        }
    }
}