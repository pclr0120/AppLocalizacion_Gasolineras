import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private storage: Storage, private router: Router) {}


  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('tabs');
  }

  ngOnInit() {
  }

}
