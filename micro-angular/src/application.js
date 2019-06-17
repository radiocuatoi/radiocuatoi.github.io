import "angular";
import "angular-material";
import "angular-messages";
import "angular-animate";
import "angular-aria";

export function loadStyles(url) {
    let link = document.createElement("link");
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadStyles('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
loadStyles('https://fonts.googleapis.com/icon?family=Material+Icons');
loadStyles('https://ajax.googleapis.com/ajax/libs/angular_material/1.1.19/angular-material.min.css');

export const application = angular.module("Application", [
    "ngMaterial",
    "ngMessages"
]);
