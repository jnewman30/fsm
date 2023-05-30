import {Beverage, PartyAction, PartyMachine} from "./fsm/samples/party-machine";

const party = new PartyMachine();

party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Vodka);
party.dispatch(PartyAction.Drink, Beverage.Beer);
party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Vodka);
party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Beer);
party.dispatch(PartyAction.Drink, Beverage.Beer);
party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Beer);

console.log('\r\nRun Completed.');
console.log('Spirits Consumed = ', party.context.spiritsConsumed);
