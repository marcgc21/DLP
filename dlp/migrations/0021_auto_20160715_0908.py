# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-15 09:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dlp', '0020_auto_20160712_0924'),
    ]

    operations = [
        migrations.RenameField(
            model_name='styleurl',
            old_name='earth_url',
            new_name='dp_earth_url',
        ),
        migrations.RenameField(
            model_name='styleurl',
            old_name='maps_url',
            new_name='dp_maps_url',
        ),
        migrations.AddField(
            model_name='styleurl',
            name='lc_earth_url',
            field=models.CharField(default='test', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='styleurl',
            name='lc_maps_url',
            field=models.CharField(default='test2', max_length=50),
            preserve_default=False,
        ),
    ]