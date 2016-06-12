import models
from rest_framework import serializers


class CitySerializer(serializers.ModelSerializer):
    logistic_centers = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)

    class Meta:
        model = models.City
        fields = (
            'id', 'name', 'lat', 'lng', 'logistic_centers')


class StyleURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StyleURL
        fields = (
            'id', 'name', 'href', 'scale')


class TransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transport
        fields = (
            'id', 'package', 'drone')


class PackageSerializer(serializers.ModelSerializer):
    transport = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Package
        fields = (
            'id', 'name', 'dropPoint', 'transport')


class DroneSerializer(serializers.ModelSerializer):
    transports = TransportSerializer(many=True, read_only=True)

    class Meta:
        model = models.Drone
        fields = (
            'id', 'model', 'plate', 'is_transporting', 'battery_life',
            'logistic_center', 'style_url', 'transports')


class DropPointSerializer(serializers.ModelSerializer):
    packages = PackageSerializer(many=True, read_only=True)

    class Meta:
        model = models.DropPoint
        fields = (
            'id', 'name', 'description', 'lat', 'lng', 'alt',
            'is_available', 'style_url', 'logistic_center', 'packages')


class LogisticCenterSerializer(serializers.ModelSerializer):
    droppoints = DropPointSerializer(many=True, read_only=True)
    drones = DroneSerializer(many=True, read_only=True)

    class Meta:
        model = models.LogisticCenter
        fields = (
            'id', 'name', 'address', 'description', 'lat', 'lng',
            'alt', 'radius', 'style_url', 'city', 'droppoints', 'drones')
