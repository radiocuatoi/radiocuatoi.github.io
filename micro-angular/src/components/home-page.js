import {application} from "../application";
import {reducer, redux, action} from "../store";

@redux()
export class HomePage {
    @redux('name')
    name = 'World';

    @action()
    clickMenu(event) {
    }

    @reducer()
    onMenuClicked(event) {
    }
}

application.component('homePage', {
    bindings: {state: '<'},
    template: `
<md-toolbar class="app-toolbar md-hue-2">
    <div class="md-toolbar-tools">
        <md-button class="md-icon-button" aria-label="Settings">
            <md-icon md-font-icon="material-icons">menu</md-icon>
        </md-button>

        <h2 flex md-truncate>{{ $ctrl.name }} Menu</h2>

        <md-button class="md-icon-button" aria-label="Settings" ng-disabled="true">
            <md-icon md-font-icon="material-icons" >settings</md-icon>
        </md-button> 
        
         <md-button class="md-icon-button" aria-label="Events"  ng-disabled="true">
            <md-icon md-font-icon="material-icons" >notifications</md-icon>
        </md-button> 

        <md-button class="md-icon-button" aria-label="Sign Out">
            <md-icon md-font-icon="material-icons">exit_to_app</md-icon>
        </md-button>
    </div>
</md-toolbar> 
<h3 class="name" ng-click="$ctrl.onClick()">Hello {{ $ctrl.name }}.</h3>  
    `,
    controller: HomePage
});

