from django.db import models
import uuid
from account.models import User


# Create your models here.
class Document(models.Model):
    type_choices=(('Docx','Docx'),('Image','Image'))
    source=models.FileField(upload_to ='uploads/')
    type=models.CharField(max_length=15,choices=type_choices,default='Docx')
    created_by=models.ForeignKey(User,on_delete=models.CASCADE,related_name="created_by")
    date_created=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.source.url +" created by " +self.created_by.username +" at "+ str(self.date_created)
    

class Figure(models.Model):
    number=models.CharField(max_length=255,default='',null=True,blank=True)
    caption=models.CharField(max_length=255,default='',null=True,blank=True)
    document=models.ForeignKey(Document,on_delete=models.CASCADE,related_name="figures")
    def __str__(self):
        return self.number +": "+self.caption
