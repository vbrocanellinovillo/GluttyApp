import cloudinary
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
        try:
            for image in images:
                picture_link, public_id = upload_to_cloudinary(image)
                new_picture = PicturePost.objects.create(post=self, photo_url=picture_link, public_id=public_id)
                new_picture.save()
            return True
        except Exception as e:
            raise ValidationError(f"Error al subir la imagen: {str(e)}")
                
    def get_name(user):
        if hasattr(user, 'celiac'):
            return f"{user.celiac.first_name} {user.celiac.last_name}"
        elif hasattr(user, 'commerce'):
            return user.commerce.name
        else:
            return user.username
        
    def deletePictures(self):
        pictures = self.pictures.all()
        for picture in pictures:
            cloudinary.api.delete_resources(picture.public_id, resource_type="image", type="upload")
            picture.delete()

class PicturePost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="pictures")
    photo_url = models.URLField(max_length=500, blank=True, null=True)
    public_id = models.CharField(max_length=300, blank=False, default="")
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    content = models.CharField(max_length=300, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]
    
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="favorites")
    created_at = models.DateTimeField(auto_now_add=True)

class Label(models.Model):
    name = models.CharField(max_length=50, blank=False)
    def __str__(self):
        return f"{self.name}"

class LabelxPost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="labels")
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Etiqueta asociada al post {self.post.id}: {self.label.name}"
    
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')  # Asegura que un usuario solo pueda dar like a un post una vez