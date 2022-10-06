import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SendmessageService {

  constructor(private http: HttpClient) { }

  url = "https://fcm.googleapis.com/fcm/send";
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'key=AAAAXC27As4:APA91bGQx29ynFkd1EEtxhrYnyyq2oem4HdIiaikFMsVxpSeM7Ox5YLEzbWRqaJyVRlrYduvlEqmQU1P2blYPhtLUIyezqNFY2Hat1z2ifzDWIsB2NXaRbiXagjJIrWtRZsgSMqF_e_y'
    })
  };

  sendMessage(data: IPushData): Observable<IPushData> {
    return this.http.post<IPushData>(this.url, data, this.httpOptions).pipe(
      tap((newData: IPushData) => console.log(`added hero w/ id=${newData}`)),
      catchError(this.handleError<IPushData>('sendMessage'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
      };
    }
}

export interface IPushData {
  to: string,
  notification: INotification
}

export interface INotification {
  body: string,
  title: string
}
