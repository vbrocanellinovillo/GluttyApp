from django.db import models
from usuarios.models import User

# Create your models here.
class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    title = models.CharField(blank=False, default="Nuevo guardado")
    message = models.CharField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    chat_history_id = models.CharField(blank=False, default="Id Default")
    
    class Meta:
        ordering = ["-created_at"]
        
    def getMessage(self):
        return self.message
    
    def getCreatedAt(self):
        return self.created_at
    
    def getTitle(self):
        return self.title