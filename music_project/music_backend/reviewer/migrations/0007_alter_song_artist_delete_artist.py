# Generated by Django 4.0.3 on 2022-04-12 03:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviewer', '0006_remove_song_album_delete_album'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='artist',
            field=models.CharField(max_length=255),
        ),
        migrations.DeleteModel(
            name='Artist',
        ),
    ]
