import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService
  ) {
    this.createForm();
   }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    });
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }


  onLoginSubmit() {
    this.processing = true; 
    this.disableForm(); 
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.loginservice.login(user).then((data: any) => {
      if(!data.success){
        console.log("usuario no identificado "+data.message)
        this.processing = false;
        this.enableForm();
      }else{
        this.loginservice.guardarDatos(data.user);
      }
    })
  
  }
  
  

  ngOnInit() {
  }

}
