import Service from "../src/injection/ServiceDecorator";
import {Injector} from "../src/injection/Injector";

@Service()
export class Foo {
}

@Service()
export class Bar {
}

@Service()
export class Foobar {
    constructor(public foo: Foo, public bar: Bar) {
    }
}

@Service()
export class Baz {
    constructor(public foobar: Foobar) {
    }
}

describe('Injector', () => {
    it('should create simple instances', () => {
        let foo = Injector.resolve<Foo>(Foo);
        expect(foo).toBeInstanceOf(Foo);
    });

    it('should create dependency injected instances', () => {
        let foobar = Injector.resolve<Foobar>(Foobar);
        expect(foobar.foo).toBeInstanceOf(Foo);
        expect(foobar.bar).toBeInstanceOf(Bar);
    });

    it('should create deep dependency injected instances', () => {
        let baz = Injector.resolve<Baz>(Baz);
        expect(baz.foobar).toBeInstanceOf(Foobar);
        expect(baz.foobar.foo).toBeInstanceOf(Foo);
        expect(baz.foobar.bar).toBeInstanceOf(Bar);
    });
});
