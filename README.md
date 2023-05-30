# fsm
### Finite State Machine Library
A simple FSM library in typescript / javascript.

### The Gist:

Dispatch **_actions_** on your machine which correspond to specific **_operations_** in the current **_state_** and update your **_context_** according to the logic contained within.

- **Context**: The context is where you store data and methods you want to use across states.
- **State**: Defined by a type union and backed by methods or classes that represent each state transition in your machine.
- **Action**: This is the type which describes the actions that can be taken for your machine.

```typescript
export class PartyMachine extends Machine<PartyContext, PartyStateType, PartyActionType> {
    // ...
}
```

See the [Sample Code]([/src/fsm/samples/party-machine/party.machine.ts) for more detail:

Setup your state machine:
```typescript
export class PartyMachine extends Machine<PartyContext, PartyStateType, PartyActionType> {

    constructor() {
        super(new PartyContext(), PartyState.Sober);
        // This is done to execute _onEnter on your first state.  Otherwise it will not execute.
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
```

Setup your states:
```typescript
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
```

Setup your context:
```typescript
export class PartyContext {
    public readonly alcohol: BeverageType[] = [Beverage.Beer, Beverage.Vodka];
    public readonly spiritsBeforeDrunk = 4;
    public readonly spiritsBeforeReallyDrunk = 5;
    public readonly spiritsBeforeSick = 6;

    public spiritsConsumed = 0;

    public reset(): void {
        this.spiritsConsumed = 0;
    }

    public isAlcohol(beverage: BeverageType): boolean {
        return this.alcohol.some(o => o === beverage);
    }

    public isDrunk(): boolean {
        return this.spiritsConsumed >= this.spiritsBeforeDrunk;
    }

    public isReallyDrunk(): boolean {
        return this.spiritsConsumed >= this.spiritsBeforeReallyDrunk;
    }

    public isSick(): boolean {
        return this.spiritsConsumed >= this.spiritsBeforeSick;
    }

    public report(): void {
        console.log('\t// Spirits Consumed:', this.spiritsConsumed);
    }
}
```

_**Sample Output:**_
```text
* Enter State: Sober
        // Spirits Consumed: 0
        say "That Soda was refreshing!"
        say "Vodka down the hatch!"
        say "Beer down the hatch!"
        say "That Soda was refreshing!"
        say "Vodka down the hatch!"
        say "That Soda was refreshing!"
        say "Beer down the hatch!"
* Enter State: Drunk
        // Spirits Consumed: 4
        say "Goodbye inhibitions!"
        say "Beer down the hatch!"
* Enter State: ReallyDrunk
        // Spirits Consumed: 5
        say "Hey Room, stop spinning!"
        say "That Soda was refreshing!"
        say "Beer down the hatch!"
* Enter State: Sick
        // Spirits Consumed: 6
        say "Dang! I spewed chunks!"
        say "Too tired to party. Time to sleep."
* Enter State: Sleeping
        // Spirits Consumed: 6
        ZzZzzZZZzzZzz...

Run Completed.
Spirits Consumed =  6

```
