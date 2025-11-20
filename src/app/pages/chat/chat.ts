import { Component, effect, inject, signal } from "@angular/core";
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChatService } from "../../services/chat-service";
import { ChatMessage } from "../types/chat-response";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-chat",
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: "./chat.html",
  styleUrl: "./chat.css",
})
export class Chat {
  private chatService = inject(ChatService);
  chatForm!: FormGroup;
  private fb = inject(FormBuilder);
  chats = signal<ChatMessage[]>([]);

  constructor() {
    effect(() => {
      this.onListChat();
    });
  }

  ngOnInit() {
    this.chatForm = this.fb.group({
      chat_message: ["", Validators.required],
    });

    this.handleRealtimeUpdates();
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    console.log(formValue);
    this.chatService
      .sendChatMessage(formValue)
      .then((res) => {
        console.log(res);
        this.chatForm.reset();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onListChat() {
    this.chatService
      .listChat()
      .then((res: ChatMessage[] | null) => {
        console.log(res);
        if (res !== null) {
          this.chats.set(res);
        } else {
          console.log("No messages Found");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  handleRealtimeUpdates() {
    this.chatService.getChatChanges().subscribe((update: any) => {
      const record = update.new?.id ? update.new : update.old;
      const event = update.eventType;

      if (!record) return;

      this.onListChat();
    });
  }
}
