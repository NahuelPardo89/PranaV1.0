import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeminarInscriptionAdminGetDetailInterface } from 'src/app/Models/seminar-inscription/admin/seminarInscriptionAdminGetDetailInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class SeminarInscriptionService {
  private apiUrl = 'http://127.0.0.1:8000/seminar/admin/seminar-inscriptions/';
  private seminarParam = '?seminar=';

  constructor(private http: HttpClient) {}

  /**
   * Gets the details of seminar inscriptions by its ID.
   *
   * @param {number} seminar_id - The ID of the seminar.
   * @returns {Observable<SeminarInscriptionAdminGetDetailInterface[]>} - An observable that emits an array of seminar inscription details.
   * @author Alvaro Olguin Armendariz
   */
  getSeminarInscriptionsDetailById(
    seminar_id: number
  ): Observable<SeminarInscriptionAdminGetDetailInterface[]> {
    const url = this.apiUrl + this.seminarParam + seminar_id + '&display=true';
    return this.http.get<SeminarInscriptionAdminGetDetailInterface[]>(url);
  }

  /**
   * Deletes an inscription by its ID.
   *
   * @param {number} inscription_id - The ID of the inscription.
   * @returns {Observable<void>} - An observable that completes when the inscription has been deleted.
   * @author Alvaro Olguin Armendariz
   */
  deleteInscription(inscription_id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + inscription_id + '/');
  }
}
