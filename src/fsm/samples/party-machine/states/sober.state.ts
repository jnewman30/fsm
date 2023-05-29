import {PartyContext} from "../party.context";
import {BeverageType} from "../party.types";
import {PartyState} from "../party.state";
import {PartyMachine} from "../party.machine";

export class SoberState {
    _onEnter(machine: PartyMachine, context: PartyContext): void {
        console.log('* Enter State:', machine.state);
        context.reset();
        context.report();
    }

    Drink(machine: PartyMachine, context: PartyContext, beverage: BeverageType): void {
        if (context.isAlcohol(beverage)) {

            context.spiritsConsumed += 1;
            console.log(`\tsay "${beverage} down the hatch!"`);

            if (context.isDrunk()) {
                machine.transition(PartyState.Drunk);
            }
        } else {
            console.log(`\tsay "That ${beverage} was refreshing!"`);
        }
    }
}