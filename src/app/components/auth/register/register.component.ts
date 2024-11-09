import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  //imports:[FormBuilder,HttpClient,ActivatedRoute ]
  imports:[ReactiveFormsModule, RouterLink, RouterOutlet]
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  location: any;
  id?: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    
    });
  }

  ngOnInit() {
  
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }



  onSubmit(): void {
    if (this.signUpForm.valid) {
      const formData = {
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
      };
      if (this.id) {
        this.authService.affiliateRegister(this.id, formData)
            .subscribe((response: any) => {
                console.log(response);
                this.router.navigate(['/login']);
            }, error => {
                console.error(error);
            });
      } else {
        this.authService.register(formData)
          .subscribe((response: any) => {
            console.log(response);
            this.router.navigate(['/login']);
          }, error => {
            console.error(error);
          });
      }
    }
  }

}