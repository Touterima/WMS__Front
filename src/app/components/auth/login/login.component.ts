import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[ReactiveFormsModule, RouterLink, RouterOutlet]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user:any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService:UserService, private toastr:ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login({ email, password })
        .subscribe((response : any) => {
          // handle successful login response
          console.log(response);
          
          
          this.toastr.success('Utilisateur authentifié avec succés');
          this.router.navigate(['/admin']);
          if(response.jwt=="Wrong email or password"){
            console.log('login error'); //TODO handle login error
            this.toastr.error('email ou mot de passe invalide!!');
          }
         
          else {
            localStorage.setItem('token', response.jwt);  // Save token to local storage
            this.userService.getProfile().subscribe(data => {
              this.user = data;
              if(this.user.role[0].id==1){
                this.router.navigate(['/admin']);
              }else{
                this.router.navigate(['/']);
              }
            });
          }
            
        }, error => {
          // handle login error
          console.error(error);
        });
    }
  }
}