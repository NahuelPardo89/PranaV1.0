import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SeminaristProfileDisplayInterface,
  SeminaristProfileFlatInterface,
} from 'src/app/Models/Profile/seminaristProfile.interface';

/**
 * Service for handling operations related to seminarists' profiles.
 * @class
 * @author Alvaro Olguin Armendariz
 */
@Injectable({
  providedIn: 'root',
})
export class SeminaristService {
  /**
   * The base URL for seminarist-related API endpoints.
   * @private
   * @type {string}
   */
  private apiUrl: string = 'http://127.0.0.1:8000/profile/admin/seminarist/';

  /**
   * Constructs the SeminaristService.
   * @constructor
   * @param {HttpClient} http - The Angular HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of seminarists in a flat format.
   * @returns {Observable<SeminaristProfileFlatInterface[]>} Observable containing the list of seminarists.
   */
  getSeminaristsFlat(): Observable<SeminaristProfileFlatInterface[]> {
    return this.http.get<SeminaristProfileFlatInterface[]>(this.apiUrl);
  }

  /**
   * Retrieves a list of seminarists in a display-friendly format.
   * @returns {Observable<SeminaristProfileDisplayInterface[]>} Observable containing the list of seminarists.
   */
  getSeminaristsDisplay(): Observable<SeminaristProfileDisplayInterface[]> {
    const url = this.apiUrl + '?display=true';
    return this.http.get<SeminaristProfileDisplayInterface[]>(url);
  }

  /**
   * Retrieves a flat-format seminarist by ID.
   * @param {number} seminaristId - The ID of the seminarist to retrieve.
   * @returns {Observable<SeminaristProfileFlatInterface>} Observable containing the seminarist.
   */
  getSeminaristFlatById(
    seminaristId: number
  ): Observable<SeminaristProfileFlatInterface> {
    return this.http.get<SeminaristProfileFlatInterface>(
      this.apiUrl + seminaristId + '/'
    );
  }

  /**
   * Retrieves a display-format seminarist by ID.
   * @param {number} seminaristId - The ID of the seminarist to retrieve.
   * @returns {Observable<SeminaristProfileDisplayInterface>} Observable containing the seminarist.
   */
  getSeminaristDisplayById(
    seminaristId: number
  ): Observable<SeminaristProfileDisplayInterface> {
    const url = this.apiUrl + seminaristId + '/?display=true';
    return this.http.get<SeminaristProfileDisplayInterface>(url);
  }

  /**
   * Creates a new seminarist profile.
   * @param {SeminaristProfileFlatInterface} body - The seminarist profile data to create.
   * @returns {Observable<SeminaristProfileFlatInterface>} Observable containing the created seminarist profile.
   */
  createSeminarist(
    body: SeminaristProfileFlatInterface
  ): Observable<SeminaristProfileFlatInterface> {
    return this.http.post<SeminaristProfileFlatInterface>(this.apiUrl, body);
  }

  /**
   * Updates an existing seminarist profile.
   * @param {SeminaristProfileFlatInterface} body - The seminarist profile data to update.
   * @returns {Observable<SeminaristProfileFlatInterface>} Observable containing the updated seminarist profile.
   */
  updateSeminarist(
    body: SeminaristProfileFlatInterface
  ): Observable<SeminaristProfileFlatInterface> {
    return this.http.put<SeminaristProfileFlatInterface>(this.apiUrl, body);
  }

  /**
   * Deletes a seminarist profile by ID.
   * @param {number} seminaristId - The ID of the seminarist to delete.
   * @returns {Observable<void>} Observable indicating the success of the deletion.
   */
  deleteSeminarist(seminaristId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + seminaristId + '/');
  }
}
