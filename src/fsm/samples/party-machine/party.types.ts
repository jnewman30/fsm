import {PartyState} from "./party.state";
import {PartyAction} from "./party.action";
import {Beverage} from "./beverage";

export type PartyStateType = PartyState.Sober | PartyState.Drunk | PartyState.ReallyDrunk | PartyState.Sick | PartyState.Sleeping;

export type PartyActionType = PartyAction.Drink | PartyAction.Sleep;

export type BeverageType = Beverage.Beer | Beverage.Vodka | Beverage.Soda;
