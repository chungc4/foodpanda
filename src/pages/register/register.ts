import { Component } from '@angular/core';
import { Alert,
         AlertController,
         IonicPage, 
         Loading,
         LoadingController,
         NavController, 
          } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public registerForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder) {

    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      });
    }
    registerUser(): void {
    if (!this.registerForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.registerForm.value}`
      );
    }
    else {
      const email: string = this.registerForm.value.email;
      const password: string = this.registerForm.value.password;

      this.authProvider.registerUser(email, password).then(
        user=> {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{text: "Ok", role: "cancel" }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
