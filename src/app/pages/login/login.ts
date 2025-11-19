import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {
  private auth = inject(AuthService);

  async handleAuth() {
    const response = this.auth.signInAnonymously();
  }
}
