import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SendmessageService, IPushData, INotification } from '../sendmessage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  title = "";
  message = "";

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private _sendMessage: SendmessageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Configurar metodo para enviar request a API do google
    let notification : INotification = {
      body: this.message,
      title: this.title
    }

    let data : IPushData = {
      to: "/topics/geral",
      notification: notification
    }

    this._sendMessage.sendMessage(data).subscribe(data => console.log(data));
  }

}
