import {application} from "../application";

export const test = (name) => {
    return (targetClass, targetName, descriptor) => {
        console.log(`test(${name}) targetClass=`, targetClass);
        console.log(`test(${name}) targetName=`, targetName);
        console.log(`test(${name}) descriptor=`, descriptor);
        if (descriptor) return descriptor;
        return targetClass;
    }
};

@test()
export class HomePage {
    @test('name')
    name = 'World';

    @test()
    onClick(event) {

    }
}

application.component('homePage', {
    bindings: {state: '<'},
    template: `
<h3 class="name">Hello {{ $ctrl.name }}.</h3>  
    `,
    controller: HomePage
});

