import 'reflect-metadata';
import { Container, injectable } from 'inversify';

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
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements IMartialArt {
    public throw() {
        return "hit!";
    }
}

@injectable()
class Ninja implements IFighter {

    private _katana: Katana;
    private _shuriken: Shuriken;

    public constructor(katana: Katana, shuriken: Shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); };
    public sneak() { return this._shuriken.throw(); };

}

let container = new Container();

container.bind<IWeapon>(Symbol.for('IWeapon')).to(Katana);
container.bind<IMartialArt>(Symbol.for('IMartialArt')).to(Shuriken);
container.bind<IFighter>(Symbol.for('IFighter')).to(Ninja);