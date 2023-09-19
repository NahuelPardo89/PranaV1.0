import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialityBranch } from 'src/app/Models/Profile/branch.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrl: string = 'http://127.0.0.1:8000/profile/admin/speciality-branch/';

  constructor(private http: HttpClient) { }

  // Get all speciality branches
  getSpecialityBranches(): Observable<SpecialityBranch[]> {
    return this.http.get<SpecialityBranch[]>(this.baseUrl);
  }

  // Get a specific speciality branch by ID
  getSpecialityBranch(id: number): Observable<SpecialityBranch> {
    return this.http.get<SpecialityBranch>(`${this.baseUrl}${id}/`);
  }

  // Create a new speciality branch
  createSpecialityBranch(data: SpecialityBranch): Observable<SpecialityBranch> {
    return this.http.post<SpecialityBranch>(this.baseUrl, data);
  }

  // Update an existing speciality branch
  updateSpecialityBranch(id: number, data: SpecialityBranch): Observable<SpecialityBranch> {
    return this.http.put<SpecialityBranch>(`${this.baseUrl}${id}/`, data);
  }

  // Delete a speciality branch
  deleteSpecialityBranch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
}
