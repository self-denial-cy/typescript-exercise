class Person {
  // 实例属性
  private _name: string;
  private _age: number;

  // 静态属性
  static readonly species: string = '人类';
  // 静态方法
  static say(person: Person, text: string): void {
    person.say(text)
  }

  // 实例方法
  say(text: string): void {
    console.log(text)
  }

  constructor(name: string, age: number) {
    this._name = name
    this._age = age
  }


  public get name() {
    return this._name
  }

  public set name(v) {
    this._name = v
  }

  public get age() {
    return this._age
  }

  public set age(v) {
    this._age = v
  }
}

interface AnimalInterface {
  name: string;
  age: number;
  run(): void;
}

abstract class Animal implements AnimalInterface {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  run(): void {
    console.log(`${this.name} is running`)
  }

  abstract introduce(): void;
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age)
    this.breed = breed
  }

  // 确保子类尝试覆盖的方法一定在父类中存在定义
  override run(): void {
    super.run()
  }

  introduce(): void {
    console.log('this is Dog')
  }
}

export { Person, Animal, Dog }
