# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-04 08:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dlp', '0013_auto_20160630_1021'),
    ]

    operations = [
        migrations.AddField(
            model_name='transport',
            name='max_steps',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transport',
            name='step',
            field=models.IntegerField(default=1),
        ),
    ]
