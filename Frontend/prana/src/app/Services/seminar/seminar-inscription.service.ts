import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SeminarInscriptionAdminGetDetailInterface,
  SeminarInscriptionAdminGetFlatInterface,
  SeminarInscriptionAdminPostInterface,
} from 'src/app/Models/seminar-inscription/admin/seminarInscriptionAdminGetDetailInterface.interface';

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
   * Fetches a flat list of seminar inscriptions by seminar ID.
   *
   * @param {number} seminar_id - The ID of the seminar.
   * @returns {Observable<SeminarInscriptionAdminGetFlatInterface[]>} - An Observable that will emit an array of seminar inscriptions.
   */
  getSeminarInscriptionsFlatById(
    seminar_id: number
  ): Observable<SeminarInscriptionAdminGetFlatInterface[]> {
    const url = this.apiUrl + this.seminarParam + seminar_id;
    return this.http.get<SeminarInscriptionAdminGetFlatInterface[]>(url);
  }

  /**
   * Creates a seminar inscription.
   *
   * @param {SeminarInscriptionAdminPostInterface} body - The data for the seminar inscription.
   * @returns {Observable<SeminarInscriptionAdminGetDetailInterface>} An Observable that emits the details of the created seminar inscription.
   */
  createSeminarInscription(
    body: SeminarInscriptionAdminPostInterface
  ): Observable<SeminarInscriptionAdminGetDetailInterface> {
    return this.http.post<SeminarInscriptionAdminGetDetailInterface>(
      this.apiUrl,
      body
    );
  }

  /**
   * Updates a seminar inscription by its ID.
   *
   * @param {number} inscriptionId - The ID of the seminar inscription to update.
   * @param {SeminarInscriptionAdminPostInterface} body - The new data for the seminar inscription.
   * @returns {Observable<SeminarInscriptionAdminGetFlatInterface>} - An Observable that will emit the updated seminar inscription.
   */
  updateSeminarInscription(
    inscriptionId: number,
    body: SeminarInscriptionAdminPostInterface
  ): Observable<SeminarInscriptionAdminGetFlatInterface> {
    const url = this.apiUrl + inscriptionId + '/';
    return this.http.put<SeminarInscriptionAdminGetFlatInterface>(url, body);
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
