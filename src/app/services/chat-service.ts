import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment.development";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async sendChatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from("chat").insert({ text });
      if (error) {
        alert(error.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  async listChat() {
    try {
      const { data, error } = await this.supabase.from("chat").select("*,users(*)");
      if (error) {
        alert(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  getChatChanges() {
    return new Observable<any>((subscriber) => {
      const channel = this.supabase
        .channel("chat")
        .on("postgres_changes", { event: "*", schema: "public", table: "chat" }, (payload: any) =>
          subscriber.next(payload),
        )
        .subscribe();

      return () => this.supabase.removeChannel(channel);
    });
  }
}
