import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  icon: string;
  gradient: string;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  agentName?: string;
}

@Component({
  selector: 'app-floating-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class FloatingChatbotComponent {
  isOpen = false;
  selectedAgentId = 'gpt4';
  message = '';

  agents: Agent[] = [
    {
      id: 'gpt4',
      name: 'GPT-4',
      role: 'Advanced Reasoning',
      status: 'online',
      icon: '✨',
      gradient: 'green'
    },
    {
      id: 'claude',
      name: 'Claude 3.5',
      role: 'Creative Writing',
      status: 'online',
      icon: '🧠',
      gradient: 'orange'
    },
    {
      id: 'gemini',
      name: 'Gemini Pro',
      role: 'Multimodal Analysis',
      status: 'busy',
      icon: '⚡',
      gradient: 'blue'
    },
    {
      id: 'copilot',
      name: 'Copilot',
      role: 'Code Assistant',
      status: 'online',
      icon: '💻',
      gradient: 'purple'
    }
  ];

  messages: ChatMessage[] = [
    {
      sender: 'bot',
      text: 'Hello! I am your restaurant assistant. How can I help you today?',
      agentName: 'GPT-4'
    }
  ];

  get currentAgent(): Agent {
    return this.agents.find(agent => agent.id === this.selectedAgentId) || this.agents[0];
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  closeChat(): void {
    this.isOpen = false;
  }

  sendMessage(): void {
    const trimmedMessage = this.message.trim();

    if (!trimmedMessage) {
      return;
    }

    this.messages.push({
      sender: 'user',
      text: trimmedMessage
    });

    this.message = '';

    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: this.generateBotReply(trimmedMessage),
        agentName: this.currentAgent.name
      });
    }, 700);
  }

  generateBotReply(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('menu')) {
      return 'You can view all menu items from the Menu section. Managers can also add or update menu items.';
    }

    if (lowerMessage.includes('order')) {
      return 'Customers can place and cancel orders. Managers can view and update order status.';
    }

    if (lowerMessage.includes('login')) {
      return 'You can login using your username, password, and Google reCAPTCHA verification.';
    }

    if (lowerMessage.includes('restaurant')) {
      return 'Admins can create and manage restaurants. Customers can browse available restaurants.';
    }

    if (lowerMessage.includes('feedback')) {
      return 'Customers can submit feedback, and admins can reply to feedback.';
    }

    return 'I can help you with restaurants, menus, orders, login, feedback, and role-based access in your system.';
  }

  getStatusClass(status: string): string {
    if (status === 'online') {
      return 'status-online';
    }

    if (status === 'busy') {
      return 'status-busy';
    }

    return 'status-offline';
  }

  getGradientClass(gradient: string): string {
    return `agent-${gradient}`;
  }
}