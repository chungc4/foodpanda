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
import { ProfileProvider } from '../../providers/profile/profile';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder,) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      })
    }
  goToRegister():void {
    this.navCtrl.push('RegisterPage');
  }
  goToResetPassword():void {
    this.navCtrl.push('ResetPasswordPage');
  }
  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log (
        `form is not valid yet, current value: ${this.loginForm.value}`
      );
    }
    else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(
        authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage)
          });
        },
        error=> {
          this.loading.dismiss().then(()=> {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
