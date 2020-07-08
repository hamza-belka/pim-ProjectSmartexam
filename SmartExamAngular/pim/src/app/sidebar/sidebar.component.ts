import { Component, OnInit } from '@angular/core';
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESEtudiant: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
   
    
];
export const ROUTESEnseignant: RouteInfo[] = [
    { path: '/dashboard',     title: 'New Exam',         icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'My exams',             icon:'nc-diamond',    class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    

];
export const ROUTESadmin: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'User List',        icon:'nc-tile-56',    class: '' },

];
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        if(localStorage.getItem('role')=='admin'){
        this.menuItems = ROUTESadmin.filter(menuItem => menuItem);
        }else if(localStorage.getItem('role')=='enseignant'){

            this.menuItems = ROUTESEnseignant.filter(menuItem => menuItem);
        } else{

            this.menuItems = ROUTESEtudiant.filter(menuItem => menuItem);
        }   }
}
