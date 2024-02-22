"use strict";(self.webpackChunkprana=self.webpackChunkprana||[]).push([[761],{761:(re,S,d)=>{d.r(S),d.d(S,{ScheduleModule:()=>te});var h=d(6895),c=d(1390),l=d(4006),g=d(262),e=d(4650),_=d(4261),v=d(1670),m=d(9549),p=d(4144),C=d(4385),A=d(3238);function Z(t,i){if(1&t&&(e.TgZ(0,"mat-option",13),e._uU(1),e.qZA()),2&t){const o=i.$implicit;e.Q6J("value",o),e.xp6(1),e.hij(" ",o," ")}}function T(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Este campo es obligatorio"),e.qZA())}function y(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Este campo es obligatorio"),e.qZA())}function F(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Formato de tiempo invalido. Por favor ingrese un formato v\xe1lido (HH:mm). "),e.qZA())}function U(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Este campo es obligatorio"),e.qZA())}function D(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Invalid time format. Please enter a valid time (HH:mm). "),e.qZA())}let w=(()=>{class t{constructor(o,r,a,n){this.fb=o,this.dialogService=r,this.scheduleService=a,this.router=n,this.weekdayOptions=["Lunes","Martes","Mi\xe9rcoles","Jueves","Viernes","S\xe1bado","Domingo"],this.scheduleForm=this.fb.group({weekday:["",l.kI.required],start_hour:[null,[l.kI.required,this.timeValidator]],end_hour:[null,[l.kI.required,this.timeValidator]]})}timeValidator(o){return/^([01]\d|2[0-3]):([0-5]\d)$/.test(o.value)?null:{invalidTime:!0}}onSubmit(){if(this.scheduleForm.valid){const o={weekday:this.scheduleForm.value.weekday,start_hour:this.scheduleForm.value.start_hour,end_hour:this.scheduleForm.value.end_hour};this.dialogService.openConfirmDialog("Desea confirmar la creaci\xf3n del horario?").afterClosed().subscribe(a=>{a&&this.scheduleService.createAdminSchedule(o).pipe((0,g.K)(n=>{throw console.error("Error en la solicitud:",n),this.dialogService.showErrorDialog(n.error&&n.error.non_field_errors?"Error al crear el horario: "+n.error.non_field_errors[0]:"Ha ocurrido un error en la solicitud."),n})).subscribe(n=>{this.dialogService.showSuccessDialog("Horario creado exitosamente").afterClosed().subscribe(()=>{this.dialogService.openConfirmDialog("\xbfDesea crear otro horario?").afterClosed().subscribe(oe=>{oe?window.location.reload():this.router.navigate(["/Dashboard/schedule/admin/list"])})})})})}}onCancel(){this.router.navigate(["/Dashboard/schedule/admin/list"])}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(l.qu),e.Y36(_.x),e.Y36(v.u),e.Y36(c.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-schedule-admin-create"]],decls:29,vars:8,consts:[[1,"title","bg-info","text-center","text-bold","border","border-dark","rounded-top","mb-4"],[1,"card"],[1,"card-header","bg-info","text-dark","text-center"],[1,"card-body"],[1,"create-user-form",3,"formGroup","ngSubmit"],["appearance","outline"],["formControlName","weekday"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["matInput","","formControlName","start_hour"],["matInput","","formControlName","end_hour"],["type","submit",1,"btn","btn-primary",3,"disabled"],[1,"btn","btn-secondary",3,"click"],[3,"value"]],template:function(o,r){1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),e._uU(4,"Crear Horario"),e.qZA()(),e.TgZ(5,"div",3)(6,"form",4),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(7,"mat-form-field",5)(8,"mat-label"),e._uU(9,"D\xeda"),e.qZA(),e.TgZ(10,"mat-select",6),e.YNc(11,Z,2,2,"mat-option",7),e.qZA(),e.YNc(12,T,2,0,"mat-error",8),e.qZA(),e.TgZ(13,"mat-form-field",5)(14,"mat-label"),e._uU(15,"Hora de Inicio"),e.qZA(),e._UZ(16,"input",9),e.YNc(17,y,2,0,"mat-error",8),e.YNc(18,F,2,0,"mat-error",8),e.qZA(),e.TgZ(19,"mat-form-field",5)(20,"mat-label"),e._uU(21,"Hora de Finalizaci\xf3n"),e.qZA(),e._UZ(22,"input",10),e.YNc(23,U,2,0,"mat-error",8),e.YNc(24,D,2,0,"mat-error",8),e.qZA(),e.TgZ(25,"button",11),e._uU(26," Crear Horario "),e.qZA(),e.TgZ(27,"button",12),e.NdJ("click",function(){return r.onCancel()}),e._uU(28,"Cancelar"),e.qZA()()()()()),2&o&&(e.xp6(6),e.Q6J("formGroup",r.scheduleForm),e.xp6(5),e.Q6J("ngForOf",r.weekdayOptions),e.xp6(1),e.Q6J("ngIf",null==r.scheduleForm.get("weekday").errors?null:r.scheduleForm.get("weekday").errors.required),e.xp6(5),e.Q6J("ngIf",null==r.scheduleForm.get("start_hour").errors?null:r.scheduleForm.get("start_hour").errors.required),e.xp6(1),e.Q6J("ngIf",r.scheduleForm.get("start_hour").value&&(null==r.scheduleForm.get("start_hour").errors?null:r.scheduleForm.get("start_hour").errors.invalidTime)),e.xp6(5),e.Q6J("ngIf",null==r.scheduleForm.get("end_hour").errors?null:r.scheduleForm.get("end_hour").errors.required),e.xp6(1),e.Q6J("ngIf",r.scheduleForm.get("end_hour").value&&(null==r.scheduleForm.get("end_hour").errors?null:r.scheduleForm.get("end_hour").errors.invalidTime)),e.xp6(1),e.Q6J("disabled",!r.scheduleForm.valid))},dependencies:[h.sg,h.O5,m.KE,m.hX,m.TO,p.Nt,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,C.gD,A.ey],styles:["create-user-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}mat-form-field[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{width:100%;margin-top:10px}"]}),t})();var b=d(8739),f=d(6308),s=d(7155);function x(t,i){1&t&&(e.TgZ(0,"th",21),e._uU(1,"D\xeda"),e.qZA())}function q(t,i){if(1&t&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&t){const o=i.$implicit;e.xp6(1),e.Oqu(o.weekday)}}function N(t,i){1&t&&(e.TgZ(0,"th",21),e._uU(1," Horario de Inicio "),e.qZA())}function k(t,i){if(1&t&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&t){const o=i.$implicit;e.xp6(1),e.Oqu(o.start_hour)}}function J(t,i){1&t&&(e.TgZ(0,"th",21),e._uU(1," Horario de Finalizaci\xf3n "),e.qZA())}function Y(t,i){if(1&t&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&t){const o=i.$implicit;e.xp6(1),e.Oqu(o.end_hour)}}function H(t,i){1&t&&(e.TgZ(0,"th",23),e._uU(1,"Acciones"),e.qZA())}function E(t,i){if(1&t){const o=e.EpF();e.TgZ(0,"td",22)(1,"div",24)(2,"button",25),e.NdJ("click",function(){const n=e.CHM(o).$implicit,u=e.oxw();return e.KtG(u.onEdit(n))}),e.TgZ(3,"i",5),e._uU(4,"edit"),e.qZA()(),e.TgZ(5,"button",26),e.NdJ("click",function(){const n=e.CHM(o).$implicit,u=e.oxw();return e.KtG(u.onDelete(n.id))}),e.TgZ(6,"i",5),e._uU(7,"delete"),e.qZA()()()()}}function I(t,i){1&t&&e._UZ(0,"tr",27)}function M(t,i){1&t&&e._UZ(0,"tr",28)}const O=function(){return[10,25,50,100]};function L(t,i){if(1&t&&(e.TgZ(0,"mat-option",13),e._uU(1),e.qZA()),2&t){const o=i.$implicit;e.Q6J("value",o),e.xp6(1),e.hij(" ",o," ")}}function P(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Este campo es obligatorio"),e.qZA())}function z(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Este campo es obligatorio"),e.qZA())}function V(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Formato de tiempo invalido. Por favor ingrese un formato v\xe1lido (HH:mm). "),e.qZA())}function G(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Este campo es obligatorio"),e.qZA())}function R(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Invalid time format. Please enter a valid time (HH:mm). "),e.qZA())}const B=[{path:"admin",children:[{path:"create",component:w},{path:"list",component:(()=>{class t{constructor(o,r,a){this.scheduleService=o,this.router=r,this.dialogService=a,this.displayedColumns=["weekday","start_hour","end_hour","actions"]}ngOnInit(){this.setDataTable()}setDataTable(){this.scheduleService.getSchedules().subscribe(o=>{this.dataSource=new s.by(o),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}applyFilter(o){this.dataSource.filter=o.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}onEdit(o){this.router.navigate(["Dashboard/schedule/admin/update"],{state:{schedule:o}})}onDelete(o){this.dialogService.openConfirmDialog("\xbfConfirma la eliminaci\xf3n de esta sala?").afterClosed().subscribe(a=>{a&&this.scheduleService.deleteSchedule(o).pipe((0,g.K)(n=>{throw this.dialogService.showErrorDialog(n.error&&n.error.detail?"Error al eliminar el horario: "+n.error.detail:"Ha ocurrido un error en la solicitud."),n})).subscribe(n=>{this.setDataTable(),this.dialogService.showSuccessDialog("Horario eliminado con \xe9xito")})})}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(v.u),e.Y36(c.F0),e.Y36(_.x))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-schedule-admin-list"]],viewQuery:function(o,r){if(1&o&&(e.Gf(b.NW,5),e.Gf(f.YE,5)),2&o){let a;e.iGM(a=e.CRH())&&(r.paginator=a.first),e.iGM(a=e.CRH())&&(r.sort=a.first)}},decls:31,vars:5,consts:[[1,"title","bg-info","text-center","text-bold","border","border-dark","rounded-top","mb-4"],[1,""],[1,"container-fluid"],[1,"d-flex","justify-content-start","mb-3"],["routerLink","/Dashboard/schedule/admin/create",1,"btn","btn-success"],[1,"material-symbols-outlined"],[1,"example-form-field"],["matInput","",3,"keyup"],["input",""],[1,"table-responsive"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","weekday"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","start_hour"],["matColumnDef","end_hour"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],[2,"display","flex"],["aria-label","Editar Horario",1,"btn","btn-primary",3,"click"],["aria-label","Eliminar Horario",1,"btn","btn-danger","ms-3",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,r){1&o&&(e.TgZ(0,"div")(1,"div",0)(2,"h1",1),e._uU(3,"Horarios Talleres - Administrador"),e.qZA()(),e.TgZ(4,"div",2)(5,"div",3)(6,"button",4),e._UZ(7,"i",5),e._uU(8,"Nuevo Horario "),e.qZA()(),e.TgZ(9,"mat-form-field",6)(10,"mat-label"),e._uU(11,"Filtro M\xfaltiple"),e.qZA(),e.TgZ(12,"input",7,8),e.NdJ("keyup",function(n){return r.applyFilter(n)}),e.qZA()(),e.TgZ(14,"div",9)(15,"table",10),e.ynx(16,11),e.YNc(17,x,2,0,"th",12),e.YNc(18,q,2,1,"td",13),e.BQk(),e.ynx(19,14),e.YNc(20,N,2,0,"th",12),e.YNc(21,k,2,1,"td",13),e.BQk(),e.ynx(22,15),e.YNc(23,J,2,0,"th",12),e.YNc(24,Y,2,1,"td",13),e.BQk(),e.ynx(25,16),e.YNc(26,H,2,0,"th",17),e.YNc(27,E,8,0,"td",13),e.BQk(),e.YNc(28,I,1,0,"tr",18),e.YNc(29,M,1,0,"tr",19),e.qZA()(),e._UZ(30,"mat-paginator",20),e.qZA()()),2&o&&(e.xp6(15),e.Q6J("dataSource",r.dataSource),e.xp6(13),e.Q6J("matHeaderRowDef",r.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",r.displayedColumns),e.xp6(1),e.Q6J("pageSizeOptions",e.DdM(4,O)))},dependencies:[c.rH,s.BZ,s.fO,s.as,s.w1,s.Dz,s.nj,s.ge,s.ev,s.XQ,s.Gk,b.NW,f.YE,f.nU,m.KE,m.hX,p.Nt],styles:[".example-form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.mat-elevation-z8[_ngcontent-%COMP%]{background-color:#f5f5f5}button[_ngcontent-%COMP%]{min-height:20px;text-align:middle;vertical-align:middle}.material-icons[_ngcontent-%COMP%]{margin-right:10px;vertical-align:middle}"]}),t})()},{path:"update",component:(()=>{class t{constructor(o,r,a,n){this.fb=o,this.dialogService=r,this.scheduleService=a,this.router=n,this.weekdayOptions=["Lunes","Martes","Mi\xe9rcoles","Jueves","Viernes","S\xe1bado","Domingo"],this.scheduleForm=this.fb.group({weekday:["",l.kI.required],start_hour:[null,[l.kI.required,this.timeValidator]],end_hour:[null,[l.kI.required,this.timeValidator]]})}ngOnInit(){this.initForm(history.state.schedule)}initForm(o){this.scheduleForm.patchValue({weekday:o.weekday,start_hour:o.start_hour,end_hour:o.end_hour})}timeValidator(o){return/^([01]\d|2[0-3]):([0-5]\d)$/.test(o.value)?null:{invalidTime:!0}}onSubmit(){if(this.scheduleForm.valid){const o={weekday:this.scheduleForm.value.weekday,start_hour:this.scheduleForm.value.start_hour,end_hour:this.scheduleForm.value.end_hour};this.dialogService.openConfirmDialog("Tenga en cuenta que al actualizar un horario, los cambios se reflejar\xe1n en todos los talleres donde se utilice dicha horario <br> \xbfConfirma la actualizaci\xf3n?").afterClosed().subscribe(a=>{a&&this.scheduleService.updateAdminSchedule(history.state.schedule.id,o).pipe((0,g.K)(n=>{throw console.error("Error en la solicitud:",n),this.dialogService.showErrorDialog(n.error&&n.error.non_field_errors?"Error al actualizar el horario: "+n.error.non_field_errors[0]:"Ha ocurrido un error en la solicitud."),n})).subscribe(n=>{this.dialogService.showSuccessDialog("Horario actualizado exitosamente").afterClosed().subscribe(()=>{this.router.navigate(["/Dashboard/schedule/admin/list"])})})})}}onCancel(){this.router.navigate(["/Dashboard/schedule/admin/list"])}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(l.qu),e.Y36(_.x),e.Y36(v.u),e.Y36(c.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-schedule-admin-update"]],decls:29,vars:8,consts:[[1,"title","bg-info","text-center","text-bold","border","border-dark","rounded-top","mb-4"],[1,"card"],[1,"card-header","bg-info","text-dark","text-center"],[1,"card-body"],[1,"create-user-form",3,"formGroup","ngSubmit"],["appearance","outline"],["formControlName","weekday"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["matInput","","formControlName","start_hour"],["matInput","","formControlName","end_hour"],["type","submit",1,"btn","btn-primary",3,"disabled"],[1,"btn","btn-secondary",3,"click"],[3,"value"]],template:function(o,r){1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),e._uU(4,"Editar horario"),e.qZA()(),e.TgZ(5,"div",3)(6,"form",4),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(7,"mat-form-field",5)(8,"mat-label"),e._uU(9,"D\xeda"),e.qZA(),e.TgZ(10,"mat-select",6),e.YNc(11,L,2,2,"mat-option",7),e.qZA(),e.YNc(12,P,2,0,"mat-error",8),e.qZA(),e.TgZ(13,"mat-form-field",5)(14,"mat-label"),e._uU(15,"Hora de Inicio"),e.qZA(),e._UZ(16,"input",9),e.YNc(17,z,2,0,"mat-error",8),e.YNc(18,V,2,0,"mat-error",8),e.qZA(),e.TgZ(19,"mat-form-field",5)(20,"mat-label"),e._uU(21,"Hora de Finalizaci\xf3n"),e.qZA(),e._UZ(22,"input",10),e.YNc(23,G,2,0,"mat-error",8),e.YNc(24,R,2,0,"mat-error",8),e.qZA(),e.TgZ(25,"button",11),e._uU(26," Guardar "),e.qZA(),e.TgZ(27,"button",12),e.NdJ("click",function(){return r.onCancel()}),e._uU(28,"Cancelar"),e.qZA()()()()()),2&o&&(e.xp6(6),e.Q6J("formGroup",r.scheduleForm),e.xp6(5),e.Q6J("ngForOf",r.weekdayOptions),e.xp6(1),e.Q6J("ngIf",null==r.scheduleForm.get("weekday").errors?null:r.scheduleForm.get("weekday").errors.required),e.xp6(5),e.Q6J("ngIf",null==r.scheduleForm.get("start_hour").errors?null:r.scheduleForm.get("start_hour").errors.required),e.xp6(1),e.Q6J("ngIf",r.scheduleForm.get("start_hour").value&&(null==r.scheduleForm.get("start_hour").errors?null:r.scheduleForm.get("start_hour").errors.invalidTime)),e.xp6(5),e.Q6J("ngIf",null==r.scheduleForm.get("end_hour").errors?null:r.scheduleForm.get("end_hour").errors.required),e.xp6(1),e.Q6J("ngIf",r.scheduleForm.get("end_hour").value&&(null==r.scheduleForm.get("end_hour").errors?null:r.scheduleForm.get("end_hour").errors.invalidTime)),e.xp6(1),e.Q6J("disabled",!r.scheduleForm.valid))},dependencies:[h.sg,h.O5,m.KE,m.hX,m.TO,p.Nt,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,C.gD,A.ey],styles:["create-user-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}mat-form-field[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{width:100%;margin-top:10px}"]}),t})()}]},{path:"doctor",children:[]},{path:"patient",children:[]}];let j=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[c.Bz.forChild(B),c.Bz]}),t})();var X=d(3805),$=d(4859),K=d(3546),W=d(6709),ee=d(7392);let te=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[h.ez,j,s.p0,b.TU,f.JX,m.lN,p.c,$.ot,W.p9,K.QW,l.u5,l.UX,ee.Ps,C.LD,X.Bb]}),t})()}}]);