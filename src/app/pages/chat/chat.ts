import { Component, inject } from "@angular/core";
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth-service";
import { ChatService } from "../../services/chat-service";

@Component({
  selector: "app-chat",
  imports: [ReactiveFormsModule],
  templateUrl: "./chat.html",
  styleUrl: "./chat.css",
})
export class Chat {
  private chatService = inject(ChatService);
  private auth = inject(AuthService);
  chatForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.chatForm = this.fb.group({
      chat_message: ["", Validators.required],
    });
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    this.chatService.sendChatMessage(formValue).then((res) => {
      this.chatForm.reset();
    });
  }
}
