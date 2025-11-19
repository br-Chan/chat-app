import { inject, Injectable, NgZone } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment.development";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  supabase!: SupabaseClient;
  private router = inject(Router);
  private _ngZone = inject(NgZone);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.supabase.auth.onAuthStateChange(async (event, session) => {
      localStorage.setItem("session", JSON.stringify(session?.user));

      if (session?.user) {
        this._ngZone.run(() => {
          this.router.navigate(["/chat"]);
        });
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem("session") as string;
    console.log(user);
    return user !== "undefined";
  }

  async signInAnonymously(name: string) {
    await this.supabase.auth.signInAnonymously();

    const { data: sessionData } = await this.supabase.auth.getSession();
    const userId = sessionData.session?.user.id;

    await this.supabase.from("users").upsert({ id: userId, name });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
