// interface use extend keyword but types can not

interface Person {
    name: string;
}

interface Man {
    age: number;
}

interface Human extends Man, Person {
    // Here, Human inherits properties from both Man and Person interfaces
}

// we can use by type in below 
type Human2 = Person & Man;