"use strict";(self.webpackChunkprana=self.webpackChunkprana||[]).push([[282],{5282:(ao,C,l)=>{l.r(C),l.d(C,{RoomModule:()=>eo});var f=l(6895),d=l(1390),m=l(4006),h=l(262),o=l(4650),b=l(4261),v=l(4468),u=l(9549),p=l(4144);function A(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," Este campo es obligatorio"),o.qZA())}function Z(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo es obligatorio"),o.qZA())}function F(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo debe ser un n\xfamero entero "),o.qZA())}function T(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"El n\xfamero debe ser positivo "),o.qZA())}function y(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo es obligatorio"),o.qZA())}function R(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo debe ser un n\xfamero (Entero/Real) "),o.qZA())}function U(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"El n\xfamero debe ser positivo "),o.qZA())}let N=(()=>{class t{constructor(e,r,n,i){this.fb=e,this.dialogService=r,this.roomService=n,this.router=i,this.roomForm=this.fb.group({name:["",m.kI.required],capacity:[null,[m.kI.required,this.integerValidator,this.positiveIntegerValidator]],cost:[null,[m.kI.required,this.floatValidator,this.positiveFloatValidator]]})}integerValidator(e){return Number.isInteger(Number(e.value))?null:{notInteger:!0}}floatValidator(e){return Number(e.value)===parseFloat(e.value)?null:{notFloat:!0}}positiveIntegerValidator(e){const r=Number.isInteger(Number(e.value)),n=Number(e.value)>0;return r&&n?null:{notPositiveInteger:!0}}positiveFloatValidator(e){const r=Number(e.value)===parseFloat(e.value),n=Number(e.value)>0;return r&&n?null:{notPositiveFloat:!0}}onSubmit(){if(this.roomForm.valid){const e={name:this.roomForm.value.name,capacity:this.roomForm.value.capacity,cost:this.roomForm.value.cost};this.dialogService.openConfirmDialog("Desea confirmar la creaci\xf3n de la sala?").afterClosed().subscribe(n=>{n&&this.roomService.createAdminRoom(e).pipe((0,h.K)(i=>{throw console.error("Error en la solicitud:",i),this.dialogService.showErrorDialog(i.error&&i.error.non_field_errors?"Error al crear la sala: "+i.error.non_field_errors[0]:"Ha ocurrido un error en la solicitud."),i})).subscribe(i=>{this.dialogService.showSuccessDialog("Sala creada exitosamente").afterClosed().subscribe(()=>{this.dialogService.openConfirmDialog("\xbfDesea crear otra sala?").afterClosed().subscribe(ro=>{ro?window.location.reload():this.router.navigate(["/Dashboard/room/admin/list"])})})})})}}onCancel(){this.router.navigate(["/Dashboard/room/admin/list"])}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(m.qu),o.Y36(b.x),o.Y36(v.X),o.Y36(d.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-room-admin-create"]],decls:30,vars:9,consts:[[1,"title","bg-info","text-center","text-bold","border","border-dark","rounded-top","mb-4"],[1,"card"],[1,"card-header","bg-info","text-dark","text-center"],[1,"card-body"],[1,"create-user-form",3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","formControlName","name"],[4,"ngIf"],["matInput","","formControlName","capacity"],["matInput","","formControlName","cost"],["type","submit",1,"btn","btn-primary",3,"disabled"],[1,"btn","btn-secondary",3,"click"]],template:function(e,r){1&e&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),o._uU(4,"Crear Sala"),o.qZA()(),o.TgZ(5,"div",3)(6,"form",4),o.NdJ("ngSubmit",function(){return r.onSubmit()}),o.TgZ(7,"mat-form-field",5)(8,"mat-label"),o._uU(9,"Nombre"),o.qZA(),o._UZ(10,"input",6),o.YNc(11,A,2,0,"mat-error",7),o.qZA(),o.TgZ(12,"mat-form-field",5)(13,"mat-label"),o._uU(14,"Capacidad"),o.qZA(),o._UZ(15,"input",8),o.YNc(16,Z,2,0,"mat-error",7),o.YNc(17,F,2,0,"mat-error",7),o.YNc(18,T,2,0,"mat-error",7),o.qZA(),o.TgZ(19,"mat-form-field",5)(20,"mat-label"),o._uU(21,"Costo"),o.qZA(),o._UZ(22,"input",9),o.YNc(23,y,2,0,"mat-error",7),o.YNc(24,R,2,0,"mat-error",7),o.YNc(25,U,2,0,"mat-error",7),o.qZA(),o.TgZ(26,"button",10),o._uU(27," Crear Sala "),o.qZA(),o.TgZ(28,"button",11),o.NdJ("click",function(){return r.onCancel()}),o._uU(29,"Cancelar"),o.qZA()()()()()),2&e&&(o.xp6(6),o.Q6J("formGroup",r.roomForm),o.xp6(5),o.Q6J("ngIf",null==r.roomForm.get("name").errors?null:r.roomForm.get("name").errors.required),o.xp6(5),o.Q6J("ngIf",null==r.roomForm.get("capacity").errors?null:r.roomForm.get("capacity").errors.required),o.xp6(1),o.Q6J("ngIf",null==r.roomForm.get("capacity").errors?null:r.roomForm.get("capacity").errors.notInteger),o.xp6(1),o.Q6J("ngIf",null==r.roomForm.get("capacity").errors?null:r.roomForm.get("capacity").errors.notPositiveInteger),o.xp6(5),o.Q6J("ngIf",null==r.roomForm.get("cost").errors?null:r.roomForm.get("cost").errors.required),o.xp6(1),o.Q6J("ngIf",r.roomForm.get("cost").value&&(null==r.roomForm.get("cost").errors?null:r.roomForm.get("cost").errors.notFloat)),o.xp6(1),o.Q6J("ngIf",r.roomForm.get("cost").value&&(null==r.roomForm.get("cost").errors?null:r.roomForm.get("cost").errors.notPositiveFloat)),o.xp6(1),o.Q6J("disabled",!r.roomForm.valid))},dependencies:[f.O5,u.KE,u.hX,u.TO,p.Nt,m._Y,m.Fj,m.JJ,m.JL,m.sg,m.u],styles:["create-user-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}mat-form-field[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{width:100%;margin-top:10px}"]}),t})();var _=l(8739),g=l(6308),s=l(7155);function S(t,a){1&t&&(o.TgZ(0,"th",21),o._uU(1,"Nombre"),o.qZA())}function I(t,a){if(1&t&&(o.TgZ(0,"td",22),o._uU(1),o.qZA()),2&t){const e=a.$implicit;o.xp6(1),o.Oqu(e.name)}}function x(t,a){1&t&&(o.TgZ(0,"th",21),o._uU(1,"Capacidad"),o.qZA())}function D(t,a){if(1&t&&(o.TgZ(0,"td",22),o._uU(1),o.qZA()),2&t){const e=a.$implicit;o.xp6(1),o.Oqu(e.capacity)}}function q(t,a){1&t&&(o.TgZ(0,"th",21),o._uU(1,"Costo"),o.qZA())}function E(t,a){if(1&t&&(o.TgZ(0,"td",22),o._uU(1),o.qZA()),2&t){const e=a.$implicit;o.xp6(1),o.Oqu(e.cost)}}function Y(t,a){1&t&&(o.TgZ(0,"th",23),o._uU(1,"Acciones"),o.qZA())}function J(t,a){if(1&t){const e=o.EpF();o.TgZ(0,"td",22)(1,"div",24)(2,"button",25),o.NdJ("click",function(){const i=o.CHM(e).$implicit,c=o.oxw();return o.KtG(c.onEdit(i))}),o.TgZ(3,"i",5),o._uU(4,"edit"),o.qZA()(),o.TgZ(5,"button",26),o.NdJ("click",function(){const i=o.CHM(e).$implicit,c=o.oxw();return o.KtG(c.onDelete(i.id))}),o.TgZ(6,"i",5),o._uU(7,"delete"),o.qZA()()()()}}function Q(t,a){1&t&&o._UZ(0,"tr",27)}function w(t,a){1&t&&o._UZ(0,"tr",28)}const M=function(){return[10,25,50,100]};function P(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," Este campo es obligatorio"),o.qZA())}function O(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo es obligatorio"),o.qZA())}function k(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo debe ser un n\xfamero entero "),o.qZA())}function V(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"El n\xfamero debe ser positivo "),o.qZA())}function G(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo es obligatorio"),o.qZA())}function H(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"Este campo debe ser un n\xfamero (Entero/Real) "),o.qZA())}function X(t,a){1&t&&(o.TgZ(0,"mat-error"),o._uU(1,"El n\xfamero debe ser positivo "),o.qZA())}const B=[{path:"admin",children:[{path:"create",component:N},{path:"list",component:(()=>{class t{constructor(e,r,n){this.roomService=e,this.router=r,this.dialogService=n,this.displayedColumns=["name","capacity","cost","actions"]}ngOnInit(){this.setDataTable()}setDataTable(){this.roomService.getRooms().subscribe(e=>{this.dataSource=new s.by(e),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}applyFilter(e){this.dataSource.filter=e.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}onEdit(e){this.router.navigate(["Dashboard/room/admin/update"],{state:{room:e}})}onDelete(e){this.dialogService.openConfirmDialog("\xbfConfirma la eliminaci\xf3n de esta sala?").afterClosed().subscribe(n=>{n&&this.roomService.deleteRoom(e).pipe((0,h.K)(i=>{throw this.dialogService.showErrorDialog(i.error&&i.error.detail?"Error al eliminar la sala: "+i.error.detail:"Ha ocurrido un error en la solicitud."),i})).subscribe(i=>{this.setDataTable(),this.dialogService.showSuccessDialog("Sala eliminada con \xe9xito")})})}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(v.X),o.Y36(d.F0),o.Y36(b.x))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-room-admin-list"]],viewQuery:function(e,r){if(1&e&&(o.Gf(_.NW,5),o.Gf(g.YE,5)),2&e){let n;o.iGM(n=o.CRH())&&(r.paginator=n.first),o.iGM(n=o.CRH())&&(r.sort=n.first)}},decls:31,vars:5,consts:[[1,"title","bg-info","text-center","text-bold","border","border-dark","rounded-top","mb-4"],[1,""],[1,"container-fluid"],[1,"d-flex","justify-content-start","mb-3"],["routerLink","/Dashboard/room/admin/create",1,"btn","btn-success"],[1,"material-symbols-outlined"],[1,"example-form-field"],["matInput","",3,"keyup"],["input",""],[1,"table-responsive"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","capacity"],["matColumnDef","cost"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],[2,"display","flex"],["aria-label","Editar Sala",1,"btn","btn-primary",3,"click"],["aria-label","Eliminar Sala",1,"btn","btn-danger","ms-3",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(e,r){1&e&&(o.TgZ(0,"div")(1,"div",0)(2,"h1",1),o._uU(3,"Salas - Administrador"),o.qZA()(),o.TgZ(4,"div",2)(5,"div",3)(6,"button",4),o._UZ(7,"i",5),o._uU(8,"Nueva Sala "),o.qZA()(),o.TgZ(9,"mat-form-field",6)(10,"mat-label"),o._uU(11,"Filtro M\xfaltiple"),o.qZA(),o.TgZ(12,"input",7,8),o.NdJ("keyup",function(i){return r.applyFilter(i)}),o.qZA()(),o.TgZ(14,"div",9)(15,"table",10),o.ynx(16,11),o.YNc(17,S,2,0,"th",12),o.YNc(18,I,2,1,"td",13),o.BQk(),o.ynx(19,14),o.YNc(20,x,2,0,"th",12),o.YNc(21,D,2,1,"td",13),o.BQk(),o.ynx(22,15),o.YNc(23,q,2,0,"th",12),o.YNc(24,E,2,1,"td",13),o.BQk(),o.ynx(25,16),o.YNc(26,Y,2,0,"th",17),o.YNc(27,J,8,0,"td",13),o.BQk(),o.YNc(28,Q,1,0,"tr",18),o.YNc(29,w,1,0,"tr",19),o.qZA()(),o._UZ(30,"mat-paginator",20),o.qZA()()),2&e&&(o.xp6(15),o.Q6J("dataSource",r.dataSource),o.xp6(13),o.Q6J("matHeaderRowDef",r.displayedColumns),o.xp6(1),o.Q6J("matRowDefColumns",r.displayedColumns),o.xp6(1),o.Q6J("pageSizeOptions",o.DdM(4,M)))},dependencies:[d.rH,s.BZ,s.fO,s.as,s.w1,s.Dz,s.nj,s.ge,s.ev,s.XQ,s.Gk,_.NW,g.YE,g.nU,u.KE,u.hX,p.Nt],styles:[".example-form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.mat-elevation-z8[_ngcontent-%COMP%]{background-color:#f5f5f5}button[_ngcontent-%COMP%]{min-height:20px;text-align:middle;vertical-align:middle}.material-icons[_ngcontent-%COMP%]{margin-right:10px;vertical-align:middle}"]}),t})()},{path:"update",component:(()=>{class t{constructor(e,r,n,i){this.fb=e,this.dialogService=r,this.roomService=n,this.router=i,this.roomForm=this.fb.group({name:["",m.kI.required],capacity:[null,[m.kI.required,this.integerValidator,this.positiveIntegerValidator]],cost:[null,[m.kI.required,this.floatValidator,this.positiveFloatValidator]]})}ngOnInit(){this.initForm(history.state.room)}initForm(e){this.roomForm.patchValue({name:e.name,capacity:e.capacity,cost:e.cost})}integerValidator(e){return Number.isInteger(Number(e.value))?null:{notInteger:!0}}floatValidator(e){return Number(e.value)===parseFloat(e.value)?null:{notFloat:!0}}positiveIntegerValidator(e){const r=Number.isInteger(Number(e.value)),n=Number(e.value)>0;return r&&n?null:{notPositiveInteger:!0}}positiveFloatValidator(e){const r=Number(e.value)===parseFloat(e.value),n=Number(e.value)>0;return r&&n?null:{notPositiveFloat:!0}}onSubmit(){if(this.roomForm.valid){const e={name:this.roomForm.value.name,capacity:this.roomForm.value.capacity,cost:this.roomForm.value.cost};this.dialogService.openConfirmDialog("Tenga en cuenta que al actualizar una sala, los cambios se reflejar\xe1n en todos los talleres donde se utilice dicha sala <br> \xbfConfirma la actualizaci\xf3n de la sala?").afterClosed().subscribe(n=>{n&&this.roomService.updateAdminRoom(history.state.room.id,e).pipe((0,h.K)(i=>{throw console.error("Error en la solicitud:",i),this.dialogService.showErrorDialog(i.error&&i.error.non_field_errors?"Error al crear la sala: "+i.error.non_field_errors[0]:"Ha ocurrido un error en la solicitud."),i})).subscribe(i=>{this.dialogService.showSuccessDialog("Sala actualizada exitosamente").afterClosed().subscribe(()=>{this.router.navigate(["/Dashboard/room/admin/list"])})})})}}onCancel(){this.router.navigate(["/Dashboard/room/admin/list"])}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(m.qu),o.Y36(b.x),o.Y36(v.X),o.Y36(d.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-room-admin-update"]],decls:30,vars:10,consts:[[1,"title","bg-info","text-center","text-bold","border","border-dark","rounded-top","mb-4"],[1,"card"],[1,"card-header","bg-info","text-dark","text-center"],[1,"card-body"],[1,"create-user-form",3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","formControlName","name"],[4,"ngIf"],["matInput","","formControlName","capacity"],["matInput","","formControlName","cost"],["type","submit",1,"btn","btn-primary",3,"disabled"],[1,"btn","btn-secondary",3,"click"]],template:function(e,r){if(1&e&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),o._uU(4),o.qZA()(),o.TgZ(5,"div",3)(6,"form",4),o.NdJ("ngSubmit",function(){return r.onSubmit()}),o.TgZ(7,"mat-form-field",5)(8,"mat-label"),o._uU(9,"Nombre"),o.qZA(),o._UZ(10,"input",6),o.YNc(11,P,2,0,"mat-error",7),o.qZA(),o.TgZ(12,"mat-form-field",5)(13,"mat-label"),o._uU(14,"Capacidad"),o.qZA(),o._UZ(15,"input",8),o.YNc(16,O,2,0,"mat-error",7),o.YNc(17,k,2,0,"mat-error",7),o.YNc(18,V,2,0,"mat-error",7),o.qZA(),o.TgZ(19,"mat-form-field",5)(20,"mat-label"),o._uU(21,"Costo"),o.qZA(),o._UZ(22,"input",9),o.YNc(23,G,2,0,"mat-error",7),o.YNc(24,H,2,0,"mat-error",7),o.YNc(25,X,2,0,"mat-error",7),o.qZA(),o.TgZ(26,"button",10),o._uU(27," Guardar "),o.qZA(),o.TgZ(28,"button",11),o.NdJ("click",function(){return r.onCancel()}),o._uU(29,"Cancelar"),o.qZA()()()()()),2&e){let n;o.xp6(4),o.hij("Editar Sala: ",null==(n=r.roomForm.get("name"))?null:n.value,""),o.xp6(2),o.Q6J("formGroup",r.roomForm),o.xp6(5),o.Q6J("ngIf",null==r.roomForm.get("name").errors?null:r.roomForm.get("name").errors.required),o.xp6(5),o.Q6J("ngIf",null==r.roomForm.get("capacity").errors?null:r.roomForm.get("capacity").errors.required),o.xp6(1),o.Q6J("ngIf",null==r.roomForm.get("capacity").errors?null:r.roomForm.get("capacity").errors.notInteger),o.xp6(1),o.Q6J("ngIf",null==r.roomForm.get("capacity").errors?null:r.roomForm.get("capacity").errors.notPositiveInteger),o.xp6(5),o.Q6J("ngIf",null==r.roomForm.get("cost").errors?null:r.roomForm.get("cost").errors.required),o.xp6(1),o.Q6J("ngIf",r.roomForm.get("cost").value&&(null==r.roomForm.get("cost").errors?null:r.roomForm.get("cost").errors.notFloat)),o.xp6(1),o.Q6J("ngIf",r.roomForm.get("cost").value&&(null==r.roomForm.get("cost").errors?null:r.roomForm.get("cost").errors.notPositiveFloat)),o.xp6(1),o.Q6J("disabled",!r.roomForm.valid)}},dependencies:[f.O5,u.KE,u.hX,u.TO,p.Nt,m._Y,m.Fj,m.JJ,m.JL,m.sg,m.u],styles:["create-user-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}mat-form-field[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{width:100%;margin-top:10px}"]}),t})()}]},{path:"doctor",children:[]},{path:"patient",children:[]}];let z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[d.Bz.forChild(B),d.Bz]}),t})();var j=l(4859),K=l(6709),$=l(3546),W=l(7392),oo=l(4385),to=l(3805);let eo=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[f.ez,z,s.p0,_.TU,g.JX,u.lN,p.c,j.ot,K.p9,$.QW,m.u5,m.UX,W.Ps,oo.LD,to.Bb]}),t})()}}]);