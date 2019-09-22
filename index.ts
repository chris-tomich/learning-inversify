import 'reflect-metadata';
import { Container, injectable, inject } from 'inversify';

interface IWeapon {
    hit(): string;
}

interface IMartialArt {
    throw(): string;
}

interface IFighter {
    fight(): string;
    sneak(): string;
}

@injectable()
class Katana implements IWeapon {
    private num: number;

    constructor() {
        this.num = Math.random();
    }

    public hit() {
        return "cut! " + this.num.toString();
    }
}

@injectable()
class Shuriken implements IMartialArt {
    private num: number;

    constructor() {
        this.num = Math.random();
    }

    public throw() {
        return "hit! " + this.num.toString();
    }
}

@injectable()
class Ninja implements IFighter {

    private _katana: IWeapon;
    private _shuriken: IMartialArt;

    public constructor(
        @inject(Symbol.for('IWeapon')) katana: IWeapon,
        @inject(Symbol.for('IMartialArt')) shuriken: IMartialArt) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); };
    public sneak() { return this._shuriken.throw(); };

}

let container = new Container();

container.bind<IWeapon>(Symbol.for('IWeapon')).to(Katana).inRequestScope();
container.bind<IMartialArt>(Symbol.for('IMartialArt')).to(Shuriken).inRequestScope();
container.bind<IFighter>(Symbol.for('IFighter')).to(Ninja).inRequestScope();

let fighter = container.get<IFighter>(Symbol.for('IFighter'));
console.log(fighter.fight());
console.log(fighter.sneak());

let weapon = container.get<IWeapon>(Symbol.for('IWeapon'));
console.log(weapon.hit());

let martialArt = container.get<IMartialArt>(Symbol.for('IMartialArt'));
console.log(martialArt.throw());

fighter = container.get<IFighter>(Symbol.for('IFighter'));
console.log(fighter.fight());
console.log(fighter.sneak());

weapon = container.get<IWeapon>(Symbol.for('IWeapon'));
console.log(weapon.hit());

martialArt = container.get<IMartialArt>(Symbol.for('IMartialArt'));
console.log(martialArt.throw());