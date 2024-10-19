from django.db import models
from django.forms import ValidationError
from usuarios.image import upload_to_cloudinary
from usuarios.models import User

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    body = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha en que se registra en el sistema
    likes_number = models.IntegerField(blank=False, default=0)
    comments_number = models.IntegerField(blank=False, default=0)
    
    class Meta:
        ordering = ["-created_at"]
    
    def UploadPictures(self, images):
        if images:
                try:
                    for image in images:
                        picture_link, public_id = upload_to_cloudinary(image)
                        new_picture = PicturePost.objects.create(post=self, photo_url=picture_link, public_id=public_id)
                        new_picture.save()
                    return True
                except Exception as e:
                    raise ValidationError(f"Error al subir la imagen: {str(e)}")

class PicturePost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="pictures")
    photo_url = models.URLField(max_length=500, blank=True, null=True)
    public_id = models.CharField(max_length=300, blank=False, default="")
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    content = models.CharField(max_length=300, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class Label(models.Model):
    name = models.CharField(max_length=50, blank=False)

class LabelxPost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="labels")
    label = models.ForeignKey(Label, on_delete=models.CASCADE)